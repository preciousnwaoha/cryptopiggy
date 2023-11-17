import React, { useState, useEffect, createContext, ReactNode, useCallback } from "react";
import contractArtifact from "@/config/utils/FIS.json";
import tokenArtifact from "@/config/utils/FISCoin.json";
import { ethers, Contract } from "ethers";
import {  GroupType,  InvestmentType,  TokenSavingDataType, UserType } from "@/types/site";
import { SAVING_GROUPS, USER_TOKENS, USER } from "@/config/dummy";

const CONTRACT_ADDRESS = "0x8EFf341aBB3cC71214F33805F16aaCEDb574665a";
const contractABI = contractArtifact.abi;
export const CONTRACT_OWNER = "0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5";
export const TOKEN_ADDRESS = "0xD95100cEb4284CcFe8A6fd3b238c7B5EEA0B44c5"
const tokenABI = tokenArtifact.abi;

type AppContextType = {
  connected: boolean,
  signerAddress: string | undefined,
  telosBalance: number,
  userTokens: TokenSavingDataType[],
  user: UserType | undefined,
  savingGroups: GroupType[], 
  // userInvestments: InvestmentType[],
  // allInvestments: InvestmentType[],
  contract: ethers.Contract | undefined,
  signer: ethers.JsonRpcSigner | undefined,
  setup: () => void,
  getUser: () => void,
  getUserTokens: () => void,
  getAllSavingGroups: () => void,
};

export const AppContext = createContext<AppContextType>({
  connected: false,
  signerAddress: "",
  telosBalance: 0,
  userTokens: [],
  user: undefined,
  savingGroups: [],
  // userInvestments: [],
  // allInvestments: [],
  contract: undefined,
  signer: undefined,
  setup: () => {},
  getUser: () => {},
  getUserTokens: () => {},
  getAllSavingGroups: () => {},
});

export const bigIntToString = (val: bigint) => {
  return ethers.formatEther(val);
};

export const toWei = (val: string) => {
  return ethers.parseEther(val);
};

interface AppProviderPropTypes {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppProviderPropTypes) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>(
    undefined
  );
  // const [provider, setProvider] = useState<ethers.JsonRpcProvider| undefined>(undefined);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(
    undefined
  );
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );
    const [telosBalance, setTelosBalance] = useState(0);
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [userTokens, setUserTokens] = useState<TokenSavingDataType[]>([]);
    const [savingGroups, setSavingGroups] = useState<GroupType[]>([]);
    // const [userInvestments, setUserInvestments] = useState<InvestmentType[]>([]);
    // const [allInvestments, setAllInvestments] = useState<InvestmentType[]>([]);

  const setup = async () => {
    if (
      typeof window !== "undefined" &&
      typeof (window as any).ethereum !== "undefined"
    ) {
      const provider: ethers.BrowserProvider = new ethers.BrowserProvider(
        (window as any).ethereum!
      );
      // const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider()
      setProvider(provider);

      await provider.send("eth_requestAccounts", []);

      if (provider !== undefined) {
        const signer = await provider.getSigner();
        setSigner(signer);
        console.log({ signer });

        const address = await signer.getAddress();
        // const address = "0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5"
        setSignerAddress(address);
        console.log({ address });

        const balance = await provider.getBalance(address);
        setTelosBalance(Number(bigIntToString(balance)));
        // const balance = 456.53;
        // setTelosBalance(balance)

        const mainContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          provider
        );
        console.log({ mainContract });
        setContract(mainContract);

        setConnected(true);
      }
    }
  };

  // const getUserInvestments = () => {

  // }

  // const getAllInvestments = () => {
    
  // }


  const getAllSavingGroups = useCallback(()=> {
    const getGroups = async () => {
      if (!connected) {
        return;
      }

      const groups = await (contract!.connect(signer!) as Contract).getAllGroups()
      console.log({groups})
      setSavingGroups(SAVING_GROUPS)
    }

    getGroups()

  }, [connected])
 

  const getUserTokens = async () => {
    const response = await (contract!.connect(signer!) as Contract).getUserTokensData()
    console.log({response})

    setUserTokens(USER_TOKENS);
    // get from blockchain
  };

  const getUser = async () => {
    const response = await (contract!.connect(signer!) as Contract).getUser()
      console.log({response})
      setUser(USER)
  }



  return (
    <AppContext.Provider
      value={{
        connected,
        signerAddress,
        telosBalance,
        userTokens,
        user,
        savingGroups,
        contract,
        signer,
        setup,
        getUser,
        getUserTokens,
        getAllSavingGroups,
        // getUserInvestments,
        // getAllInvestments
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
