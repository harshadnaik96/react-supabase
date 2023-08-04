import { db } from "../db";

export const PostService = {
  create: <T>(data: T) => {
    const response = db.from("posts").insert<T>(data).select("*");
    return response;
  },

  edit: <T>(data: T, postId: string) => {
    const response = db
      .from("posts")
      .update<T>(data)
      .eq("_id", postId)
      .select("*");
    return response;
  },

  getAll: () => {
    const response = db.from("posts").select("*").filter("status", "eq", 1);
    return response;
  },

  getByAuthorId: (authorId: string) => {
    const response = db
      .from("posts")
      .select("*")
      .filter("author_id", "eq", authorId);
    return response;
  },

  delete: (postId: string) => {
    const response = db.from("posts").delete().match({ _id: postId });
    return response;
  },
};
