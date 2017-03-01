﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ASP
{
    using System;
    using System.Collections.Generic;
    
    #line 2 "..\..\Translation\Views\SyncInstance.cshtml"
    using System.Globalization;
    
    #line default
    #line hidden
    using System.IO;
    using System.Linq;
    using System.Net;
    
    #line 3 "..\..\Translation\Views\SyncInstance.cshtml"
    using System.Reflection;
    
    #line default
    #line hidden
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    
    #line 7 "..\..\Translation\Views\SyncInstance.cshtml"
    using Signum.Engine.Translation;
    
    #line default
    #line hidden
    using Signum.Entities;
    
    #line 8 "..\..\Translation\Views\SyncInstance.cshtml"
    using Signum.Entities.Translation;
    
    #line default
    #line hidden
    
    #line 4 "..\..\Translation\Views\SyncInstance.cshtml"
    using Signum.Utilities;
    
    #line default
    #line hidden
    using Signum.Web;
    
    #line 5 "..\..\Translation\Views\SyncInstance.cshtml"
    using Signum.Web.Translation;
    
    #line default
    #line hidden
    
    #line 6 "..\..\Translation\Views\SyncInstance.cshtml"
    using Signum.Web.Translation.Controllers;
    
    #line default
    #line hidden
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Translation/Views/SyncInstance.cshtml")]
    public partial class _Translation_Views_SyncInstance_cshtml : System.Web.Mvc.WebViewPage<TypeInstancesChanges>
    {
        public _Translation_Views_SyncInstance_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 9 "..\..\Translation\Views\SyncInstance.cshtml"
  
    CultureInfo culture = ViewBag.Culture;

    Lite<Entity> instance = ViewBag.Instance;
    
    ViewBag.Title = TranslationMessage.Synchronize0In1.NiceToString().Formato(instance != null ? instance.ToString() : Model.Type.NiceName(), culture.DisplayName);

    int totalInstances = ViewBag.TotalInstances;

    if (Model.Instances.Count < totalInstances)
    {
        ViewBag.Title = ViewBag.Title + " [{0}/{1}]".Formato(Model.Instances.Count, totalInstances);
    }

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

            
            #line 24 "..\..\Translation\Views\SyncInstance.cshtml"
Write(Html.ScriptsJs("~/Translation/resources/" + CultureInfo.CurrentCulture.Name + ".js"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

            
            #line 25 "..\..\Translation\Views\SyncInstance.cshtml"
Write(Html.ScriptCss("~/Translation/Content/Translation.css"));

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

            
            #line 27 "..\..\Translation\Views\SyncInstance.cshtml"
 if (Model.Instances.IsEmpty())
{

            
            #line default
            #line hidden
WriteLiteral("    <h2>");

            
            #line 29 "..\..\Translation\Views\SyncInstance.cshtml"
   Write(TranslationMessage._0AlreadySynchronized.NiceToString().Formato(instance != null ? instance.ToString() : Model.Type.NiceName()));

            
            #line default
            #line hidden
WriteLiteral("</h2>   \r\n");

            
            #line 30 "..\..\Translation\Views\SyncInstance.cshtml"
}
else
{

            
            #line default
            #line hidden
WriteLiteral("    <h2>");

            
            #line 33 "..\..\Translation\Views\SyncInstance.cshtml"
   Write(ViewBag.Title);

            
            #line default
            #line hidden
WriteLiteral("</h2>\r\n");

            
            #line 34 "..\..\Translation\Views\SyncInstance.cshtml"

    using (instance != null ? Html.BeginForm((TranslatedInstanceController c) => c.SaveSyncEntity(instance, culture.Name)) :
        Html.BeginForm((TranslatedInstanceController c) => c.SaveSync(Signum.Engine.Basics.TypeLogic.GetCleanName(Model.Type), culture.Name)))
    {

            
            #line default
            #line hidden
WriteLiteral("    <table");

WriteLiteral(" id=\"results\"");

WriteLiteral(" style=\"width: 100%; margin: 0px\"");

WriteLiteral(" class=\"st\"");

WriteLiteral("        \r\n        data-feedback=\"");

            
            #line 39 "..\..\Translation\Views\SyncInstance.cshtml"
                  Write(Url.Action("Feedback", "Translation"));

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(" \r\n        data-culture=\"");

            
            #line 40 "..\..\Translation\Views\SyncInstance.cshtml"
                 Write(culture.Name);

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(">\r\n");

            
            #line 41 "..\..\Translation\Views\SyncInstance.cshtml"
        
            
            #line default
            #line hidden
            
            #line 41 "..\..\Translation\Views\SyncInstance.cshtml"
         foreach (InstanceChanges instanceChange in Model.Instances)
        {

            
            #line default
            #line hidden
WriteLiteral("            <thead>\r\n                <tr>\r\n                    <th");

WriteLiteral(" class=\"leftCell\"");

WriteLiteral(">");

            
            #line 45 "..\..\Translation\Views\SyncInstance.cshtml"
                                    Write(TranslationMessage.Instance.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</th>\r\n                    <th");

WriteLiteral(" class=\"titleCell\"");

WriteLiteral(">");

            
            #line 46 "..\..\Translation\Views\SyncInstance.cshtml"
                                     Write(Html.Href(Navigator.NavigateRoute(instanceChange.Instance), instanceChange.Instance.ToString()));

            
            #line default
            #line hidden
WriteLiteral("</th>\r\n                </tr>\r\n            </thead>\r\n");

            
            #line 49 "..\..\Translation\Views\SyncInstance.cshtml"
           
            foreach (var route in instanceChange.RouteConflicts.OrderBy(a => a.Key.ToString()))
            {
                var propertyString = route.Key.ToString();

            
            #line default
            #line hidden
WriteLiteral("            <tr>\r\n                <th");

WriteLiteral(" class=\"leftCell\"");

WriteLiteral(">");

            
            #line 54 "..\..\Translation\Views\SyncInstance.cshtml"
                                Write(TranslationMessage.Property.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("\r\n                </th>\r\n                <th>");

            
            #line 56 "..\..\Translation\Views\SyncInstance.cshtml"
               Write(propertyString);

            
            #line default
            #line hidden
WriteLiteral("</th>\r\n            </tr>\r\n");

            
            #line 58 "..\..\Translation\Views\SyncInstance.cshtml"
                foreach (var mc in route.Value)
                {

            
            #line default
            #line hidden
WriteLiteral("            <tr>\r\n                <td");

WriteLiteral(" class=\"leftCell\"");

WriteLiteral(">");

            
            #line 61 "..\..\Translation\Views\SyncInstance.cshtml"
                                Write(mc.Key.Name);

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td");

WriteLiteral(" class=\"monospaceCell\"");

WriteLiteral(">\r\n");

            
            #line 63 "..\..\Translation\Views\SyncInstance.cshtml"
                    
            
            #line default
            #line hidden
            
            #line 63 "..\..\Translation\Views\SyncInstance.cshtml"
                     if (mc.Key.Equals(TranslatedInstanceLogic.DefaultCulture))
                    {
                        string originalName = TranslatedInstanceLogic.DefaultCulture.Name + "#" + instanceChange.Instance.Key() + "#" + propertyString;

            
            #line default
            #line hidden
WriteLiteral("                        <textarea");

WriteAttribute("name", Tuple.Create(" name=\"", 2825), Tuple.Create("\"", 2845)
            
            #line 66 "..\..\Translation\Views\SyncInstance.cshtml"
, Tuple.Create(Tuple.Create("", 2832), Tuple.Create<System.Object, System.Int32>(originalName
            
            #line default
            #line hidden
, 2832), false)
);

WriteLiteral(" style=\"display:none\"");

WriteLiteral(" >");

            
            #line 66 "..\..\Translation\Views\SyncInstance.cshtml"
                                                                        Write(mc.Value.Original);

            
            #line default
            #line hidden
WriteLiteral("</textarea>\r\n");

            
            #line 67 "..\..\Translation\Views\SyncInstance.cshtml"
                    }

            
            #line default
            #line hidden
WriteLiteral("\r\n");

            
            #line 69 "..\..\Translation\Views\SyncInstance.cshtml"
                    
            
            #line default
            #line hidden
            
            #line 69 "..\..\Translation\Views\SyncInstance.cshtml"
                     if (mc.Value.OldOriginal != null)
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <pre>");

            
            #line 71 "..\..\Translation\Views\SyncInstance.cshtml"
                        Write(TranslationClient.Diff(mc.Value.OldOriginal, mc.Value.Original));

            
            #line default
            #line hidden
WriteLiteral("</pre>\r\n");

            
            #line 72 "..\..\Translation\Views\SyncInstance.cshtml"
                    }
                    else if(TranslatedInstanceLogic.RouteType(route.Key.Route).Value == TraducibleRouteType.Html)
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <pre>");

            
            #line 75 "..\..\Translation\Views\SyncInstance.cshtml"
                        Write(mc.Value.Original);

            
            #line default
            #line hidden
WriteLiteral("</pre>\r\n");

            
            #line 76 "..\..\Translation\Views\SyncInstance.cshtml"
                    }
                    else
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <pre>");

            
            #line 79 "..\..\Translation\Views\SyncInstance.cshtml"
                        Write(mc.Value.Original);

            
            #line default
            #line hidden
WriteLiteral("</pre>   \r\n");

            
            #line 80 "..\..\Translation\Views\SyncInstance.cshtml"
                    }

            
            #line default
            #line hidden
WriteLiteral("                </td>\r\n            </tr>\r\n");

            
            #line 83 "..\..\Translation\Views\SyncInstance.cshtml"
                }

            
            #line default
            #line hidden
WriteLiteral("            <tr>\r\n                <td");

WriteLiteral(" class=\"leftCell\"");

WriteLiteral(">");

            
            #line 85 "..\..\Translation\Views\SyncInstance.cshtml"
                                Write(culture.Name);

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                <td");

WriteLiteral(" class=\"monospaceCell\"");

WriteLiteral(">\r\n");

            
            #line 87 "..\..\Translation\Views\SyncInstance.cshtml"
                    
            
            #line default
            #line hidden
            
            #line 87 "..\..\Translation\Views\SyncInstance.cshtml"
                        
                var translations = route.Value.Where(kvp => kvp.Value.OldTranslation != null)
                    .Select(kvp => new SelectListItem { Text = "old translation - " + kvp.Value.OldTranslation, Value = kvp.Value.OldTranslation })
                    .Concat(route.Value.Select(kvp => new SelectListItem { Text = "from " + kvp.Key + " - " + kvp.Value.AutomaticTranslation, Value = kvp.Value.AutomaticTranslation }))
                    .ToList();

                string elementName = culture.Name + "#" + instanceChange.Instance.Key() + "#" + propertyString;
                if (translations.Count() == 1)
                {       

            
            #line default
            #line hidden
WriteLiteral("                        <textarea");

WriteAttribute("name", Tuple.Create(" name=\"", 4364), Tuple.Create("\"", 4394)
            
            #line 96 "..\..\Translation\Views\SyncInstance.cshtml"
, Tuple.Create(Tuple.Create("", 4371), Tuple.Create<System.Object, System.Int32>(elementName
            
            #line default
            #line hidden
, 4371), false)
, Tuple.Create(Tuple.Create("", 4385), Tuple.Create("_original", 4385), true)
);

WriteLiteral(" style=\"display:none\"");

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">");

            
            #line 96 "..\..\Translation\Views\SyncInstance.cshtml"
                                                                                                     Write(translations.First().Value);

            
            #line default
            #line hidden
WriteLiteral("</textarea>\r\n");

WriteLiteral("                        <textarea");

WriteAttribute("name", Tuple.Create(" name=\"", 4510), Tuple.Create("\"", 4529)
            
            #line 97 "..\..\Translation\Views\SyncInstance.cshtml"
, Tuple.Create(Tuple.Create("", 4517), Tuple.Create<System.Object, System.Int32>(elementName
            
            #line default
            #line hidden
, 4517), false)
);

WriteLiteral(" style=\"width:90%\"");

WriteLiteral(" data-original=\"");

            
            #line 97 "..\..\Translation\Views\SyncInstance.cshtml"
                                                                                  Write(translations.First().Value);

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(">");

            
            #line 97 "..\..\Translation\Views\SyncInstance.cshtml"
                                                                                                               Write(translations.First().Value);

            
            #line default
            #line hidden
WriteLiteral("</textarea>\r\n");

            
            #line 98 "..\..\Translation\Views\SyncInstance.cshtml"
                    if (TranslationClient.Translator is ITranslatorWithFeedback)
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <button");

WriteLiteral(" class=\"rememberChange\"");

WriteLiteral(">");

            
            #line 100 "..\..\Translation\Views\SyncInstance.cshtml"
                                                  Write(TranslationJavascriptMessage.RememberChange.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</button>\r\n");

            
            #line 101 "..\..\Translation\Views\SyncInstance.cshtml"
                    }
                }
                else
                {
                    if (translations.Count() > 1 && translations.Select(a => a.Value).Distinct().Count() == 1)
                    {
                        translations.First().Selected = true;
                        translations.Insert(0, new SelectListItem { Value = "", Text = "-" });
                    }
                    else
                    {
                        translations.Insert(0, new SelectListItem { Value = "", Text = "-", Selected = true });
                    }
                    
                        
            
            #line default
            #line hidden
            
            #line 115 "..\..\Translation\Views\SyncInstance.cshtml"
                   Write(Html.DropDownList(elementName, translations));

            
            #line default
            #line hidden
            
            #line 115 "..\..\Translation\Views\SyncInstance.cshtml"
                                                                     ;

            
            #line default
            #line hidden
WriteLiteral("                        <a");

WriteLiteral(" href=\"#\"");

WriteLiteral(" class=\"edit\"");

WriteLiteral(">");

            
            #line 116 "..\..\Translation\Views\SyncInstance.cshtml"
                                            Write(TranslationMessage.Edit.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</a>\r\n");

            
            #line 117 "..\..\Translation\Views\SyncInstance.cshtml"
                }
                    
            
            #line default
            #line hidden
WriteLiteral("\r\n                </td>\r\n            </tr>\r\n");

            
            #line 121 "..\..\Translation\Views\SyncInstance.cshtml"
            }
        }

            
            #line default
            #line hidden
WriteLiteral("    </table>\r\n");

WriteLiteral("    <input");

WriteLiteral(" type=\"submit\"");

WriteAttribute("value", Tuple.Create(" value=\"", 5784), Tuple.Create("\"", 5831)
            
            #line 124 "..\..\Translation\Views\SyncInstance.cshtml"
, Tuple.Create(Tuple.Create("", 5792), Tuple.Create<System.Object, System.Int32>(TranslationMessage.Save.NiceToString()
            
            #line default
            #line hidden
, 5792), false)
);

WriteLiteral(" />\r\n");

            
            #line 125 "..\..\Translation\Views\SyncInstance.cshtml"
    }
}

            
            #line default
            #line hidden
WriteLiteral("\r\n<script>\r\n    $(function () {\r\n");

WriteLiteral("        ");

            
            #line 130 "..\..\Translation\Views\SyncInstance.cshtml"
    Write(TranslationClient.Module["editAndRemember"](TranslationClient.Translator is ITranslatorWithFeedback));

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("        ");

            
            #line 131 "..\..\Translation\Views\SyncInstance.cshtml"
    Write(TranslationClient.Module["fixTextAreas"]());

            
            #line default
            #line hidden
WriteLiteral("\r\n    });\r\n</script>\r\n");

        }
    }
}
#pragma warning restore 1591
