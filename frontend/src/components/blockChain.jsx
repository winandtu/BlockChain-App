import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from 'react-router-dom';
import '../styles/blockchain.css';
import SearchBlock from './searchBlock';



const Blockchain = () => {
    const [chain, setChain] = useState([]);
    const [showBlocks, setShowBlocks] = useState(false);
    const [search, setSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChain = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/blockchain');
                setChain(response.data.chain);
                setTimeout(() => {

                    setLoading(false);
                }, 3000);
            } catch (error) {
                console.error('Error fetching the blockchain:', error);
            }
        };
        fetchChain();
    }, []);

    const handleViewBlocks = () => {
        const blockWindow = window.open('', 'Blocks', 'width=800,height=600');
        blockWindow.document.write('<html><head><title>Blocks</title></head><body><pre>' + JSON.stringify(chain, null, 2) + '</pre></body></html>');
    };

    const handleCloseBlocks = () => {
        setShowBlocks(false);
        setSearch(true);
    }

    const handleShowBlocks = () => {
        setShowBlocks(true);
        setSearch(false);
    }

    return (
        <div className="blockchain-container">
            <img src="https://cdn-icons-png.flaticon.com/512/11782/11782248.png" alt="blockchain-search" className='app-logo2 ' />
            <div>
                {search && <SearchBlock />}
            </div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={handleShowBlocks}
            >
                View BlockChain
            </Button>

            {/* Render blockchain */}
            {showBlocks && (
                <>
                    <div className="blockchain-list">
                        {loading ? (
                            <>
                                <CircularProgress />

                            </>) : (
                            chain.map((block, index) => (
                                <div key={index} className="block-item">
                                    <h3>Block {index}</h3>
                                    <pre>{JSON.stringify(block, null, 2)}</pre>
                                </div>
                            )))}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseBlocks}
                    >
                        close
                    </Button>
                </>
            )}



        </div>
    );
};

export default Blockchain;
