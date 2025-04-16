import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendResetToken, resetPassword } from "../../utils/authApi";
import { useForm } from "react-hook-form";
import { useUser } from "../contexts/userContext";

function ForgotPassword() {
  const [tokenSent, setTokenSent] = useState(null);
  const [email, setEmail] = useState("");

  const handleSendResetToken = async () => {
    const token = await sendResetToken(email);

    setTokenSent(token);
  };

  return (
    <main className="relative flex bg-white shadow-lg shadow-gray-800">
      <img
        src="./images/forgot-password.jpg"
        className="h-[700px] w-[1100px] bg-white object-contain object-left"
      />
      <div className="absolute top-[30%] right-[4%] flex w-[400px] flex-col gap-6 rounded-sm bg-[#64a5ff] p-4">
        {!tokenSent ? (
          <Phase1
            email={email}
            setEmail={setEmail}
            handleSendResetToken={handleSendResetToken}
          />
        ) : (
          <Phase2 token={tokenSent} />
        )}
      </div>
    </main>
  );
}

function Phase1({ email, setEmail, handleSendResetToken }) {
  return (
    <>
      <h2 className="w-fit text-2xl">
        Forgot <br /> Your Password?
      </h2>
      <div className="flex flex-col gap-4 text-center">
        <div className="relative">
          <label className="absolute top-1 left-2 text-[12px] text-neutral-400">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-sm bg-blue-50 px-3 py-2 pt-6 focus:outline-2 focus:outline-blue-200"
            value={email}
            onChange={(evnt) => setEmail(evnt.target.value)}
          />
        </div>
        <button
          className="cursor-pointer rounded-sm bg-blue-500 py-1 text-sm text-white uppercase hover:text-blue-400"
          onClick={handleSendResetToken}
        >
          Reset Password
        </button>
        <Link
          to="/login"
          className="text-sm text-neutral-200 hover:text-blue-500"
        >
          Back to Login
        </Link>
      </div>
    </>
  );
}

function Phase2({ token }) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async (data) => {
    const response = await resetPassword({ ...data, token });
    if (response) {
      setUser({});
      navigate("/login");
    }
  };
  return (
    <>
      <h2 className="text-2xl font-semibold">Change Password</h2>
      <form
        className="flex flex-col gap-4 text-center"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <div className="relative">
          <label className="absolute top-1 left-2 text-[12px] text-neutral-400">
            Token
          </label>
          <input
            type="text"
            className="w-full rounded-sm bg-blue-50 px-3 py-2 pt-6 focus:outline-2 focus:outline-blue-200"
            defaultValue={token}
            disabled
          />
        </div>

        <div className="relative">
          <label className="absolute top-1 left-2 text-[12px] text-neutral-400">
            New Password
          </label>
          <input
            type="password"
            className="w-full rounded-sm bg-blue-50 px-3 py-2 pt-6 focus:outline-2 focus:outline-blue-200"
            {...register("password", {
              required: "New password is required",
            })}
          />
          {errors?.password && (
            <p className="p-1 text-left text-sm text-red-700">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="absolute top-1 left-2 text-[12px] text-neutral-400">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full rounded-sm bg-blue-50 px-3 py-2 pt-6 focus:outline-2 focus:outline-blue-200"
            {...register("passwordConfirm", {
              required: "Confirm new password is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          {errors?.passwordConfirm && (
            <p className="p-1 text-left text-sm text-red-700">
              {errors?.passwordConfirm?.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between px-4">
          <button
            className="cursor-pointer rounded-sm bg-[#007cfc] px-4 py-1 text-white hover:text-neutral-200"
            type="submit"
          >
            Change Password
          </button>
          <Link to="/login" className="text-blue-900 hover:text-white">
            &larr; Login
          </Link>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
