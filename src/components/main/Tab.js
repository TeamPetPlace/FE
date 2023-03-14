import React, { useState } from "react";
import styled, { css } from "styled-components";

function Tab() {
  //메인 탭
  const mainTabList = [
    { id: 0, text: "병원", category: "hospital" },
    { id: 1, text: "미용", category: "shop" },
    { id: 2, text: "카페", category: "cafe" },
  ];

  const [checked, setChecked] = useState([true, false, false]);
  const [category, setCategory] = useState("hospital");

  const data = [
    { id: 0, text: "병원", category: "hospital" },
    { id: 1, text: "미용", category: "shop" },
    { id: 2, text: "카페", category: "cafe" },
  ];

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
  return (
    <div>
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
      <StTabBox>
        {category === "hospital"
          ? data.map((item, i) => (
              <StCard key={i} color="hospital">
                {item.text} - {item.category}
              </StCard>
            ))
          : category === "shop"
          ? data.map((item, i) => (
              <StCard key={i} color="shop">
                {item.text} - {item.category}
              </StCard>
            ))
          : category === "cafe"
          ? data.map((item, i) => (
              <StCard key={i} color="cafe">
                {item.text} - {item.category}
              </StCard>
            ))
          : data.map((item, i) => (
              <StCard key={i}>
                {item.text} - {item.category}
              </StCard>
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
