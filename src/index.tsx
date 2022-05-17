import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { setContext } from "apollo-link-context";


const link = new HttpLink({
  uri: "http://localhost:7777/graphql",
})


const authContext = setContext(() => {
  const token = localStorage.getItem("gqlToken")
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } }
})

const client = new ApolloClient({
  link: from([authContext as any, link]),
  cache: new InMemoryCache(),
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement

);
root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);

