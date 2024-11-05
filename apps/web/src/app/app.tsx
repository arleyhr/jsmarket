import { Route, Routes } from 'react-router-dom';

import Layout from '../components/layout';


export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
      </Routes>
      </Layout>
  );
}

export default App;
