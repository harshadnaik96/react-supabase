import { useEffect, useState } from "react";
import { Card } from "./components";
import { PostService } from "../../services";

export const AllPosts = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await PostService.getAll();

        if (response?.data ?? null) {
          setIsLoading(false);
          setRefetch(false);
          setPosts(response?.data ?? []);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [refetch]);

  if (isLoading) {
    return (
      <>
        <div className='grid w-full h-screen place-items-center '>
          <span className='text-4xl text-blue-400 '>Loading ....</span>
        </div>
      </>
    );
  }

  if (posts?.length === 0) {
    return (
      <>
        <div>
          <span>No Posts to see</span>
        </div>
        <div>
          <span>Create Post</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mx-2 md:px-10'>
        <span className='text-2xl font-medium underline text-content'>
          Posts
        </span>
      </div>
      <div className='grid w-full md:px-10 md:grid-cols-3 '>
        {posts?.map((post, index) => (
          <Card data={post} index={index} refetch={() => setRefetch(true)} />
        ))}
      </div>
    </>
  );
};
