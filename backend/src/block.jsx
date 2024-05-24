const SHA256 = require('crypto-js/sha256');

class Block{
    // constructor
    constructor(height,timestamp,data, previousBlockHash=''){
        this.height = height,
        this.timestamp = timestamp,
        this.data = data,
        this.previousBlockHash = previousBlockHash,
        this.hash = this.calculateHashBlock()
    }

    // calculateHashBlock
    calculateHashBlock(){
        const self = this;
        return SHA256(self.height + self.timestamp + JSON.stringify(self.data) + self.previousBlockHash).toString();
    }
}

module.exports = Block;