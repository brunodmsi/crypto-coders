import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import getWeb3 from "./getWeb3";
import CryptoCodersContract from "./contracts/CryptoCoders.json";

import { getAvatarUrl } from './services/dicebear';

const App = () => {
  const [coder, setCoder] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loadedCoders, setLoadedCoders] = useState([]);

  const loadNfts = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
  
    const nfts = new Set();
    for (let i = 0; i < totalSupply; i += 1) {
      let currCoder = await contract.methods.coders(i).call();
      nfts.add(currCoder);
    }

    setLoadedCoders(nfts);
  }

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (!accounts) {
      return;
    }

    return accounts[0];
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCodersContract.networks[networkId];
  
    if (!networkData) {
      return;
    }

    const abi = CryptoCodersContract.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);

    return contract;
  };

  useEffect(() => {
    getWeb3().then(async (web3) => {
      const contract = await loadWeb3Contract(web3);
      const account = await loadWeb3Account(web3);

      setAccount(account);
      setContract(contract);

      await loadNfts(contract);
    });
  }, []);

  const executeMint = async () => {
    if (!contract) {
      return;
    }

    await contract.methods.mint(coder).send({
      from: account,
    }, (error) => {
      if (error) {
        console.log(error);
        return;
      }

      setLoadedCoders(oldLoadedCoders => [...oldLoadedCoders, coder]);
    });
  };

  return (
    <div className="h-screen">
      <Navbar account={account} />

      <div className="flex flex-col justify-center items-center gap-3">
        <img src={getAvatarUrl('cryptocoders')} alt="cryptocoders avatars" width={72} /> 
        <div className="max-w-xs text-center gap-3 flex flex-col">
          <h1 className="text-2xl font-bold">Crypto Coders</h1>
          <p className="font-light">
            These are one of the most highly motivated coders in the world! 
            We are here to learn coding and apply it to the betterment of humanity. 
            We are inventors, innovators, and creators.
          </p>

          <input 
            type="text" 
            placeholder="e.g cryptocoders"
            className="p-2 border border-gray-200 rounded-md"
            onChange={(e) => setCoder(e.target.value)}
          />

          <button 
            className="p-1 bg-blue-600 text-white cursor-pointer hover:opacity-90 transition-all" 
            onClick={() => executeMint()}
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  )
};

export default App;
