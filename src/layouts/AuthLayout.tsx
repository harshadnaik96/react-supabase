import { Outlet, useNavigate } from "react-router-dom";
import { route } from "../constants";

export const AuthLayout = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className='w-full'>
      <div className='p-2 mx-4'>
        <span
          onClick={() => navigate(route.HOME)}
          className='text-3xl font-bold cursor-pointer text-content'
        >
          Bloggy
        </span>
      </div>
      <div className='grid h-screen place-items-center'>
        <Outlet />
      </div>
    </div>
  );
};
