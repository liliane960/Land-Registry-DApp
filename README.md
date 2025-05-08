## Blockchain-technology Land Ownership Registry System
 Features
•	Register Land — Only the contract owner (admin) can register land.
•	 View Land Records — Anyone can query and view land details by ID.
•	 Transfer Ownership — Current owners can transfer land to another address.
•	 Renounce Admin Ownership — Admin can renounce their role, disabling further registrations.
 ## Tech Stack
•	Smart Contract: Solidity, Hardhat
•	Frontend: React, Ethers.js
•	Wallet Integration: MetaMask
•	Styling: Custom CSS
## Installation & Setup
•	1. Clone the repository
•	git clone https://github.com/your-username/land-registry-dapp.git
•	cd land-registry-dapp
•	
•	2. Install dependencies
## For smart contract environment
•	npm install --save-dev hardhat
•	
# For frontend (in frontend/ directory)
•	cd frontend
•	npm install
•	
## Compile and deploy the smart contract
•	npx hardhat compile
•	npx hardhat node
    npx hardhat run scripts/deploy.js --network localhost
•	
# Run the React frontend
•	cd frontend
•	npm start
 # Security
•	Only contract owner can register land.
•	Transfers allowed only by current owner.
•	Transparent history on blockchain.
# Developed by
Liliane Ishimwe
Blockchain Technology 
