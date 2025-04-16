import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../utils/authApi";
import { useUser } from "../contexts/userContext";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const user = await createUser(data);
    setUser(user);
    navigate("/home");
  };

  return (
    <main className="relative flex bg-white shadow-lg shadow-gray-800">
      <div className="relative w-[480px] bg-white p-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.0}
          stroke="#04dbbf"
          className="absolute top-5 right-5 size-6 cursor-pointer hover:stroke-amber-500"
          onClick={() => navigate("/")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <h2 className="mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-2xl font-bold text-transparent">
          Registration Form
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b-2 border-teal-400">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("name")}
            />
          </div>
          <div className="border-b-2 border-teal-400">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("email")}
            />
          </div>

          <div className="border-b-2 border-teal-400">
            <input
              type="number"
              placeholder="Age"
              className="w-full px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("age")}
            />
          </div>
          <div className="border-b-2 border-teal-400">
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("phone")}
            />
          </div>

          <div className="border-b-2 border-teal-400">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("password")}
            />
          </div>
          <div className="border-b-2 border-teal-400">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-inherit px-3 py-2 placeholder:text-neutral-400 focus:outline-0"
              {...register("passwordConfirm")}
            />
          </div>
          <div className="flex space-x-2">
            <input type="checkbox" className="" {...register("isChecked")} />
            <span className="text-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto blanditiis, temporibus doloremque facere.
            </span>
          </div>
          <button
            className="mx-auto mt-2 w-fit cursor-pointer bg-gradient-to-r from-sky-600 to-teal-500 px-10 py-3 text-white uppercase hover:text-neutral-600"
            type="submit"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-neutral-500">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
