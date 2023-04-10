import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDetail } from "../../../api/detail";
import { useCookies } from "react-cookie";
import { deletePost, updatePost } from "../../../api/owner";
import {
  StBox,
  StPost,
  StTitle,
  StContents,
  StImp,
  StImps,
  StRadioLabel,
  StLine,
  StPostBox,
  StErrorMsg,
  StFormBox,
  StForm,
  StLabels,
  StRadio,
  StTimeBox,
  StColumn,
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
  StMent,
  StWrap,
  StBtnBoxs,
} from "./AllDetailFormStyle";
import AllDetailList from "./AllDetailList";
import Button from "../../../element/Button";

const AllDetailForm = () => {
  const [cookies] = useCookies(["AccessToken", "email"]);
  const navigate = useNavigate();

  //상세페이지 조회
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const [slideImg, setSlideImg] = useState([]);
  const { data, refetch } = useQuery("getdetail", () => getDetail(`${id}`), {
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
      setAddress(detail.address);
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
  const [address, setAddress] = useState("");
  const addrRef = useRef();

  const handlePostCode = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        var addr = "";
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        addrRef.current.value = addr;
        setAddress(addr);
      },
    }).open();
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

  //사진 재등록
  const handleReset = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setUpImage([]);
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    // imgBase64 배열 초기화
    setUpImgBase64([]);
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
    if (upImage.length === 0) {
      return alert("이미지를 업로드해주세요");
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

  //전화번호
  const telNumberHandler = (event) => {
    const { value } = event.target;
    const regex = /^[0-9\b -]{0,14}$/; // Update regex to allow for 14 characters
    if (regex.test(event.target.value)) {
      setUpTelNum(value);
    }
  };

  useEffect(() => {
    let formattedNum = upTelNum;
    if (upTelNum.length === 10) {
      formattedNum = upTelNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (upTelNum.length === 13) {
      formattedNum = upTelNum
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (upTelNum.length === 14) {
      // Add condition for 14 characters
      formattedNum = upTelNum
        .replace(/-/g, "")
        .replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3"); // Update regex and replace pattern for 4-4-4 format
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

    setUpTelNum(formattedNum);
  }, [upTelNum]);

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
                  maxLength={20}
                />
              </StLine>
              <StLine>
                <StContents>
                  <StTitle>
                    <StImps>*</StImps>소개
                  </StTitle>
                  <StText
                    placeholder="소개글을 입력해주세요.(250자 이내)"
                    maxLength={250}
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
                <StPostBox>
                  <div style={{ display: "flex" }}>
                    <Button
                      type="button"
                      onClick={handlePostCode}
                      size="postGray"
                    >
                      우편번호 검색
                    </Button>
                    <StErrorMsg>
                      {buttonClicked === false ? (
                        <p>주소 입력 후 확인을 꼭 클릭해주세요</p>
                      ) : null}
                    </StErrorMsg>
                  </div>
                  <StInput value={address} ref={addrRef} disabled />
                  <Button size="postGray" onClick={handleSearch}>
                    확인
                  </Button>
                </StPostBox>
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
                  maxLength={10}
                />
              </StLine>
              <StLine>
                <StTitle>
                  {" "}
                  <StImp>*</StImp>대표자
                </StTitle>
                <StInput
                  type="text"
                  placeholder="번호를 입력해주세요"
                  value={upTelNum}
                  onChange={telNumberHandler}
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
                      maxLength={30}
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
                      maxLength={30}
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
                      maxLength={30}
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
                      maxLength={30}
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
                      maxLength={30}
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
                    <StColumn>
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
                    </StColumn>
                  </StLine>
                </StTimeBox>
                <StLine>
                  <StTitle>
                    {" "}
                    <StImp>*</StImp>업체사진
                  </StTitle>
                  <StImgBox>
                    <div style={{ display: "flex" }}>
                      <Button onClick={onImgButton} size="postGray">
                        업로드
                      </Button>
                      <Button onClick={handleReset} size="postGray">
                        사진 재등록
                      </Button>
                    </div>
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
                <Button size="postYellow">수정</Button>
                <Button
                  onClick={() => navigate(`/hospital/${id}`)}
                  size="postYellow"
                  style={{ marginLeft: "20px" }}
                >
                  취소
                </Button>
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
                <StBtnBoxs>
                  <Button size="smallGray" onClick={onEditMode}>
                    수정
                  </Button>
                  <Button size="smallGray" onClick={() => onDeleteHandler(id)}>
                    삭제
                  </Button>
                </StBtnBoxs>
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
