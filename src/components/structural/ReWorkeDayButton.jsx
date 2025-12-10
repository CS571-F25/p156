import { Button } from "react-bootstrap";

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