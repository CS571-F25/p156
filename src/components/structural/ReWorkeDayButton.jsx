import { Button } from "react-bootstrap";
import { Link } from "react-router"

function ReWorkeDayButton(props) {
    return (
        !props.icon ? 
        <Button variant="primary" as={props.to ? Link: ""} to={props.to ? props.to : ""} style={{borderRadius: "5rem",}}>
            {props.label}
        </Button>
        :
        <Button variant="primary"as={props.to ? Link: ""} to={props.to ? props.to : ""} style={{borderRadius: "10rem", paddingInline: "5rem", paddingBlock: "1rem"}}>
            {props.label}
            <i className={`${props.icon} mx-3`}/>
        </Button>            
    );
};
    
export default ReWorkeDayButton;