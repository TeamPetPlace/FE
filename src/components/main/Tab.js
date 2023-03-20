import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { getPost } from "../../api/main";

function Tab() {
  const { data } = useQuery("getPost", getPost, {
    onSuccess: (response) => {
      setDataList(response);
      console.log(response);
    },
  });

  //메인 탭
  const mainTabList = [
    { id: 0, text: "병원", category: "hospital" },
    { id: 1, text: "미용", category: "shop" },
    { id: 2, text: "카페", category: "cafe" },
  ];

  const [checked, setChecked] = useState([true, false, false]);
  const [category, setCategory] = useState("hospital");

  //메인 카드
  const [dataList, setDataList] = useState([
    { id: 0, text: "병원", category: "hospital" },
    { id: 1, text: "미용", category: "shop" },
    { id: 2, text: "카페", category: "cafe" },
  ]);

  const onClickHandler = (i) => {
    const newArr = Array(mainTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setCategory("hospital");
    } else if (i === 1) {
      setCategory("shop");
    } else if (i === 2) {
      setCategory("cafe");
    }
  };

  //내 위치 플레이스
  const [userLocation, setUserLocation] = useState(null);
  const [locationData, setDataLocation] = useState([]);

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
  useEffect(() => {
    if (userLocation) {
      const newData = locationData.map((item) => {
        const { latitude, longitude } = item.location;
        const distance = getDistance(
          userLocation[0],
          userLocation[1],
          latitude,
          longitude
        );
        return {
          ...item,
          distance,
        };
      });
      newData.sort((a, b) => a.distance - b.distance);
      setDataLocation(newData);
    }
  }, [userLocation]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const radlon1 = (Math.PI * lon1) / 180;
    const radlon2 = (Math.PI * lon2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344; // km 단위로 변환
    return dist;
  };

  return (
    <div>
      <button onClick={onLocationHandler}>현재 위치 전송</button>
      <div>
        {mainTabList?.map((item, i) => (
          <button
            key={i}
            checked={checked[i]}
            onClick={() => onClickHandler(i)}
          >
            {item.text}
          </button>
        ))}
      </div>
      {/* <div>
        {locationData.map((item) => (
          <div key={item.id}>
            <p>{item.address}</p>
            <p>
              소수점 아래 두 자리까지 반올림한 값 + km :
              {`${item.distance.toFixed(2)} km`}
            </p>
          </div>
        ))}
      </div> */}
      <StTabBox>
        {category === "hospital"
          ? dataList?.map((item, i) => (
              <StCard key={i} color="hospital">
                {item.category}
              </StCard>
            ))
          : category === "shop"
          ? dataList?.map((item, i) => (
              <StCard key={i} color="shop">
                <div>{item.category}</div>
                <div>{item.title}</div>
                <div>{item.address}</div>
                <img src={item.reSizeImage} alt="mainImg" />
              </StCard>
            ))
          : category === "cafe"
          ? dataList?.map((item, i) => (
              <StCard key={i} color="cafe">
                {item.category}
              </StCard>
            ))
          : dataList?.map((item, i) => (
              <StCard key={i}>{item.category}</StCard>
            ))}
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
