import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';

import Blockchain from './components/blockChain';
//import Validation from './Validation';
import SearchBlock from './components/searchBlock';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home/>} />
                <Route path="/blockchain" element={<Blockchain/>} />
                <Route path="/search" element={<SearchBlock/>} />               
            </Routes>
        </Router>
    );
}

export default App;
