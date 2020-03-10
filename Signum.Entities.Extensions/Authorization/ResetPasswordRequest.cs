﻿using System;

namespace Signum.Entities.Authorization
{
    [Serializable, EntityKind(EntityKind.System, EntityData.Transactional)]
    public class ResetPasswordRequestEntity : Entity
    {
        [UniqueIndex(AvoidAttachToUniqueIndexes = true)]
        [StringLengthValidator(AllowNulls = false, Max = 32)]
        public string Code { get; set; }

        [NotNullValidator]
        public UserEntity User { get; set; }

        public DateTime RequestDate { get; set; }

        public bool Lapsed { get; set; }
    }
}
