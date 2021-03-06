﻿using System;
using Signum.Utilities;
using System.Linq.Expressions;
using Signum.Entities.Mailing;
using Signum.Entities.Templating;

namespace Signum.Entities.Word
{
    [Serializable, EntityKind(EntityKind.Part, EntityData.Master)]
    public class WordAttachmentEntity : Entity, IAttachmentGeneratorEntity
    {
        string fileName;
        [StringLengthValidator(AllowNulls = false, Min = 3, Max = 100), FileNameValidator]
        public string FileName
        {
            get { return fileName; }
            set
            {
                if (Set(ref fileName, value))
                    FileNameNode = null;
            }
        }

        [Ignore]
        internal object FileNameNode;

        [NotNullValidator]
        public Lite<WordTemplateEntity> WordTemplate { get; set; }

        [ImplementedByAll]
        public Lite<Entity> OverrideModel { get; set; }

        public ModelConverterSymbol ModelConverter { get; set; }

        static Expression<Func<WordAttachmentEntity, string>> ToStringExpression = @this => @this.FileName;
        [ExpressionField]
        public override string ToString()
        {
            return ToStringExpression.Evaluate(this);
        }
    }
}
