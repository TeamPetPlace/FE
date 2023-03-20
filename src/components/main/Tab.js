import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { getPost } from "../../api/main";

function Tab() {
  const [category, setCategory] = useState("병원");
  const navigate = useNavigate();

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  //현재 사용자의 위치 정보
  const onLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLat(lat);
        setLng(lng);
        console.log(`latitude: ${lat}, longitude: ${lng}`);
      },
      (error) => {
        console.log("geolocation ");
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
    { id: 0, text: "병원", category: "병원" },
    { id: 1, text: "미용", category: "미용" },
    { id: 2, text: "카페", category: "카페" },
  ];

  const [checked, setChecked] = useState([true, false, false]);

  const onClickHandler = (i) => {
    const newArr = Array(mainTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setCategory("병원");
    } else if (i === 1) {
      setCategory("미용");
    } else if (i === 2) {
      setCategory("카페");
    }
  };

  // //현재 사용자의 위치 정보
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation({ latitude, longitude });
  //       console.log(`현재위치:  (${latitude}, ${longitude})`);
  //     });
  //   } else {
  //     console.log("geolocation ");
  //   }
  // }, []);

  //userlocation이 변경될 때 마다 데이터를 가져와서 정렬
  //데이터들로 새로운 객체를 만들고 거리를 계산

  return (
    <div>
      <button onClick={onLocationHandler}>현재 위치 전송</button>
      <div>
        {mainTabList?.map((item, i) => (
          <button
            key={i}
            checked={checked[i]}
            onClick={() => onClickHandler(i)}
            value={category}
          >
            {item.text}
          </button>
        ))}
      </div>
      <StTabBox>
        {category === "병원" && (
          <div onClick={() => navigate("/hospital")}>내 위치 펫플레이스</div>
        )}
        {category === "미용" && (
          <div onClick={() => navigate("/shop")}>내 위치 펫플레이스</div>
        )}
        {category === "카페" && (
          <div onClick={() => navigate("/cafe")}>내 위치 펫플레이스</div>
        )}

        {category === "병원"
          ? data &&
            data.length > 0 &&
            data.map((item, i) => (
              <StCard
                key={i}
                color="병원"
                onClick={() => navigate(`/hospital/${item.id}`)}
              >
                <div>{item.category}</div>
                <div>{item.title}</div>
                <div>{item.address}</div>
                <div>
                  {parseInt(item.distance) > 999 && (
                    <div>
                      {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                    </div>
                  )}
                  {parseInt(item.distance) < 999 && (
                    <div>{parseInt(item.distance)}m남음</div>
                  )}
                </div>
                <img src={item.reSizeImage} alt="mainImg" />
              </StCard>
            ))
          : category === "미용"
          ? data &&
            data.length > 0 &&
            data.map((item, i) => (
              <StCard
                key={i}
                color="미용"
                onClick={() => navigate(`/shop/${item.id}`)}
              >
                <div>{item.category}</div>
                <div>{item.title}</div>
                <div>{item.address}</div>
                {parseInt(item.distance) > 999 && (
                  <div>
                    {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                  </div>
                )}
                {parseInt(item.distance) < 999 && (
                  <div>{parseInt(item.distance)}m남음</div>
                )}
                <img src={item.reSizeImage} alt="mainImg" />
              </StCard>
            ))
          : category === "카페"
          ? data &&
            data.length > 0 &&
            data.map((item, i) => (
              <StCard
                key={i}
                color="카페"
                onClick={() => navigate(`/cafe/${item.id}`)}
              >
                <div>{item.category}</div>
                <div>{item.title}</div>
                <div>{item.address}</div>
                {parseInt(item.distance) > 999 && (
                  <div>
                    {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                  </div>
                )}
                {parseInt(item.distance) < 999 && (
                  <div>{parseInt(item.distance)}m남음</div>
                )}
                <img src={item.reSizeImage} alt="mainImg" />
              </StCard>
            ))
          : data &&
            data.length > 0 &&
            data.map((item, i) => <StCard key={i}>{item.category}</StCard>)}
      </StTabBox>
    </div>
  );
}

export default Tab;

const StTabBox = styled.div`
  display: flex;
`;

const StCard = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  cursor: pointer;
  ${({ color }) => {
    switch (color) {
      case "hospital":
        return css`
          background-color: aqua;
        `;
      case "shop":
        return css`
          background-color: tomato;
        `;
      case "cafe":
        return css`
          background-color: beige;
        `;
      default:
        return css`
          background-color: transparent;
        `;
    }
  }}
`;
