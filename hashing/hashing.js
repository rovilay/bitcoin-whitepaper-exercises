"use strict";

var crypto = require("crypto");
const { type } = require("os");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}


console.log(Blockchain)

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(JSON.stringify(bl)).digest("hex");
}



function createBlock(data) {
	const prevBlock = Blockchain.blocks[Blockchain.blocks.length-1];
	const block = {
		index: prevBlock.index+1,
		prevHash: prevBlock.hash,
		data: data,
		timestamp: Date.now(),
	};

	block.hash = blockHash(block)

	Blockchain.blocks.push(block);
}

function verifyChain(Blockchain) {
	for (let i = Blockchain.blocks.length - 1; i >= 0; i-=1) {
		if (!verifyBlock(Blockchain.blocks[i])) return false;
	}

	return true;
}

function verifyBlock(blk) {
	if (typeof(blk) != 'object' || blk.index < 0) return false;

	if (blk.index > 0 && (!blk.prevHash  || !blk.data)) return false;

	if (blk.index === 0 && blk.hash !== "000000") return false;

	if (blk.index === 0) return true;

	const blkHash = blk.hash;
	delete blk.hash;

	if (blockHash(blk) !== blkHash) return false;

	blk.hash = blkHash;

	return true;
}
