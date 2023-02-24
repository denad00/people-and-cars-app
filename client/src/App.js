import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import 'antd/dist/reset.css'
import Homepage from './components/layout/Homepage';
import { Routes, Route } from 'react-router';
import Detail from './components/layout/Detail';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
      <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/people/:id" element={<Detail />} />
        </Routes>
      </div>
    </ApolloProvider>
 
  );
}

export default App;
