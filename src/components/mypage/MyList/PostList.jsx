import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getMyPost } from "../../../api/mypage";
import { deletePost } from "../../../api/owner";
import chatbubble from "../../../style/img/chatbubble.svg";
import Button from "../../../element/Button";
import {
  Stdiv,
  StListContainer,
  StImg,
  StContentContainer,
  StTitles,
  StContent,
  StSmallContent,
  StChatContent,
  StUnderDiv,
} from "./MyListStyle";

function PostList() {
  const [myList, setMyList] = useState([]);

  const { data } = useQuery("getmypost", getMyPost, {
    onSuccess: (response) => {
      setMyList(response.content);
      // console.log(response.content);
    },
  });

  const navigate = useNavigate();

  //게시글 삭제
  const queryClient = useQueryClient();
  const deletPostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getmypost");
    },
  });

  const onDeleteHandler = (id) => {
    const message = window.confirm("삭제하시겠습니까?");
    if (message) {
      deletPostMutation.mutate(id);
    } else {
      return;
    }
  };

  return (
    <div>
      <Stdiv>
        {myList != [] &&
          myList?.map((item) => {
            return (
              <StListContainer key={item.id}>
                <StImg src={item.reSizeImage} alt="img" />
                <StContentContainer>
                  <StChatContent>
                    <img src={chatbubble} style={{ marginRight: "5px" }} />{" "}
                    {item.reviewCount}
                  </StChatContent>
                  <StTitles>{item.title}</StTitles>
                  <StContent>{item.contents}</StContent>
                  <StUnderDiv>
                    <StSmallContent>
                      {item.createdAt.split("T", 1)}
                    </StSmallContent>
                    {item.category === "병원" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/hospital/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                    {item.category === "미용" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/shop/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                    {item.category === "카페" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/cafe/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                  </StUnderDiv>
                </StContentContainer>
              </StListContainer>
            );
          })}
      </Stdiv>
    </div>
  );
}

export default PostList;
