import { ethers } from "ethers";
import * as abi from "assets/abi.json"

var provider = null;
var signer = null;
var contract = null;

const setupProvider = async () => {
  const result =  await window.ethereum.enable();
  if (result) {

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  return result;
};


const getProvider = ()=> {
  return provider;
}


const getSigner = ()=> {
  return signer;
}


const getContract = () => {
  return contract;
}


const setContract = (address) => {
  contract = new ethers.Contract(address, abi, getSigner())
  console.log(address)
  console.log(contract)
  return true;
}


const getDatasetLink = () => {
  return contract.dataset_link
}


// uploadModel(modelBytestring) {
//   return this.contract.submitModel(modelBytestring).then(
//       () => "Success"
//   ).catch(
//       (err) => new Error(err.message)
//   )
// }


export {setupProvider, getProvider, getSigner, getContract, setContract}
