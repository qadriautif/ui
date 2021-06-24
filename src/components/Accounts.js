import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import DetailsModal from './detailsModel';

function Accounts(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalDetails, setModalDetails] = useState({});
    const [newAccount, setNewAccount] = useState({
        id: props.accounts.length + 1,
        name: '',
        address: '',
        pan: "",
        hasGst: false,
        gstNo: '',
        accountNo: "",
		bankName: '',
		bankBranch: "",
		ifsc: ""
    });

    function updateState (newValue) {
        setNewAccount({
            ...newAccount,
            ...newValue
        });
    }

    function updateModelDetails (accountDetails) {
        setModalDetails(accountDetails);
        setModalShow(true);
    }

    const accountList = props.accounts.sort((item1, item2) => {
        return (item1.name.toLowerCase() > item2.name.toLowerCase()) ? 1 : -1;
    }).map(rec => {
        return (
            <tr key={rec.id}>
                <td>{rec.name}</td>
                <td>{rec.address}</td>
                <td>{rec.pan}</td>
                <td>{rec.gstNo}</td>
                <td>
                    <a href="#" onClick={() => {updateModelDetails(rec)}}>View Details</a>
                </td>
            </tr>
        );
    });

    return (
        <Container>        
            <Row>
                <Col>
                    <h3>Manage Accounts</h3>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Row>
                        <Col>
                            <input type="text" name="accountName"  className="col" placeholder="Account Name" value={newAccount.name} onChange={event => updateState({name: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <textarea name="accountAddress" className="col" placeholder="Account Address" value={newAccount.address} onChange={event => updateState({address: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" name="pan"  className="col" placeholder="PAN" value={newAccount.pan} onChange={event => updateState({pan: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="checkbox" name="accountHasGst" defaultChecked={newAccount.hasGst} onClick={event => updateState({hasGst: event.target.checked, gstNo: ''})}/>
                            <label className="margin-left-5"> GST Registered</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {newAccount.hasGst ? <input type="text" name="accountGSTNumber"  className="col" placeholder="GST Number" value={newAccount.gstNo}  onChange={event => updateState({gstNo: event.target.value})} /> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" name="accountNumber"  className="col" placeholder="Account Number" value={newAccount.accountNo} onChange={event => updateState({accountNo: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" name="bankName"  className="col" placeholder="Bank Name" value={newAccount.bankName} onChange={event => updateState({bankName: event.target.value})} />
                        </Col>
                        <Col>
                            <input type="text" name="bankBranch"  className="col" placeholder="Bank Branch" value={newAccount.bankBranch} onChange={event => updateState({bankBranch: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <input type="text" name="ifscCode"  className="col" placeholder="IFSC Code" value={newAccount.ifsc} onChange={event => updateState({ifsc: event.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button name="SaveClient" onClick={() => {props.addAccount(newAccount);setNewAccount({
                                id: newAccount.id + 1,
                                name: '',
                                address: '',
                                pan: "",
                                hasGst: false,
                                gstNo: '',
                                accountNo: "",
                                bankName: '',
                                bankBranch: "",
                                ifsc: ""
                            });}}> Save </button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Account Name</th>
                                <th>Address</th>
                                <th>PAN</th>
                                <th>GST No.</th>
                                <th>Bank Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountList}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <DetailsModal show={modalShow} onHide={() => setModalShow(false)} details={modalDetails}/>
        </Container>
    );
}

export default Accounts;