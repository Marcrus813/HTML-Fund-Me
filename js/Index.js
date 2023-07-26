// Import lib
import { ethers } from "../lib/ethers-5.1.esm.min.js";
import { fundMe_abi, fundMe_address } from "./constants.js";

const metaMaskCheck = typeof window.ethereum !== "undefined";

// In html change from `text/javascript` to `module`, so we need to do this, event bind
const btn_connect = document.getElementById("btn_connect");
const btn_fund = document.getElementById("btn_fund");
const btn_balance = document.getElementById("btn_balance");
const btn_withdraw = document.getElementById("btn_withdraw");
btn_connect.onclick = connect;
btn_fund.onclick = fund;
btn_balance.onclick = getBalance;
btn_withdraw.onclick = withdraw;

async function connect() {
	// Check MetaMask exist

	if (metaMaskCheck) {
		try {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			document.getElementById("btn_connect").innerHTML = "Connected";
		} catch (error) {
			console.log(error);
		}
	} else {
		document.getElementById("btn_connect").innerHTML =
			"Please install MetaMask";
	}
}

// Calling `fund`
async function fund() {
	const ethAmount = document.getElementById("ethAmount").value;
	if (metaMaskCheck) {
		/**
		 * What do we need?
		 *      Provider / connection to the blockchain
		 *      Signer / wallet / someone with gas
		 *      Contract
		 *          ABI
		 *          Address
		 */
		// Provider
		// Copy ethers lib to our own dir `*.min.js`

		const provider = new ethers.providers.Web3Provider(window.ethereum); // `Web3Provider` is similar to JsonRpcProvider
		// `provider` connected to wallet
		const signer = provider.getSigner();

		/**
		 * How to get contract
		 * 		Need address and ABI, but typically once deployed, the address changes(?), but still something constant
		 * 		constants.js
		 */

		// ABI fetched from backend project artifact, and declared in `constants.js` and imported in here
		// Address: Backend is run on localhost, run a terminal in backend project with `yarn hardhat node`, and also declare in `constants` and import here

		// And before actual action, need to connect to localhost node through MetaMask first
		const fundMe_contract = new ethers.Contract(
			fundMe_address,
			fundMe_abi,
			signer
		);

		try {
			const txnResponse = await fundMe_contract.fund({
				value: ethers.utils.parseEther(ethAmount),
			});

			// Listen for txn to be mined
			// Listen for event(From contract)
			await listenForTxnMine(txnResponse, provider);
			console.log("Done");
		} catch (error) {
			console.log(error);
		}
	}
}

async function getBalance() {
	if (metaMaskCheck) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const balance = await provider.getBalance(fundMe_address);
		console.log(ethers.utils.formatEther(balance));
	}
}

// Not `async`, but use `promise`
function listenForTxnMine(txnResponse, provider) {
	console.log(`Mining ${txnResponse.hash}...`);
	// Create a listener for the blockchain, and tells front end to wait for this to finish

	// If this promise works correctly, call `resolve`, otherwise `reject`(Error or timeout[For learning no need, but for production in the future, defo])
	return new Promise((resolve, reject) => {
		provider.once(
			// Run on its own process, so `listenForTxnMine` finishes before this call finishes, it runs `console.log("Done")` from above first, then comes back and check(Event loop), so to avoid this, we use promise
			txnResponse.hash, //Once `provider` see this happens, trigger the function
			(txnReceipt) => {
				console.log(
					`Completed with ${txnReceipt.confirmations} confirmations`
				);
				resolve(); // A promise is only returned once a `resolve` or a `reject` is called
			}
		);
	});
}

async function withdraw() {
	if (metaMaskCheck) {
		console.log("Withdrawing...");
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		const signer = provider.getSigner();
		const fundMe_contract = new ethers.Contract(
			fundMe_address,
			fundMe_abi,
			signer
		);

		try {
			const txnResponse = await fundMe_contract.withdraw();
			await listenForTxnMine(txnResponse, provider);
		} catch (error) {
			console.log(error);
		}
	}
}
