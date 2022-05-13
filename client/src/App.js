import React, { useState } from 'react';
import Navbar from './components/Navbar';
// import CryptoCodersContract from "./contracts/CryptoCoders.json";
// import getWeb3 from "./getWeb3";

import { getAvatarUrl } from './services/dicebear';

const App = () => {
  const [coder, setCoder] = useState('');

  const executeMint = () => {
    console.log(coder);
  };

  return (
    <div className="h-screen">
      <Navbar />

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
