import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../utils/authApi";
import { useUser } from "../contexts/userContext";

function Login() {
  const { setUser } = useUser();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    const user = await login(data);

    setUser(user);
    navigate("/home");
  };

  return (
    <div className="flex bg-white shadow-lg shadow-gray-800">
      <img
        src="./images/login.jpg"
        className="h-[600px] w-[600px] bg-blue-400 object-cover"
      />
      <div className="mt-18 w-[400px] p-8">
        <div className="flex w-[90%] flex-col gap-6">
          <h2 className="text-4xl font-bold text-blue-500 uppercase">
            {" "}
            <span className="border-b-4 border-b-blue-500">Hel</span>lo!
          </h2>
          <p className="text-left text-neutral-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <form
            className="mt-1 flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="text"
                placeholder="👤 email"
                className="w-full rounded-sm bg-neutral-200 px-3 py-2 placeholder:text-neutral-400"
                {...register("email")}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="🔒 password"
                className="w-full rounded-sm bg-neutral-200 px-3 py-2 placeholder:text-neutral-400"
                {...register("password")}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-neutral-400">
              <div className="flex items-center justify-between gap-2">
                <input type="checkbox" className="h-4 w-4 cursor-pointer" />
                <label>Remember</label>
              </div>
              <Link to="/forgot-password" className="hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
            <div>
              <button
                className="cursor-pointer rounded-sm bg-linear-to-r from-blue-950 to-blue-500 px-6 py-1 text-sm text-white uppercase"
                type="submit"
              >
                Next &rarr;
              </button>
            </div>
            <div>
              <Link
                to="/signup"
                className="text-sm text-neutral-400 hover:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
