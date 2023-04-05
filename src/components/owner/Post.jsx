import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import PopupDom from "./Popup";
import DaumPostcode from "react-daum-postcode";
import { useMutation, useQueryClient } from "react-query";
import { addPost, checkTitle } from "../../api/owner";
import {
  StBox,
  StPost,
  StTitle,
  StContents,
  StImp,
  StImps,
  StRadioLabel,
  StLine,
  StLines,
  StErrorMsg,
  StErrorMsgs,
  StFormBox,
  StForm,
  StLabels,
  StRadio,
  StTimeBox,
  StHoliday,
  StWeek,
  StInput,
  StText,
  StImgBox,
  StImgUpload,
  StMent,
  StFakeBox,
  StFake,
  StRealBox,
  StImg,
  StBtns,
  StBtn,
} from "./PostStyle";

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
  const [telNum, setTelNum] = useState("");
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

  //전화번호
  // const telNumberHandler = (event) => {
  //   const { value } = event.target;
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(event.target.value)) {
  //     setTelNum(value);
  //   }
  // };

  // useEffect(() => {
  //   if (telNum.length === 10) {
  //     setTelNum(telNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
  //   }
  //   if (telNum.length === 13) {
  //     setTelNum(
  //       telNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  //     );
  //   }
  // }, [telNum]);

  // const handleKeyDown = (e) => {
  //   const key = e.key;
  //   const selectionStart = e.target.selectionStart;
  //   const selectionEnd = e.target.selectionEnd;

  //   if (key === "Backspace" || key === "Delete") {
  //     if (selectionStart === 3 && selectionEnd === 3) {
  //       e.preventDefault();
  //     }
  //   }
  // };

  // const handleSelect = (e) => {
  //   if (e.target.value.startsWith("010-")) {
  //     e.target.setSelectionRange(12, e.target.value.length);
  //   }
  // };

  const telNumberHandler = (event) => {
    const { value } = event.target;
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(event.target.value)) {
      setTelNum(value);
    }
  };

  useEffect(() => {
    let formattedNum = telNum;
    if (telNum.length === 10) {
      formattedNum = telNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    if (telNum.length === 13) {
      formattedNum = telNum
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }

    if (formattedNum.startsWith("02")) {
      formattedNum = formattedNum.replace(
        /(\d{2})(\d{3,4})(\d{4})/,
        "$1-$2-$3"
      );
    } else {
      formattedNum = formattedNum.replace(
        /(\d{3})(\d{3,4})(\d{4})/,
        "$1-$2-$3"
      );
    }

    setTelNum(formattedNum);
  }, [telNum]);

  return (
    <>
      <StBox>
        <StPost>업체 등록</StPost>
        <StFormBox>
          <StForm onSubmit={onSubmitHandler} encType="multipart/form-data">
            <StLine>
              <StTitle>
                <StImp>*</StImp>업종
              </StTitle>
              <StLabels>
                <StRadioLabel>
                  병원
                  <StRadio
                    type="radio"
                    value="병원"
                    name="category"
                    checked={category === "병원"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </StRadioLabel>
                <StRadioLabel>
                  미용
                  <StRadio
                    type="radio"
                    value="미용"
                    name="category"
                    checked={category === "미용"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </StRadioLabel>
                <StRadioLabel>
                  카페
                  <StRadio
                    type="radio"
                    value="카페"
                    name="category"
                    checked={category === "카페"}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </StRadioLabel>
              </StLabels>
            </StLine>
            <StLine>
              <StTitle>
                <StImp>*</StImp>업체명
              </StTitle>
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
            <StErrorMsgs>
              {titleButtonClicked === false ? (
                <p>업체명 중복확인을 해주세요</p>
              ) : null}
            </StErrorMsgs>
            <StLine>
              <StContents>
                <StTitle>
                  <StImps>*</StImps>소개
                </StTitle>
                <StText
                  placeholder="소개글을 입력해주세요.(500자 이내)"
                  maxLength={250}
                  value={contents}
                  onChange={contentsHandler}
                />
              </StContents>
            </StLine>
            <StLine>
              <StTitle>
                <StImp>*</StImp>주소
              </StTitle>
              <div>
                <div style={{ display: "flex" }}>
                  <StBtn type="button" onClick={openPostCode} size="medium">
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
                        <StBtn size="medium" onClick={handleSearch}>
                          확인
                        </StBtn>
                      </div>
                    </PopupDom>
                  )}
                  {!isPopupOpen && (
                    <>
                      <StInput disabled style={{ marginTop: "10px" }} />
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
              {category === "병원" && (
                <StTitle>
                  <StImp>*</StImp>대표 수의사
                </StTitle>
              )}
              {(category === "미용" || category === "카페") && (
                <StTitle>
                  <StImp>*</StImp>대표자
                </StTitle>
              )}
              <StInput
                type="text"
                placeholder="대표명"
                value={ceo}
                onChange={ceoHandler}
              />
            </StLine>
            <StLine>
              <StTitle>
                <StImp>*</StImp>대표 번호
              </StTitle>
              <StInput
                type="text"
                placeholder="번호를 입력해주세요"
                value={telNum}
                onChange={telNumberHandler}
              />
            </StLine>

            {category === "병원" && (
              <div>
                <StLine>
                  <StTitle>기본 진료비</StTitle>
                  <StInput
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
                  />
                </StLine>
                <StLine>
                  <StTitle>야간진료</StTitle>
                  <StLabels>
                    가능
                    <input
                      type="radio"
                      value="true"
                      name="aboolean1"
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </StLabels>
                  <tLabels>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
                    />
                  </tLabels>
                </StLine>
                <StLine>
                  <StTitle>진료항목</StTitle>
                  <StInput
                    type="text"
                    placeholder="중성화, 슬개골 수술…"
                    value={feature1}
                    onChange={feature1Handler}
                  />
                </StLine>
              </div>
            )}
            {category === "미용" && (
              <div>
                <StLine>
                  <StTitle>기본 미용비</StTitle>
                  <StInput
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
                  />
                </StLine>
                <StLine>
                  <StTitle>주차여부</StTitle>
                  <StLabels>
                    가능
                    <input
                      type="radio"
                      value="true"
                      name="aboolean1"
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </StLabels>
                  <StLabels>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
                    />
                  </StLabels>
                </StLine>
                <StLine>
                  <StTitle>예약여부</StTitle>
                  <StLabels>
                    필요
                    <input
                      type="radio"
                      value="true"
                      name="aboolean2"
                      checked={aboolean2 === "true"}
                      onChange={aboolean2Handler}
                    />
                  </StLabels>
                  <StLabels>
                    불필요
                    <input
                      type="radio"
                      value="false"
                      name="aboolean2"
                      checked={aboolean2 === "false"}
                      onChange={aboolean2Handler}
                    />
                  </StLabels>
                </StLine>
              </div>
            )}
            {category === "카페" && (
              <div>
                <StLine>
                  <StTitle>입장료</StTitle>
                  <StInput
                    type="text"
                    placeholder="3-10만원"
                    value={cost}
                    onChange={setCostHandler}
                  />
                </StLine>
                <StLine>
                  <StTitle>주차여부</StTitle>
                  <StLabels>
                    가능
                    <input
                      type="radio"
                      value="true"
                      name="aboolean1"
                      checked={aboolean1 === "true"}
                      onChange={aboolean1Handler}
                    />
                  </StLabels>
                  <StLabels>
                    불가능
                    <input
                      type="radio"
                      value="false"
                      name="aboolean1"
                      checked={aboolean1 === "false"}
                      onChange={aboolean1Handler}
                    />
                  </StLabels>
                </StLine>
                <StLine>
                  <StTitle>부대시설</StTitle>
                  <StInput
                    type="text"
                    placeholder="수영장, 운동장…"
                    value={feature1}
                    onChange={feature1Handler}
                  />
                </StLine>
              </div>
            )}

            <div>
              <StTimeBox>
                <StLines>
                  <StTitle>
                    <StImp>*</StImp>영업시간
                  </StTitle>
                  <StInput
                    type="time"
                    placeholder="시작시간"
                    value={startTime}
                    onChange={startTimeHandler}
                    size="small"
                  />
                  ㅡ
                  <StInput
                    type="time"
                    placeholder="종료시간"
                    value={endTime}
                    onChange={endTimeHandler}
                    size="small"
                    style={{ marginLeft: "20px" }}
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
                </StLines>
              </StTimeBox>
              <StLine>
                <StTitle>
                  <StImp>*</StImp>업체사진
                </StTitle>
                <StImgBox>
                  <StBtn onClick={onImgButton} size="medium">
                    업로드
                  </StBtn>
                  <StMent>최대 4장까지 업로드 가능합니다.</StMent>
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
                  <StTitle></StTitle>
                  <StFake />
                  <StFake />
                  <StFake />
                  <StFake />
                </StFakeBox>
                <StRealBox>
                  <StTitle></StTitle>
                  {imgBase64.map((item, index) => {
                    return <StImg src={item} alt="img" key={index} />;
                  })}
                </StRealBox>
              </StImgUpload>
            </div>
            <StBtns>
              <StBtn size="large">등록</StBtn>
              <StBtn onClick={() => navigate("/main")} size="large">
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
