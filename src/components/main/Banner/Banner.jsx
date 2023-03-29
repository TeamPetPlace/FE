import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import main1 from "../../../style/img/1.svg";
import main2 from "../../../style/img/2.svg";
import main3 from "../../../style/img/3.svg";
import { StContainer, StWrap, StPostBtn, StClickBtn } from "./BannerStyle";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/modules/navigation/navigation.scss";
import "../../../../node_modules/swiper/modules/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination]);

function Banner() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token", "loginType"]);

  return (
    <StContainer>
      <StWrap>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src={main1} style={{ marginTop: "-5px" }} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={main2} style={{ marginTop: "-5px" }} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={main3} style={{ marginTop: "-5px" }} />
          </SwiperSlide>
        </Swiper>
      </StWrap>

      {cookies.loginType === "BUSINESS" && (
        <StPostBtn>
          <StClickBtn onClick={() => navigate("/ownerpost")}>
            업체 등록하기
            <div>{">"}</div>
          </StClickBtn>
        </StPostBtn>
      )}
    </StContainer>
  );
}

export default Banner;
