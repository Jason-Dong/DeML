import { ethers } from "ethers";
import { abi } from "assets/abi"

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
  return true;
}


const getDatasetLink = async () => {
  const link = await contract.dataset_link.call()
  if (link) {
    return link
  }
  return null
}

const getParticipants = async () => {
  const participants = await contract.functions.getParticipants()
  if (participants) {
    return participants
  }
  return null
}

const getBest = async (participant) => {
  const best = await contract.functions.getBest(participant)
  if (best) {
    return best
  }
  return null
}

 const uploadModel = (modelBytestring) => {
   console.log("HERE!!!")
   console.log(getSigner())
   console.log(new Uint8Array(modelBytestring))
   console.log(ethers.utils.isBytesLike(new Uint8Array(modelBytestring)));
   getSigner().getAddress().then(resp=> {console.log(resp)})
   contract.functions.submitModel(new Uint8Array(modelBytestring)).then(
       (resp,error) => {
         console.log(resp);
         console.log(error);
       }
   ).catch(
           (err) => new Error(err.message)

   )
 }


export {setupProvider, getProvider, getSigner, getContract, setContract, getDatasetLink, uploadModel, getParticipants, getBest}
