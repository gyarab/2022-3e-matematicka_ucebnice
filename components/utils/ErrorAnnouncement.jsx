import {Modal} from "react-bootstrap";

const ErrorAnnouncement = ({onRemoveError, message}) => {
    return (
        <Modal
            style={{color: 'var(--bs-danger)', backdropFilter: 'blur(4px)'}}
            show={true}
            onHide={onRemoveError}
            size={"lg"}
            aria-labelledby={"contained-modal-title-vcenter"}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Chyba
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
        </Modal>
    );
}
export default ErrorAnnouncement