import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./components/request-airdrop";
import { ShowBalance } from "./components/show-balance";
import { SendToken } from "./components/send-token";
import { SignMessage } from "./components/sign-message";
import { NavBar } from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <div className="flex flex-col items-center justify-center w-screen space-y-3 h-screen bg-gradient-to-tr from-purple-500 to-white">
              <div className="bg-white flex flex-col items-center justify-center p-4 rounded-lg">
                <div className="flex flex-row items-center w-fit justify-between px-5 space-x-3">
                  <WalletMultiButton />
                  <NavBar />
                  <WalletDisconnectButton />
                </div>
                <ShowBalance />
                <Routes>
                  <Route path="/request-airdrop" element={<RequestAirdrop />} />
                  <Route path="/send-token" element={<SendToken />} />
                  <Route path="/sign-message" element={<SignMessage />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
