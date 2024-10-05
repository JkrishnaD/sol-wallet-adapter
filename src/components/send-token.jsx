import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const SendToken = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const publicKey = wallet.publicKey?.toBase58();

  const sendAmount = async () => {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Done");
  };
  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      {publicKey ? (
        <>
          <div className="flex items-center space-x-1">
            <input
              id="to"
              type="text"
              placeholder="To"
              className="p-4 border rounded-lg"
              required
            />
            <input
              id="amount"
              type="text"
              placeholder="Amount"
              className="p-4 border rounded-lg"
              required
            />
          </div>
          <button
            onClick={sendAmount}
            className="p-2 bg-purple-500 text-white hover:bg-opacity-75 rounded-lg"
          >
            Send
          </button>
        </>
      ) : null}
    </div>
  );
};
