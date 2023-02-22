import React, { useState } from "react";
import "../styles/Tooltip.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
const TransactionBox = () => {
  const [form, setForm] = useState();

  const handleChange = (event) => {
    setForm((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
    console.log(form);
  };
  return (
    <div className="transaction-box tooltip">
      <AiOutlineCloseCircle className="left" />
      {/* <h3>Lorem Ipsum</h3>
        <p>Dolor sit amet, consectetur adipiscing elit.</p>
        <i></i>
      </div> */}
      <form className="form">
        <label htmlFor="address">
          Contract
          <input
            name="address"
            placeholder="0x"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="value">
          Value
          <input name="value" placeholder="0" onChange={handleChange}></input>
        </label>
        <label htmlFor="abi">
          ABI
          <input
            name="abi"
            placeholder="function foo(address bar,uint amount)"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="params">
          Params
          <input
            name="params"
            placeholder="0x,123"
            onChange={handleChange}
          ></input>
        </label>
      </form>
    </div>
  );
};

export default TransactionBox;
