// Import lib
import { ethers } from "../lib/ethers-5.1.esm.min.js";

const metaMaskCheck = typeof window.ethereum !== "undefined";

// In html change from `text/javascript` to `module`, so we need to do this, event bind
const btn_connect = document.getElementById("btn_connect");
const btn_fund = document.getElementById("btn_fund");
btn_connect.onclick = connect;
btn_fund.onclick = fund;

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
async function fund(ethAmount) {
	console.log(`Funding with ${ethAmount}`);
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
		
	}
}
