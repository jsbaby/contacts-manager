import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { XStateRouter, RouterMachine, MachineState } from 'xstate-react-router';
import { ApolloProvider } from '@apollo/react-hooks';

import "./App.css";
import { ContactDetails } from "./components/contact-details/contact-details.component";
import { ContactList } from "./components/contact-list/contact-list.component";
import CssBaseline from "@material-ui/core/CssBaseline";
import {apolloClient} from './utils/dbclient';
const routerMachineConfig = {
  initial: 'landing',
  states: {
    landing: { meta: { path: '/' } }
  }
}


class App extends Component {
  render() {
    return (
        <Router>
          <XStateRouter config={routerMachineConfig}>
            <div className="App">
              <CssBaseline />
              
              <div className="App">
                <h1 className="App-header">Contact Manager</h1>
                <Switch>
                    <Route path="/" exact component={ContactList}/>
                    <Route path="/contacts/add"  component={ContactDetails} />
                    <Route path="/contacts/view/:id"  component={ContactDetails} />
                    <Route path="/contacts/edit/:id"  component={ContactDetails} />
                </Switch>
              </div>
            </div>
          </XStateRouter>
        </Router>
      );
  }
}

export default App;
