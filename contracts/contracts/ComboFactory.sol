//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Combo.sol";

contract ComboFactory is Ownable {
    address ComboAddr;
    uint FEE;

    mapping(address => address) public userCombo;

    constructor(address _impl, uint fees) {
        ComboAddr = _impl;
        FEE = fees;
    }

    function createCombo() external payable {
        require(userCombo[msg.sender] == address(0), "Combo Wallet Exists");
        userCombo[msg.sender] = Clones.cloneDeterministic(
            ComboAddr,
            keccak256(abi.encode(msg.sender))
        );
        Combo(userCombo[msg.sender]).init(msg.sender);
    }

    function editComboAddress(address _impl) external onlyOwner {
        ComboAddr = _impl;
    }

    function setFees(uint _fee) external onlyOwner {
        FEE = _fee;
    }
}
