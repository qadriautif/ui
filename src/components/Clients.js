import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

function Clients(props) {
    const [newClient, setNewClient] = useState({
        id: props.clients.length + 1,
        name: '',
        address: '',
        hasGst: false,
        gstNo: ''
    });

    function updateState (newValue) {
        setNewClient({
            ...newClient,
            ...newValue
        });
    }

    const clientList = props.clients.sort((item1, item2) => {
            return (item1.name.toLowerCase() > item2.name.toLowerCase()) ? 1 : -1;
        }).map(rec => {
            return (
                <tr key={rec.id}>
                    <td>{rec.name}</td>
                    <td>{rec.address}</td>
                    <td>{rec.gstNo}</td>
                </tr>
            );
        });
    return (
        <Container>        
            <Row>
                <Col>
                    <h3>Manage clients</h3>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Row>
                        <Col>
                            <input type="text" name="clientName"  className="col" placeholder="Client Name" value={newClient.name} onChange={event => updateState({name: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <textarea name="clientaddress" className="col" placeholder="Client Address" value={newClient.address} onChange={event => updateState({address: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="checkbox" name="hasGst" defaultChecked={newClient.hasGst} onClick={event => updateState({hasGst: event.target.checked, gstNo: ''})}/>
                            <label className="margin-left-5"> GST Applicable</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {newClient.hasGst ? <input type="text" name="GSTNumber"  className="col" placeholder="GST Number" value={newClient.gstNo}  onChange={event => updateState({gstNo: event.target.value})} /> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button name="SaveClient" onClick={() => {props.addClient(newClient);setNewClient({
                                id: newClient.id + 1,
                                name: '',
                                address: '',
                                hasGst: false,
                                gstNo: ''
                            });}}> Save </button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Address</th>
                                <th>GST No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientList}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Clients;