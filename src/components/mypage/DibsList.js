import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMyDibs } from "../../api/mypage";

function DibsList() {
  const [dibList, setDibList] = useState([]);

  const { data } = useQuery("getmydibs", getMyDibs, {
    onSuccess: (response) => {
      setDibList(response);
    },
  });

  return (
    <div>
      <div>
        {dibList.map((item) => {
          return (
            <div key={item.id}>
              <div>내 찜목록</div>
              <div>업체명: {item.title}</div>
              <img src={item.reSizeImage} alt="img" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DibsList;
