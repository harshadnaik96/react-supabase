import { Route, Routes } from "react-router-dom";
import { route } from "../constants";
import { MainLayout, AuthLayout } from "../layouts";
import {
  SignUpPage,
  SignInPage,
  HomePage,
  MyPostsPage,
  CreatePostPage,
  EditPostPage,
} from "../pages";

export const MainStackRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={route.SIGN_UP} element={<SignUpPage />} />
          <Route path={route.LOGIN} element={<SignInPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path={route.HOME} element={<HomePage />} />
          <Route path={route.MY_BLOGS} element={<MyPostsPage />} />
          <Route path={route.CREATE} element={<CreatePostPage />} />
          <Route path={route.EDIT} element={<EditPostPage />} />
        </Route>
      </Routes>
    </>
  );
};
