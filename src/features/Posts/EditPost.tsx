import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PostService } from "../../services";
import { PostItem } from "../../types";

type T = {
  name: string;
  category: string;
  desc: string;
  status: number;
  author_name: string;
  author_id: string;
};

export const EditPost = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as PostItem;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    defaultValues: {
      name: data?.name,
      desc: data?.desc,
      category: data?.category,
      status: Number(data?.status),
      author_name: data?.author_name,
      author_id: data?.author_id,
    },
  });

  const handleEditPost = async (values: T) => {
    try {
      let base = {
        name: values.name,
        desc: values.desc,
        category: values.category,
        status: Number(values.status),
        author_name: values.author_name,
        author_id: values.author_id,
      };

      const response = await PostService.edit<T>(base, data?._id);
      if (response.data ?? null) {
        alert("Post edited successfully!");
        reset();
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full md:m-4'>
      <div className='m-auto md:border md:w-1/2'>
        <div className='m-4 text-center'>
          <span className='text-3xl font-bold text-content'>Edit Post</span>
        </div>
        <form onSubmit={handleSubmit(handleEditPost)}>
          <div className='flex flex-col justify-center gap-4 p-10 '>
            <div className=''>
              <input
                type='text'
                {...register("name", { required: true })}
                className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Enter post name'
              />
              <span className='p-1 text-red-400'>
                {errors?.name && "Required"}
              </span>
            </div>
            <div className=''>
              <input
                type='text'
                {...register("category", { required: true })}
                className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Enter category name'
              />
            </div>
            <div className=''>
              <textarea
                {...register("desc", { required: true })}
                className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Enter content'
              />
            </div>
            <div className=''>
              <select
                defaultValue={""}
                {...register("status", { required: true })}
                className='w-full p-3 bg-gray-100 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary/40'
                placeholder='Select Status'
              >
                <option value='0'>Draft</option>
                <option value='1'>Publish</option>
              </select>
            </div>
            <div>
              <button
                type='submit'
                className='w-full p-3 text-white bg-blue-500 rounded-md focus:ring-2 focus:ring-blue-200 '
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
