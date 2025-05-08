
//retreive a transferred land history iyakoraga neza 
// File ikora neza ndimo kugenderaho

// import "./style.css";
// import React, { useState } from "react";
// import ViewLand from "./components/ViewLand";
// import Home from "./components/home";
// import { getContract } from "./utils/contract";

// function App() {
//   const [landId, setLandId] = useState("");
//   const [location, setLocation] = useState("");
//   const [size, setSize] = useState("");
//   const [owner, setOwner] = useState("");
//   const [newOwner, setNewOwner] = useState("");
//   const [message, setMessage] = useState("");
//   const [renounceMessage, setRenounceMessage] = useState("");
//   const [contractAddress] = useState("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
//   const [activeTab, setActiveTab] = useState("home");

//   const handleError = (error, fallbackMessage) => {
//     console.error(error);
//     const msg = error?.reason || error?.message || fallbackMessage;
//     if (msg.includes("caller is not the owner")) {
//       setMessage("❌ Action failed: Admin rights have been renounced.");
//     } else {
//       setMessage(`❌ ${msg}`);
//     }
//   };
  

//   const registerLand = async () => {
//     try {
//       const contract = await getContract(contractAddress);
//       const tx = await contract.registerLand(landId, location, size, owner);
//       await tx.wait();
//       setMessage("✅ Land registered successfully");

//       const newLand = { landId, location, size, owner };
//       const existingData = JSON.parse(sessionStorage.getItem(owner)) || [];
//       existingData.push(newLand);
//       sessionStorage.setItem(owner, JSON.stringify(existingData));
//     } catch (err) {
//       handleError(err, "Failed to register land");
//     }
//   };

//   const transferLandOwnership = async () => {
//     if (!landId || !newOwner) {
//       setMessage("❌ Please enter Land ID and new owner address.");
//       return;
//     }

//     try {
//       const contract = await getContract(contractAddress);
//       const tx = await contract.transferLandOwnership(landId, newOwner);
//       await tx.wait();
//       setMessage("✅ Ownership transferred successfully.");

//       const transferLog = {
//         landId,
//         newOwner,
//         timestamp: new Date().toLocaleString(),
//       };
//       const existingTransfers = JSON.parse(sessionStorage.getItem("transfers")) || [];
//       existingTransfers.push(transferLog);
//       sessionStorage.setItem("transfers", JSON.stringify(existingTransfers));

//       setLandId("");
//       setNewOwner("");
//     } catch (err) {
//       handleError(err, "Failed to transfer ownership.");
//     }
//   };

//   const renounceOwnership = async () => {
//     try {
//       const contract = await getContract(contractAddress);
//       const tx = await contract.renounceOwnership();
//       await tx.wait();
//       setRenounceMessage("✅ Ownership has been renounced successfully.");
//     } catch (err) {
//       console.error(err);
//       setRenounceMessage("❌ Failed to renounce ownership.");
//     }
//   };

//   const inputStyle = {
//     padding: "10px",
//     margin: "8px 0",
//     width: "100%",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   };

//   const buttonStyle = {
//     padding: "10px 15px",
//     marginTop: "10px",
//     borderRadius: "6px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif", maxWidth: "700px", margin: "auto" }}>
//       <h2 style={{ color: "#2c3e50", textAlign: "center", marginBottom: "20px" }}>
//          Land Registry DApp <br></br><br></br>
//       </h2>

//       <div style={{ marginBottom: "10px", textAlign: "center", marginTop: "-20px" }}>
//         <button onClick={() => { setActiveTab("home"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
//           Home
//         </button>
//         <button onClick={() => { setActiveTab("register"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
//           Register Land
//         </button>
//         <button onClick={() => { setActiveTab("view"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
//           View Land
//         </button>
//         <button onClick={() => { setActiveTab("transfer"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
//           Transfer Ownership
//         </button>
//         <button onClick={() => { setActiveTab("transfers"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
//           View Transfers
//         </button>
//         <button onClick={() => { setActiveTab("renounce"); setRenounceMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}>
//           Renounce Ownership
//         </button>
//       </div>

//       {activeTab === "home" && <Home />}

//       {activeTab === "register" && (
//         <div>
//           <h3>Register New Land</h3>
//           <input placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} style={inputStyle} />
//           <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} />
//           <input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle} />
//           <input placeholder="Owner Address" value={owner} onChange={(e) => setOwner(e.target.value)} style={inputStyle} />
//           <button onClick={registerLand} style={{ ...buttonStyle, backgroundColor: "#2980b9", color: "white" }}>
//             Register Land
//           </button>
//         </div>
//       )}

//       {activeTab === "view" && (
//         <div>
//           <ViewLand contractAddress={contractAddress} />
//         </div>
//       )}

//       {activeTab === "transfer" && (
//         <div>
//           <h3>Transfer Land Ownership</h3>
//           <input placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} style={inputStyle} />
//           <input placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} style={inputStyle} />
//           <button onClick={transferLandOwnership} style={{ ...buttonStyle, backgroundColor: "#e67e22", color: "white" }}>
//             Transfer Ownership
//           </button>
//         </div>
//       )}

//       {activeTab === "transfers" && (
//         <div>
//           <h3>Transferred Ownership Logs</h3>
//           <ul style={{ paddingLeft: "20px" }}>
//             {(JSON.parse(sessionStorage.getItem("transfers")) || []).map((tx, index) => (
//               <li key={index} style={{ marginBottom: "10px" }}>
//                 <strong>Land ID:</strong> {tx.landId}<br />
//                 <strong>New Owner:</strong> {tx.newOwner}<br />
//                 <strong>Time:</strong> {tx.timestamp}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {activeTab === "renounce" && (
//         <div>
//           <h3>Renounce Contract Ownership</h3>
//           <button
//             onClick={renounceOwnership}
//             style={{ ...buttonStyle, backgroundColor: "#e74c3c", color: "white", width: "100%" }}
//           >
//             Renounce Ownership
//           </button>
//           {renounceMessage && (
//             <p style={{ marginTop: "10px", color: renounceMessage.includes("✅") ? "green" : "red" }}>
//               {renounceMessage}
//             </p>
//           )}
//         </div>
//       )}

//       {message && activeTab !== "renounce" && (
//         <p style={{ marginTop: "20px", color: message.includes("✅") ? "green" : "red" }}>{message}</p>
//       )}
//     </div>
//   );
// }

// export default App;

//gerageza auto increment and now it is working

import "./style.css";
import React, { useState } from "react";
import ViewLand from "./components/ViewLand";
import Home from "./components/home";
import { getContract } from "./utils/contract";

function App() {
  const [landId, setLandId] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [message, setMessage] = useState("");
  const [renounceMessage, setRenounceMessage] = useState("");
  const [contractAddress] = useState("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  const [activeTab, setActiveTab] = useState("home");
  const [registeredLandIds, setRegisteredLandIds] = useState([]);

  const handleError = (error, fallbackMessage) => {
    console.error(error);
    const msg = error?.reason || error?.message || fallbackMessage;
    if (msg.includes("caller is not the owner")) {
      setMessage("❌ Action failed: Admin rights have been renounced.");
    } else {
      setMessage(`❌ ${msg}`);
    }
  };

  const registerLand = async () => {
    try {
      // Check if Land ID already exists
      if (registeredLandIds.includes(landId)) {
        setMessage("❌ This Land ID is already registered");
        return;
      }

      if (!landId || !location || !size || !owner || !ownerName) {
        setMessage("❌ Please fill all fields");
        return;
      }

      const contract = await getContract(contractAddress);
      const tx = await contract.registerLand(landId, location, size, owner);
      await tx.wait();
      setMessage("✅ Land registered successfully");

      const newLand = { 
        landId, 
        location, 
        size, 
        owner, 
        ownerName,
        timestamp: new Date().toLocaleString() 
      };
      
      // Update registered land IDs
      setRegisteredLandIds([...registeredLandIds, landId]);
      
      // Save to sessionStorage
      const existingData = JSON.parse(sessionStorage.getItem("landRegistry")) || [];
      existingData.push(newLand);
      sessionStorage.setItem("landRegistry", JSON.stringify(existingData));
      
      // Clear form
      setLandId("");
      setLocation("");
      setSize("");
      setOwner("");
      setOwnerName("");
    } catch (err) {
      handleError(err, "Failed to register land");
    }
  };

  const transferLandOwnership = async () => {
    if (!landId || !newOwner || !newOwnerName) {
      setMessage("❌ Please enter Land ID, new owner address, and new owner name.");
      return;
    }

    try {
      const contract = await getContract(contractAddress);
      const tx = await contract.transferLandOwnership(landId, newOwner);
      await tx.wait();
      setMessage("✅ Ownership transferred successfully.");

      // Update the owner name in the land registry
      const landRegistry = JSON.parse(sessionStorage.getItem("landRegistry")) || [];
      const updatedRegistry = landRegistry.map(land => {
        if (land.landId === landId) {
          return { 
            ...land, 
            owner: newOwner,
            ownerName: newOwnerName,
            previousOwner: land.owner,
            previousOwnerName: land.ownerName,
            transferTimestamp: new Date().toLocaleString()
          };
        }
        return land;
      });
      sessionStorage.setItem("landRegistry", JSON.stringify(updatedRegistry));

      // Add to transfers log
      const transferLog = {
        landId,
        newOwner,
        newOwnerName,
        previousOwner: owner,
        previousOwnerName: ownerName,
        timestamp: new Date().toLocaleString(),
      };
      const existingTransfers = JSON.parse(sessionStorage.getItem("transfers")) || [];
      existingTransfers.push(transferLog);
      sessionStorage.setItem("transfers", JSON.stringify(existingTransfers));

      // Clear form
      setLandId("");
      setNewOwner("");
      setNewOwnerName("");
    } catch (err) {
      handleError(err, "Failed to transfer ownership.");
    }
  };

  const renounceOwnership = async () => {
    try {
      const contract = await getContract(contractAddress);
      const tx = await contract.renounceOwnership();
      await tx.wait();
      setRenounceMessage("✅ Ownership has been renounced successfully.");
    } catch (err) {
      console.error(err);
      setRenounceMessage("❌ Failed to renounce ownership.");
    }
  };

  const inputStyle = {
    padding: "10px",
    margin: "8px 0",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  // Load registered land IDs on component mount
  React.useEffect(() => {
    const landRegistry = JSON.parse(sessionStorage.getItem("landRegistry")) || [];
    const ids = landRegistry.map(land => land.landId);
    setRegisteredLandIds(ids);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ color: "#2c3e50", textAlign: "center", marginBottom: "20px" }}>
         Land Registry DApp <br></br><br></br>
      </h2>

      <div style={{ marginBottom: "10px", textAlign: "center", marginTop: "-20px" }}>
        <button onClick={() => { setActiveTab("home"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
          Home
        </button>
        <button onClick={() => { setActiveTab("register"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
          Register Land
        </button>
        <button onClick={() => { setActiveTab("view"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
          View Land
        </button>
        <button onClick={() => { setActiveTab("transfer"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
          Transfer Ownership
        </button>
        <button onClick={() => { setActiveTab("transfers"); setMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white", marginRight: "10px" }}>
          View Transfers
        </button>
        <button onClick={() => { setActiveTab("renounce"); setRenounceMessage(""); }} style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}>
          Renounce Ownership
        </button>
      </div>

      {activeTab === "home" && <Home />}

      {activeTab === "register" && (
        <div>
          <h3>Register New Land</h3>
          <input placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} style={inputStyle} />
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} />
          <input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle} />
          <input placeholder="Owner Address" value={owner} onChange={(e) => setOwner(e.target.value)} style={inputStyle} />
          <input placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} style={inputStyle} />
          <button onClick={registerLand} style={{ ...buttonStyle, backgroundColor: "#2980b9", color: "white" }}>
            Register Land
          </button>
        </div>
      )}

      {activeTab === "view" && (
        <div>
          <ViewLand contractAddress={contractAddress} />
        </div>
      )}

      {activeTab === "transfer" && (
        <div>
          <h3>Transfer Land Ownership</h3>
          <input placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} style={inputStyle} />
          <input placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} style={inputStyle} />
          <input placeholder="New Owner Name" value={newOwnerName} onChange={(e) => setNewOwnerName(e.target.value)} style={inputStyle} />
          <button onClick={transferLandOwnership} style={{ ...buttonStyle, backgroundColor: "#e67e22", color: "white" }}>
            Transfer Ownership
          </button>
        </div>
      )}

      {activeTab === "transfers" && (
        <div>
          <h3>Transferred Ownership Logs</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {(JSON.parse(sessionStorage.getItem("transfers")) || []).map((tx, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Land ID:</strong> {tx.landId}<br />
                <strong>Previous Owner:</strong> {tx.previousOwnerName} ({tx.previousOwner})<br />
                <strong>New Owner:</strong> {tx.newOwnerName} ({tx.newOwner})<br />
                <strong>Time:</strong> {tx.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "renounce" && (
        <div>
          <h3>Renounce Contract Ownership</h3>
          <button
            onClick={renounceOwnership}
            style={{ ...buttonStyle, backgroundColor: "#e74c3c", color: "white", width: "100%" }}
          >
            Renounce Ownership
          </button>
          {renounceMessage && (
            <p style={{ marginTop: "10px", color: renounceMessage.includes("✅") ? "green" : "red" }}>
              {renounceMessage}
            </p>
          )}
        </div>
      )}

      {message && activeTab !== "renounce" && (
        <p style={{ marginTop: "20px", color: message.includes("✅") ? "green" : "red" }}>{message}</p>
      )}
    </div>
  );
}

export default App;


// trying connection to metamask

// import "./style.css";
// import React, { useState, useEffect } from "react";
// import ViewLand from "./components/ViewLand";
// import Home from "./components/home";
// import { getContract } from "./utils/contract";

// function App() {
//   const [landId, setLandId] = useState("");
//   const [location, setLocation] = useState("");
//   const [size, setSize] = useState("");
//   const [owner, setOwner] = useState("");
//   const [ownerName, setOwnerName] = useState("");
//   const [newOwner, setNewOwner] = useState("");
//   const [newOwnerName, setNewOwnerName] = useState("");
//   const [message, setMessage] = useState("");
//   const [renounceMessage, setRenounceMessage] = useState("");
//   const [contractAddress] = useState("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
//   const [activeTab, setActiveTab] = useState("home");
//   const [registeredLandIds, setRegisteredLandIds] = useState([]);
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Check if user is connected and is admin
//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         if (window.ethereum) {
//           const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//           if (accounts.length > 0) {
//             setCurrentAccount(accounts[0]);
//             await verifyAdmin(accounts[0]);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkConnection();

//     // Listen for account changes
//     if (window.ethereum) {
//       window.ethereum.on('accountsChanged', (accounts) => {
//         if (accounts.length > 0) {
//           setCurrentAccount(accounts[0]);
//           verifyAdmin(accounts[0]);
//         } else {
//           setCurrentAccount("");
//           setIsAdmin(false);
//         }
//       });
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', () => {});
//       }
//     };
//   }, []);

//   const verifyAdmin = async (account) => {
//     try {
//       const contract = await getContract(contractAddress);
//       const contractOwner = await contract.owner();
//       setIsAdmin(contractOwner.toLowerCase() === account.toLowerCase());
//     } catch (error) {
//       console.error("Error verifying admin:", error);
//       setIsAdmin(false);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         setMessage("❌ MetaMask is not installed");
//         return;
//       }

//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       setCurrentAccount(accounts[0]);
//       await verifyAdmin(accounts[0]);
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//       setMessage(`❌ ${error.message}`);
//     }
//   };

//   const handleError = (error, fallbackMessage) => {
//     console.error(error);
//     const msg = error?.reason || error?.message || fallbackMessage;
//     if (msg.includes("caller is not the owner")) {
//       setMessage("❌ Action failed: Admin rights have been renounced.");
//     } else {
//       setMessage(`❌ ${msg}`);
//     }
//   };

//   const registerLand = async () => {
//     if (!isAdmin) {
//       setMessage("❌ Only admin can register land");
//       return;
//     }
//     // ... rest of registerLand function remains the same ...
//   };

//   // ... (keep all other functions the same as before)

//   const inputStyle = {
//     padding: "10px",
//     margin: "8px 0",
//     width: "100%",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   };

//   const buttonStyle = {
//     padding: "10px 15px",
//     marginTop: "10px",
//     borderRadius: "6px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   if (loading) {
//     return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
//   }

//   if (!currentAccount) {
//     return (
//       <div style={{ 
//         padding: "2rem", 
//         textAlign: "center",
//         maxWidth: "500px",
//         margin: "0 auto"
//       }}>
//         <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
//           Land Registry DApp
//         </h2>
//         <p style={{ marginBottom: "30px" }}>
//           Please connect your MetaMask wallet to access the land registry system.
//         </p>
//         <button 
//           onClick={connectWallet}
//           style={{
//             ...buttonStyle,
//             backgroundColor: "#f6851b",
//             color: "white",
//             fontSize: "18px",
//             padding: "15px 30px"
//           }}
//         >
//           Connect MetaMask
//         </button>
//         {message && (
//           <p style={{ marginTop: "20px", color: "red" }}>{message}</p>
//         )}
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div style={{ 
//         padding: "2rem", 
//         textAlign: "center",
//         maxWidth: "500px",
//         margin: "0 auto"
//       }}>
//         <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
//           Land Registry DApp
//         </h2>
//         <p style={{ marginBottom: "30px" }}>
//           Connected account: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
//         </p>
//         <p style={{ color: "red", marginBottom: "30px" }}>
//           ❌ You are not authorized to access this system. Only the admin can use this DApp.
//         </p>
//         <button 
//           onClick={connectWallet}
//           style={{
//             ...buttonStyle,
//             backgroundColor: "#f6851b",
//             color: "white",
//             fontSize: "18px",
//             padding: "15px 30px"
//           }}
//         >
//           Try Different Account
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif", maxWidth: "700px", margin: "auto" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//         <h2 style={{ color: "#2c3e50" }}>
//           Land Registry DApp
//         </h2>
//         <div style={{ 
//           backgroundColor: "#f0f0f0",
//           padding: "8px 12px",
//           borderRadius: "20px",
//           fontSize: "14px"
//         }}>
//           Admin: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
//         </div>
//       </div>

//       {/* Rest of your existing component JSX remains the same */}
//       {/* ... */}
//     </div>
//   );
// }

// export default App;