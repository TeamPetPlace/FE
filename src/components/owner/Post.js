import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import PopupDom from "./Popup";
import DaumPostcode from "react-daum-postcode";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../../api/owner";
import KakaoMap from "react-kakao-maps/lib/MapLib/KakaoMap";
import Marker from "react-kakao-maps/lib/MapLib/Marker";
// import geocoder from "geocoder";

function Post() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });

  //좌표
  const { kakao } = window;
  // console.log(kakao.maps.services);
  // const apiKey = "c467b978bcec068d4109736b2039502c";
  // const kakaoAddress = "서울특별시 강남구 역삼동 123-45";

  // kakao.maps.services.Geocoder.addressSearch(
  //   kakaoAddress,
  //   (result, status) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 좌표를 출력합니다.
  //       console.log(result[0].y, result[0].x);
  //     } else {
  //       console.error(
  //         "Geocode was not successful for the following reason:",
  //         status
  //       );
  //     }
  //   },
  //   { headers: { Authorization: `KakaoAK ${apiKey}` } }
  // );

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const mapdata = lat + "," + lng;
  const handleSearch = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLat(result[0].y);
        setLng(result[0].x);
      } else {
        alert("주소 검색에 실패했습니다.");
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

  //업체 등록
  const [category, categoryHandler] = useInput("");
  const [title, titleHandler] = useInput("");
  const [contents, contentsHandler] = useInput("");
  const [ceo, ceoHandler] = useInput("");
  const [telNum, telNumHandler] = useInput("");
  const [startTime, startTimeHandler] = useInput("");
  const [endTime, endTimeHandler] = useInput("");
  const [select, selectHandler] = useInput("");
  const [image, setImage] = useState([]);
  const [imgBase64, setImgBase64] = useState([]);

  const onTestHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    event.persist();
    if (
      category.trim() === "" ||
      title.trim() === "" ||
      contents.trim() === "" ||
      address.trim() === "" ||
      ceo.trim() === "" ||
      telNum.trim() === "" ||
      startTime.trim() === "" ||
      endTime.trim() === "" ||
      !image
    )
      return alert("빈칸을 모두 채워주세요");
    const formData = new FormData();
    // files.forEach(file => formData.append('images', file));
    Object.values(image).forEach((image) => formData.append("image", image));
    // image.forEach((image, index) => formData.append(`image${index}`, image));
    formData.append("category", category);
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("address", address);
    formData.append("mapdata", mapdata);
    formData.append("ceo", ceo);
    formData.append("telNum", telNum);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("closedDay", select);
    addPostMutation.mutate(formData);
    alert("작성 완료");
    navigate("/main");
  };

  //이미지 프리뷰
  const onImgHandler = (event) => {
    const files = Array.from(event.target.files);
    setImage((prevImage) => [...prevImage, ...files]);

    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
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

  return (
    <>
      <StBox>
        <StPost>업체등록</StPost>
        {/* <KakaoMap
          apikey="c467b978bcec068d4109736b2039502c"
          center={{ lat: 37.5665, lng: 126.978 }}
          levet={4}
        >
          <Marker position={{ lat: 37.5665, lng: 126.978 }} />
        </KakaoMap> */}
        <StFormBox>
          <StForm onSubmit={onSubmitHandler} encType="multipart/form-data">
            <StLine>
              <StTitle>업종</StTitle>
              <StLabels>
                <label>
                  병원
                  <StRadio
                    type="radio"
                    value="병원"
                    name="category"
                    checked={category === "병원"}
                    onChange={categoryHandler}
                  />
                </label>
                <label>
                  미용
                  <StRadio
                    type="radio"
                    value="미용"
                    name="category"
                    checked={category === "미용"}
                    onChange={categoryHandler}
                  />
                </label>
                <label>
                  카페
                  <StRadio
                    type="radio"
                    value="카페"
                    name="category"
                    checked={category === "카페"}
                    onChange={categoryHandler}
                  />
                </label>
              </StLabels>
            </StLine>
            <StLine>
              <StTitle>업체명</StTitle>
              <StInput
                type="text"
                placeholder="업체명"
                value={title}
                onChange={titleHandler}
              />
              <StBtn onClick={onTestHandler} size="medium">
                중복확인
              </StBtn>
            </StLine>
            <div>
              <StTitle>소개</StTitle>
              <StText
                placeholder="소개글을 입력해주세요.(500자 이내)"
                maxLength={500}
                value={contents}
                onChange={contentsHandler}
              />
            </div>
            <StLine style={{ marginBottom: "40px" }}>
              <StTitle>주소</StTitle>
              <div>
                <StBtn type="button" onClick={openPostCode} size="large">
                  우편번호 검색
                </StBtn>
                <div id="popupDom">
                  {isPopupOpen && (
                    <PopupDom>
                      <div>
                        <DaumPostcode
                          style={postCodeStyle}
                          onComplete={handlePostCode}
                        />
                        <StInput value={address} disabled />
                        <button onClick={handleSearch}>확인</button>
                      </div>
                    </PopupDom>
                  )}
                  {!isPopupOpen && <StInput disabled />}
                </div>
              </div>
            </StLine>
            <StLine>
              <StTitle>대표명</StTitle>
              <StInput
                type="text"
                placeholder="대표명"
                value={ceo}
                onChange={ceoHandler}
                size="medium"
              />
            </StLine>
            <StLine>
              <StTitle>대표연락처</StTitle>
              <StInput
                type="text"
                placeholder="000-0000-0000"
                value={telNum}
                onChange={telNumHandler}
                size="medium"
              />
            </StLine>
            <StLine>
              <StTitle>영업시간</StTitle>
              <StInput
                type="text"
                placeholder="시작시간"
                value={startTime}
                onChange={startTimeHandler}
                size="small"
              />{" "}
              :
              <StInput
                type="text"
                placeholder="종료시간"
                value={endTime}
                onChange={endTimeHandler}
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
                  <StHoliday value={select} onChange={selectHandler}>
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
            <div>
              <StLine>
                <StTitle>업체사진</StTitle>
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
                multiple="multiple"
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
                  {imgBase64.map((item, index) => {
                    return <StImg src={item} alt="img" key={index} />;
                  })}
                </StRealBox>
              </StImgUpload>
            </div>
            <StBtns>
              <StBtn size="medium">등록</StBtn>
              <StBtn onClick={() => navigate("/main")} size="medium">
                취소
              </StBtn>
            </StBtns>
          </StForm>
        </StFormBox>
      </StBox>
    </>
  );
}

export default Post;

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
