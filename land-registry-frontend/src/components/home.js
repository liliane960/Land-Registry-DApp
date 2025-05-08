// import React from "react";

// const Home = () => {
//   return (
//     <div className="home">
//       <header style={{ padding: "20px", backgroundColor: "#282c34", color: "white" }}>
//         <h1>Blockchain Land Registry</h1>
//       </header>

//       <section style={{ padding: "40px", textAlign: "center" }}>
//         <h2>Welcome to the Future of Land Ownership</h2>
//         <p>
//           Our blockchain-powered platform ensures secure, transparent, and tamper-proof
//           land ownership records.
//         </p>
//       </section>

//       <section style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
//         <div>
//           <h3>Register Land</h3>
//           <p>Upload land details securely to the blockchain.</p>
//         </div>
//         <div>
//           <h3>View Land</h3>
//           <p>Verify ownership and land info instantly.</p>
//         </div>
//         <div>
//           <h3>Transfer Ownership</h3>
//           <p>Safely transfer land to another party on-chain.</p>
//         </div>
//       </section>

//       <section style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
//         <h3>How It Works</h3>
//         <ol>
//           <li>Connect your wallet.</li>
//           <li>Register land with required metadata.</li>
//           <li>View and verify land records anytime.</li>
//           <li>Initiate ownership transfers securely.</li>
//         </ol>
//       </section>

//       <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#eee" }}>
//         <p>&copy; 2025 Blockchain Land Registry — Built by Liliane Ishimwe</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



import React from "react";

function Home() {
  const imageStyle = {
    width: "100%",
    maxWidth: "800px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    margin: "40px auto",
    display: "block",
  };

  const containerStyle = {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  };

  return (
    <div style={containerStyle}>
      {/* <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}></h2> */}
      <img src="/image.jpg" alt="Land Registry" style={imageStyle} />
    </div>
  );
}

export default Home;

