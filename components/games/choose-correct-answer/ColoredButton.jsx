import {Button} from "react-bootstrap";

const ColoredButton = ({answer}) => {
    return <Button variant={"outline-secondary"}
                   className={`m-2`}
                   onClick={(e) => console.log('clicked', e)}>{answer}</Button>
}

export default ColoredButton