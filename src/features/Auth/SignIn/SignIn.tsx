import { useForm } from "react-hook-form";
import { route } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services";
import { useAuth } from "../../../hooks";

type T = {
  email: string;
  password: string;
};
export const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const handleLogin = async (values: T): Promise<void> => {
    try {
      const response = await AuthService.login(values.email, values.password);

      if (response.data ?? null) {
        const { access_token, expires_in, refresh_token, user } =
          response?.data?.session;
        auth.setSessionCredentials(
          access_token,
          expires_in,
          refresh_token,
          user.id,
          user.email,
          user.user_metadata?.name ?? "Anonymous"
        );
        navigate(route.HOME, {
          state: response.data.session,
        });
        alert("Logged In Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full p-4 rounded-md md:border md:p-10 md:w-1/4 '>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col gap-4 '
      >
        <div className='text-center'>
          <span className='inline-block text-3xl text-content'>Sign In</span>
        </div>
        <div className=''>
          <label htmlFor='email' className='block text-content'>
            Email:
          </label>
          <input
            type='email'
            {...register("email", { required: true })}
            className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
            placeholder='Email'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-content'>
            Password:
          </label>
          <input
            type='password'
            {...register("password", { required: true })}
            className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
            placeholder='Password'
          />
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='inline-block w-full p-2 mt-4 text-white border-none rounded-md outline-none bg-primary'
          >
            Sign In
          </button>
        </div>
        <div className='text-center'>
          <p className='text-xs text-content'>
            New around here ?{" "}
            <span
              onClick={() => {
                navigate(route.SIGN_UP);
              }}
              className='cursor-pointer hover:underline text-primary'
            >
              Create Account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
