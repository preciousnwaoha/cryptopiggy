import { useState, useEffect, createContext, ReactNode, useCallback } from "react";
import contractArtifact from "@/config/utils/SimpleStorage.json";
// import tokenArtifact from "@/config/utils/FISCoin.json";
import { ethers, Contract } from "ethers";

const CONTRACT_ADDRESS = "0x9121877886B5EC225E641b9463889EF22c430A99";
const contractABI = contractArtifact.abi;
export const CONTRACT_OWNER = "0xBe1dB9047Ab848E4307705057B2890FCA7962C1D";
// export const TOKEN_ADDRESS = "0xD95100cEb4284CcFe8A6fd3b238c7B5EEA0B44c5"
// const tokenABI = tokenArtifact.abi;


// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export const bigIntToString = (val: bigint) => {
    return ethers.formatEther(val);
  };
  
  export const toWei = (val: string) => {
    return ethers.parseEther(val);
  };

  type Person = {
    favoriteNumber: number,
    name: string
  }

export default function Home() {
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
      const [ethBalance, setEthBalance] = useState("");
      const [favNum, setFavNum] = useState<number | undefined>(undefined);
      const [personList, setPersonList] = useState<Person[]>([]);
      const [person, setPerson] = useState<Person | undefined>(undefined);
  
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
          setEthBalance(ethers.formatEther(balance));
  
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


  const handleConnect
= () => {
  setup()
}

    useEffect(() => {
        const getPeople = async () => {
            const response = await (contract!.connect(signer!) as Contract)["getListOfPeople()"]()

            const people: Person[] = []
            response.map((p: any)=> {
                const person: Person = {
                    favoriteNumber: parseInt(p[0]),
                    name: p[1],
                }
                people.push(person)
            })
            setPersonList(people)
        }
        if (connected) {
            getPeople()
        }
    }, [connected])

const handleRetieve = async () => {
    const response = await (contract!.connect(signer!) as Contract).retrieve()
    setFavNum(parseInt(response))
}

const handleAddPerson = async () => {
    const response = await (contract!.connect(signer!) as Contract)["addPerson(string _name, uint256 _favNum)"]("James", BigInt("2"))

    response.wait().then((res: any) => {
        if (res.status === 1) {
            // its done
        }
    });
}

  return (
    <div className="flex flex-col text-white items-center p-8">
        <button className="btn btn-contained mb-4" onClick={setup}>Connect</button>

        <button className="btn btn-contained mb-4" onClick={handleRetieve}>Retrieve</button>

        <button className="btn btn-contained mb-4" onClick={handleAddPerson}>Add Person</button>

        <div className="text-2xl ">{favNum}</div>

        <div className="text-2xl">{ethBalance}</div>

        <div className="text-2xl">{signerAddress}</div>

        {personList && <div className="border text-lg">
            {personList.map((person: Person, index) => {
                return <div className="shadow " key={index}>
                    {person.name}
                    <br />
                    {person.favoriteNumber}
                </div>
            }) }
        </div>}
    </div>
    
  )
}
