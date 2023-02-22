import React from "react";
import TransactionBox from "./TransactionBox";
import { useState, useEffect } from "react";
import { ethers, ZeroAddress, parseEther, Contract, Interface } from "ethers";
import { BsPlusCircle } from "react-icons/bs";
import ComboABI from "../abis/Combo.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Combo.css";

const Combo = (props) => {
  const { contract, address, signer } = props;
  const [combo, setCombo] = useState();
  const [comboContract, setComboContract] = useState();
  const [comboExist, setComboExist] = useState(false);
  const [count, setCount] = useState(1);
  const [transactions, setTransactions] = useState();
  const [forms, setForms] = useState([
    { address: "", value: "", abi: "", params: "" },
  ]);

  async function getUserCombo() {
    let combo = await contract?.userCombo(address);
    if (combo !== ZeroAddress) {
      setComboExist(true);
      setCombo(combo);
      let comboC = new Contract(combo, ComboABI, signer);
      setComboContract(comboC);
    } else {
      setComboExist(false);
    }
    console.log(combo);
  }

  const removeBox = (id) => {
    setTransactions((prevList) => {
      return prevList.splice(id, 1);
    });
    setForms((prevList) => {
      return prevList.splice(id, 1);
    });
    setCount((prevCount) => prevCount - 1);
  };

  const createComboContract = async () => {
    const tx = await contract.createCombo({ value: parseEther("0") });
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    if (receipt.status === 1) {
      toast.success("Contract Created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Creation Failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    getUserCombo();
  };

  const addCount = () => {
    setCount((prevVal) => prevVal + 1);
  };

  const updateForm = (id, name, newData) => {
    setForms((prevList) => {
      let list = prevList;
      list[id] = { ...list[id], [name]: newData };
      console.log(list);
      return list;
    });
    // console.log(forms);
  };

  const handleTransaction = async () => {
    let encodedArray = forms.map((formData) => {
      console.log(formData.abi.split(" ")[1].split("(")[0]);
      let iface = new Interface([formData.abi]);
      return iface.encodeFunctionData(
        formData.abi.split(" ")[1].split("(")[0],
        [formData.params]
      );
    });
    let payload = [];
    for (let i = 0; i < encodedArray.length; i++) {
      payload.push([forms[i].address, forms[i].value, encodedArray[i]]);
    }
    console.log(payload);
    await comboContract.executeCombo(payload);
  };

  useEffect(() => {
    getUserCombo();
  }, [contract]);

  useEffect(() => {
    let tx = [];
    for (let i = 0; i < count; i++) {
      tx.push(
        <TransactionBox
          id={i}
          removeBox={removeBox}
          form={forms[i]}
          updateForm={updateForm}
        />
      );
    }
    setTransactions(tx);
  }, [count]);
  return (
    <div className="combo">
      <ToastContainer />
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
