﻿using Signum.Utilities;
using System;
using System.Linq.Expressions;

namespace Signum.Entities.Dynamic
{
    [Serializable, EntityKind(EntityKind.Main, EntityData.Transactional)]
    public class DynamicExpressionEntity : Entity
    {
        [StringLengthValidator(AllowNulls = false, Min = 3, Max = 100), IdentifierValidator(IdentifierType.PascalAscii)]
        public string Name { get; set; }

        [StringLengthValidator(AllowNulls = false, Min = 3, Max = 100)]
        public string FromType { get; set; }

        [StringLengthValidator(AllowNulls = false, Min = 3, Max = 100)]
        public string ReturnType { get; set; }

        [StringLengthValidator(AllowNulls = false, Min = 1, MultiLine = true)]
        public string Body { get; set; }

        [StringLengthValidator(AllowNulls = true, Min = 1, Max = 100)]
        public string Format { get; set; }

        [StringLengthValidator(AllowNulls = true, Min = 1, Max = 100)]
        public string Unit { get; set; }

        public DynamicExpressionTranslation Translation { get; set; }

        static Expression<Func<DynamicExpressionEntity, string>> ToStringExpression = @this => @this.ReturnType + " " + @this.Name + "(" + @this.FromType + " e)";
        [ExpressionField]
        public override string ToString()
        {
            return ToStringExpression.Evaluate(this);
        }
    }

    public enum DynamicExpressionTranslation
    {
        TranslateExpressionName,
        ReuseTranslationOfReturnType,
        NoTranslation,
    }

    [AutoInit]
    public static class DynamicExpressionOperation
    {
        public static readonly ConstructSymbol<DynamicExpressionEntity>.From<DynamicExpressionEntity> Clone;
        public static readonly ExecuteSymbol<DynamicExpressionEntity> Save;
        public static readonly DeleteSymbol<DynamicExpressionEntity> Delete;
    }

    public interface IDynamicExpressionEvaluator
    {
        object EvaluateUntyped(Entity entity);
    }
}
