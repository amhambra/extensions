﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Threading;
using Signum.Services;
using Signum.Utilities;
using Signum.Entities;
using Signum.Web;
using Signum.Engine;
using Signum.Engine.Operations;
using Signum.Entities.Operations;
using Signum.Engine.Basics;
using Signum.Web.Extensions.Properties;

namespace Signum.Web.Operations
{
    [HandleError]
    public class OperationController : Controller
    {
        public ActionResult OperationExecute(string sfTypeName, int? sfId, string sfOperationFullKey, bool isLite, string prefix, string sfOnOk, string sfOnCancel)
        {
            Type type = Navigator.ResolveType(sfTypeName);

            IdentifiableEntity entity = null;
            ChangesLog changesLog = null;
            if (isLite)
            {
                if (sfId.HasValue)
                {
                    Lite lite = Lite.Create(type, sfId.Value);
                    entity = OperationLogic.ServiceExecuteLite((Lite)lite, EnumLogic<OperationDN>.ToEnum(sfOperationFullKey));
                }
                else
                    throw new ArgumentException(Resources.CouldNotCreateLiteWithoutAnIdToCallOperation0.Formato(sfOperationFullKey));
            }
            else
            {
                entity = (IdentifiableEntity)Navigator.ExtractEntity(this, Request.Form);

                changesLog = Navigator.ApplyChangesAndValidate(this, ref entity, prefix, "");
                //changesLog = Navigator.ApplyChangesAndValidate(this, ref entity, "", "");

                if (changesLog.Errors != null && changesLog.Errors.Count > 0)
                {
                    this.ModelState.FromDictionary(changesLog.Errors, Request.Form);
                    return Content("{\"ModelState\":" + this.ModelState.ToJsonData() + "}");
                }

                entity = OperationLogic.ServiceExecute(entity, EnumLogic<OperationDN>.ToEnum(sfOperationFullKey));

                if (Navigator.ExtractIsReactive(Request.Form))
                {
                    string tabID = Navigator.ExtractTabID(Request.Form);
                    Session[tabID] = entity;
                }
            }

            if (prefix.HasText()) 
                return Navigator.PopupView(this, entity, prefix);
            else //NormalWindow
                return Navigator.View(this, entity);
        }

        public ActionResult ConstructFromManyExecute(string sfTypeName, string sfIds, string sfOperationFullKey, string prefix, string sfOnOk, string sfOnCancel)
        {
            Type type = Navigator.ResolveType(sfTypeName);

            List<Lite> sourceEntities = null;
            if (sfIds.HasText())
            {
                string[] ids = sfIds.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                if (ids == null || ids.Length == 0)
                    throw new ArgumentException(Resources.ConstructFromManyOperation0NeedsSourceIdsAsParameter.Formato(sfOperationFullKey));
                sourceEntities = ids.Select(idstr => Lite.Create(type, int.Parse(idstr))).ToList();
            }
            if (sourceEntities == null)
                throw new ArgumentException(Resources.ConstructFromManyOperation0NeedsSourceLazies.Formato(sfOperationFullKey));

            IdentifiableEntity entity = OperationLogic.ServiceConstructFromMany(sourceEntities, type, EnumLogic<OperationDN>.ToEnum(sfOperationFullKey));

            return Navigator.PopupView(this, entity, prefix);
        }
    }
}
