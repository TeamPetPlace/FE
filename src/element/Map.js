import React, { useEffect } from "react";

function Map() {
  const { kakao } = window;
  // console.log(kakao);
  // const container = document.createElement("div");

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      // center: new kakao.maps.LatLng(33.450701, 126.570667),
      center: new kakao.maps.LatLng(35.84275632114397, 127.06451016998444),

      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  // useEffect(() => {
  //   // 카카오맵 API 초기화
  //   window.kakao.maps.load(() => {
  //     // 버튼 생성
  //     const button = document.createElement("button");
  //     button.innerText = "카카오맵 url 미리보기";
  //     // 클릭 이벤트 처리
  //     button.onclick = () => {
  //       kakao.Link.createDefaultButton({
  //         container: container,
  //         objectType: "location",
  //         address: "서울특별시 중구 태평로1가 31",
  //         addressTitle: "중부경찰서",
  //         content: {
  //           title: "중부경찰서",
  //           description: "경찰서 위치 정보입니다.",
  //           imageUrl: "https://i.imgur.com/5MkMG76.png",
  //           link: {
  //             mobileWebUrl: "https://map.kakao.com/link/map/중부경찰서,37.563646,126.989579",
  //             webUrl: "https://map.kakao.com/link/map/중부경찰서,37.563646,126.989579",
  //           },
  //         },
  //         buttons: [
  //           {
  //             title: "웹으로 보기",
  //             link: {
  //               mobileWebUrl: "https://map.kakao.com/link/map/중부경찰서,37.563646,126.989579",
  //               webUrl: "https://map.kakao.com/link/map/중부경찰서",
  //             },
  //           },
  //         ],
  //       });
  //     };
  //   });
  // });
  return <div id="map" style={{ width: "500px", height: "500px" }}></div>;
}

export default Map;
