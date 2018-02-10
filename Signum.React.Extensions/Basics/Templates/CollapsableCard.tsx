﻿import * as React from 'react'
import { classes } from '../../../../Framework/Signum.React/Scripts/Globals'
import { CardTitle, Card, Collapse, CardBody } from 'reactstrap';
import { BsColor } from '../../../../Framework/Signum.React/Scripts/Components/Basic';


export interface CollapsableCardProps {
    color?: BsColor;
    header?: React.ReactNode;
    defaultOpen?: boolean;
    collapsable?: boolean;
    isOpen?: boolean;
    toggle?: (isOpen: boolean) => void;
    cardId?: string | number;
}

export interface CollapsableCardState {
    isOpen: boolean,
    isRTL: boolean;
}

export default class CollapsableCard extends React.Component<CollapsableCardProps, CollapsableCardState> {

    constructor(props: CollapsableCardProps) {
        super(props);

        CollapsableCard.checkProps(props);

        this.state = {
            isOpen: this.props.defaultOpen == true,
            isRTL: document.body.classList.contains("rtl-mode"),
        };
    }

    static checkProps(props: CollapsableCardProps) {
        if ((props.isOpen == null) != (props.toggle == null))
            throw new Error("isOpen and togle should be set together");
    }

    componentWillReceiveProps(newProps: CollapsableCardProps) {
        CollapsableCard.checkProps(newProps);
    }

    handleToggle = () => {
        if (this.props.toggle)
            this.props.toggle(this.props.isOpen!);
        else
            this.setState({
                isOpen: !this.state.isOpen,
            });
    }

    render() {

        var isOpen = this.props.isOpen == undefined ?
            this.state.isOpen :
            this.props.isOpen;

        return (
            <Card color={this.props.color} outline={true}>
                <CardBody>
                    <CardTitle>
                        {this.props.header}
                        {(this.props.collapsable == undefined || this.props.collapsable == true) &&
                            <span
                                className={classes(this.state.isRTL ? "pull-left" : "pull-right", "fa", isOpen ? "fa-chevron-up" : "fa-chevron-down")}
                                style={{ cursor: "pointer" }}
                                onClick={this.handleToggle}>
                            </span>}
                    </CardTitle>
                    <Collapse isOpen={isOpen}>
                        {this.props.children}
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}