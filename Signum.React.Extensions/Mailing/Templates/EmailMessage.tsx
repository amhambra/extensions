﻿import * as React from 'react'
import { Tab, Tabs }from 'react-bootstrap'
import { classes } from '../../../../Framework/Signum.React/Scripts/Globals'
import { FormGroup, FormControlStatic, ValueLine, ValueLineType, EntityLine, EntityCombo, EntityDetail, EntityList, EntityRepeater, EntityTabRepeater} from '../../../../Framework/Signum.React/Scripts/Lines'
import { SearchControl }  from '../../../../Framework/Signum.React/Scripts/Search'
import { getToString, getMixin }  from '../../../../Framework/Signum.React/Scripts/Signum.Entities'
import { TypeContext, FormGroupStyle } from '../../../../Framework/Signum.React/Scripts/TypeContext'
import { EmailMessageEntity, EmailAddressEntity, EmailRecipientEntity, EmailAttachmentEntity, 
    EmailReceptionMixin, EmailFileType } from '../Signum.Entities.Mailing'
import FileLine from '../../Files/FileLine'


export default class EmailMessage extends React.Component<{ ctx: TypeContext<EmailMessageEntity> }, void> {

    render() {

        var e = this.props.ctx;

        if (e.value.state != "Created")
            e = e.subCtx({ readOnly: true });

        var sc4 = e.subCtx({labelColumns: {sm: 4}});
        var sc1 = e.subCtx({labelColumns: {sm: 1}});

        return (
            <Tabs id="newsletterTabs">
                <Tab title={EmailMessageEntity.niceName() }>
                      <fieldset>
                    <legend>Properties</legend>
                    <div className="row">
                        <div className="col-sm-5">
                            <ValueLine ctx={sc4.subCtx(f => f.state)}  />
                            <ValueLine ctx={sc4.subCtx(f => f.sent)}  />
                            <ValueLine ctx={sc4.subCtx(f => f.bodyHash)}  />
                        </div>
                        <div className="col-sm-7">
                            <EntityLine ctx={e.subCtx(f => f.template)}  />
                            <EntityLine ctx={e.subCtx(f => f.package)}  />
                            <EntityLine ctx={e.subCtx(f => f.exception)}  />
                        </div>
                    </div>
                </fieldset>


                <div className="form-inline repeater-inline">
                    <EntityDetail ctx={e.subCtx(f => f.from)} />
                    <EntityRepeater ctx={e.subCtx(f => f.recipients)}/>
                    <EntityRepeater ctx={e.subCtx(f => f.attachments)} getComponent={this.renderAttachment} />
                </div>
                    
                <EntityLine ctx={sc1.subCtx(f => f.target)}  />
                <ValueLine ctx={sc1.subCtx(f => f.subject)}  />
                <ValueLine ctx={sc1.subCtx(f => f.isBodyHtml)} inlineCheckbox={true} />
                {sc1.value.state == "Created" ? 
                    <ValueLine ctx={e.subCtx(f => f.body)} valueLineType={ValueLineType.TextArea} valueHtmlProps={{style : { width: "100%", height: "180px" }}}/> :
                    <iframe  style={{width: "100%"}} dangerouslySetInnerHTML={{ __html: e.value.body}}/>
                }
                </Tab>
                {getMixin(e.value, EmailReceptionMixin) && this.renderEmailReceptionMixin() }
            </Tabs>
        );
    }


    renderEmailReceptionMixin = () => {

        var ri = this.props.ctx.subCtx(a=>getMixin(a, EmailReceptionMixin).receptionInfo);

        return <Tab title={EmailReceptionMixin.niceName() }>
            <fieldset>
                <legend>Properties</legend>

                <EntityLine ctx={ri.subCtx(f => f.reception)}  />
                <ValueLine ctx={ri.subCtx(f => f.uniqueId)}  />
                <ValueLine ctx={ri.subCtx(f => f.sentDate)}  />
                <ValueLine ctx={ri.subCtx(f => f.receivedDate)}  />
                <ValueLine ctx={ri.subCtx(f => f.deletionDate)}  />

             </fieldset>

             <pre>{ ri.value.rawContent }</pre>
        </Tab>;
    };

    
    renderAttachment = (ec: TypeContext<EmailAttachmentEntity>) => {
        var sc = ec.subCtx({ formGroupStyle: "SrOnly"});
        return (
            <div>
                <FileLine ctx={ec.subCtx(a=>a.file)} remove={false} 
                    fileType={EmailFileType.Attachment} />
            </div>
        );
    };
}
