import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/home.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Blockchain from './blockChain';
import { Link } from 'react-router-dom';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

const Home = () => {
    const [name, setName] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const [key, setKey] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState('');
    const [invalid, setInvalid] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/blockchain', {
                name,
                equipmentType,
                key,
            });
            setMessage(response.data);

            setName('');
            setEquipmentType('');
            setKey('');

            handleValidate();
        } catch (error) {
            console.error('Error adding block:', error);
            setMessage('Error adding block');
        }
    };

    const handleValidate = async () => {
        setLoading(true);
        setIsValid('');
        try {
            const response = await axios.get('http://localhost:3000/validate');
            setTimeout(() => {
                setLoading(false);
                setIsValid("Valid")

            }, 3000);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                setInvalid('Error validating the chain');
                console.error('Error validating the chain:', error)
            }, 2000);
        }
    };

    return (
        <div className="home-container">

            <img src="https://cdn-icons-png.flaticon.com/512/12864/12864209.png" alt="Blockchain" className="app-logo" />
            <form onSubmit={handleSubmit} className="home-form">
                <TextField
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    type="text"
                    label="Equipment Type"
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                />
                <TextField
                    type="text"
                    label="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Add Block
                </Button>

            </form>
            <p>{message}</p>
            <div className="validation-container">

                {loading ? (
                    <CircularProgress />
                ) : (
                    <p className={isValid === 'Valid' ? 'valid' : 'invalid'}>
                        {isValid === 'Valid' ? (
                            <>
                                <CheckCircleIcon /> Chain validated successfully
                                {/**Add button for go to  /blockchain */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/blockchain"
                                    startIcon={<ViewInArIcon />}
                                >
                                    Blockchain
                                </Button>

                            </>
                        ) : (
                            <>
                                {invalid}
                            </>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
