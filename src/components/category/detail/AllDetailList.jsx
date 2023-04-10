import React from "react";
import ReviewList from "../../review/reviewList/ReviewList";
import { IoCopyOutline, IoShareOutline } from "react-icons/io5";
import SwiperCore, { Navigation, Pagination, Autoplay, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/modules/navigation/navigation.scss";
import "../../../../node_modules/swiper/modules/pagination/pagination.scss";
import { useState } from "react";
import Map from "../../../element/Map";
import {
  StContainer,
  StContents,
  StSlider,
  StSliderImg,
  StThumbnail,
  StShare,
  StFirst,
  StAddressBox,
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
  StMoveTopBtn,
  StIconBtn,
} from "./AllDetailListStyle";
import { useNavigate } from "react-router-dom";
import { BiDownArrowAlt } from "react-icons/bi";
import { BiUpArrowAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useRef } from "react";
import Button from "../../../element/Button";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function AllDetailList({ id, detail, queryClient, setDetail, data }) {
  const navigate = useNavigate();

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
          console.log("공유 성공");
        })
        .catch((error) => {});
    } else {
      // navigator.share()를 지원하지 않는 경우
      alert("지원하지 않는 브라우저입니다.");
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

  //맨 위로 버튼
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //맨 아래로 버튼
  const moveBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  };

  const onImageViewHandler = (image) => {
    // index.preventDefault();
    Swal.fire({
      imageUrl: image,
      imageAlt: "Original Image",
      confirmButtonColor: "#FFD53F",
    });
  };

  // 썸네일 클릭 시 메인 슬라이드 이미지 변경
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const swiperRef = useRef(null);

  return (
    <StContainer>
      <div style={{ display: "flex" }}>
        <StSlider>
          <Swiper
            ref={swiperRef}
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex);
            }}
          >
            {detail?.image?.map((image, index) => (
              <SwiperSlide key={index}>
                <StSliderImg
                  src={image}
                  alt={`Image ${index}`}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => onImageViewHandler(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </StSlider>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {detail?.image?.map((image, index) => (
            <StThumbnail
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </Swiper>
      </StSlider>
      {/* <div className="thumbnail-slider">
        {detail?.image?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div> */}
      <StDscContainer>
        <StDisc>※사진을 클릭하시면 원본 사진을 확인하실 수 있습니다.</StDisc>
        <StShare onClick={sharePage}>
          <IoShareOutline />
        </StShare>
      </StDscContainer>
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
      <StAddressBox>
        <StAddress>{detail.address}</StAddress>
        <StCopy
          onClick={() => {
            handleCopyClipBoard(`${detail.address}`);
          }}
        >
          <IoCopyOutline />
        </StCopy>
      </StAddressBox>
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
          <Button
            size="tab"
            key={item.id}
            onClick={() => onClickHandler(i)}
            className={checked[i] ? "selected" : ""}
          >
            {item.text}
          </Button>
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
            <Map id={id} queryClient={queryClient} detail={detail} setDetail={setDetail} />
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
            <Map id={id} queryClient={queryClient} detail={detail} setDetail={setDetail} />
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
            <Map id={id} queryClient={queryClient} detail={detail} setDetail={setDetail} />
          </div>
        </StContentsBox>
      )}
      {tab === "후기" && (
        <div>
          <ReviewList id={id} queryClient={queryClient} detail={detail} data={data}></ReviewList>
        </div>
      )}
      <StMoveTopBtn>
        <StIconBtn onClick={moveTop}>
          <BiUpArrowAlt />
        </StIconBtn>
        <StIconBtn onClick={moveBottom}>
          <BiDownArrowAlt />
        </StIconBtn>
      </StMoveTopBtn>
    </StContainer>
  );
}

export default AllDetailList;

const StDisc = styled.div`
  font-size: 20px;
  color: #898989;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StDscContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto;
  @media screen and (max-width: 767px) {
  }
  margin: 5px auto;
`;
