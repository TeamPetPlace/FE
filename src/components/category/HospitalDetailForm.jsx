import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import Map from "../../element/Map";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDetail, getReview } from "../../api/detail";
import { useCookies } from "react-cookie";
import { checkTitle, deletePost, updatePost } from "../../api/owner";
import PopupDom from "../owner/Popup";
import DaumPostcode from "react-daum-postcode";
import Review from "../../element/Review";
import ReviewList from "../../element/ReviewList";
import MagicSliderDots from "react-magic-slider-dots";
import { IoCopyOutline } from "react-icons/io5";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/modules/navigation/navigation.scss";
import "../../../node_modules/swiper/modules/pagination/pagination.scss";

const HospitalDetailForm = () => {
  const [cookies] = useCookies(["access_token", "email"]);
  const navigate = useNavigate();

  //상세페이지 조회
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const [slideImg, setSlideImg] = useState([]);
  const { data } = useQuery("getdetail", () => getDetail(`${id}`), {
    onSuccess: (response) => {
      setDetail(response);
      setSlideImg(response.image);
    },
  });

  //게시글 삭제
  const queryClient = useQueryClient();
  const deletPostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("AllPost");
    },
  });

  const onDeleteHandler = () => {
    const message = window.confirm("삭제하시겠습니까?");
    if (message) {
      deletPostMutation.mutate(id);
      navigate("/main");
    } else {
      return;
    }
  };

  //게시글 수정
  const [edit, setEdit] = useState(false);
  const [upTitle, setUpTitle] = useState("");
  const [upCategory, setUpCategory] = useState("");
  const [upContents, setUpContents] = useState("");
  const [upImage, setUpImage] = useState([]);
  const [upImgBase64, setUpImgBase64] = useState([]);
  const [upCost, setUpCost] = useState("");
  const [upCeo, setUpCeo] = useState("");
  const [upTelNum, setUpTelNum] = useState("");
  const [upStartTime, setUpStartTime] = useState("");
  const [upEndTime, setUpEndTime] = useState("");
  const [upSelect, setUpSelect] = useState("");
  const [upAboolean1, setUpAboolean1] = useState("");
  const [upAboolean2, setUpAboolean2] = useState("");
  const [upFeature1, setUpFeature1] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);
  const [titleButtonClicked, setTitleButtonClicked] = useState(false);

  const maxImage = 4;

  //수정 모드
  const onEditMode = () => {
    if (detail) {
      setEdit(!edit);
      setUpTitle(detail.title);
      setUpCategory(detail.category);
      setUpContents(detail.contents);
      setUpCost(detail.cost);
      setUpCeo(detail.ceo);
      setUpTelNum(detail.telNum);
      setUpStartTime(detail.startTime);
      setUpEndTime(detail.endTime);
      setUpSelect(detail.closedDay);
      setUpFeature1(detail.feature1);
      setUpImage(upImage);
      setUpImgBase64(detail.image);
    }
  };

  //좌표
  const { kakao } = window;
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSearch = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setButtonClicked(true);
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLat(result[0].y);
        setLng(result[0].x);
        alert("주소가 확인 되었습니다.");
      } else {
        alert("주소 검색에 실패했습니다. 도로명을 선택해주세요.");
      }
    });
  };

  //주소 팝업창
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const [address, setAddress] = useState("");

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "40%",
    left: "30%",
    width: "600px",
    height: "600px",
    padding: "7px",
    zIndex: "999",
  };

  //휴무 체크
  const [isChecked, setIsChecked] = useState(false);
  const onCheckHandler = () => {
    setIsChecked(!isChecked);
  };

  //이미지 프리뷰
  const onImgHandler = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > maxImage) {
      alert(`최대 ${maxImage}개의 이미지만 선택 가능합니다.`);
      return;
    }
    setUpImage((prevImage) => [...prevImage, ...files]);

    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            var base64Sub = base64.toString();
            setUpImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  const fileInput = useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileInput.current.click();
  };

  //수정 핸들러
  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getdetail");
    },
  });

  const onUpdateHandler = (event) => {
    event.preventDefault();
    if (
      upCategory.trim() === "" ||
      upTitle.trim() === "" ||
      upContents.trim() === "" ||
      address.trim() === "" ||
      upCeo.trim() === "" ||
      upTelNum.trim() === "" ||
      upStartTime.trim() === "" ||
      upEndTime.trim() === "" ||
      !upImage
    )
      return alert("빈칸을 모두 채워주세요");
    if (buttonClicked === false) {
      return alert("주소 확인을 해주세요");
    }
    const formData = new FormData();
    upImage.forEach((upImage, index) => formData.append("image", upImage));
    formData.append("title", upTitle);
    formData.append("category", upCategory);
    formData.append("contents", upContents);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("cost", upCost);
    formData.append("ceo", upCeo);
    formData.append("telNum", upTelNum);
    formData.append("startTime", upStartTime);
    formData.append("endTime", upEndTime);
    formData.append("closedDay", upSelect);
    formData.append("aboolean1", upAboolean1);
    formData.append("aboolean2", upAboolean2);
    formData.append("feature1", upFeature1);
    const payload = {
      id: id,
      image: upImage,
      title: upTitle,
      category: upCategory,
      contents: upContents,
      address: address,
      lat: lat,
      lng: lng,
      cost: upCost,
      ceo: upCeo,
      telNum: upTelNum,
      startTime: upStartTime,
      endTime: upEndTime,
      closedDay: upSelect,
      aboolean1: upAboolean1,
      aboolean2: upAboolean2,
      feature1: upFeature1,
    };
    updatePostMutation.mutate(payload);
    onEditMode();
    alert("수정 완료!");
  };

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

  const telNumberHandler = (event) => {
    const { value } = event.target;
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(event.target.value)) {
      setUpTelNum(value);
    }
  };

  useEffect(() => {
    if (upTelNum.length === 10) {
      setUpTelNum(upTelNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (upTelNum.length === 13) {
      setUpTelNum(
        upTelNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [upTelNum]);

  const handleKeyDown = (e) => {
    const key = e.key;
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;

    if (key === "Backspace" || key === "Delete") {
      if (selectionStart === 3 && selectionEnd === 3) {
        e.preventDefault();
      }
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
    <Stdiv>
      {edit ? (
        // 수정 모드
        <>
          <StBox>
            <StPost>업체 수정</StPost>
            <StFormBox>
              <StForm onSubmit={onUpdateHandler} encType="multipart/form-data">
                <StLine>
                  <StTitle>*업종</StTitle>
                  <StLabels>
                    <label>
                      병원
                      <StRadio
                        type="radio"
                        value="병원"
                        name="category"
                        checked={upCategory === "병원"}
                        onChange={(event) => {
                          setUpCategory(event.target.value);
                        }}
                      />
                    </label>
                    <label>
                      미용
                      <StRadio
                        type="radio"
                        value="미용"
                        name="category"
                        checked={upCategory === "미용"}
                        onChange={(event) => {
                          setUpCategory(event.target.value);
                        }}
                      />
                    </label>
                    <label>
                      카페
                      <StRadio
                        type="radio"
                        value="카페"
                        name="category"
                        checked={upCategory === "카페"}
                        onChange={(event) => {
                          setUpCategory(event.target.value);
                        }}
                      />
                    </label>
                  </StLabels>
                </StLine>
                <StLine>
                  <StTitle>*업체명</StTitle>
                  <StInput
                    type="text"
                    placeholder="업체명"
                    value={upTitle}
                    onChange={(event) => {
                      setUpTitle(event.target.value);
                    }}
                  />
                </StLine>
                <div>
                  <StTitle>*소개</StTitle>
                  <StText
                    placeholder="소개글을 입력해주세요.(500자 이내)"
                    maxLength={500}
                    value={upContents}
                    onChange={(event) => {
                      setUpContents(event.target.value);
                    }}
                  />
                </div>
                <StLine style={{ marginBottom: "40px" }}>
                  <StTitle>*주소</StTitle>
                  <div>
                    <div style={{ display: "flex" }}>
                      <StBtn type="button" onClick={openPostCode} size="large">
                        우편번호 검색
                      </StBtn>
                      <StErrorMsg>
                        {buttonClicked === false ? (
                          <p>주소 입력 후 확인을 꼭 클릭해주세요</p>
                        ) : null}
                      </StErrorMsg>
                    </div>
                    <div id="popupDom">
                      {isPopupOpen && (
                        <PopupDom>
                          <div>
                            <DaumPostcode
                              style={postCodeStyle}
                              onComplete={handlePostCode}
                            />
                            <StInput value={address} disabled />
                            <StBtn size="small" onClick={handleSearch}>
                              확인
                            </StBtn>
                          </div>
                        </PopupDom>
                      )}
                      {!isPopupOpen && (
                        <>
                          <StInput disabled />
                          <StBtn
                            size="small"
                            onClick={handleSearch}
                            style={{ marginLeft: "10px" }}
                          >
                            확인
                          </StBtn>
                        </>
                      )}
                    </div>
                  </div>
                </StLine>
                <StLine>
                  {upCategory === "병원" && <StTitle>*대표 수의사</StTitle>}
                  {(upCategory === "미용" || upCategory === "카페") && (
                    <StTitle>*대표자</StTitle>
                  )}
                  <StInput
                    type="text"
                    placeholder="대표명"
                    value={upCeo}
                    onChange={(event) => {
                      setUpCeo(event.target.value);
                    }}
                    size="medium"
                  />
                </StLine>
                <StLine>
                  <StTitle>*대표연락처</StTitle>
                  <StInput
                    type="text"
                    placeholder="000-0000-0000"
                    value={upTelNum}
                    onChange={telNumberHandler}
                    onKeyDown={handleKeyDown}
                    size="medium"
                  />
                </StLine>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <StLine>
                    <StTitle>*영업시간</StTitle>
                    <StInput
                      type="time"
                      placeholder="시작시간"
                      value={upStartTime}
                      onChange={(event) => setUpStartTime(event.target.value)}
                      size="small"
                    />{" "}
                    :
                    <StInput
                      type="time"
                      placeholder="종료시간"
                      value={upEndTime}
                      onChange={(event) => setUpEndTime(event.target.value)}
                      size="small"
                    />
                    <input
                      type="checkbox"
                      value={isChecked}
                      onChange={onCheckHandler}
                    />
                    <label>휴무일</label>
                    <div>
                      {isChecked && (
                        <StHoliday
                          value={upSelect}
                          onChange={(event) => {
                            setUpSelect(event.target.value);
                          }}
                        >
                          요일 ▼<StWeek>월요일</StWeek>
                          <StWeek>화요일</StWeek>
                          <StWeek>수요일</StWeek>
                          <StWeek>목요일</StWeek>
                          <StWeek>금요일</StWeek>
                          <StWeek>토요일</StWeek>
                          <StWeek>일요일</StWeek>
                          <StWeek>주말(토/일)</StWeek>
                        </StHoliday>
                      )}
                    </div>
                  </StLine>
                  <StErrorMsg style={{ height: "20px" }}>
                    <div
                      style={{
                        paddingLeft: "75px",
                        paddingTop: "5px",
                      }}
                    >
                      00:00 형식으로 기입해주세요
                    </div>
                  </StErrorMsg>
                </div>
                {upCategory === "병원" && (
                  <div>
                    <div>
                      <StTitle>기본 진료비</StTitle>
                      <input
                        type="text"
                        value={upCost}
                        onChange={(event) => setUpCost(event.target.value)}
                      />
                    </div>
                    <div>
                      야간진료:
                      <label>
                        가능
                        <input
                          type="radio"
                          value="true"
                          name="aboolean1"
                          checked={upAboolean1 === "true"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        불가능
                        <input
                          type="radio"
                          value="false"
                          name="upAboolean1"
                          checked={upAboolean1 === "false"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <StTitle>진료항목</StTitle>
                      <input
                        type="text"
                        value={upFeature1}
                        onChange={(event) => setUpFeature1(event.target.value)}
                      />
                    </div>
                  </div>
                )}
                {upCategory === "미용" && (
                  <div>
                    <div>
                      <StTitle>기본 미용비</StTitle>
                      <input
                        type="text"
                        value={upCost}
                        onChange={(event) => setUpCost(event.target.value)}
                      />
                    </div>
                    <div>
                      주차여부:
                      <label>
                        가능
                        <input
                          type="radio"
                          value="true"
                          name="upAboolean1"
                          checked={upAboolean1 === "true"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        불가능
                        <input
                          type="radio"
                          value="false"
                          name="upAboolean1"
                          checked={upAboolean1 === "false"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div>
                      예약여부:
                      <label>
                        필요
                        <input
                          type="radio"
                          value="true"
                          name="upAboolean2"
                          checked={upAboolean2 === "true"}
                          onChange={(event) =>
                            setUpAboolean2(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        불필요
                        <input
                          type="radio"
                          value="false"
                          name="upAboolean2"
                          checked={upAboolean2 === "false"}
                          onChange={(event) =>
                            setUpAboolean2(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}
                {upCategory === "카페" && (
                  <div>
                    <div>
                      <StTitle>입장료</StTitle>
                      <input
                        type="text"
                        value={upCost}
                        onChange={(event) => setUpCost(event.target.value)}
                      />
                    </div>
                    <div>
                      주차여부:
                      <label>
                        가능
                        <input
                          type="radio"
                          value="true"
                          name="upAboolean1"
                          checked={upAboolean1 === "true"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        불가능
                        <input
                          type="radio"
                          value="false"
                          name="upAboolean1"
                          checked={upAboolean1 === "false"}
                          onChange={(event) =>
                            setUpAboolean1(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <StTitle>부대시설</StTitle>
                      <input
                        type="text"
                        value={upFeature1}
                        onChange={(event) => setUpFeature1(event.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <StLine>
                    <StTitle>*업체사진</StTitle>
                    <StImgBox>
                      <StBtn onClick={onImgButton} size="small">
                        업로드
                      </StBtn>
                      <p>최대 4장까지 업로드 가능합니다.</p>
                    </StImgBox>
                  </StLine>
                  <StInput
                    type="file"
                    accept="image/*"
                    id="file"
                    multiple
                    onChange={onImgHandler}
                    style={{ display: "none" }}
                    ref={fileInput}
                  />
                  <StImgUpload>
                    <StFakeBox>
                      <StFake />
                      <StFake />
                      <StFake />
                      <StFake />
                    </StFakeBox>
                    <StRealBox>
                      {upImgBase64.map((item, index) => {
                        return <StImg src={item} alt="img" key={index} />;
                      })}
                    </StRealBox>
                  </StImgUpload>
                </div>
                <StBtns>
                  <StBtn size="medium">수정</StBtn>
                  <StBtn
                    onClick={() => navigate(`/hospital/${id}`)}
                    size="medium"
                  >
                    취소
                  </StBtn>
                </StBtns>
              </StForm>
            </StFormBox>
          </StBox>
        </>
      ) : (
        <>
          {detail && (
            // 수정 전 모드
            <StWrap>
              {detail && detail.email === cookies.email && (
                <>
                  <button onClick={onEditMode}>수정</button>
                  <button onClick={() => onDeleteHandler(id)}>삭제</button>
                </>
              )}
              <StSlider>
                <Swiper
                  className="banner"
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {detail?.image?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <StSliderImg src={image} alt={`Image ${index}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </StSlider>
              <button onClick={sharePage}>현재 페이지 공유하기</button>
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
                    <label>대표번호 : {detail.telNum} </label>{" "}
                    <StCopy
                      onClick={() => {
                        handleCopyClipBoard(`${detail.telNum}`);
                      }}
                    >
                      <IoCopyOutline />
                    </StCopy>
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
                    <label>대표번호 : {detail.telNum} </label>{" "}
                    <StCopy
                      onClick={() => {
                        handleCopyClipBoard(`${detail.telNum}`);
                      }}
                    >
                      <IoCopyOutline />
                    </StCopy>
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
                    <div>대표번호 : {detail.telNum} </div>
                    <StCopy
                      onClick={() => {
                        handleCopyClipBoard(`${detail.telNum}`);
                      }}
                    >
                      <IoCopyOutline />
                    </StCopy>
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
                  <Review
                    id={id}
                    queryClient={queryClient}
                    detail={detail}
                    setDetail={setDetail}
                  />
                  {/* <div>전체 리뷰수:{detail.reviewCount}</div>
                  <div>평균평점:{detail.star}</div> */}
                  <ReviewList
                    id={id}
                    queryClient={queryClient}
                    detail={detail}
                    data={data}
                  ></ReviewList>
                </div>
              )}
            </StWrap>
          )}
        </>
      )}
    </Stdiv>
  );
};

export default HospitalDetailForm;

const Stdiv = styled.div`
  width: 100%;
`;

const StWrap = styled.div`
  width: 1240px;
  margin: 60px auto;
  margin-bottom: 100px;
`;

const StSlider = styled.div`
  width: 1240px;
  height: 545px;
  overflow: hidden;
  position: relative;
`;

const StSliderImg = styled.img`
  width: 1240px;
  height: 545px;
`;

const StFirst = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  line-height: 50px;
`;

const StTitleName = styled.div`
  font-size: 34px;
  font-weight: 900;
  margin-right: 10px;
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
`;

const StAverage = styled.div`
  font-size: 16px;
  line-height: 60px;
`;

const StTime = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
`;

const StAddress = styled.div`
  font-size: 24px;
`;

const StClosedDay = styled.div`
  font-size: 20px;
  margin-left: 10px;
  color: #0d0d0d;
  border-left: 1px solid #0d0d0d;
  padding-left: 10px;
`;

const StBox = styled.div`
  width: 100%;
  height: 1200px;
  background-color: #eee;
  margin: 0 auto;
`;

const StPost = styled.div`
  text-align: center;
  padding: 20px 0px;
  padding-top: 60px;
  font-weight: 900;
  font-size: 20px;
`;

const StTitle = styled.div`
  font-weight: 900;
`;

const StLine = styled.div`
  display: flex;
  height: 40px;
  line-height: 40px;
  gap: 10px;
`;

const StErrorMsg = styled.div`
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  color: red;
`;

const StFormBox = styled.div`
  width: 900px;
  height: 800px;
  background-color: white;
  border-radius: 5px;
  margin: 0px auto;
  padding: 70px 20px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
  width: 600px;
`;

const StLabels = styled.div`
  margin-left: 10px;
`;

const StRadio = styled.input.attrs({ type: "radio" })`
  /* display: none; */
  margin-right: 15px;
  cursor: pointer;
`;

const StHoliday = styled.select`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding: 5px 5px;
  width: 80px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
`;

const StWeek = styled.option`
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const StInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding: 10px 15px;
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 400px;
        `;
      case "medium":
        return css`
          width: 200px;
        `;
      case "small":
        return css`
          width: 60px;
        `;
      default:
        return css`
          width: 400px;
        `;
    }
  }}
`;

const StText = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding: 10px 15px;
  width: 560px;
  height: 100px;
  margin-top: 10px;
`;

const StImgBox = styled.div`
  display: flex;
  height: 40px;
  line-height: 10px;
`;

const StImgUpload = styled.div`
  position: relative;
  border: 1px solid transparent;
`;

const StFakeBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

const StFake = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 10px;
  background-color: lightgray;
  border-radius: 5px;
`;

const StRealBox = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 0%;
  overflow: hidden;
  height: 120px;
`;

const StImg = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 10px;
  border-radius: 5px;
`;

const StBtns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StBtn = styled.button`
  cursor: pointer;
  padding: 8px 8px;
  margin-right: 10px;
  border: 1px solid black;
  text-align: center;
  border-radius: 5px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 120px;
        `;
      case "medium":
        return css`
          width: 90px;
        `;
      case "small":
        return css`
          width: 80px;
        `;
      default:
        return css`
          width: 20px;
        `;
    }
  }}
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;

const StContents = styled.div`
  height: 68px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;
  border-bottom: 1px solid #d9d9d9;
`;

const StInformation = styled.div`
  height: 70px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 100px;
`;

const StInfoBox = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const StBold = styled.div`
  font-size: 22px;
  font-weight: 900;
  width: 120px;
`;

const StPlus = styled.div`
  font-size: 20px;
  margin-left: 15px;
`;

const StCopy = styled.button`
  border: none;
  background-color: #ffd53f;
`;

const StMap = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const StTabBtn = styled.button`
  width: 150px;
  height: 45px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 60px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
    border: 1px solid #d9d9d9;
  }
  &.selected {
    background-color: #ffd53f;
  }
`;
