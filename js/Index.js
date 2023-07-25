// Import lib
import { ethers } from "../lib/ethers-5.1.esm.min.js";
import { fundMe_abi, fundMe_address } from "./constants.js";

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
				value: ethers.utils.parseEther("0.5"),
			});
		} catch (error) {
			console.log(error);
		}

		
	}
}
