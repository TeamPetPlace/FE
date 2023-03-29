import React from "react";
import ReviewList from "../../review/reviewList/ReviewList";
import { IoCopyOutline, IoShareOutline } from "react-icons/io5";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/modules/navigation/navigation.scss";
import "../../../../node_modules/swiper/modules/pagination/pagination.scss";
import { useState } from "react";
import Map from "../../../element/Map";
import {
  StContents,
  StSlider,
  StSliderImg,
  StShare,
  StFirst,
  StTitleName,
  StStar,
  StAverage,
  StTime,
  StAddress,
  StClosedDay,
  StTelNum,
  StContentsBox,
  StInformation,
  StInfoBox,
  StBold,
  StPlus,
  StCopy,
  StMap,
  StTabBtn,
} from "./AllDetailListStyle";
import Footer from "../../common/Footer";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function AllDetailList({ id, detail, queryClient, setDetail, data }) {
  //복사하기
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  //공유하기
  const sharePage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const shareObject = {
      title: "공유할 콘텐츠의 제목",
      text: "petplace 장소 공유하기",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareObject)
        .then(() => {
          alert("공유하기 성공");
        })
        .catch((error) => {});
    } else {
      // navigator.share()를 지원하지 않는 경우
      alert("페이지 공유를 지원하지 않습니다.");
    }
  };

  //탭
  const [tab, setTab] = useState("상세정보");

  const TabList = [
    {
      id: 0,
      text: "상세정보",
      category: "상세정보",
    },
    { id: 1, text: "후기", category: "후기" },
  ];

  const [checked, setChecked] = useState([true, false]);

  const onClickHandler = (i) => {
    const newArr = Array(TabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("상세정보");
    } else if (i === 1) {
      setTab("후기");
    }
  };
  return (
    <>
      <StSlider>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {detail?.image?.map((image, index) => (
            <SwiperSlide key={index}>
              <StSliderImg src={image} alt={`Image ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StSlider>
      <StShare onClick={sharePage}>
        <IoShareOutline />
      </StShare>
      <StFirst>
        <StTitleName>{detail.title}</StTitleName>
        <div>
          {(detail.star === 0 && <StStar>☆☆☆☆☆</StStar>) ||
            (detail.star === 1 && <StStar>★☆☆☆☆</StStar>) ||
            (detail.star === 2 && <StStar>★★☆☆☆</StStar>) ||
            (detail.star === 3 && <StStar>★★★☆☆</StStar>) ||
            (detail.star === 4 && <StStar>★★★★☆</StStar>) ||
            (detail.star === 5 && <StStar>★★★★★</StStar>)}
        </div>
        <StAverage>(평균 {detail.star}/5.0)</StAverage>
      </StFirst>
      <div style={{ display: "flex" }}>
        <StAddress>{detail.address}</StAddress>
        <StCopy
          onClick={() => {
            handleCopyClipBoard(`${detail.address}`);
          }}
        >
          <IoCopyOutline />
        </StCopy>
      </div>
      <StTime>
        <StAddress>
          AM {detail.startTime} - PM {detail.endTime}
        </StAddress>
        {detail.closedDay === "" ? (
          <StClosedDay>휴무일 없음</StClosedDay>
        ) : (
          <StClosedDay>{detail.closedDay} 휴무</StClosedDay>
        )}
      </StTime>
      <div style={{ display: "flex" }}>
        <StTelNum>대표번호 : {detail.telNum} </StTelNum>
        <StCopy
          onClick={() => {
            handleCopyClipBoard(`${detail.telNum}`);
          }}
        >
          <IoCopyOutline />
        </StCopy>
      </div>
      <div>
        {TabList?.map((item, i) => (
          <StTabBtn
            key={item.id}
            onClick={() => onClickHandler(i)}
            className={checked[i] ? "selected" : ""}
          >
            {item.text}
          </StTabBtn>
        ))}
      </div>
      {tab === "상세정보" && detail.category === "병원" && (
        <StContentsBox>
          <StContents>{detail.contents}</StContents>
          <StInformation>
            <StInfoBox>
              <StBold>대표 수의사</StBold>
              <StPlus>{detail.ceo}</StPlus>
            </StInfoBox>
            <StInfoBox>
              <StBold>기본 진료비</StBold>
              <StPlus>{detail.cost}</StPlus>
            </StInfoBox>
            {detail.aboolean1 === "false" ? (
              <StInfoBox>
                <StBold>야간진료</StBold>
                <StPlus>불가능</StPlus>
              </StInfoBox>
            ) : (
              <StInfoBox>
                <StBold>야간진료</StBold>
                <StPlus>가능</StPlus>
              </StInfoBox>
            )}
            <StInfoBox>
              <StBold>진료항목</StBold>
              <StPlus>{detail.feature1}</StPlus>
            </StInfoBox>
          </StInformation>
          <div>
            <StMap>지도</StMap>
            <Map
              id={id}
              queryClient={queryClient}
              detail={detail}
              setDetail={setDetail}
            />
          </div>
        </StContentsBox>
      )}
      {tab === "상세정보" && detail.category === "미용" && (
        <StContentsBox>
          <StContents>{detail.contents}</StContents>
          <StInformation>
            <StInfoBox>
              <StBold>대표명</StBold>
              <StPlus>{detail.ceo}</StPlus>
            </StInfoBox>
            <StInfoBox>
              <StBold>기본 미용비</StBold>
              <StPlus>{detail.cost}</StPlus>
            </StInfoBox>
            {detail.aboolean1 === "false" ? (
              <StInfoBox>
                <StBold>주차여부</StBold>
                <StPlus>불가능</StPlus>
              </StInfoBox>
            ) : (
              <StInfoBox>
                <StBold>주차여부</StBold>
                <StPlus>가능</StPlus>
              </StInfoBox>
            )}
            {detail.aboolean2 === "false" ? (
              <StInfoBox>
                <StBold>예약여부</StBold>
                <StPlus>불필요</StPlus>
              </StInfoBox>
            ) : (
              <StInfoBox>
                <StBold>예약여부</StBold>
                <StPlus>필요</StPlus>
              </StInfoBox>
            )}
          </StInformation>
          <div>
            <StMap>지도</StMap>
            <Map
              id={id}
              queryClient={queryClient}
              detail={detail}
              setDetail={setDetail}
            />
          </div>
        </StContentsBox>
      )}
      {tab === "상세정보" && detail.category === "카페" && (
        <StContentsBox>
          <StContents>{detail.contents}</StContents>
          <StInformation>
            <StInfoBox>
              <StBold>대표명</StBold>
              <StPlus>{detail.ceo}</StPlus>
            </StInfoBox>
            <StInfoBox>
              <StBold>입장료</StBold>
              <StPlus>{detail.cost}</StPlus>
            </StInfoBox>
            <StInfoBox>
              <StBold>부대시설</StBold>
              <StPlus>{detail.feature1}</StPlus>
            </StInfoBox>
            {detail.aboolean1 === "false" ? (
              <StInfoBox>
                <StBold>주차여부</StBold>
                <StPlus>불가능</StPlus>
              </StInfoBox>
            ) : (
              <StInfoBox>
                <StBold>주차여부</StBold>
                <StPlus>가능</StPlus>
              </StInfoBox>
            )}
          </StInformation>
          <div>
            <StMap>지도</StMap>
            <Map
              id={id}
              queryClient={queryClient}
              detail={detail}
              setDetail={setDetail}
            />
          </div>
        </StContentsBox>
      )}
      {tab === "후기" && (
        <div>
          <ReviewList
            id={id}
            queryClient={queryClient}
            detail={detail}
            data={data}
          ></ReviewList>
        </div>
      )}
    </>
  );
}

export default AllDetailList;
