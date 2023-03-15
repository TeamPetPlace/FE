import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMyDibs } from "../../api/mypage";

function DibsList() {
  const [dibList, setDibList] = useState([]);

  const { data } = useQuery("getmydibs", getMyDibs, {
    onSuccess: (response) => {
      setDibList(response);
      console.log(response);
    },
  });

  return (
    <div>
      <div>
        {dibList.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.email}이메일</div>
              <div>{item.nickname}닉네임</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DibsList;
