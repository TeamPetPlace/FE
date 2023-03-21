import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMyDibs } from "../../api/mypage";

function DibsList() {
  const [dibList, setDibList] = useState([]);

  //페이지네이션
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const { data } = useQuery(
    [
      "getmydibs",
      {
        page: page,
        size: size,
      },
    ],
    () =>
      getMyDibs({
        page: page,
        size: size,
      }),
    {
      onSuccess: (response) => {
        setDibList(response.content);
      },
    }
  );

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //탭
  const [category, setCategory] = useState("병원");

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

  return (
    <div>
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
      <div>
        {dibList?.map((item) => {
          return (
            <div key={item.id}>
              {category === "병원" && item.category === "병원" ? (
                <div key={item.id}>
                  <div>카테고리:{item.category}</div>
                  <div>업체명: {item.title}</div>
                  <img src={item.reSizeImage} alt="image" />
                </div>
              ) : category === "미용" && item.category === "미용" ? (
                <div key={item.id}>
                  <div>카테고리:{item.category}</div>
                  <div>업체명: {item.title}</div>
                  <img src={item.reSizeImage} alt="image" />
                </div>
              ) : category === "카페" && item.category === "카페" ? (
                <div key={item.id}>
                  <div>카테고리:{item.category}</div>
                  <div>업체명: {item.title}</div>
                  <img src={item.reSizeImage} alt="image" />
                </div>
              ) : null}
            </div>
          );
        })}
        <button disabled={page === 0} onClick={handlePrevPage}>
          이전페이지
        </button>
        <button disabled={data?.length < size} onClick={handleNextPage}>
          다음페이지
        </button>
      </div>
    </div>
  );
}

export default DibsList;
