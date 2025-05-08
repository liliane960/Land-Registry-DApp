// import React, { useState } from "react";
// import { getContract } from "../utils/contract";

// function ViewLand({ contractAddress }) {
//   const [landId, setLandId] = useState("");
//   const [landDetails, setLandDetails] = useState(null);
//   const [message, setMessage] = useState("");

//   const [ownerAddress, setOwnerAddress] = useState("");
//   const [ownerLands, setOwnerLands] = useState([]);

//   const fetchLandDetails = async () => {
//     try {
//       const contract = await getContract(contractAddress);
//       const details = await contract.getLandDetails(landId);

//       setLandDetails({
//         location: details[0],
//         size: details[1].toString(),
//         owner: details[2],
//         isRegistered: details[3],
//       });

//       setMessage("✅ Land details fetched successfully");
//     } catch (err) {
//       console.error(err);
//       const msg = err?.reason || err?.message || "Failed to fetch land details";
//       setMessage(`❌ ${msg}`);
//       setLandDetails(null);
//     }
//   };

//   const fetchLandsByOwner = () => {
//     const lands = JSON.parse(sessionStorage.getItem(ownerAddress)) || [];
//     if (lands.length === 0) {
//       setMessage("❌ No land found for this address in session");
//     } else {
//       setMessage("✅ Lands fetched from session");
//     }
//     setOwnerLands(lands);
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h3>🌍 View Land Details</h3>

//       <input
//         type="text"
//         placeholder="Enter Land ID"
//         value={landId}
//         onChange={(e) => setLandId(e.target.value)}
//         style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
//       />
//       <button onClick={fetchLandDetails} style={{ padding: "8px", margin: "10px" }}>
//         Fetch from Blockchain
//       </button>

//       <hr />

//       <h4>🔍 Search Registered Lands by Owner</h4>
//       <input
//         type="text"
//         placeholder="Enter Owner Address"
//         value={ownerAddress}
//         onChange={(e) => setOwnerAddress(e.target.value)}
//         style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
//       />
//       <button onClick={fetchLandsByOwner} style={{ padding: "8px", margin: "10px" }}>
//         Fetch from Session
//       </button>

//       {message && <p>{message}</p>}

//       {landDetails && (
//         <div>
//           <h4>Land Details (Blockchain)</h4>
//           <p><strong>Location:</strong> {landDetails.location}</p>
//           <p><strong>Size:</strong> {landDetails.size}</p>
//           <p><strong>Owner:</strong> {landDetails.owner}</p>
//           <p><strong>Registered:</strong> {landDetails.isRegistered ? "Yes" : "No"}</p>
//         </div>
//       )}

//       {ownerLands.length > 0 && (
//         <div>
//           <h4>Session Lands for {ownerAddress}</h4>
//           <ul>
//             {ownerLands.map((land, index) => (
//               <li key={index}>
//                 <strong>ID:</strong> {land.landId} | <strong>Location:</strong> {land.location} | <strong>Size:</strong> {land.size}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewLand;

 //view ikora ndimo kugenderaho

// import React, { useState } from "react";
// import { getContract } from "../utils/contract";

// function ViewLand({ contractAddress }) {
//   const [ownerAddress, setOwnerAddress] = useState("");
//   const [ownerLands, setOwnerLands] = useState([]);
//   const [message, setMessage] = useState("");

//   const fetchLandsByOwner = () => {
//     const lands = JSON.parse(sessionStorage.getItem(ownerAddress)) || [];
//     if (lands.length === 0) {
//       setMessage("❌ No land found for this address in session");
//     } else {
//       setMessage("✅ Registered Land information");
//     }
//     setOwnerLands(lands);
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h3>🔍 Search Registered Lands by Owner</h3>
//       <input
//         type="text"
//         placeholder="Enter Owner Address"
//         value={ownerAddress}
//         onChange={(e) => setOwnerAddress(e.target.value)}
//         style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
//       />
//       <button onClick={fetchLandsByOwner} style={{ padding: "8px", margin: "10px" }}>
//         Retrieve data
//       </button>

//       {message && <p>{message}</p>}

//       {ownerLands.length > 0 && (
//         <div>
//           <h4>Owner's address {ownerAddress}</h4>
//           <ul>
//             {ownerLands.map((land, index) => (
//               <li key={index}>
//                 <strong>ID:</strong> {land.landId} | <strong>Location:</strong> {land.location} | <strong>Size:</strong> {land.size}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewLand;



//test

import React, { useState, useEffect } from "react";

function ViewLand() {
  const [ownerAddress, setOwnerAddress] = useState("");
  const [ownerLands, setOwnerLands] = useState([]);
  const [message, setMessage] = useState("");
  const [allLands, setAllLands] = useState([]);

  // Load all lands when component mounts
  useEffect(() => {
    const landRegistry = JSON.parse(sessionStorage.getItem("landRegistry")) || [];
    setAllLands(landRegistry);
  }, []);

  const fetchLandsByOwner = () => {
    if (!ownerAddress) {
      setMessage("❌ Please enter an owner address");
      return;
    }

    try {
      const filteredLands = allLands.filter(
        land => land.owner.toLowerCase() === ownerAddress.toLowerCase()
      );

      if (filteredLands.length === 0) {
        setMessage(`❌ No lands found for address: ${ownerAddress}`);
      } else {
        setMessage(`✅ Found ${filteredLands.length} land(s)`);
      }
      setOwnerLands(filteredLands);
    } catch (error) {
      console.error("Error fetching lands:", error);
      setMessage("❌ Error loading land records");
    }
  };

  const showAllLands = () => {
    setMessage(`ℹ️ Showing all ${allLands.length} registered lands`);
    setOwnerLands(allLands);
    setOwnerAddress("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ color: "#2c3e50", marginBottom: "20px" }}>🔍 Land Records</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Owner Address"
          value={ownerAddress}
          onChange={(e) => setOwnerAddress(e.target.value)}
          style={{ 
            padding: "10px",
            marginRight: "10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <button 
          onClick={fetchLandsByOwner}
          style={{
            padding: "10px 15px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Search by Owner
        </button>
        <button 
          onClick={showAllLands}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Show All Lands
        </button>
      </div>

      {message && (
        <p style={{ 
          color: message.includes("❌") ? "red" : 
                message.includes("ℹ️") ? "blue" : "green",
          margin: "10px 0"
        }}>
          {message}
        </p>
      )}

      {ownerLands.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ color: "#34495e" }}>
            {ownerAddress ? `Lands for Owner: ${ownerAddress}` : "All Registered Lands"}
          </h4>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "15px"
          }}>
            {ownerLands.map((land, index) => (
              <div 
                key={index} 
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <h4 style={{ marginTop: 0, color: "#2980b9" }}>Land ID: {land.landId}</h4>
                <p><strong>Location:</strong> {land.location}</p>
                <p><strong>Size:</strong> {land.size}</p>
                <p>
                  <strong>Owner:</strong> {land.ownerName || "Unknown"} 
                  <br />
                  <small style={{ color: "#7f8c8d" }}>{land.owner}</small>
                </p>
                <p><strong>Registered:</strong> {land.timestamp}</p>
                {land.previousOwner && (
                  <p>
                    <strong>Previous Owner:</strong> {land.previousOwnerName || "Unknown"}
                    <br />
                    <small style={{ color: "#7f8c8d" }}>{land.previousOwner}</small>
                    {land.transferTimestamp && (
                      <span> on {land.transferTimestamp}</span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewLand;