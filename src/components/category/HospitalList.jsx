import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import {
  AllPost,
  LikesPost,
  SearchPost,
  DeleteLikePost,
} from "../../api/category";
import { useNavigate, useParams } from "react-router-dom";
import { getHistory } from "../../api/detail";

export default function HospitalList() {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState();
  const [dibs, setDibs] = useState(false);
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { id } = useParams();

  //봤던 게시글 조회
  const [history, setHistory] = useState([]);

  const response = useQuery("getHistory", getHistory, {
    onSuccess: (response) => {
      setHistory(response);
    },
  });

  const { data } = useQuery(
    [
      "AllPost",
      {
        category: "병원",
        sort: "DISTANCE",
        lat: 37.51826171600231,
        lng: 127.02335537579637,
        page: 0,
        size: 10,
      },
    ],
    () =>
      AllPost({
        category: "병원",
        sort: "DISTANCE",
        lat: 37.51826171600231,
        lng: 127.02335537579637,
        page: 0,
        size: 10,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
        queryclient.invalidateQueries("getPost");
      },
    }
  );
  // console.log(cards);

  const onSearchHandler = async (e) => {
    setIsSearchMode(true);
    e.preventDefault();
    const { data } = await SearchPost({
      category: "병원",
      sort: "DISTANCE",
      keyword: searchkeyword,
      lat: 37.53502829566887,
      lng: 126.96471596469242,
      page: 0,
      size: 10,
    });
    console.log(data.response);
    setSearchData(data.response);
  };

  const LikeMutation = useMutation(LikesPost, {
    onSuccess: (response) => {
      queryclient.invalidateQueries("getPost");
      console.log("찜성공");
      console.log(response);
    },
    onError: (error) => {
      queryclient.invalidateQueries("getPost");
      console.log("찜실패");
    },
  });

  const DeleteMutation = useMutation(DeleteLikePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      console.log("삭제성공");
    },
    onError: (error) => {
      queryclient.invalidateQueries("AllPost");
      console.log("삭제실패");
    },
  });

  // const [likeadd, setLikeAdd] = useState(false);
  // const LikeAddHandler = (id) => {
  //   const LikeBtn = {
  //     id: id,
  //   };
  //   LikeMutation.mutate(LikeBtn);
  //   setLikeAdd(!likeadd);
  // };
  // console.log(likeadd);

  const LikeBtn = (id) => {
    if (dibs === false) {
      LikeMutation.mutate({ id });
      setDibs(!dibs);
    } else if (dibs === true) {
      DeleteMutation.mutate({ id });
      setDibs(!dibs);
    }

    console.log(dibs);
  };

  return (
    <>
      <StPlace>
        <StHistory>
          <div>
            {history.map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.reSizeImage} alt="historyImg" />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </StHistory>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <div>
          <input
            style={{ width: "300px" }}
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            value={searchkeyword || ""}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button onClick={onSearchHandler}>
            <GoSearch />
          </button>
        </div>
        <select>
          <option> 근거리순 </option>
          <option> 평점순</option>
          <option> 후기순</option>
        </select>
      </StPlace>
      {!isSearchMode ? (
        <StCards>
          {cards?.map((item) => {
            return (
              <div key={item.id}>
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/hospital/${item.id}`);
                  }}
                >
                  <div>별점 : {"⭐".repeat(item.star)}</div>
                  <div>병원 이름 : {item.title}</div>
                  <div>주소 : {item.address}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>
                      {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                    </div>
                  )}
                  {parseInt(item.distance) < 999 && (
                    <div>{parseInt(item.distance)}m남음</div>
                  )}
                  <img src={item.reSizeImage} />
                </StCard>
                <button onClick={() => LikeBtn(item.id)}>
                  {" "}
                  {dibs ? "찜하기" : "찜취소"}{" "}
                </button>
              </div>
            );
          })}
        </StCards>
      ) : (
        <StCards>
          {searchData.length > 0 &&
            searchData?.map((item) => {
              return (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/hospital/${item.id}`);
                  }}
                >
                  <div>별점 : {"⭐".repeat(item.star)}</div>
                  <div>병원 이름 : {item.title}</div>
                  <div>주소 : {item.address}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>
                      {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                    </div>
                  )}
                  {parseInt(item.distance) < 999 && (
                    <div>{parseInt(item.distance)}m남음</div>
                  )}
                  <img src={item.reSizeImage} />
                </StCard>
              );
            })}
        </StCards>
      )}
    </>
  );
}

const StPlace = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: skyblue;
`;

const StCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: #f7f7de;
`;

const StCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #e3def7;
`;

const StDiv = styled.div`
  z-index: 999;
`;

const StHistory = styled.div`
  width: 200px;
  height: 600px;
  position: fixed;
  background-color: aliceblue;
  left: 80%;
`;
