import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) throw new Error("Wallet Not Connected");
    if (!signMessage) throw new Error("Wallet Doesn't support message signing");

    const message = document.getElementById("message").value;
    const encodeMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodeMessage);

    if (!ed25519.verify(signature, encodeMessage, publicKey.toBase58))
      throw new Error("Message Signature Invalid");

    alert(`Message Signature:${bs58.encode(signature)}`);
  }

  return (
    <div className="flex flex-row space-x-2">
      {publicKey ? (
        <>
          <input
            type="text"
            id="message"
            className="p-4 border rounded-lg"
            placeholder="Type Your Message Here"
            required
          />
          <button
            className="p-2 bg-purple-500 text-white hover:bg-opacity-75 rounded-lg"
            onClick={onClick}
          >
            Sign Message
          </button>
        </>
      ) : null}
    </div>
  );
};
