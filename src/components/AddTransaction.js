import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

function AddTransaction (props) {
    const [newTransaction, setNewTransaction] = useState({
        id: props.transactions.length + 1,
        invoiceCode: '',
        client: '',
        account: '',
        products: [],
        date: '',
        totalAmount: 0,
        cgst: 0,
        sgst: 0,
        totalAmountWithTax: 0
    });

    const [billingData, setBillingData] = useState({});

    const [product, setProduct] = useState([{
        description: '',
        amount: 0
    }]);

    const clientDropdown = props.clients.map(item => {
        return <option value={JSON.stringify(item)} key={item.name}>{item.name}</option>
    });
    
    const accountDropdown = props.accounts.map(item => {
        return <option value={JSON.stringify(item)} key={item.name}>{item.name}</option>
    });

    function updateState (newValue) {
        setNewTransaction({
            ...newTransaction,
            ...newValue
        });
    }
    
    function updateProduct (itemInd, newValue) {
        let tempProduct = [...product];
        tempProduct[itemInd] = {
            ...tempProduct[itemInd],
            ...newValue
        }
        setProduct(tempProduct);
    }

    function deleteProduct (itemInd) {
        let tempProduct = [...product];
        delete tempProduct[itemInd];
        setProduct(tempProduct);
    }

    useEffect(() => {
        if (newTransaction.client && newTransaction.account) {
            let billing = {
                totalAmount: 0,
                totalAmountWithTax: 0
            };

            product.map((pitem) => {
                return billing.totalAmount += Number(pitem.amount);
            });

            if (newTransaction.client.gstNo && newTransaction.account.gstNo) {
                billing.cgst = (billing.totalAmount/100) * 8;
                billing.sgst = (billing.totalAmount/100) * 8;
                billing.totalAmountWithTax = billing.totalAmount + (billing.cgst*2);
            } else {
                billing.totalAmountWithTax = billing.totalAmount;
            }

            setBillingData(billing);
        }
    }, [newTransaction.client, newTransaction.account, product]);

    useEffect(() => {        
        updateState({
            ...billingData,
            products: product
        });
    }, [billingData]);

    return (
        <Container>
            <Row>
                <Col md={5}>
                    <h4> New transaction</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="text" name="invoiceCode"  className="col" placeholder="Invoice Code" value={newTransaction.invoiceCode} onChange={event => updateState({invoiceCode: event.target.value})} />
                </Col>
                <Col>
                    <label>Invoice Date</label>
                    <input type="date" name="invoicedate" placeholder="dd-mm-yyyy" value={newTransaction.date} onChange={event => updateState({date: event.target.value})} className="margin-left-5"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>Client</label>
                    <select name="clientDropdown" className="margin-left-5" onChange={event => updateState({client: JSON.parse(event.target.value)})} >
                        <option value='' hidden selected>select</option>
                        {clientDropdown}
                    </select>
                </Col>
                <Col>
                    <label>From account</label>
                    <select name="accountDropdown" className="margin-left-5" onChange={event => updateState({account: JSON.parse(event.target.value)})}>
                        <option value='' hidden selected>select</option>
                        {accountDropdown}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <button name="addProduct" onClick={() => {setProduct([
                        ...product,
                        {
                            description: '',
			                amount: 0
                        }
                    ]);}}> Add lines </button>
                </Col>
            </Row>
            <Row>
                <Col>
                {product.map((prod, ind)=> {
                    return (
                        <>
                            <Row>
                                <Col>
                                    <input type="text" name="productDesc" className="col" placeholder="Description" value={prod.description} onChange={event => updateProduct(ind, {description: event.target.value})} />
                                </Col>
                                <Col>
                                    <input type="number" name="productAmount" className="col"  value={prod.amount} onChange={event => updateProduct(ind, {amount: event.target.value})} className="margin-left-5"/>
                                </Col>
                                <Col md={2}>
                                    {ind ? <button name="removeProduct" onClick={() => {deleteProduct(ind)}}> Remove </button> : ''}
                                </Col>
                            </Row>
                        </>
                    );
                })}
                </Col>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Particulars</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total amount without tax</td>
                                <td>{billingData.totalAmount}</td>
                            </tr>
                            {billingData.sgst ? <tr>
                                <td>SGST</td>
                                <td>{billingData.sgst}</td>
                            </tr> : ''}
                            {billingData.cgst ? <tr>
                                <td>CGST</td>
                                <td>{billingData.cgst}</td>
                            </tr>: ''}
                            <tr>
                                <td>Total amount</td>
                                <td>{billingData.totalAmountWithTax}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <button name="saveTransaction" onClick={() => {props.addTransaction(newTransaction);setNewTransaction({
                        id: newTransaction.id + 1,
                        invoiceCode: '',
                        client: '',
                        account: '',
                        products: [],
                        date: '',
                        totalAmount: 0,
                        cgst: 0,
                        sgst: 0,
                        totalAmountWithTax: 0
                    });
                    setProduct([{
                        description: '',
                        amount: 0
                    }]);}}> Save </button>
                </Col>
            </Row>
        </Container>
    );
}

export default AddTransaction;