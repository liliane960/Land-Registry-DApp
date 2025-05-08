import { ethers } from "ethers";
import LandRegistry from "../contracts/LandRegistry.json";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Your deployed contract
const abi = LandRegistry.abi;

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
};
