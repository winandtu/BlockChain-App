const Block = require('./block.jsx');
fs = require('fs');
class BlockChain{
    //constructor
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.loadChain();
    }

    //create the first block
    createGenesisBlock(){
        return new Block(0, "05/05/2024", "Genesis Block", "0");
    }

    //get the latest block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //add a new block

    addBlock(newBlock){
        newBlock.previousBlockHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHashBlock();
        this.chain.push(newBlock);
        this.saveChain();
    }

    //check if the chain is valid

    isValid(){
        //console.log('this.chain: ', this.chain);
        for (let i = 1; i < this.chain.length; i++){ //start from 1 because the first block is the genesis block
            const currentBlock = this.chain[i]; 
            console.log('currentBlock: ', currentBlock);
            const previousBlock = this.chain[i - 1];
            console.log('previousBlock: ', previousBlock);

           /* if (currentBlock.hash !== currentBlock.calculateHashBlock()){ // the hash of the block is not the same as the calculated hash
                return false;
            }*/
            
           /* if(currentBlock.hash !== currentBlock.calculateHashBlock()){
                console.log('currentBlock.hash: ', currentBlock.hash);
                
                return false;
            }*/

            if (currentBlock.previousBlockHash !== previousBlock.hash){
                console.log('currentBlock.previousBlockHash: ', currentBlock.previousBlockHash); 
                return false;
            }
        }

        return true;
    }

    //save the chain to a file
    saveChain(){
        fs.writeFile('Blockchain.json', JSON.stringify(this.chain, null, 2), (err) => {
            if (err){
                console.error('Error saving the chain:', err);
            }
        });
    }

    //load the chain from a file
    loadChain(){

        if (!fs.existsSync('Blockchain.json')){
            return;
        }
        fs.readFile('Blockchain.json', 'utf8', (err, data) => {
            if (err){
                console.error('Error loading the chain:', err);
                return;
            }
            this.chain = JSON.parse(data);
        });
    }
}


module.exports = BlockChain;
