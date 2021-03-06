import React from "react";
import { Contract } from "@ethersproject/contracts";
import tokenAbi from "./tokenAbi.json";
import presaleAbi from "./preSaleAbi.json";
import stakingAbi from "./stakingAbi.json";
import allpresaleAbi from "./AllpreSaleAbi.json";
// import hassanBaiAbi from "./hassanBaiAbi.json";

import {
  tokenAddress,
  presaleAddress,
  stakingAddress,
  allpreSaleAddress,
} from "./environment";
import { ethers } from "ethers";
let walletAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

const provider = new ethers.providers.JsonRpcProvider(
  "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  // "https://data-seed-prebsc-1-s1.binance.org:8545/" //testNet
  // "https://bsc-dataseed.binance.org/" //mainNet
);
export const voidAccount = new ethers.VoidSigner(walletAddress, provider);
function useContract(address, ABI, signer) {
  return React.useMemo(() => {
    if (signer) {
      return new Contract(address, ABI, signer);
    } else {
      return new Contract(address, ABI, voidAccount);
    }
  }, [address, ABI, signer]);

}


export function useEtherClone(mytokenAddress, mytokenAbi, signer) {
  return useContract(mytokenAddress, mytokenAbi, signer);
}

export function useTokenContract(signer) {
  return useContract(tokenAddress, tokenAbi, signer);
}
export function usePresaleContract(signer) {
  return useContract(presaleAddress, presaleAbi, signer);
}
// export function useStakingContract(signer) {
//   return useContract(stakingAddress, stakingAbi, signer);
// }
// export function useAirdropContract(signer) {
//   return useContract(airdropAddress, airdropAbi, signer);
// }

// Connectivity Starts Here 4/18/22

export function useAllPresaleContract(signer) {
  return useContract(allpreSaleAddress, allpresaleAbi, signer);
}


export function useStakingContract(signer) {
  console.log("useStakingContract");
  console.log("signer");
  console.log(signer);

  return useContract(stakingAddress, stakingAbi, signer);
}