import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { addDibs, cancelDibs, getPost } from "../../../api/main";
import { setCookie } from "../../../api/cookie";
import cafe from "../../../style/img/cafe.svg";
import hospital from "../../../style/img/hospital.svg";
import shop from "../../../style/img/shop.svg";
import dibs from "../../../style/img/dibs.svg";
import noDibs from "../../../style/img/noDibs.svg";
import clickedHospital from "../../../style/img/clickedHospital.svg";
import clickedShop from "../../../style/img/clickedShop.svg";
import clickedCafe from "../../../style/img/clickedCafe.svg";
import footMap from "../../../style/img/footMap.svg";
import {
  StWrap,
  StPlace,
  StMyPlace,
  StTabBox,
  StTabs,
  StTabText,
  StTabImg,
  StCard,
  StResizeImg,
  StTextBox,
  StTitle,
  StText,
  StPin,
  StDivBox,
} from "./TabStyle";
import Button from "../../../element/Button";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Fade } from "react-reveal";

function Tab() {
  const [category, setCategory] = useState("병원");
  const navigate = useNavigate();

  const [lat, setLat] = useState(37.555078);
  const [lng, setLng] = useState(126.970702);

  //현재 사용자의 위치 정보
  const onLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLat(lat);
        setLng(lng);
        console.log(`latitude: ${lat}, longitude: ${lng}`);
        setCookie("lat", lat);
        setCookie("lng", lng);
      },
      (error) => {
        setLat(37.555078);
        setLng(126.970702);
        console.log(`위치no:latitude: ${lat}, longitude: ${lng}`);
        setCookie("lat", lat);
        setCookie("lng", lng);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  const { data } = useQuery(
    [
      "getPost",
      {
        category: category,
        lat: lat,
        lng: lng,
      },
    ],
    () =>
      getPost({
        category: category,
        lat: lat,
        lng: lng,
      }),
    {
      onSuccess: (response) => {
        return response;
      },
    }
  );

  useEffect(() => {
    onLocationHandler();
  }, []);

  //메인 탭
  const mainTabList = [
    {
      id: 0,
      text: "병원",
      category: "병원",
      img: hospital,
      altImg: clickedHospital,
    },
    { id: 1, text: "미용", category: "미용", img: shop, altImg: clickedShop },
    { id: 2, text: "카페", category: "카페", img: cafe, altImg: clickedCafe },
  ];

  const [checked, setChecked] = useState([true, false, false]);
  const [currentImg, setCurrentImg] = useState(mainTabList[0].img);

  const onClickHandler = (i) => {
    const newArr = Array(mainTabList.length).fill(false);
    newArr[i] = true;

    setChecked(newArr);
    setCurrentImg(mainTabList[i].altImg);
    if (i === 0) {
      setCategory("병원");
    } else if (i === 1) {
      setCategory("미용");
    } else if (i === 2) {
      setCategory("카페");
    }
  };

  //찜하기
  const queryClient = useQueryClient();

  const addDibsMutation = useMutation(addDibs, {
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "찜하기",
        text: "마이페이지 '찜목록'에서 확인이 가능합니다!",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
      queryClient.invalidateQueries("getPost");
    },
  });

  const cancelDibsMutation = useMutation(cancelDibs, {
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "찜하기 취소",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
      queryClient.invalidateQueries("getPost");
    },
  });

  const onDibsHandler = (item) => {
    const payload = {
      id: item.id,
    };
    if (item.like === false) {
      addDibsMutation.mutate(payload);
    } else if (item.like === true) {
      cancelDibsMutation.mutate(payload);
    }
    console.log(payload);
  };

  return (
    <StWrap>
      <StTabBox>
        {mainTabList?.map((item, i) => (
          <StTabs key={item.id}>
            <StTabImg
              src={checked[i] ? item.altImg : item.img}
              onClick={() => onClickHandler(i)}
              alt={item.text}
            />
            <StTabText>{item.text}</StTabText>
          </StTabs>
        ))}
      </StTabBox>
      {category === "병원" && (
        <>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "400px",
                position: "absolute",
                left: "62%",
                bottom: "95px",
              }}
            >
              {/* <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg> */}
            </div>
            <Fade bottom>
              <StDivBox>
                <StMyPlace onClick={() => navigate("/hospital")}>
                  내 위치 펫플레이스
                </StMyPlace>
                <StPin src={footMap} onClick={onLocationHandler} />
              </StDivBox>
            </Fade>
          </div>
        </>
      )}
      {category === "미용" && (
        <>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "400px",
                position: "absolute",
                left: "62%",
                bottom: "95px",
              }}
            >
              {/* <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg> */}
            </div>
            <Fade bottom>
              <StDivBox>
                <StMyPlace onClick={() => navigate("/shop")}>
                  내 위치 펫플레이스
                </StMyPlace>
                <StPin src={footMap} onClick={onLocationHandler} />
              </StDivBox>
            </Fade>
          </div>
        </>
      )}
      {category === "카페" && (
        <>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "400px",
                position: "absolute",
                left: "62%",
                bottom: "95px",
              }}
            >
              {/* <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg> */}
            </div>
            <Fade bottom>
              <StDivBox>
                <StMyPlace onClick={() => navigate("/cafe")}>
                  내 위치 펫플레이스
                </StMyPlace>
                <StPin src={footMap} onClick={onLocationHandler} />
              </StDivBox>
            </Fade>
          </div>
        </>
      )}
      <StPlace>
        <Fade bottom>
          {category === "병원"
            ? data &&
              data.length > 0 &&
              data.map((item, i) => (
                <div key={i}>
                  <StCard key={i}>
                    <Button onClick={() => onDibsHandler(item)} size="mainDib">
                      {item.like === false ? (
                        <>
                          <img src={noDibs} />
                        </>
                      ) : (
                        <img src={dibs} />
                      )}
                    </Button>
                    <div>
                      {item.like === false ? (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            alt="mainImg"
                            onClick={() => navigate(`/hospital/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/hospital/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      ) : (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            style={{ border: "5px solid #FFD53F" }}
                            alt="mainImg"
                            onClick={() => navigate(`/hospital/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/hospital/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      )}
                    </div>

                    <StTextBox onClick={() => navigate(`/hospital/${item.id}`)}>
                      <StTitle>{item.title}</StTitle>
                      <StText>{item.address.split(" ", 2).join(" ")}</StText>
                      <StText>
                        {parseInt(item.distance) > 999 && (
                          <div>
                            {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                            km남음
                          </div>
                        )}
                        {parseInt(item.distance) < 999 && (
                          <div>{parseInt(item.distance)}m남음</div>
                        )}
                      </StText>
                    </StTextBox>
                  </StCard>
                </div>
              ))
            : category === "미용"
            ? data &&
              data.length > 0 &&
              data.map((item, i) => (
                <div key={i}>
                  <StCard key={i}>
                    <Button onClick={() => onDibsHandler(item)} size="mainDib">
                      {item.like === false ? (
                        <>
                          <img src={noDibs} />
                        </>
                      ) : (
                        <img src={dibs} />
                      )}
                    </Button>
                    <div>
                      {item.like === false ? (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            alt="mainImg"
                            onClick={() => navigate(`/shop/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/shop/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      ) : (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            style={{ border: "5px solid #FFD53F" }}
                            alt="mainImg"
                            onClick={() => navigate(`/shop/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/shop/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      )}
                    </div>

                    <StTextBox onClick={() => navigate(`/shop/${item.id}`)}>
                      <StTitle>{item.title}</StTitle>
                      <StText>{item.address.split(" ", 2).join(" ")}</StText>
                      <StText>
                        {parseInt(item.distance) > 999 && (
                          <div>
                            {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                            km남음
                          </div>
                        )}
                        {parseInt(item.distance) < 999 && (
                          <div>{parseInt(item.distance)}m남음</div>
                        )}
                      </StText>
                    </StTextBox>
                  </StCard>
                </div>
              ))
            : category === "카페"
            ? data &&
              data.length > 0 &&
              data.map((item, i) => (
                <div key={i}>
                  <StCard key={i}>
                    <Button onClick={() => onDibsHandler(item)} size="mainDib">
                      {item.like === false ? (
                        <>
                          <img src={noDibs} />
                        </>
                      ) : (
                        <img src={dibs} />
                      )}
                    </Button>
                    <div>
                      {item.like === false ? (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            alt="mainImg"
                            onClick={() => navigate(`/cafe/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/cafe/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      ) : (
                        <StContainer>
                          <StResizeImg
                            src={item.reSizeImage}
                            style={{ border: "5px solid #FFD53F" }}
                            alt="mainImg"
                            onClick={() => navigate(`/cafe/${item.id}`)}
                          />
                          <StCaption
                            onClick={() => navigate(`/cafe/${item.id}`)}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      )}
                    </div>

                    <StTextBox onClick={() => navigate(`/cafe/${item.id}`)}>
                      <StTitle>{item.title}</StTitle>
                      <StText>{item.address.split(" ", 2).join(" ")}</StText>
                      <StText>
                        {parseInt(item.distance) > 999 && (
                          <div>
                            {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                            km남음
                          </div>
                        )}
                        {parseInt(item.distance) < 999 && (
                          <div>{parseInt(item.distance)}m남음</div>
                        )}
                      </StText>
                    </StTextBox>
                  </StCard>
                </div>
              ))
            : null}
        </Fade>
      </StPlace>
    </StWrap>
  );
}

export default Tab;
const StCaption = styled.div`
  position: absolute;
  bottom: 50%;
  left: 0%;
  text-align: center;
  width: 100%;
  color: #fff;
  opacity: 0;
  z-index: 999;
  cursor: pointer;
  /* transition: opacity 0.3s ease; */
`;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  &:hover {
    ${StResizeImg} {
      filter: brightness(50%);
    }
    ${StCaption} {
      opacity: 1;
    }
  }
`;
