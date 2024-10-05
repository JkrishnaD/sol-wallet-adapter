import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="flex flex-row space-x-5">
      <Link
        to="/request-airdrop"
        className="text-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-all rounded-lg font-semibold"
      >
        Request Airdrop
      </Link>
      <Link
        to="/send-token"
        className="text-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-all rounded-lg font-semibold"
      >
        Send Token
      </Link>
      <Link
        to="/sign-message"
        className="text-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-all rounded-lg font-semibold"
      >
        Sign Message
      </Link>
    </nav>
  );
};
