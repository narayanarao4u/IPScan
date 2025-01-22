import React, { useRef } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import IPSearch from './components/IPSearch';
// Import DateTime component
import DateTime from './components/DateTime';
import MacIp from './components/MacIp';
import NeverUsedIP from './components/NeverUsedIP';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/ip-search" element={<IPSearch />} />
        <Route path="/date-time" element={<DateTime />} />
        <Route path="/MACIP" element={<MacIp />} />
        <Route path="/freeIPs" element={<NeverUsedIP />} />
      </Routes>
      <div id="modal" style={{ position: 'relative', zIndex: 10 }}></div>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='bg-blue-200 p-4 flex justify-between items-center'>
        <h1>IP Data</h1>
        <nav className='flex space-x-4'>          
            <Link to="/ip-search">IP Search</Link>      
            <Link to="/date-time">Date & Time</Link>                
            <Link to="/MACIP">MAC & IP</Link>
            <Link to="/freeIPs">Free IPs</Link>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export default App;