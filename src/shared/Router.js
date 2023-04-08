import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import Notification from "../pages/Notification";
import Main from "../pages/Main";
import Hospital from "../pages/Hospital";
import Shop from "../pages/Shop";
import Cafe from "../pages/Cafe";
import HospitalDetail from "../pages/HospitalDetail";
import ShopDetail from "../pages/ShopDetail";
import CafeDetail from "../pages/CafeDetail";
import OwnerPost from "../pages/OwnerPost";
import OwnerPage from "../pages/OwnerPage";
import Redirect from "../pages/Redirect";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/main" element={<Main />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/cafe/:id" element={<CafeDetail />} />
        <Route path="/ownerpost" element={<OwnerPost />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
        <Route path="/kakao/callback" element={<Redirect />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
