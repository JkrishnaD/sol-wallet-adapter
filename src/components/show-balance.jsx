import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const ShowBalance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);

  const publicKey = wallet.publicKey?.toBase58();
  
  const getUserBalance = async () => {
    const amount = await connection.getBalance(wallet.publicKey);
    setBalance(amount / LAMPORTS_PER_SOL);
  };

  useEffect(() => {
    getUserBalance();
  }, [wallet, connection]);

  return (
    <div className="p-2">
      {publicKey ? (
        <p className="font-bold text-xl">
          Sol-Balance: <span>{balance}</span>
        </p>
      ) : (
        <p>Connect Your Wallet</p>
      )}
    </div>
  );
};
