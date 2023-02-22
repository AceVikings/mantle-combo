//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Combo is Initializable, OwnableUpgradeable {
    struct combo {
        address _addr;
        uint value;
        bytes _calldata;
    }

    event comboData(bytes returnData);

    function init(address _user) external initializer {
        __Ownable_init();
        transferOwnership(_user);
    }

    function executeCombo(combo[] memory data) external onlyOwner {
        for (uint i = 0; i < data.length; i++) {
            (bool success, bytes memory returnData) = data[i]._addr.call{
                value: data[i].value
            }(data[i]._calldata);
            require(success, "Combo Failed");
            emit comboData(returnData);
        }
    }
}
