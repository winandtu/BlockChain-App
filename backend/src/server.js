const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const BlockChain = require('./blockChain.jsx');
const Block = require('./block.jsx');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const myChain = new BlockChain();

app.get('/blockchain', (req, res) => {
    res.send(myChain);
});

app.post('/blockchain', (req, res) => {
    const {name, teamType, key} = req.body;
    const newBlock = new Block(myChain.chain.length, new Date().toISOString(), {name, teamType, key});
    myChain.addBlock(newBlock);
    res.send("Block added to the chain");
});

app.get('/validate', (req, res) => {
    res.send(myChain.isValid() ? "The chain is valid" : "The chain is not valid");
});

//search for a block by its key
app.get('/blockchain/:key', (req, res) => {
    const {key} = req.params;
    console.log('key: ', typeof key);
    
    const block = myChain.chain.filter(block => block.data.key === key);
    console.log('block: ', block);
    if (block.length > 0){
        res.send(block);
    } else {
        res.status(404).send("Block not found");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

