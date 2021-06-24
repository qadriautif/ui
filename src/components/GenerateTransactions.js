import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {
    useParams
  } from "react-router-dom";

function GenerateTransactions (props) {
    const { invoiceId } = useParams();
    const generateInvDetails = props.transactions.filter(rec => rec.invoiceCode === invoiceId)[0];
    const productList = generateInvDetails.products.map( (rec, ind) => {
        return (
            <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{rec.description}</td>
                <td>{rec.amount}</td>
            </tr>
        );
    });;
    return (
        <Container>
            {generateInvDetails ? 
            <>            
            <Row>
                <Col>
                    <strong>List Transactions | {invoiceId} | Generate Invoice</strong>
                </Col>
            </Row>
            <Row>
                <Col className="pull-left">
                    From
                    <p>
                        {generateInvDetails.account.name}<br/>
                        {generateInvDetails.account.address}
                    </p>
                    GST No. {generateInvDetails.account.gstNo}
                </Col>
                <Col  className="pull-right">
                    To
                    <p>
                        {generateInvDetails.client.name}<br/>
                        {generateInvDetails.client.address}
                    </p>
                    GST No. {generateInvDetails.client.gstNo}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Line No.</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    Pay
                    <p>
                        {generateInvDetails.account.name}<br/>
                        Account No: {generateInvDetails.account.name}<br/>
                        Bank Name: {generateInvDetails.account.bankName}<br/>
                        Bank Branch: {generateInvDetails.account.bankBranch}<br/>
                    </p>
                </Col>
                <Col>
                    <p style={{float: 'right'}}>
                        <strong>CGST</strong>  {generateInvDetails.cgst}<br/>
                        <strong>SGST</strong>  {generateInvDetails.sgst}<br/>
                        <strong>Total</strong> {generateInvDetails.totalAmountWithTax}<br/>
                    </p>
                </Col>
            </Row>
            </>
             : <h1>No Invoice</h1>}
        </Container>
    );
}

export default GenerateTransactions;