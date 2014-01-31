﻿/// <reference path="../../../../Framework/Signum.Web/Signum/Scripts/globals.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Framework/Signum.Web/Signum/Scripts/Entities", "Framework/Signum.Web/Signum/Scripts/Lines"], function(require, exports, Entities, Lines) {
    once("SF-fileLine", function () {
        return $.fn.fileLine = function (opt) {
            var fl = new FileLine(this, opt);
        };
    });

    var FileLine = (function (_super) {
        __extends(FileLine, _super);
        function FileLine(element, _options) {
            _super.call(this, element, _options);
        }
        FileLine.prototype._create = function () {
            var _this = this;
            if (this.options.dragAndDrop == null || this.options.dragAndDrop == true)
                FileLine.initDragDrop($(this.pf("DivNew")), function (e) {
                    return _this.fileDropped(e);
                });
        };

        FileLine.initDragDrop = function ($div, onDropped) {
            if (window.File && window.FileList && window.FileReader && new XMLHttpRequest().upload) {
                var self = this;
                var $fileDrop = $("<div></div>").addClass("sf-file-drop").html("drag a file here").on("dragover", function (e) {
                    FileLine.fileDropHover(e, true);
                }).on("dragleave", function (e) {
                    FileLine.fileDropHover(e, false);
                }).appendTo($div);
                $fileDrop[0].addEventListener("drop", function (e) {
                    FileLine.fileDropHover(e, false);
                    onDropped(e);
                }, false);
            }
        };

        FileLine.fileDropHover = function (e, toggle) {
            e.stopPropagation();
            e.preventDefault();
            $(e.target).toggleClass("sf-file-drop-over", toggle);
        };

        FileLine.prototype.uploadAsync = function (f, customizeXHR) {
            $(this.pf('loading')).show();
            this.runtimeInfo().setValue(new Entities.RuntimeInfoValue(this.staticInfo().singleType(), null));

            var fileName = f.name;

            var $divNew = $(this.pf("DivNew"));

            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.options.uploadDroppedUrl || SF.Urls.uploadDroppedFile, true);
            xhr.setRequestHeader("X-FileName", fileName);
            xhr.setRequestHeader("X-Prefix", this.options.prefix);
            xhr.setRequestHeader("X-" + SF.compose(this.options.prefix, Entities.Keys.runtimeInfo), this.runtimeInfo().value.toString());
            xhr.setRequestHeader("X-sfFileType", $(this.pf("sfFileType")).val());
            xhr.setRequestHeader("X-sfTabId", $("#sfTabId").val());

            var self = this;
            xhr.onload = function (e) {
                var result = JSON.parse(xhr.responseText);

                self.onUploaded(result.FileName, result.FullWebPath, result.RuntimeInfo, result.EntityState);
            };

            xhr.onerror = function (e) {
                SF.log("Error " + xhr.statusText);
            };

            if (customizeXHR != null)
                customizeXHR(xhr);

            xhr.send(f);
        };

        FileLine.prototype.fileDropped = function (e) {
            var files = e.dataTransfer.files;
            e.stopPropagation();
            e.preventDefault();

            this.uploadAsync(files[0]);
        };

        FileLine.prototype.prepareSyncUpload = function () {
            //New file in FileLine but not to be uploaded asyncronously => prepare form for multipart and set runtimeInfo
            $(this.pf(''))[0].setAttribute('value', $(this.pf(''))[0].value);
            var $mform = $('form');
            $mform.attr('enctype', 'multipart/form-data').attr('encoding', 'multipart/form-data');
            this.runtimeInfo().setValue(new Entities.RuntimeInfoValue(this.staticInfo().singleType(), null));
        };

        FileLine.prototype.upload = function () {
            this.runtimeInfo().setValue(new Entities.RuntimeInfoValue(this.staticInfo().singleType(), null));

            var $fileInput = $(this.pf(''));
            $fileInput[0].setAttribute('value', $fileInput[0].value);
            $(this.pf('loading')).show();

            this.createTargetIframe();

            var url = this.options.uploadUrl || SF.Urls.uploadFile;

            var $fileForm = $('<form></form>').attr('method', 'post').attr('enctype', 'multipart/form-data').attr('encoding', 'multipart/form-data').attr('target', SF.compose(this.options.prefix, "frame")).attr('action', url).hide().appendTo($('body'));

            var $divNew = $(this.pf("DivNew"));
            var $clonedDivNew = $divNew.clone(true);
            $divNew.after($clonedDivNew).appendTo($fileForm);

            var $tabId = $("#" + Entities.Keys.tabId).clone().appendTo($fileForm);
            var $antiForgeryToken = $("input[name=" + Entities.Keys.antiForgeryToken + "]").clone().appendTo($fileForm);

            $fileForm.submit().remove();
        };

        FileLine.prototype.createTargetIframe = function () {
            var name = SF.compose(this.options.prefix, "frame");
            return $("<iframe id='" + name + "' name='" + name + "' src='about:blank' style='position:absolute;left:-1000px;top:-1000px'></iframe>").appendTo($("body"));
        };

        FileLine.prototype.setEntitySpecific = function (entityValue, itemPrefix) {
            $(this.pf(Entities.Keys.loading)).hide();
            $(this.pf(Entities.Keys.toStr)).html(entityValue.toStr);
            $(this.pf(Entities.Keys.link)).html(entityValue.toStr).attr("download", entityValue.toStr).attr("href", entityValue.link);
        };

        FileLine.prototype.onUploaded = function (fileName, link, runtimeInfo, entityState) {
            this.setEntity(new Entities.EntityValue(Entities.RuntimeInfoValue.parse(runtimeInfo), fileName, link));

            $(this.pf(Entities.Keys.entityState)).val(entityState);

            $(this.pf("frame")).remove();
        };

        FileLine.prototype.onChanged = function () {
            if (this.options.asyncUpload) {
                this.upload();
            } else {
                this.prepareSyncUpload();
            }
        };

        FileLine.prototype.updateButtonsDisplay = function () {
            var hasEntity = !!this.runtimeInfo().value;

            $(this.pf('DivOld')).toggle(hasEntity);
            $(this.pf('DivNew')).toggle(!hasEntity);

            $(this.pf("btnRemove")).toggle(hasEntity);
        };
        return FileLine;
    })(Lines.EntityBase);
    exports.FileLine = FileLine;
});
//# sourceMappingURL=Files.js.map
