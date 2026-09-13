import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { user, handlelogout } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {user && (
        <p className="mb-1 mt-0 text-center text-sm text-gray-500">
          Hi, {user.username}
        </p>
      )}

      <button
        onClick={handlelogout}
        className="
        cursor-pointer
          rounded-full
          border border-gray-300
          bg-gray-100
          px-4 py-2
          text-sm font-medium
          text-gray-800
          transition
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-500
        "
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
