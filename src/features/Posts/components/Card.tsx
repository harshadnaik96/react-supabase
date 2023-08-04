import { useLocation, useNavigate } from "react-router-dom";
import { Render } from "../../../components";
import { useAuth } from "../../../hooks";
import { PostService } from "../../../services";
import { PostItem } from "../../../types";
import { capitalizeFirst } from "../../../utils";
import { route } from "../../../constants";

type Props = {
  data: PostItem;
  index: number;
  refetch: () => void;
};
export const Card = (props: Props): JSX.Element => {
  const { data, index, refetch } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const formatter = (timestamp: number) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const userAction = confirm("Are you sure you want to delete this post ?");
      if (userAction) {
        await PostService.delete(postId);
        alert("Post deleted successfully!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={index} className='w-full'>
      <div className='m-2'>
        <div className='flex flex-col justify-center gap-2 p-4 border rounded-md '>
          <div className='flex flex-row justify-between'>
            <div>
              <span className='p-2 text-xs font-bold text-blue-400 bg-gray-100 rounded-md'>
                {data?.category.toUpperCase()}
              </span>
            </div>
            <Render if={location.pathname === route.MY_BLOGS}>
              <div>
                <span className='p-2 text-xs font-bold text-orange-400 bg-gray-100 rounded-md'>
                  {data?.status === 0 ? "Draft" : "Published"}
                </span>
              </div>
            </Render>
          </div>
          <div>
            <span className='text-base font-medium text-content'>
              {capitalizeFirst(data?.name)}
            </span>
          </div>
          <div className='md:h-40'>
            <p className='text-xs text-left text-content'>{data?.desc}</p>
          </div>
          <div className='mt-2 border-t border-gray-200'></div>

          <div className='grid items-center md:grid-cols-3'>
            <div className='flex flex-row items-center justify-start gap-4'>
              <div>
                <img
                  className='w-10'
                  src='https://images-ext-2.discordapp.net/external/XmkQ_6B1ZSIod20WExNgBIHm18ssBkX1FemWVN_A3OM/https/cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png?width=1115&height=1115'
                  alt='user'
                />
              </div>
              <div>
                <span className='block text-xs text-gray-300 '>Author</span>
                <span className='text-xs font-medium text-content'>
                  {data?.author_name}
                </span>
                <div>
                  <span className='text-xs text-content'>
                    {formatter(Date.parse(data?.created_at))}
                  </span>
                </div>
              </div>
            </div>
            <Render if={auth.userId === data?.author_id}>
              <>
                <div className='flex flex-row items-center gap-4 md:justify-between'>
                  <div className='w-full'>
                    <button
                      onClick={() => {
                        navigate(route.EDIT, {
                          state: data,
                        });
                      }}
                      className='w-full p-2 text-blue-400 rounded-md bg-blue-200/20'
                    >
                      Edit
                    </button>
                  </div>
                  <div className='w-full'>
                    <button
                      onClick={() => handleDeletePost(data?._id)}
                      className='w-full p-2 text-red-400 rounded-md bg-red-200/20'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            </Render>
          </div>
        </div>
      </div>
    </div>
  );
};
