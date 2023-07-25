/**
 * On backend project, find ABI at: "artifacts/contracts/*.sol/*.json", and inside the abi section
 */
export const fundMe_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const fundMe_abi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "priceFeedAddress",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "FundMe__NotEnoughETH",
		type: "error",
	},
	{
		inputs: [],
		name: "FundMe__NotOwner",
		type: "error",
	},
	{
		inputs: [],
		name: "FundMe__WithdrawFailed",
		type: "error",
	},
	{
		stateMutability: "payable",
		type: "fallback",
	},
	{
		inputs: [],
		name: "MIN_USD",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "fund",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "funder_address",
				type: "address",
			},
		],
		name: "getAddressToAmountFunded",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "getFunders",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getOwner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPriceFeed",
		outputs: [
			{
				internalType: "contract AggregatorV3Interface",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "withdraw",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
	},
];