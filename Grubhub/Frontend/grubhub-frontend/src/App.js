import React, { Component } from 'react';
import './App.css';
import Root from './components/Root';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import {BrowserRouter} from 'react-router-dom';


// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Root/>
        </div>
      </BrowserRouter>
      </ApolloProvider>
    );
    }
}
//Export the App component so that it can be used in index.js
export default App;
