import { Toast } from "react-bootstrap";

function Notification({ show, onClose, message, bgType }) {
    return (
      <Toast show={show} onClose={onClose} bg={bgType} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  }
  
  export default Notification