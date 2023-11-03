import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Dashboard from './pages/DashBoard';
import Login from './components/Login';
import Register from './components/Register';
  const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
  });

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});


function App(props) {
  return (

      <ApolloProvider client={client}>
        <BrowserRouter>
       <Routes>
        <Route path="/" {...props} exact element={<Login />} />
          <Route path="/Home" {...props} element={<Dashboard />} />
            <Route path="/SignUp" exact element={<Register />} />
        </Routes>
        </BrowserRouter>
    </ApolloProvider>

  );
}

export default App
