import React from "react";
import TransactionBox from "./TransactionBox";
import { useState, useEffect } from "react";
import { ethers, ZeroAddress, parseEther } from "ethers";
import { BsPlusCircle } from "react-icons/bs";
import ComboABI from "../abis/Combo.json";
import "../styles/Combo.css";

const Combo = (props) => {
  const { contract, address } = props;
  const [combo, setCombo] = useState();
  const [comboExist, setComboExist] = useState(false);
  const [count, setCount] = useState(1);
  const [transactions, setTransactions] = useState();

  async function getUserCombo() {
    let combo = await contract?.userCombo(address);
    if (combo !== ZeroAddress) {
      setComboExist(true);
      setCombo(combo);
    } else {
      setComboExist(false);
    }
    console.log(combo);
  }

  useEffect(() => {
    getUserCombo();
  }, [contract]);

  useEffect(() => {
    let tx = [];
    for (let i = 0; i < count; i++) {
      tx.push(<TransactionBox />);
    }
    setTransactions(tx);
  }, [count]);

  const createComboContract = async () => {
    const tx = await contract.createCombo({ value: parseEther("0") });
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    if (receipt.status === 1) {
      console.log("Success");
    } else {
      console.log("Failed");
    }
    getUserCombo();
  };

  const addCount = () => {
    setCount((prevVal) => prevVal + 1);
  };

  const handleTransaction = () => {};
  return (
    <div className="combo">
      <h1 className="combo--header">Create Combo</h1>
      {!contract && (
        <>
          <h2 className="combo--text">
            Oops! Looks like you haven't connected to Metamask yet
          </h2>
        </>
      )}
      {!comboExist && contract && (
        <>
          <h2 className="combo--text">
            Oops! Looks like your don't have a Combo Account yet
          </h2>
          <div className="create-button" onClick={createComboContract}>
            Create New Account
          </div>
        </>
      )}
      {comboExist && (
        <>
          {transactions}
          <BsPlusCircle className="plus-button" onClick={addCount} />
          <div
            className="create-button execute-button"
            onClick={handleTransaction}
          >
            Execute
          </div>
        </>
      )}
    </div>
  );
};

export default Combo;
