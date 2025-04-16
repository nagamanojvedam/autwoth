import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-linear-to-br from-blue-950 to-sky-300">
      <Outlet />
    </main>
  );
}

export default AppLayout;
