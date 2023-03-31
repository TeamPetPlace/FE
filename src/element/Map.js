import React, { useEffect } from "react";
import styled from "styled-components";

function Map({ id, queryClient, detail, setDetail }) {
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(detail.lat, detail.lng),
      level: 1,
    };
    const map = new kakao.maps.Map(container, options);
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const places = new kakao.maps.services.Places();
    const markerPosition = new kakao.maps.LatLng(detail.lat, detail.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    const iwContent = `<div style="padding:5px;">${detail.category} : ${detail.title} <br><a href="https://map.kakao.com/link/to/Hello World!,${detail.lat},${detail.lng}" style="color:gray" target="_blank">길찾기</a></div>`,
      iwPosition = new kakao.maps.LatLng(detail.lat, detail.lng);
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    infowindow.open(map, marker);
  }, []);

  const style = {
    width: "1180px",
    height: "450px",
  };

  return <StDiv id="map"></StDiv>;
}

export default Map;

const StDiv = styled.div`
  width: 1180px;
  height: 450px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 400px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 700px;
  }
`;
