import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Map from "../common/Map";

const HospitalDetailForm = () => {
  // const { id } = useParams();

  return (
    <Stdiv>
      <Stimg
        src={
          "https://mblogthumb-phinf.pstatic.net/MjAyMDAxMjBfNjMg/MDAxNTc5NDgyNjQ1OTA2.FYOALh1rbwJWlCzar9g1qnuP_c2lf_WaQIaZ8gkfwasg.BoC0zOB3R7Gw0r7mpMeFjdxyZC-o-x4YLzL60YpncaEg.JPEG.joa-design/좋아서하는디자인___부천_지중해동물병원_(19).jpg?type=w800"
        }
      ></Stimg>
      <h2>병원이름</h2>
      <label> 병원주소 </label> <br />
      <label>영업시간</label> <br />
      <label>휴무일</label> <br />
      <div> 상세정보 </div>
      <label> 강아지 고양이 병원. 어쩌구 저쩌구</label>
      <div>
        <Map />
      </div>
      {/* <div
        alt="mapMark"
        style="width:500px;height:400px;"
        src={"https://map.naver.com/v5/entry/place/38345004?c=12.58,0,0,0,dh"}
      ></div> */}
      {/* <MapAddress>
        <div style={{ display: "flex" }}>
          <span onClick={modalHandler}>
            <MapMark alt="mapMark" src={`${process.env.PUBLIC_URL}/img/mapLocation.png`} />
          </span>
          <span>{data.mapDetailSubResponseDto?.address.split(",").at(0)}주소</span>
        </div>
        <MapTooltip className="task-tooltip">여기를 클릭해 지도정보를 살펴보세요</MapTooltip>
      </MapAddress> */}
    </Stdiv>
  );
};

export default HospitalDetailForm;

const Stdiv = styled.div`
  height: 50%;
  width: 50%;
  background-color: gray;
  margin: 100px auto;
  padding: 30px;
`;

const Stimg = styled.img`
  width: 300px;
  height: 300px;
`;
