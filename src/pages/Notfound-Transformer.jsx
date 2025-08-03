import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-center p-4">
      <h1 className="text-4xl font-bold text-gray-600 mb-4">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-700">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 ">Go back to Home</Link>
    </div>
  );
}

export default Notfound;
