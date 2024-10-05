import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export const RequestAirdrop = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [isAirdropping, setIsAirdropping] = useState(false);

  async function requestAirdrop() {
    const amount = document.getElementById("amount").value;
    try {
      setIsAirdropping(true);
      await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
      alert("Sol Airdropped");
    } catch (error) {
      if (error.message.includes("429")) {
        alert("Rate limit exceeded, please try again later.");
      } else {
        alert("Error requesting airdrop: " + error.message);
      }
    } finally {
      setIsAirdropping(false);
    }
  }

  return (
    <div className="flex flex-col space-y-2 lg:w-[600px] w-[400px] items-center justify-center">
      {publicKey ? (
        <>
          <p className="lg:text-xl truncate text-xs">
            <b className="font-bold">Public-key: </b>
            <span className="font-semibold">{publicKey?.toBase58()}</span>
          </p>
          <input
            id="amount"
            type="text"
            className="p-4 border rounded-lg"
            placeholder="Enter the Airdrop Amount"
            required
          />
          <button
            onClick={requestAirdrop}
            disabled={isAirdropping}
            className="p-2 bg-purple-500 text-white hover:bg-opacity-75 rounded-lg"
          >
            {isAirdropping ? "isAirdropping..." : "Request Airdrop"}
          </button>
        </>
      ) : null}
    </div>
  );
};
