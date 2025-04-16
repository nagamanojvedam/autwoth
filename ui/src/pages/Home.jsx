import { logout, updateUser } from "../../utils/authApi";
import { useUser } from "../contexts/userContext";
import { useForm } from "react-hook-form";

function Home() {
  const { user, setUser } = useUser();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    console.log(user._id);
    const updatedUser = await updateUser(data, user._id);
    setUser(updatedUser);
  };

  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    if (response) {
      setUser({});
    }
  };
  console.log(user);
  return (
    <main>
      <div className="flex flex-col shadow-2xl">
        <div className="flex bg-white p-8">
          <div className="flex max-w-[180px] flex-col gap-6 text-clip">
            <img src="./images/avatar.svg" className="h-[200px] bg-red-100" />
            <div className="p-1">
              <h3 className="mb-2 font-bold">About Me</h3>
              <p className="text-[10px]/2.5 text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt ipsum necessitatibus tenetur at voluptate modi mollitia
                quam illum, libero sit odit incidunt autem molestiae obcaecati.
                Sapiente optio quos molestiae rerum?
              </p>
            </div>
          </div>
          <div className="px-8">
            <div className="space-y-2 border-b-1 border-b-neutral-200">
              <h2 className="w-fit rounded-md bg-yellow-500 px-4 py-1 text-2xl font-extrabold tracking-[0.6rem] text-white uppercase">
                Hello
              </h2>
              <div className="mb-4">
                <p className="text-md">
                  I'm <span className="text-xl font-bold">{user.name}</span>
                </p>
                <p className="text-[12px] tracking-tighter italic">
                  Full Stack Web Developer. MERN
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 space-y-3 text-[12px]"
            >
              <div className="flex items-center gap-2">
                <label className="my-auto w-[40%] font-semibold">Age</label>
                <input
                  type="number"
                  className="rounded-sm bg-neutral-100 px-2 py-1 focus:outline-0"
                  value={getValues.age}
                  {...register("age")}
                />
              </div>
              <div className="flex gap-2">
                <label className="my-auto w-[40%] font-semibold">Address</label>
                <input
                  type="text"
                  className="brounded-sm bg-neutral-100 px-2 py-1 focus:outline-0"
                  value={getValues.address}
                  {...register("address")}
                />
              </div>
              <div className="flex gap-2">
                <label className="my-auto w-[40%] font-semibold">e-mail</label>
                <input
                  type="email"
                  className="rounded-sm bg-neutral-100 px-2 py-1 focus:outline-0"
                  value={getValues.email}
                  {...register("email")}
                />
              </div>
              <div className="flex gap-2">
                <label className="my-auto w-[40%] font-semibold">Phone</label>
                <input
                  type="tel"
                  className="rounded-sm bg-neutral-100 px-2 py-1 focus:outline-0"
                  value={getValues.phone}
                  {...register("phone")}
                />
              </div>
              <div className="flex gap-2">
                <label className="my-auto w-[40%] font-semibold">
                  Freelance
                </label>
                <input
                  type="text"
                  className="rounded-sm bg-neutral-100 px-2 py-1 capitalize focus:outline-0"
                  value={getValues.freelance}
                  {...register("freelance")}
                />
              </div>
              <div className="space-x-4">
                <button className="cursor-pointer rounded-md border-1 border-yellow-300 bg-yellow-500 px-3 py-2 text-white hover:text-yellow-700">
                  Update Details
                </button>
                <button
                  className="cursor-pointer rounded-md border-1 border-neutral-300 bg-neutral-500 px-3 py-2 text-white hover:text-neutral-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center gap-12 bg-linear-to-br from-orange-500 to-yellow-500 py-8">
          <img
            src="./logos/twitter.png"
            alt="twitter logo"
            className="h-6 w-6"
          />
          <img
            src="./logos/facebook.png"
            alt="facebook logo"
            className="h-6 w-6"
          />
          <img
            src="./logos/instagram.png"
            alt="instagram logo"
            className="h-6 w-6"
          />
          <img
            src="./logos/linkedin.png"
            alt="linkedin logo"
            className="h-6 w-6"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
