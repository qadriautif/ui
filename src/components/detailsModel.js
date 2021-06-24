import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DetailsModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Bank Details -- {props.details.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="col" value={props.details.accountNo} readOnly/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type="text" className="col" value={props.details.bankName} readOnly/>
                    </Col>
                    <Col>
                        <input type="text" className="col" value={props.details.bankBranch} readOnly/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <input type="text" className="col" value={props.details.ifsc} readOnly/>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default DetailsModal;