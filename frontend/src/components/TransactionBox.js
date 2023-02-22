import React, { useState } from "react";
import "../styles/Tooltip.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
const TransactionBox = (props) => {
  const { id, removeBox, form, updateForm } = props;
  //   const [form, setForm] = useState();

  const handleChange = (event) => {
    updateForm(id, [event.target.name], event.target.value);
  };

  return (
    <div className="transaction-box tooltip">
      <AiOutlineCloseCircle className="left" onClick={() => removeBox(id)} />
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
            // value={form.address}
          ></input>
        </label>
        <label htmlFor="value">
          Value
          <input
            name="value"
            placeholder="0"
            onChange={handleChange}
            // value={form.value}
          ></input>
        </label>
        <label htmlFor="abi">
          ABI
          <input
            name="abi"
            placeholder="function foo(address bar,uint amount)"
            onChange={handleChange}
            // value={form.abi}
          ></input>
        </label>
        <label htmlFor="params">
          Params
          <input
            name="params"
            placeholder="0x,123"
            onChange={handleChange}
            // value={form.params}
          ></input>
        </label>
      </form>
    </div>
  );
};

export default TransactionBox;
