import { useNavigate } from "react-router-dom";
import { route } from "../constants";
import { EditIcon } from "../assets";
import { Render } from "./Render";
import { useAuth } from "../hooks";

export const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleRouteToSignIn = (): void => {
    navigate(route.LOGIN);
  };

  const handleRouteToMyBlogs = (): void => {
    navigate(route.MY_BLOGS);
  };

  const handleRouteToCreateBlog = (): void => {
    navigate(route.CREATE);
  };

  const handleLogout = (): void => {
    const userAction = confirm("Are you sure you want to logout!");

    if (userAction ?? null) {
      auth.logout();
      navigate(route.HOME);
    }
  };

  return (
    <div className='w-full p-4 border-b border-gray-100 bg-primary'>
      <div className='flex flex-row items-center justify-between'>
        <div>
          <span
            onClick={() => navigate(route.HOME)}
            className='text-3xl font-bold text-white cursor-pointer'
          >
            BLOGGY
          </span>
        </div>
        <div className='flex flex-row items-center justify-evenly'>
          <Render if={auth.isLoggedIn}>
            <>
              <div className='flex flex-row items-center gap-1 p-1 '>
                <span>
                  <EditIcon className='w-4 h-4 text-white cursor-pointer ' />
                </span>
                <span
                  onClick={handleRouteToCreateBlog}
                  className='mr-10 text-base font-bold text-white cursor-pointer '
                >
                  Write
                </span>
              </div>
              <div>
                <span
                  onClick={handleRouteToMyBlogs}
                  className='mr-10 text-base font-bold text-white cursor-pointer '
                >
                  My Blogs
                </span>
              </div>

              <div>
                <span
                  onClick={handleLogout}
                  className='mr-10 text-base font-bold text-white cursor-pointer '
                >
                  Logout
                </span>
              </div>
            </>
          </Render>
          <Render if={!auth.isLoggedIn}>
            <div>
              <span
                onClick={handleRouteToSignIn}
                className='mr-10 text-base font-bold text-white cursor-pointer '
              >
                Sign In
              </span>
            </div>
          </Render>
        </div>
      </div>
    </div>
  );
};
