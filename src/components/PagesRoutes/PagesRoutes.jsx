import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";
import { UserPage } from "../../pages/UserPage";
import { NoAccessPage } from "../../pages/NoAccessPage";
import { useEffect } from "react";
import { getAuthorizedUserThunk } from "../../redux/actions/users";
import { Bars } from "react-loader-spinner";
import "./styles.css";

const authorizedRoutes = [
  { path: "/", element: <MainPage /> },
  { path: "/:id", element: <UserPage /> },
];

export const PagesRoutes = () => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const isLoading = useSelector((state) => state.users.isUserLoading);

  useEffect(() => {
    dispatch(getAuthorizedUserThunk());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <div className="pagesRoutes-loader">
        <Bars width={80} height={80} color={"indigo"} />
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser ? (
          authorizedRoutes.map((route) => <Route key={route.path} {...route} />)
        ) : (
          <Route path="/" element={<NoAccessPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
