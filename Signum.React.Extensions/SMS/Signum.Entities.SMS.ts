//////////////////////////////////
//Auto-generated. Do NOT modify!//
//////////////////////////////////
import { MessageKey, QueryKey, Type, EnumType, registerSymbol } from '../../../Framework/Signum.React/Scripts/Reflection' 

import * as Entities from '../../../Framework/Signum.React/Scripts/Signum.Entities' 

import * as ExBasics from '../Basics/Signum.Entities.Basics' 

import * as Processes from '../Processes/Signum.Entities.Processes' 

import * as Basics from '../../../Framework/Signum.React/Scripts/Signum.Entities.Basics' 


export enum MessageLengthExceeded {
    NotAllowed = "NotAllowed" as any,
    Allowed = "Allowed" as any,
    TextPruning = "TextPruning" as any,
}
export const MessageLengthExceeded_Type = new EnumType<MessageLengthExceeded>("MessageLengthExceeded", MessageLengthExceeded);

export const MultipleSMSModel_Type = new Type<MultipleSMSModel>("MultipleSMSModel");
export interface MultipleSMSModel extends Entities.ModelEntity {
    message: string;
    from: string;
    certified: boolean;
}

export module SMSCharactersMessage {
    export const Insert = new MessageKey("SMSCharactersMessage", "Insert");
    export const Message = new MessageKey("SMSCharactersMessage", "Message");
    export const RemainingCharacters = new MessageKey("SMSCharactersMessage", "RemainingCharacters");
    export const RemoveNonValidCharacters = new MessageKey("SMSCharactersMessage", "RemoveNonValidCharacters");
    export const StatusCanNotBeUpdatedForNonSentMessages = new MessageKey("SMSCharactersMessage", "StatusCanNotBeUpdatedForNonSentMessages");
    export const TheTemplateMustBeActiveToConstructSMSMessages = new MessageKey("SMSCharactersMessage", "TheTemplateMustBeActiveToConstructSMSMessages");
    export const TheTextForTheSMSMessageExceedsTheLengthLimit = new MessageKey("SMSCharactersMessage", "TheTextForTheSMSMessageExceedsTheLengthLimit");
    export const Language = new MessageKey("SMSCharactersMessage", "Language");
    export const Replacements = new MessageKey("SMSCharactersMessage", "Replacements");
}

export const SMSConfigurationEntity_Type = new Type<SMSConfigurationEntity>("SMSConfigurationEntity");
export interface SMSConfigurationEntity extends Entities.EmbeddedEntity {
    defaultCulture: ExBasics.CultureInfoEntity;
}

export const SMSMessageEntity_Type = new Type<SMSMessageEntity>("SMSMessage");
export interface SMSMessageEntity extends Entities.Entity, Processes.IProcessLineDataEntity {
    template: Entities.Lite<SMSTemplateEntity>;
    message: string;
    editableMessage: boolean;
    from: string;
    sendDate: string;
    state: SMSMessageState;
    destinationNumber: string;
    messageID: string;
    certified: boolean;
    sendPackage: Entities.Lite<SMSSendPackageEntity>;
    updatePackage: Entities.Lite<SMSUpdatePackageEntity>;
    updatePackageProcessed: boolean;
    referred: Entities.Lite<Entities.Entity>;
    exception: Entities.Lite<Basics.ExceptionEntity>;
}

export module SMSMessageOperation {
    export const Send : Entities.ExecuteSymbol<SMSMessageEntity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.Send" });
    export const UpdateStatus : Entities.ExecuteSymbol<SMSMessageEntity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.UpdateStatus" });
    export const CreateUpdateStatusPackage : Entities.ConstructSymbol_FromMany<Processes.ProcessEntity, SMSMessageEntity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.CreateUpdateStatusPackage" });
    export const CreateSMSFromSMSTemplate : Entities.ConstructSymbol_From<SMSMessageEntity, SMSTemplateEntity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.CreateSMSFromSMSTemplate" });
    export const CreateSMSWithTemplateFromEntity : Entities.ConstructSymbol_From<SMSMessageEntity, Entities.Entity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.CreateSMSWithTemplateFromEntity" });
    export const CreateSMSFromEntity : Entities.ConstructSymbol_From<SMSMessageEntity, Entities.Entity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.CreateSMSFromEntity" });
    export const SendSMSMessages : Entities.ConstructSymbol_FromMany<Processes.ProcessEntity, Entities.Entity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.SendSMSMessages" });
    export const SendSMSMessagesFromTemplate : Entities.ConstructSymbol_FromMany<Processes.ProcessEntity, Entities.Entity> = registerSymbol({ Type: "Operation", key: "SMSMessageOperation.SendSMSMessagesFromTemplate" });
}

export module SMSMessageProcess {
    export const Send : Processes.ProcessAlgorithmSymbol = registerSymbol({ Type: "ProcessAlgorithm", key: "SMSMessageProcess.Send" });
    export const UpdateStatus : Processes.ProcessAlgorithmSymbol = registerSymbol({ Type: "ProcessAlgorithm", key: "SMSMessageProcess.UpdateStatus" });
}

export enum SMSMessageState {
    Created = "Created" as any,
    Sent = "Sent" as any,
    Delivered = "Delivered" as any,
    Failed = "Failed" as any,
}
export const SMSMessageState_Type = new EnumType<SMSMessageState>("SMSMessageState", SMSMessageState);

export interface SMSPackageEntity extends Entities.Entity, Processes.IProcessDataEntity {
    name: string;
}

export const SMSSendPackageEntity_Type = new Type<SMSSendPackageEntity>("SMSSendPackage");
export interface SMSSendPackageEntity extends SMSPackageEntity {
}

export const SMSTemplateEntity_Type = new Type<SMSTemplateEntity>("SMSTemplate");
export interface SMSTemplateEntity extends Entities.Entity {
    name: string;
    certified: boolean;
    editableMessage: boolean;
    associatedType: Basics.TypeEntity;
    messages: Entities.MList<SMSTemplateMessageEntity>;
    from: string;
    messageLengthExceeded: MessageLengthExceeded;
    removeNoSMSCharacters: boolean;
    active: boolean;
    startDate: string;
    endDate: string;
}

export module SMSTemplateMessage {
    export const EndDateMustBeHigherThanStartDate = new MessageKey("SMSTemplateMessage", "EndDateMustBeHigherThanStartDate");
    export const ThereAreNoMessagesForTheTemplate = new MessageKey("SMSTemplateMessage", "ThereAreNoMessagesForTheTemplate");
    export const ThereMustBeAMessageFor0 = new MessageKey("SMSTemplateMessage", "ThereMustBeAMessageFor0");
    export const TheresMoreThanOneMessageForTheSameLanguage = new MessageKey("SMSTemplateMessage", "TheresMoreThanOneMessageForTheSameLanguage");
    export const NewCulture = new MessageKey("SMSTemplateMessage", "NewCulture");
}

export const SMSTemplateMessageEntity_Type = new Type<SMSTemplateMessageEntity>("SMSTemplateMessageEntity");
export interface SMSTemplateMessageEntity extends Entities.EmbeddedEntity {
    template: SMSTemplateEntity;
    cultureInfo: ExBasics.CultureInfoEntity;
    message: string;
}

export module SMSTemplateOperation {
    export const Create : Entities.ConstructSymbol_Simple<SMSTemplateEntity> = registerSymbol({ Type: "Operation", key: "SMSTemplateOperation.Create" });
    export const Save : Entities.ExecuteSymbol<SMSTemplateEntity> = registerSymbol({ Type: "Operation", key: "SMSTemplateOperation.Save" });
}

export const SMSUpdatePackageEntity_Type = new Type<SMSUpdatePackageEntity>("SMSUpdatePackage");
export interface SMSUpdatePackageEntity extends SMSPackageEntity {
}
