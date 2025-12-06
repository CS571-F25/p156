import { Button, Row, Col } from "react-bootstrap";
import { motion } from "motion/react";
import { useRef } from "react";

function ReWorkeDayButton(props) {
    return (
        !props.icon ? 
        <Button style={{backgroundColor: "orange", borderColor: "orange", borderRadius: "5rem",}}>
            {props.label}
        </Button>
        :
        <Button style={{backgroundColor: "orange", borderColor: "orange", borderRadius: "10rem", paddingInline: "5rem", paddingBlock: "1rem"}}>
            {props.label}
            <i className={`${props.icon} mx-3`}/>
        </Button>            
    );
};
    
export default ReWorkeDayButton;