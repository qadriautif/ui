import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import AddTransaction from './AddTransaction';
import ListTransactions from './ListTransactions';
import GenerateTransactions from './GenerateTransactions';

function Transactions(props) {
    let { path, url } = useRouteMatch();
    const {clients, accounts, transactions, addTransaction} = props;
    return (
        <Container>        
            <Router>
                <Row>
                    <Col md={4}>
                        <h4>
                            <h3>Manage transactions</h3>
                        </h4>
                    </Col>
                    <Col>
                        <Nav className="justify-content-end">
                            <Nav.Link>
                                <Link to={`${url}/new`}>Add a new transaction</Link>
                            </Nav.Link>
                            <span style={{marginTop: "6px"}}> | </span>
                            <Nav.Link>
                                <Link to={`${url}/list`}>List transactions</Link>
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Switch>
                            <Route exact path={`${path}/`}>
                                <Redirect to={`${path}/new`} />
                            </Route>
                            <Route path={`${path}/new`}>
                                <AddTransaction clients={clients} accounts={accounts} transactions={transactions} addTransaction={addTransaction}/>
                            </Route>
                            <Route path={`${path}/list`}>
                                <ListTransactions transactions={transactions}/>
                            </Route>
                            <Route path={`${path}/:invoiceId/Generate`}>
                                <GenerateTransactions  transactions={transactions}/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </Container>
    );
}

export default Transactions;