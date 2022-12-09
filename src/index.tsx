import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, from } from "@apollo/client"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client"

const link = createUploadLink({
  uri: "https://good-jade-foal-wrap.cyclic.app/graphql",
})


const authContext = setContext(() => {
  const token = localStorage.getItem("gqlToken")
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } }
})

const client = new ApolloClient({
  link: from([authContext as any, link]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            merge: (existing, incoming) => {
              return incoming
            }
          },

          getPost: {
            merge: (existing, incoming) => {
              return incoming
            }
          },

        }
      }
    }
  }),
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

