﻿/// <reference path="../../../../Framework/Signum.Web/Signum/Headers/jquery/jquery.d.ts"/>
/// <reference path="../../../../Framework/Signum.Web/Signum/Headers/d3/d3.d.ts"/>

module SF.Chart.Utils {

    (<D3.Selection<any>>Array.prototype).enterData = function (data: any, tag: string, cssClass: string) {
        return this.selectAll(tag + "." + cssClass).data(data)
            .enter().append("svg:" + tag)
            .attr("class", cssClass);
    };

    export function fillAllTokenValueFuntions(data) {
        for (var i = 0; ; i++) {
            if (data.columns['c' + i] === undefined)
                break;

            for (var j = 0; j < data.rows.length; j++) {
                SF.Chart.Utils.makeItTokenValue(data.rows[j]['c' + i]);
            }
        }
    }

    export function makeItTokenValue(value) {

        if (value === null || value === undefined)
            return;

        value.toString = function () {
            var key = (this.key !== undefined ? this.key : this);

            if (key === null || key === undefined)
                return "null";

            return key;
        };

        value.niceToString = function () {
            var result = (this.toStr !== undefined ? this.toStr : this);

            if (result === null || result === undefined)
                return this.key != undefined ? "[ no text ]" : "[ null ]";

            return result.toString();
        };

        value.valueOf = function () {
            var key = (this.key !== undefined ? this.key : this);

            if (key === null || key === undefined)
                return "null";

            if (typeof (key) == 'string' && key.indexOf('/Date(') == 0)
                return new Date(parseInt(key.substr(6))).valueOf();

            return key;
        };
    }

    export function getClickKeys(row, columns) {
        var options = "";
        for (var k in columns) {
            var col = columns[k];
            if (col.isGroupKey == true) {
                var tokenValue = row[k];
                if (tokenValue != null) {
                    options += "&" + k + "=" + (tokenValue.keyForFilter || tokenValue.toString());
                }
            }
        }

        return options;
    }

    export function translate(x, y) {
        if (y === undefined)
            return 'translate(' + x + ')';

        return 'translate(' + x + ',' + y + ')';
    }

    export function scale(x, y) {
        if (y === undefined)
            return 'scale(' + x + ')';

        return 'scale(' + x + ',' + y + ')';
    }

    export function rotate(angle, x?, y?) {
        if (x === undefined || y == undefined)
            return 'rotate(' + angle + ')';

        return 'rotate(' + angle + ',' + y + ',' + y + ')';
    }

    export function skewX(angle) {
        return 'skewX(' + angle + ')';
    }

    export function skewY(angle) {
        return 'skewY(' + angle + ')';
    }

    export function matrix(a, b, c, d, e, f) {
        return 'matrix(' + a + ',' + b + ',' + c + ',' + d + ',' + e + ',' + f + ')';
    }

    export function scaleFor(column, values, minRange, maxRange, scaleName) {
        if (scaleName == undefined)
            scaleName = column.parameter1;

        if (scaleName == "Elements")
            return d3.scale.ordinal()
                .domain(values)
                .rangeBands([minRange, maxRange]);

        if (scaleName == "ZeroMax")
            return d3.scale.linear()
                .domain([0, d3.max(values)])
                .range([minRange, maxRange]);

        if (scaleName == "MinMax")
            return ((column.type == "Date" || column.type == "DateTime") ?
                <D3.Scale.Scale>d3.time.scale() :
                <D3.Scale.Scale>d3.scale.linear())
                .domain([d3.min(values),
                    d3.max(values)])
                .range([minRange, maxRange]);


        if (scaleName == "Log")
            return d3.scale.log()
                .domain([d3.min(values),
                    d3.max(values)])
                .range([minRange, maxRange]);

        if (scaleName == "Sqrt")
            return d3.scale.pow().exponent(.5)
                .domain([d3.min(values),
                    d3.max(values)])
                .range([minRange, maxRange]);

        throw Error("Unexpected scale: " + scaleName);
    }

    export function rule(object, totalSize) {
        function isStar(val) {
            return typeof val === 'string' && val[val.length - 1] == '*';
        }

        function getStar(val) {
            if (val === '*')
                return 1;

            return parseFloat(val.substring(0, val.length - 1));
        }

        var fixed = 0;
        var proportional = 0;
        for (var p in object) {
            var value = object[p];
            if (typeof value === 'number')
                fixed += value;
            else if (isStar(value))
                proportional += getStar(value);
            else
                throw new Error("values should be numbers or *");
        }

        var remaining = totalSize - fixed;
        var star = proportional <= 0 ? 0 : remaining / proportional;

        var sizes = {};

        for (var p in object) {
            var value = object[p];
            if (typeof value === 'number')
                sizes[p] = value;
            else if (isStar(value))
                sizes[p] = getStar(value) * star;
        }

        var starts = {};
        var ends = {};
        var acum = 0;

        for (var p in sizes) {
            starts[p] = acum;
            acum += sizes[p];
            ends[p] = acum;
        }

        return {

            size: function (name) {
                return sizes[name];
            },

            start: function (name) {
                return starts[name];
            },

            end: function (name) {
                return ends[name];
            },

            middle: function (name) {
                return starts[name] + sizes[name] / 2;
            },

            debugX: function (chart) {

                var keys = d3.keys(sizes);

                //paint x-axis rule
                chart.append('svg:g').attr('class', 'x-rule-tick')
                    .enterData(keys, 'line', 'x-rule-tick')
                    .attr('x1', function (d) { return ends[d]; })
                    .attr('x2', function (d) { return ends[d]; })
                    .attr('y1', 0)
                    .attr('y2', 10000)
                    .style('stroke-width', 2)
                    .style('stroke', 'Pink');

                //paint y-axis rule labels
                chart.append('svg:g').attr('class', 'x-axis-rule-label')
                    .enterData(keys, 'text', 'x-axis-rule-label')
                    .attr('transform', function (d, i) { return SF.Chart.Utils.translate(starts[d] + sizes[d] / 2 - 5, 10 + 100 * (i % 3)) + SF.Chart.Utils.rotate(90); })
                    .attr('fill', 'DeepPink')
                    .text(function (d) { return d; });
            },

            debugY: function (chart) {

                var keys = d3.keys(sizes);

                //paint y-axis rule
                chart.append('svg:g').attr('class', 'y-rule-tick')
                    .enterData(keys, 'line', 'y-rule-tick')
                    .attr('x1', 0)
                    .attr('x2', 10000)
                    .attr('y1', function (d) { return ends[d]; })
                    .attr('y2', function (d) { return ends[d]; })
                    .style('stroke-width', 2)
                    .style('stroke', 'Violet');

                //paint y-axis rule labels
                chart.append('svg:g').attr('class', 'y-axis-rule-label')
                    .enterData(keys, 'text', 'y-axis-rule-label')
                    .attr('transform', function (d, i) { return SF.Chart.Utils.translate(100 * (i % 3), starts[d] + sizes[d] / 2 + 4); })
                    .attr('fill', 'DarkViolet')
                    .text(function (d) { return d; });

            }
        };
    }
}

module D3 {
    export interface Selection<T> {
        enterData<S>(data: S[], tag: string, cssClass: string): D3.UpdateSelection<S>
        enterData<S>(data: (data: T) => S[], tag: string, cssClass: string): D3.UpdateSelection<S>
    }
}
