const ABI = [{
	"inputs": [{ "internalType": "address", "name": "initialOwner", "type": "address" }],
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, {
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}, { "internalType": "address", "name": "owner", "type": "address" }],
	"name": "ERC721IncorrectOwner",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, {
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}], "name": "ERC721InsufficientApproval", "type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "approver", "type": "address" }],
	"name": "ERC721InvalidApprover",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "operator", "type": "address" }],
	"name": "ERC721InvalidOperator",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
	"name": "ERC721InvalidOwner",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }],
	"name": "ERC721InvalidReceiver",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "sender", "type": "address" }],
	"name": "ERC721InvalidSender",
	"type": "error"
}, {
	"inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "ERC721NonexistentToken",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
	"name": "OwnableInvalidOwner",
	"type": "error"
}, {
	"inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
	"name": "OwnableUnauthorizedAccount",
	"type": "error"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
		"indexed": true,
		"internalType": "address",
		"name": "approved",
		"type": "address"
	}, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "Approval",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
		"indexed": true,
		"internalType": "address",
		"name": "operator",
		"type": "address"
	}, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }],
	"name": "ApprovalForAll",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "_fromTokenId",
		"type": "uint256"
	}, { "indexed": false, "internalType": "uint256", "name": "_toTokenId", "type": "uint256" }],
	"name": "BatchMetadataUpdate",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, {
		"indexed": false,
		"internalType": "string",
		"name": "name",
		"type": "string"
	}, { "indexed": false, "internalType": "string", "name": "description", "type": "string" }, {
		"indexed": false,
		"internalType": "string",
		"name": "image",
		"type": "string"
	}, {
		"components": [{ "internalType": "string", "name": "traitType", "type": "string" }, {
			"internalType": "string",
			"name": "value",
			"type": "string"
		}], "indexed": false, "internalType": "struct MonsterNFT.Trait[]", "name": "attributes", "type": "tuple[]"
	}],
	"name": "MetadataSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": false, "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
	"name": "MetadataUpdate",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, {
		"indexed": false,
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, {
		"indexed": false,
		"internalType": "string",
		"name": "description",
		"type": "string"
	}, {
		"indexed": false,
		"internalType": "string",
		"name": "image",
		"type": "string"
	}, {
		"components": [{ "internalType": "string", "name": "traitType", "type": "string" }, {
			"internalType": "string",
			"name": "value",
			"type": "string"
		}], "indexed": false, "internalType": "struct MonsterNFT.Trait[]", "name": "attributes", "type": "tuple[]"
	}],
	"name": "NFTMinted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "NFTTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, {
		"indexed": false,
		"internalType": "string",
		"name": "description",
		"type": "string"
	}, {
		"indexed": false,
		"internalType": "string",
		"name": "image",
		"type": "string"
	}, {
		"components": [{ "internalType": "string", "name": "traitType", "type": "string" }, {
			"internalType": "string",
			"name": "value",
			"type": "string"
		}], "indexed": false, "internalType": "struct MonsterNFT.Trait[]", "name": "attributes", "type": "tuple[]"
	}],
	"name": "NFTUpdated",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "Transfer",
	"type": "event"
}, {
	"inputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }],
	"name": "addAdmin",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "to", "type": "address" }, {
		"internalType": "uint256",
		"name": "tokenId",
		"type": "uint256"
	}], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
	"name": "balanceOf",
	"outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "getAllTokenMetadata",
	"outputs": [{
		"components": [{
			"internalType": "string",
			"name": "name",
			"type": "string"
		}, { "internalType": "string", "name": "description", "type": "string" }, {
			"internalType": "string",
			"name": "image",
			"type": "string"
		}, {
			"components": [{
				"internalType": "string",
				"name": "traitType",
				"type": "string"
			}, { "internalType": "string", "name": "value", "type": "string" }],
			"internalType": "struct MonsterNFT.Trait[]",
			"name": "attributes",
			"type": "tuple[]"
		}, { "internalType": "uint256", "name": "numberOfMonsterTokens", "type": "uint256" }],
		"internalType": "struct MonsterNFT.NftMetadata[]",
		"name": "",
		"type": "tuple[]"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "getApproved",
	"outputs": [{ "internalType": "address", "name": "", "type": "address" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
	"name": "getTokenAttributesCount",
	"outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
	"name": "getTokenMetadata",
	"outputs": [{
		"components": [{
			"internalType": "string",
			"name": "name",
			"type": "string"
		}, { "internalType": "string", "name": "description", "type": "string" }, {
			"internalType": "string",
			"name": "image",
			"type": "string"
		}, {
			"components": [{
				"internalType": "string",
				"name": "traitType",
				"type": "string"
			}, { "internalType": "string", "name": "value", "type": "string" }],
			"internalType": "struct MonsterNFT.Trait[]",
			"name": "attributes",
			"type": "tuple[]"
		}, { "internalType": "uint256", "name": "numberOfMonsterTokens", "type": "uint256" }],
		"internalType": "struct MonsterNFT.NftMetadata",
		"name": "",
		"type": "tuple"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "getTraitType",
	"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "getTraitValue",
	"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
	"name": "getUserNFTs",
	"outputs": [{
		"components": [{
			"internalType": "string",
			"name": "name",
			"type": "string"
		}, { "internalType": "string", "name": "description", "type": "string" }, {
			"internalType": "string",
			"name": "image",
			"type": "string"
		}, {
			"components": [{
				"internalType": "string",
				"name": "traitType",
				"type": "string"
			}, { "internalType": "string", "name": "value", "type": "string" }],
			"internalType": "struct MonsterNFT.Trait[]",
			"name": "attributes",
			"type": "tuple[]"
		}, { "internalType": "uint256", "name": "numberOfMonsterTokens", "type": "uint256" }],
		"internalType": "struct MonsterNFT.NftMetadata[]",
		"name": "",
		"type": "tuple[]"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
	"name": "isAdmin",
	"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, {
		"internalType": "address",
		"name": "operator",
		"type": "address"
	}],
	"name": "isApprovedForAll",
	"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "string", "name": "_monsterName", "type": "string" }, {
		"internalType": "string",
		"name": "_monsterDescription",
		"type": "string"
	}, {
		"internalType": "string",
		"name": "_monsterURI",
		"type": "string"
	}, {
		"components": [{ "internalType": "string", "name": "traitType", "type": "string" }, {
			"internalType": "string",
			"name": "value",
			"type": "string"
		}], "internalType": "struct MonsterNFT.Trait[]", "name": "_monsterAttributes", "type": "tuple[]"
	}], "name": "mintNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
	"inputs": [],
	"name": "name",
	"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "owner",
	"outputs": [{ "internalType": "address", "name": "", "type": "address" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "ownerOf",
	"outputs": [{ "internalType": "address", "name": "", "type": "address" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "adminToRemove", "type": "address" }],
	"name": "removeAdmin",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, {
		"internalType": "bytes",
		"name": "data",
		"type": "bytes"
	}], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, {
		"internalType": "bool",
		"name": "approved",
		"type": "bool"
	}], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
	"inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }],
	"name": "supportsInterface",
	"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "symbol",
	"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
	"name": "tokenURI",
	"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
	"name": "transferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{ "internalType": "address payable", "name": "_buyer", "type": "address" }, {
		"internalType": "uint256",
		"name": "_tokenId",
		"type": "uint256"
	}], "name": "transferNFTWithEther", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
	"inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
	"name": "transferOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, {
		"internalType": "string",
		"name": "_monsterName",
		"type": "string"
	}, { "internalType": "string", "name": "_monsterDescription", "type": "string" }, {
		"internalType": "string",
		"name": "_monsterURI",
		"type": "string"
	}, {
		"components": [{ "internalType": "string", "name": "traitType", "type": "string" }, {
			"internalType": "string",
			"name": "value",
			"type": "string"
		}], "internalType": "struct MonsterNFT.Trait[]", "name": "_monsterAttributes", "type": "tuple[]"
	}], "name": "updateTokenMetadata", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}];

export default ABI;