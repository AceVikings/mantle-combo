import { ethers } from "hardhat";
import { ComboFactory__factory } from "../typechain-types";
import { ComboFactory } from "../typechain-types";
import { Combo__factory, Combo } from "../typechain-types";
async function main() {
  const Combo_factory: Combo__factory = await ethers.getContractFactory(
    "Combo"
  );
  const ComboImp: Combo = await Combo_factory.deploy();
  console.log(`Implementation deployed at: ${ComboImp.address}`);
  const ComboFactory: ComboFactory__factory = await ethers.getContractFactory(
    "ComboFactory"
  );
  const Combo: ComboFactory = await ComboFactory.deploy(
    ComboImp.address,
    ethers.utils.parseEther("0")
  );
  console.log(`Factory deployed at: ${Combo.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
