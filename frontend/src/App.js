import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Combo from "./components/Combo";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import factoryABI from "./abis/Factory.json";
function App() {
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  async function requestWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAddress(accounts[0]);

      const signerProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await signerProvider.getSigner(0);
      const contract = new Contract(
        "0xE9A78a271970E93f211b23e893c5248850408a6D",
        factoryABI,
        signer
      );
      setSigner(signer);
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    requestWallet();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      requestWallet();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <Navbar connectWallet={connectWallet} address={address} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/combo"
          element={
            <Combo contract={contract} address={address} signer={signer} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
