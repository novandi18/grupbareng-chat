import Google from "../../../assets/Google.svg";
import { signInWithGoogle } from "../../../services/firebase";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        type="button"
        className="flex shadow-sm py-3 px-5 bg-white items-center rounded-lg hover:shadow-xl duration-200 ease-out border border-slate-300"
      >
        <img src={Google} alt="Google" className="w-5" />
        <span className="text-sm ml-3 text-slate-700 font-medium">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default Login;
