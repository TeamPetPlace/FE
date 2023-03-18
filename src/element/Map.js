import React, { useEffect } from "react";

function Map({ id, queryClient, detail, setDetail }) {
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(detail.lat, detail.lng),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(detail.lat, detail.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return <div id="map" style={{ width: "500px", height: "500px" }}></div>;
}

export default Map;
