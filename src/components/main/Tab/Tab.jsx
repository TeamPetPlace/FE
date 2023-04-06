import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { addDibs, cancelDibs, getPost } from "../../../api/main";
import { setCookie } from "../../../api/cookie";
import cafe from "../../../style/img/cafe.svg";
import hospital from "../../../style/img/hospital.svg";
import shop from "../../../style/img/shop.svg";
import foot from "../../../style/img/foot.svg";
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
  StDibBtn,
  StPin,
  StDivBox,
} from "./TabStyle";
import styled from "styled-components";

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

  //2번째
  // const [permissionDenied, setPermissionDenied] = useState(false);
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     try {
  //       await navigator.permissions.query({ name: "geolocation" });
  //     } catch (e) {
  //       setPermissionDenied(true);
  //     }
  //   };
  //   requestLocationPermission();
  // }, []);

  // const onLocationHandler = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;
  //       setLat(lat);
  //       setLng(lng);
  //       console.log(`latitue:${lat}, longitude:${lng}`);
  //     },
  //     (error) => {
  //       if (error.code === error.PERMISSION_DENIED) {
  //         setPermissionDenied(true);
  //       }
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // };

  //3번째
  // const [permission, setPermission] = useState(true);
  // const onLocationHandler = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         setLat(lat);
  //         setLng(lng);
  //       },
  //       (error) => {
  //         if (error.code === error.PERMISSION_DENIED) {
  //           const watchId = navigator.geolocation.watchPosition(
  //             () => {},
  //             () => {},
  //             { enableHighAccuracy: false, maximumAge: 0, timeout: Infinity }
  //           );
  //           navigator.permissions
  //             .query({ name: "geolocation" })
  //             .then((PermissionStatus) => {
  //               PermissionStatus.onchange = () => {
  //                 if (PermissionStatus.state === "granted") {
  //                   setPermission(true);
  //                   navigator.geolocation.clearWatch(watchId);
  //                 }
  //               };
  //             });
  //         }
  //       }
  //     );
  //   }
  // };

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
      alert("찜하기 완료");
      queryClient.invalidateQueries("getPost");
    },
  });

  const cancelDibsMutation = useMutation(cancelDibs, {
    onSuccess: () => {
      alert("찜하기 취소");
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
              <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg>
            </div>
            <StDivBox>
              <StMyPlace onClick={() => navigate("/hospital")}>
                내 위치 펫플레이스
              </StMyPlace>
              <StPin src={footMap} onClick={onLocationHandler} />
            </StDivBox>
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
              <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg>
            </div>
            <StDivBox>
              <StMyPlace onClick={() => navigate("/shop")}>
                내 위치 펫플레이스
              </StMyPlace>
              <StPin src={footMap} onClick={onLocationHandler} />
            </StDivBox>
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
              <StMsg>버튼을 눌러 나와 가까운 플레이스를 찾아보세요!</StMsg>
            </div>
            <StDivBox>
              <StMyPlace onClick={() => navigate("/cafe")}>
                내 위치 펫플레이스
              </StMyPlace>
              <StPin src={footMap} onClick={onLocationHandler} />
            </StDivBox>
          </div>
        </>
      )}
      <StPlace>
        {category === "병원"
          ? data &&
            data.length > 0 &&
            data.map((item, i) => (
              <div key={i}>
                <StCard key={i}>
                  <StDibBtn onClick={() => onDibsHandler(item)}>
                    {item.like === false ? (
                      <>
                        <img src={noDibs} />
                      </>
                    ) : (
                      <img src={dibs} />
                    )}
                  </StDibBtn>
                  <div>
                    {item.like === false ? (
                      <StResizeImg
                        src={item.reSizeImage}
                        alt="mainImg"
                        onClick={() => navigate(`/hospital/${item.id}`)}
                      />
                    ) : (
                      <StResizeImg
                        src={item.reSizeImage}
                        style={{ border: "5px solid #FFD53F" }}
                        alt="mainImg"
                        onClick={() => navigate(`/hospital/${item.id}`)}
                      />
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
                  <StDibBtn onClick={() => onDibsHandler(item)}>
                    {item.like === false ? (
                      <>
                        <img src={noDibs} />
                      </>
                    ) : (
                      <img src={dibs} />
                    )}
                  </StDibBtn>
                  <div>
                    {item.like === false ? (
                      <StResizeImg
                        src={item.reSizeImage}
                        alt="mainImg"
                        onClick={() => navigate(`/shop/${item.id}`)}
                      />
                    ) : (
                      <StResizeImg
                        src={item.reSizeImage}
                        style={{ border: "5px solid #FFD53F" }}
                        alt="mainImg"
                        onClick={() => navigate(`/shop/${item.id}`)}
                      />
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
                  <StDibBtn onClick={() => onDibsHandler(item)}>
                    {item.like === false ? (
                      <>
                        <img src={noDibs} />
                      </>
                    ) : (
                      <img src={dibs} />
                    )}
                  </StDibBtn>
                  <div>
                    {item.like === false ? (
                      <StResizeImg
                        src={item.reSizeImage}
                        alt="mainImg"
                        onClick={() => navigate(`/cafe/${item.id}`)}
                      />
                    ) : (
                      <StResizeImg
                        src={item.reSizeImage}
                        style={{ border: "5px solid #FFD53F" }}
                        alt="mainImg"
                        onClick={() => navigate(`/cafe/${item.id}`)}
                      />
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
      </StPlace>
    </StWrap>
  );
}

export default Tab;

const StMsg = styled.div`
  background-color: #ffd53f;
  border: #ffd53f solid 1px;
  border-radius: 5px;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  height: auto;
  letter-spacing: -0.25px;
  margin-top: 10px;
  padding: 5px 11px;
  position: relative;
  width: fit-content;
  z-index: 100;
  color: #000;
  animation: jumpDown 1.5s linear 10;
  &::after {
    border-color: #ffd53f transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 5px;
    position: absolute;
    left: 1150px;
    top: -7px;
    width: 0;
    z-index: 1;
  }
  &::before {
    border-color: #ffd53f transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 5px;
    position: absolute;
    left: 1150px;
    top: -8px;
    width: 0;
    z-index: 0;
  }
  @keyframes jumpDown {
    0% {
      left: 0px;
      top: 0px;
    }
    25% {
      left: 0px;
      top: 5px;
    }
    50% {
      left: 0px;
      top: 0px;
    }
    75% {
      left: 0px;
      top: 5px;
    }
    100% {
      left: 0px;
      top: 0px;
    }
  }
`;
