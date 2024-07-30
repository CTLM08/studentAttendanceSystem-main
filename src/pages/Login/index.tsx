import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactTyped } from "react-typed";
import { signInWithGoogle } from "../../firebase.config";

const Login = () => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-5">
      <ReactTyped
        strings={["欢迎使用自主化校务系统"]}
        typeSpeed={90}
        className="text-6xl text-slate-200 font-semibold"
      />
      <button
        onClick={() => signInWithGoogle()}
        className="rounded-md h-16 w-1/5 mt-8 text-zinc-800 hover:mt-10   bg-slate-300 flex justify-center items-center gap-3 font-semibold transition-all hover:bg-slate-300/80 hover:gap-4 hover:text-lg "
      >
        <Icon icon="logos:google-icon" className="w-6 h-6" /> 谷歌登入
      </button>
    </div>
  );
};

export default Login;
