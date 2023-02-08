import React, {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Login from './components/login';
import CreateProject from './pages/createProject';
import Navbar from './components/navbar';
import Signup from './components/signup';
import SingleProject from './pages/singleProject';
import { ProjectProvider } from './utils/globalState';
import { QUERY_ME } from './utils/queries';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});




function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <ProjectProvider>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
              <Route
                path='/create'
                element={<CreateProject />}
              />
              <Route
                path='projects/:projectId'
                element={<SingleProject />}
              />
              <Route
                path='*'
                element={<h1>Not Found</h1>}
              />
            </Routes>
          </ProjectProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;