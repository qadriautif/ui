import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

function ListTransactions (props) {

    const transactionList = props.transactions.map(rec => {
        return (
            <tr key={rec.id}>
                <td>{rec.invoiceCode}</td>
                <td>{rec.date}</td>
                <td>{rec.client.name}</td>
                <td>{rec.account.name}</td>
                <td>{rec.totalAmount}</td>
                <td>{rec.cgst + rec.sgst}</td>
                <td>{rec.totalAmountWithTax}</td>
                <td>
                    <Link to={`/transactions/${rec.invoiceCode}/Generate`}>Generate Invoice</Link>
                </td>
            </tr>
        );
    });

    function goToGenerateInvoice (invoiceDetails) {
        console.log(invoiceDetails);
    }

    return (
        <Container>        
            <Row>
                <Col>
                    <h3>List Transactions</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Invoice Code</th>
                                <th>Date</th>
                                <th>Client</th>
                                <th>From account</th>
                                <th>Total amount without tax</th>
                                <th>Tax</th>
                                <th>Total amount</th>
                                <th>Generate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container> 
    );
}

export default ListTransactions;