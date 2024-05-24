import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/searchBlock.css';
const SearchBlock = () => {
    const [keySearch, setKeySearch] = useState('');
    const [block, setBlock] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/blockchain/${keySearch}`);
            setBlock(response.data);
            setError('')
            setTimeout(() => {

                setLoading(false);
            }, 2000);
        } catch (error) {
            setError('Block not found');
            console.error('Error searching for block:', error);
            setBlock(null);
            setKeySearch('');
        }
    };

    const handClose = () => {
        setBlock(null);
        setKeySearch('');
    }

    return (
        <>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/2272/2272794.png" alt="blockchain-search" className='app-logo3 ' />
            </div>
            <div className="search-container">

                <TextField
                    type="text"
                    label="Key Search"
                    value={keySearch}
                    onChange={(e) => setKeySearch(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                >
                    Search
                </Button>
                {error && <p>{error}</p>}

                {block && (
                    <>
                        <div className='blockchain-details'>

                            {loading ? (
                                <>
                                    <CircularProgress />

                                </>) :
                                (<><h2>Block Details</h2>
                                    <pre>{JSON.stringify(block, null, 2)}</pre></>)
                            }

                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handClose}
                        >   Close
                        </Button>
                    </>

                )}


            </div>
        </>
    );
};

export default SearchBlock;
