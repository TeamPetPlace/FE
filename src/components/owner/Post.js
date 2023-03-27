import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import PopupDom from "./Popup";
import DaumPostcode from "react-daum-postcode";
import { useMutation, useQueryClient } from "react-query";
import { addPost, checkTitle } from "../../api/owner";

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

  //업체 등록
  const [title, titleHandler] = useInput("");
  const [category, setCategory] = useState("병원");
  // const [category, categoryHandler] = useInput("병원");
  const [contents, contentsHandler] = useInput("");
  const [image, setImage] = useState([]);
  const [imgBase64, setImgBase64] = useState([]);
  const [cost, setCostHandler] = useInput("");
  const [ceo, ceoHandler] = useInput("");
  const [telNum, setTelNum] = useState("010");
  const [startTime, startTimeHandler] = useInput("");
  const [endTime, endTimeHandler] = useInput("");
  const [select, selectHandler] = useInput("");
  const [aboolean1, aboolean1Handler] = useInput("");
  const [aboolean2, aboolean2Handler] = useInput("");
  const [feature1, feature1Handler] = useInput("");

  const [buttonClicked, setButtonClicked] = useState(false);
  const [titleButtonClicked, setTitleButtonClicked] = useState(false);

  const maxImage = 4;

  //업체 중복확인
  const [isTitle, setIsTitle] = useState(false);
  const checkTitleMutation = useMutation(checkTitle, {
    onSuccess: (response) => {
      response ? setIsTitle(true) : setIsTitle(false);
      if (response) {
        setIsTitle(true);
        alert("등록 가능한 업체명입니다.");
      } else {
        setIsTitle(false);
        alert("이미 존재하는 업체명입니다.");
      }
    },
  });

  const checkTitleHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.target.value.trim()) return;
    setTitleButtonClicked(true);
    checkTitleMutation.mutate(event.target.value);
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
    if (buttonClicked === false) {
      return alert("주소 확인을 해주세요");
    }
    if (titleButtonClicked === false) {
      return alert("업체명 중복확인을 해주세요");
    }
    if (isTitle === false) {
      return alert("이미 존재하는 업체명입니다");
    }
    const formData = new FormData();
    image.forEach((image, index) => formData.append("image", image));
    formData.append("title", title);
    formData.append("category", category);
    formData.append("contents", contents);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("address", address);
    formData.append("cost", cost);
    formData.append("ceo", ceo);
    formData.append("telNum", telNum);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("closedDay", select);
    formData.append("aboolean1", aboolean1);
    formData.append("aboolean2", aboolean2);
    formData.append("feature1", feature1);
    addPostMutation.mutate(formData);
    alert("작성 완료");
    if (category === "병원") {
      navigate("/hospital");
    } else if (category === "미용") {
      navigate("/shop");
    } else {
      navigate("/cafe");
    }
  };

  //이미지 프리뷰
  const onImgHandler = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > maxImage) {
      alert(`최대 ${maxImage}개의 이미지만 선택 가능합니다.`);
      return;
    }
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

  const telNumberHandler = (event) => {
    const { value } = event.target;
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(event.target.value)) {
      setTelNum(value);
    }
  };

  useEffect(() => {
    if (telNum.length === 10) {
      setTelNum(telNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (telNum.length === 13) {
      setTelNum(
        telNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [telNum]);

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

  const handleSelect = (e) => {
    if (e.target.value.startsWith("010-")) {
      e.target.setSelectionRange(12, e.target.value.length);
    }
  };

  return (
    <>
      <StBox>
        <StPost>업체등록</StPost>
        <StFormBox>
          <StForm onSubmit={onSubmitHandler} encType="multipart/form-data">
            <StLine>
              <StTitle>*업종</StTitle>
              <StLabels>
                <label>
                  병원
                  <StRadio
                    type="radio"
                    value="병원"
                    name="category"
                    checked={category === "병원"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </label>
                <label>
                  미용
                  <StRadio
                    type="radio"
                    value="미용"
                    name="category"
                    checked={category === "미용"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </label>
                <label>
                  카페
                  <StRadio
                    type="radio"
                    value="카페"
                    name="category"
                    checked={category === "카페"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </label>
              </StLabels>
            </StLine>
            <StLine>
              <StTitle>*업체명</StTitle>
              <StInput
                type="text"
                placeholder="업체명"
                value={title}
                onChange={titleHandler}
              />
              <StBtn onClick={checkTitleHandler} value={title} size="medium">
                중복확인
              </StBtn>
            </StLine>
            <StErrorMsg
              style={{
                height: "20px",
                paddingLeft: "60px",
                marginTop: "-25px",
              }}
            >
              {titleButtonClicked === false ? (
                <p>업체명 중복확인을 해주세요</p>
              ) : null}
            </StErrorMsg>

            <div>
              <StTitle>*소개</StTitle>
              <StText
                placeholder="소개글을 입력해주세요.(500자 이내)"
                maxLength={250}
                value={contents}
                onChange={contentsHandler}
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
              {category === "병원" && <StTitle>*대표 수의사</StTitle>}
              {(category === "미용" || category === "카페") && (
                <StTitle>*대표자</StTitle>
              )}
              <StInput
                type="text"
                placeholder="대표명"
                value={ceo}
                onChange={ceoHandler}
                size="medium"
              />
            </StLine>
            <StLine>
              <StTitle>*대표연락처</StTitle>
              <StInput
                type="text"
                placeholder="010-0000-0000"
                value={telNum}
                onChange={telNumberHandler}
                onKeyDown={handleKeyDown}
                onSelect={handleSelect}
                onDragStart={(event) => event.preventDefault()}
                size="medium"
              />
            </StLine>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <StLine>
                <StTitle>*영업시간</StTitle>
                <StInput
                  type="time"
                  placeholder="시작시간"
                  value={startTime}
                  onChange={startTimeHandler}
                  size="small"
                />
                :
                <StInput
                  type="time"
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
            {category === "병원" && (
              <div>
                <div>
                  <StTitle>기본 진료비</StTitle>
                  <input
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
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
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </label>
                  <label>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
                    />
                  </label>
                </div>
                <div>
                  <StTitle>진료항목</StTitle>
                  <input
                    type="text"
                    placeholder="중성화, 슬개골 수술…"
                    value={feature1}
                    onChange={feature1Handler}
                  />
                </div>
              </div>
            )}
            {category === "미용" && (
              <div>
                <div>
                  <StTitle>기본 미용비</StTitle>
                  <input
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
                  />
                </div>
                <div>
                  주차여부:
                  <label>
                    가능
                    <input
                      type="radio"
                      value="true"
                      name="aboolean1"
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </label>
                  <label>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
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
                      name="aboolean2"
                      checked={aboolean2 === "true"}
                      onChange={aboolean2Handler}
                    />
                  </label>
                  <label>
                    불필요
                    <input
                      type="radio"
                      value="false"
                      name="aboolean2"
                      checked={aboolean2 === "false"}
                      onChange={aboolean2Handler}
                    />
                  </label>
                </div>
              </div>
            )}
            {category === "카페" && (
              <div>
                <div>
                  <StTitle>입장료</StTitle>
                  <input
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
                  />
                </div>
                <div>
                  주차여부:
                  <label>
                    가능
                    <input
                      type="radio"
                      value="true"
                      name="aboolean1"
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </label>
                  <label>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
                    />
                  </label>
                </div>
                <div>
                  <StTitle>부대시설</StTitle>
                  <input
                    type="text"
                    placeholder="수영장, 운동장…"
                    value={feature1}
                    onChange={feature1Handler}
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

const StErrorMsg = styled.div`
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  color: red;
`;

const StFormBox = styled.div`
  width: 900px;
  height: 850px;
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
