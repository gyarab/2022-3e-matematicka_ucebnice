import {Button, Modal} from "react-bootstrap";

const GameEndModal = ({show, onHide, title, text}) => {
    return (
        <Modal
            show={show}
            size={"lg"}
            backdrop={"static"}
            aria-labelledby={"contained-modal-title-vcenter"}
            centered={true}
        >
            <Modal.Body>
                <h4>{title}</h4>
                <p>
                    {text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} className={'hoverDarkShadow'}>Zavřít</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GameEndModal