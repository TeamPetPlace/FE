import React from "react";
import { useQuery } from "react-query";
import { getMyDibs } from "../../api/mypage";

function DibsList() {
  const { data } = useQuery("getmydibs", () => getMyDibs());
  return (
    <div>
      {data?.data.response.map((item) => {
        <div key={item.id}>
          <div>{item.id}id</div>
          <div>{item.title}업종</div>
          <div>{item.contents}소개</div>
        </div>;
      })}
    </div>
  );
}

export default DibsList;
