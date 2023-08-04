import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export const MainLayout = (): JSX.Element => {
  return (
    <>
      <div className='h-full'>
        <Navbar />
        <div className='flex-1 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
