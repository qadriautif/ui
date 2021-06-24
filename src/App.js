import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useState } from 'react';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import Clients from './components/Clients';

const records = {
	clients: [{	
		id: 1,
		name: "Client 1",
		address: "Client Address 1",
    hasGst: true,
		gstNo: "CLGSTNO1"
	}],
	accounts: [{
		id: 1,
		name: "Account 1",
		address: "Account Address 1",
		pan: "ACCPAN1111",
    hasGst: true,
    gstNo: 'ANGSTNO1',
		accountNo: "ACCNO1",
		bankName: 'Bank Name',
		bankBranch: "Bank Branch Name",
		ifsc: "BBIFSC1"
	}],
	transactions: [{
		id: 1,
		invoiceCode: "INV0001",
		client: {	
			id: 1,
			name: "Client 1",
			address: "Client Address 1",
      hasGst: true,
			gstNo: "CLGSTNO1"
		},
		account: {
			id: 1,
			name: "Account 1",
			address: "Account Address 1",
			pan: "ACCPAN1111",
      hasGst: true,
      gstNo: 'ANGSTNO1',
			accountNo: "ACCNO1",
			bankName: 'Bank Name',
			bankBranch: "Bank Branch Name",
			ifsc: "BBIFSC1"
		},
		products: [{
			description: 'Product 1',
			amount: 123
		}],
		date: '6/23/2021',
		totalAmount: 20000,
		cgst: 1800,
		sgst: 1800,
		totalAmountWithTax: 23600
	}]
};

function App() {
  const [client, setClient] = useState(() => records.clients);
  const [account, setAccount] = useState(() => records.accounts);
  const [transaction, setTransaction] = useState(() => records.transactions);

  function addClient (newClient) {
    setClient([
      ...client,
      newClient
    ]);
  }

  function addAccount (newAccount) {
    setAccount([
      ...account,
      newAccount
    ]);
  }

  function addTransaction (newTransaction) {
    setTransaction([
      ...transaction,
      newTransaction
    ]);
  }

  return (
      <Container fluid>
        <Router>
          <Row>
            <Col md={2}>
              <h1>
                Invoicer
              </h1>
              <Nav className="flex-column">
                <Nav.Link>
                  <Link to="/">Clients</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/accounts">Accounts</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/transactions">Transactions</Link>
                </Nav.Link>
              </Nav>
            </Col>
          <Col>          
            <Switch>
              <Route exact path="/">
                <Redirect to="/clients" />
              </Route>
              <Route path="/clients">
                <Clients clients={client} addClient={addClient} />
              </Route>
              <Route path="/accounts">
                <Accounts accounts={account} addAccount={addAccount}/>
              </Route>
              <Route path="/transactions">
                <Transactions clients={client} accounts={account} transactions={transaction} addTransaction={addTransaction}/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    </Container>
  );
}

export default App;
