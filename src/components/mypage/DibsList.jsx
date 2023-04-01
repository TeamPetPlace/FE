import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { cancelDibs } from "../../api/main";
import { getMyDibs } from "../../api/mypage";
import dibs from "../../style/img/dibs.svg";
import Pagination from "react-js-pagination";
import {
  DibCategoryBtn,
  DibCategoryContainer,
  StCard,
  StCardImg,
  StCards,
  StContent,
  StDibBtn,
  StStarIcon,
  PageBox,
} from "./MypageStyle";
import styled from "styled-components";

function DibsList() {
  const [dibList, setDibList] = useState([]);
  const navigate = useNavigate();
  //페이지네이션
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);

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

  //페이지네이션
  const handlerPageChange = (page) => {
    setPage(page);
  };

  const queryClient = useQueryClient();

  const cancelDibsMutation = useMutation(cancelDibs, {
    onSuccess: () => {
      alert("찜하기 취소");
      queryClient.invalidateQueries("getmydibs");
    },
  });

  const onDibsHandler = (item) => {
    const payload = {
      id: item.id,
    };
    cancelDibsMutation.mutate(payload);
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
      <DibCategoryContainer>
        {mainTabList?.map((item, i) => (
          <DibCategoryBtn
            key={i}
            checked={checked[i]}
            onClick={() => onClickHandler(i)}
            value={category}
            className={checked[i] ? "selected" : ""}
          >
            {item.text}
          </DibCategoryBtn>
        ))}
      </DibCategoryContainer>
      <div>
        <StCards>
          {dibList?.map((item) => {
            return (
              <>
                {category === "병원" && item.category === "병원" ? (
                  <StCard key={item.id}>
                    <StDibBtn onClick={() => onDibsHandler(item)}>
                      <StDibimg src={dibs} />
                    </StDibBtn>
                    <StCardImg
                      onClick={() => {
                        navigate(`/hospital/${item.id}`);
                      }}
                      src={item.reSizeImage}
                      alt="image"
                    />
                    <StTitle>
                      {item.title}{" "}
                      {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                        (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                        (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                        (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                        (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                        (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                    </StTitle>
                    <StContent>{item.address.split(" ", 2).join(" ")}</StContent>
                  </StCard>
                ) : category === "미용" && item.category === "미용" ? (
                  <StCard key={item.id}>
                    <StDibBtn onClick={() => onDibsHandler(item)}>
                      <StDibimg src={dibs} />
                    </StDibBtn>
                    <StCardImg
                      onClick={() => {
                        navigate(`/shop/${item.id}`);
                      }}
                      src={item.reSizeImage}
                      alt="image"
                    />
                    <StTitle>
                      {item.title}{" "}
                      {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                        (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                        (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                        (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                        (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                        (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                    </StTitle>{" "}
                    <StContent>{item.address.split(" ", 2).join(" ")}</StContent>
                    {/* <div>{item.star}</div> */}
                  </StCard>
                ) : category === "카페" && item.category === "카페" ? (
                  <StCard key={item.id}>
                    <StDibBtn onClick={() => onDibsHandler(item)}>
                      <StDibimg src={dibs} />
                    </StDibBtn>
                    <StCardImg
                      onClick={() => {
                        navigate(`/cafe/${item.id}`);
                      }}
                      src={item.reSizeImage}
                      alt="image"
                    />
                    <StTitle>
                      {item.title}{" "}
                      {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                        (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                        (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                        (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                        (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                        (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                    </StTitle>{" "}
                    <StContent>{item.address.split(" ", 2).join(" ")}</StContent>
                  </StCard>
                ) : null}
              </>
            );
          })}
        </StCards>
        <StPageDiv>
          <PageBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={size}
              totalItemsCount={40}
              pageRangeDisplayed={5}
              onChange={handlerPageChange}
            />
          </PageBox>
        </StPageDiv>
      </div>
    </div>
  );
}

export default DibsList;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  /* margin-bottom: 5px; */
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
`;

const StPageDiv = styled.div`
  width: 978px;
  height: 100px;
  position: relative;
  /* background-color: blue; */
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
    height: 80px;
  }
`;

const StDibimg = styled.img`
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;
