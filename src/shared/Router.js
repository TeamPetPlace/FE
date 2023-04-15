import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "../components/register/PrivateRoute";
import Redirect from "../pages/Redirect";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import OwnerPage from "../pages/OwnerPage";
import Loading from "../element/Loading";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Mypage = lazy(() => import("../pages/Mypage"));
const Notification = lazy(() => import("../pages/Notification"));
const Main = lazy(() => import("../pages/Main"));
const Hospital = lazy(() => import("../pages/Hospital"));
const Shop = lazy(() => import("../pages/Shop"));
const Cafe = lazy(() => import("../pages/Cafe"));
const HospitalDetail = lazy(() => import("../pages/HospitalDetail"));
const ShopDetail = lazy(() => import("../pages/ShopDetail"));
const CafeDetail = lazy(() => import("../pages/CafeDetail"));
const OwnerPost = lazy(() => import("../pages/OwnerPost"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kakao/callback" element={<Redirect />} />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <PrivateRoute>
                <Notification />
              </PrivateRoute>
            }
          />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/hospital"
            element={
              <PrivateRoute>
                <Hospital />
              </PrivateRoute>
            }
          />
          <Route
            path="/hospital/:id"
            element={
              <PrivateRoute>
                <HospitalDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <PrivateRoute>
                <Shop />
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/:id"
            element={
              <PrivateRoute>
                <ShopDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/cafe"
            element={
              <PrivateRoute>
                <Cafe />
              </PrivateRoute>
            }
          />
          <Route
            path="/cafe/:id"
            element={
              <PrivateRoute>
                <CafeDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/ownerpost"
            element={
              <PrivateRoute>
                <OwnerPost />
              </PrivateRoute>
            }
          />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/ownerpage" element={<OwnerPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
