import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDetail } from "../../../api/detail";
import { useCookies } from "react-cookie";
import { deletePost, updatePost } from "../../../api/owner";
import PopupDom from "../../owner/Popup";
import DaumPostcode from "react-daum-postcode";
import {
  StDelBtn,
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
  StFakeBox,
  StFake,
  StRealBox,
  StImg,
  StBtns,
  StBtn,
  Stdiv,
  StMent,
  StWrap,
} from "./AllDetailFormStyle";
import AllDetailList from "./AllDetailList";

const AllDetailForm = () => {
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

  const handleSelect = (e) => {
    if (e.target.value.startsWith("010-")) {
      e.target.setSelectionRange(12, e.target.value.length);
    }
  };

  return (
    <>
      {edit ? (
        // 수정 모드

        <StBox>
          <StPost>업체 수정</StPost>
          <StFormBox>
            <StForm onSubmit={onUpdateHandler} encType="multipart/form-data">
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
                      checked={upCategory === "병원"}
                      onChange={(event) => {
                        setUpCategory(event.target.value);
                      }}
                    />
                  </StRadioLabel>
                  <StRadioLabel>
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
                  </StRadioLabel>
                  <StRadioLabel>
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
                  </StRadioLabel>
                </StLabels>
              </StLine>
              <StLine>
                <StTitle>
                  {" "}
                  <StImp>*</StImp>업체명
                </StTitle>
                <StInput
                  type="text"
                  placeholder="업체명"
                  value={upTitle}
                  onChange={(event) => {
                    setUpTitle(event.target.value);
                  }}
                />
              </StLine>
              <StLine>
                <StContents>
                  <StTitle>
                    <StImps>*</StImps>소개
                  </StTitle>
                  <StText
                    placeholder="소개글을 입력해주세요.(500자 이내)"
                    maxLength={500}
                    value={upContents}
                    onChange={(event) => {
                      setUpContents(event.target.value);
                    }}
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
                {upCategory === "병원" && (
                  <StTitle>
                    {" "}
                    <StImp>*</StImp>대표 수의사
                  </StTitle>
                )}
                {(upCategory === "미용" || upCategory === "카페") && (
                  <StTitle>
                    {" "}
                    <StImp>*</StImp>대표자
                  </StTitle>
                )}
                <StInput
                  type="text"
                  placeholder="대표명"
                  value={upCeo}
                  onChange={(event) => {
                    setUpCeo(event.target.value);
                  }}
                />
              </StLine>
              <StLine>
                <StTitle>
                  {" "}
                  <StImp>*</StImp>대표자
                </StTitle>
                <StInput
                  type="text"
                  placeholder="000-0000-0000"
                  value={upTelNum}
                  onChange={telNumberHandler}
                  onKeyDown={handleKeyDown}
                  onSelect={handleSelect}
                  onDragStart={(event) => event.preventDefault()}
                />
              </StLine>

              {upCategory === "병원" && (
                <div>
                  <StLine>
                    <StTitle>기본 진료비</StTitle>
                    <StInput
                      type="text"
                      value={upCost}
                      onChange={(event) => setUpCost(event.target.value)}
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
                        checked={upAboolean1 === "true"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
                      />
                    </StLabels>
                    <StLabels>
                      불가능
                      <input
                        type="radio"
                        value="false"
                        name="upAboolean1"
                        checked={upAboolean1 === "false"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
                      />
                    </StLabels>
                  </StLine>
                  <StLine>
                    <StTitle>진료항목</StTitle>
                    <StInput
                      type="text"
                      value={upFeature1}
                      onChange={(event) => setUpFeature1(event.target.value)}
                    />
                  </StLine>
                </div>
              )}
              {upCategory === "미용" && (
                <div>
                  <StLine>
                    <StTitle>기본 미용비</StTitle>
                    <StInput
                      type="text"
                      value={upCost}
                      onChange={(event) => setUpCost(event.target.value)}
                    />
                  </StLine>
                  <StLine>
                    <StTitle>주차여부</StTitle>
                    <StLabels>
                      가능
                      <input
                        type="radio"
                        value="true"
                        name="upAboolean1"
                        checked={upAboolean1 === "true"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
                      />
                    </StLabels>
                    <StLabels>
                      불가능
                      <input
                        type="radio"
                        value="false"
                        name="upAboolean1"
                        checked={upAboolean1 === "false"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
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
                        name="upAboolean2"
                        checked={upAboolean2 === "true"}
                        onChange={(event) => setUpAboolean2(event.target.value)}
                      />
                    </StLabels>
                    <StLabels>
                      불필요
                      <input
                        type="radio"
                        value="false"
                        name="upAboolean2"
                        checked={upAboolean2 === "false"}
                        onChange={(event) => setUpAboolean2(event.target.value)}
                      />
                    </StLabels>
                  </StLine>
                </div>
              )}
              {upCategory === "카페" && (
                <div>
                  <StLine>
                    <StTitle>입장료</StTitle>
                    <StInput
                      type="text"
                      value={upCost}
                      onChange={(event) => setUpCost(event.target.value)}
                    />
                  </StLine>
                  <StLine>
                    <StTitle>주차여부</StTitle>
                    <StLabels>
                      가능
                      <input
                        type="radio"
                        value="true"
                        name="upAboolean1"
                        checked={upAboolean1 === "true"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
                      />
                    </StLabels>
                    <StLabels>
                      불가능
                      <input
                        type="radio"
                        value="false"
                        name="upAboolean1"
                        checked={upAboolean1 === "false"}
                        onChange={(event) => setUpAboolean1(event.target.value)}
                      />
                    </StLabels>
                  </StLine>
                  <StLine>
                    <StTitle>부대시설</StTitle>
                    <StInput
                      type="text"
                      value={upFeature1}
                      onChange={(event) => setUpFeature1(event.target.value)}
                    />
                  </StLine>
                </div>
              )}
              <div>
                <StTimeBox>
                  <StLine>
                    <StTitle>
                      <StImp>*</StImp>영업시간
                    </StTitle>
                    <StInput
                      type="time"
                      placeholder="시작시간"
                      value={upStartTime}
                      onChange={(event) => setUpStartTime(event.target.value)}
                      size="small"
                    />
                    :
                    <StInput
                      type="time"
                      placeholder="종료시간"
                      value={upEndTime}
                      onChange={(event) => setUpEndTime(event.target.value)}
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
                </StTimeBox>
                <StLine>
                  <StTitle>
                    {" "}
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
                    {upImgBase64.map((item, index) => {
                      return <StImg src={item} alt="img" key={index} />;
                    })}
                  </StRealBox>
                </StImgUpload>
              </div>
              <StBtns>
                <StBtn size="large">수정</StBtn>
                <StBtn onClick={() => navigate(`/hospital/${id}`)} size="large">
                  취소
                </StBtn>
              </StBtns>
            </StForm>
          </StFormBox>
        </StBox>
      ) : (
        <>
          {detail && (
            // 수정 전 모드
            <StWrap>
              {detail && detail.email === cookies.email && (
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    width: "1240px",
                    justifyContent: "flex-end",
                  }}
                >
                  <StDelBtn onClick={onEditMode}>수정</StDelBtn>
                  <StDelBtn onClick={() => onDeleteHandler(id)}>삭제</StDelBtn>
                </div>
              )}
              <AllDetailList
                id={id}
                queryClient={queryClient}
                detail={detail}
                setDetail={setDetail}
                data={data}
              />
            </StWrap>
          )}
        </>
      )}
    </>
  );
};

export default AllDetailForm;
