import { Link } from "react-router";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect } from "react";

function ReWorkeDayToolTip(props) {

    const renderToolTip = (desc) => {
        return <Tooltip> {desc} </Tooltip>
    }

    return (
        <OverlayTrigger placement="top" delay={{ show: 100, hide: 267 }} overlay={renderToolTip(props.description)}>
            <Button style={{all: "unset"}}>
                <i className="bi bi-info-circle"></i>
            </Button>
        </OverlayTrigger>
    );
}

export default ReWorkeDayToolTip;