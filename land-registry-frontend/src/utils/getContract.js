import { ethers } from "ethers";

// Example ABI (replace this with the actual ABI you have)
const ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_landId", "type": "uint256" }
    ],
    "name": "getLandDetails",
    "outputs": [
      { "internalType": "string", "name": "location", "type": "string" },
      { "internalType": "uint256", "name": "size", "type": "uint256" },
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "bool", "name": "isRegistered", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Add more ABI elements as necessary
];

export const getContract = async (contractAddress) => {
  // Make sure the provider is set up correctly (you can use a default provider or connect to a network like Infura or Alchemy)
  const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Adjust the provider URL as needed

  // Initialize the contract with the ABI and the deployed address
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  
  return contract;
};
