﻿import * as React from 'react'
import { Lite, Entity } from '../../../Framework/Signum.React/Scripts/Signum.Entities'
import { getQueryKey, getQueryNiceName } from '../../../Framework/Signum.React/Scripts/Reflection'
import { OmniboxMessage } from '../Omnibox/Signum.Entities.Omnibox'
import { OmniboxResult, OmniboxMatch, OmniboxProvider } from '../Omnibox/OmniboxClient'
import { QueryToken, FilterOperation, FindOptions, FilterOption } from '../../../Framework/Signum.React/Scripts/FindOptions'
import * as Navigator from '../../../Framework/Signum.React/Scripts/Navigator'
import * as Finder from '../../../Framework/Signum.React/Scripts/Finder'
import { MapMessage } from './Signum.Entities.Map'



export default class MapOmniboxProvider extends OmniboxProvider<MapOmniboxResult>
{
    getProviderName() {
        return "MapOmniboxResult";
    }

    icon() {
        return this.coloredGlyphicon("glyphicon-map-marker", "green");
    }

    renderItem(result: MapOmniboxResult): React.ReactChild[] {

        var array: React.ReactChild[] = [];

        array.push(this.icon());

        this.renderMatch(result.KeywordMatch, array);
        array.push("\u0020");

        if (result.TypeMatch != null)
            this.renderMatch(result.TypeMatch, array);
        
        return array;
    }

    navigateTo(result: MapOmniboxResult) {

        if (result.KeywordMatch == null)
            return null;

        return Promise.resolve(Navigator.currentHistory.createPath("~/Map" + (result.TypeName ? "/" + result.TypeName : "")));
    }

    toString(result: MapOmniboxResult) {
        if (result.TypeMatch == null)
            return result.KeywordMatch.Text;

        return "{0} {1}".formatWith(result.KeywordMatch.Text, result.TypeMatch.Text);
    }
}

interface MapOmniboxResult extends OmniboxResult {
    KeywordMatch: OmniboxMatch;

    TypeName: string;
    TypeMatch: OmniboxMatch;
}