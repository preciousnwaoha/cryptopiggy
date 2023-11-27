import React, { useState, useEffect, createContext, ReactNode, useCallback } from "react";
import contractArtifact from "@/config/utils/FIS.json";
import tokenArtifact from "@/config/utils/FISCoin.json";
import { ethers, Contract } from "ethers";
import {  GroupType,  InvestmentType,  TokenSavingDataType, UserType } from "@/types/site";
import { SAVING_GROUPS, USER_TOKENS, USER } from "@/config/dummy";
import { bigIntToString } from "@/lib/utils";

export const CONTRACT_ADDRESS = "0x5C538b7DD2BdCA1da1b60E3Ff4a8b7a5e9F2170c" // "0x8EFf341aBB3cC71214F33805F16aaCEDb574665a";
const contractABI = contractArtifact.abi;
export const CONTRACT_OWNER = "0xBe1dB9047Ab848E4307705057B2890FCA7962C1D";
export const TOKEN_ADDRESS = "0xe9134e7d586232d14C4768E3Dd755Ca19d5C8020" // "0xD95100cEb4284CcFe8A6fd3b238c7B5EEA0B44c5"
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
  provider: ethers.BrowserProvider | undefined,
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
  contract: undefined,
  signer: undefined,
  provider: undefined,
  setup: () => {},
  getUser: () => {},
  getUserTokens: () => {},
  getAllSavingGroups: () => {},
});

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
        setSignerAddress(address);
        console.log({ address });

        const balance = await provider.getBalance(address);
        setTelosBalance(Number(bigIntToString(balance)));


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


  const getAllSavingGroups = async () => {
  
      if (!connected) {
        return;
      }


      await (contract!.connect(signer!) as Contract)
      ["getAllGroups()"]().then(response => {
        const groups: GroupType[] = []
        // console.log(response.toArray())
        response.map((group:any) => {
          groups.push({
            id: parseInt(group.id),
            targetAmount:  parseInt(group.targetAmount),
            savedAmount:  parseInt(group.savedAmount || 0),
            duration:  parseInt(group.duration),
            visibility:  parseInt(group.visibility),
            groupMembers: group.groupMembers.toArray(),
            creator: group.creator,
            title: group.title,
            description: group.description,
            createdAt:  parseInt(group.timeCreated),
            category:  parseInt(group.category)
          })

        })
        
        setSavingGroups(groups)
      })
      

  } 
 

  const getUserTokens = async () => {
    if (!connected) {
      return;
    }

    await (contract!.connect(signer!) as Contract)
    ["getUserTokensData()"]().then(response => {
      console.log({response})
      const tokensData: TokenSavingDataType[] = []
      response.map((token:any) => {
        console.log(token)
        tokensData.push({
          tokenAddress: token.tokenAddress,
          tokenBalance: parseInt(token.tokenBalance),
          saveDuration: parseInt(token.saveDuration),
          timeSaved: parseInt(token.timeSaved),
          tokenRewards: parseInt(token.tokenRewards),
        })
      })

      setUserTokens(tokensData);
    })
    
  };

  const getUser = async () => {
    if (!connected) {
      return;
    }

    await (contract!.connect(signer!) as Contract)
    ["getUser()"]().then(response => {
      console.log({response})
      const user: UserType = {
        walletAddress: response.walletAddress,
        telosBalance: parseInt(response.telosBalance),
        telosDuration: parseInt(response.telosDuration),
        timeSaved: parseInt(response.timeSaved),
        tokens: response.tokens.toArray(),
        rewardsEarned: parseInt(response.rewardsEarned),
        groups: response.groups.toArray(),
        circle: response.circle.toArray(),
        goal: parseInt(response.goal),
        investmentCollateral: parseInt(response.investmentColateral),
        investments: response.investments.toArray(),
      }
      setUser(user)
    })  
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
        provider,
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
