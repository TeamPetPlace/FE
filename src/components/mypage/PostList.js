import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getMyPost } from "../../api/mypage";
import { deletePost } from "../../api/owner";

function PostList() {
  const [myList, setMyList] = useState([]);

  const { data } = useQuery("getmypost", getMyPost, {
    onSuccess: (response) => {
      setMyList(response.content);
      console.log(response.content);
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
      <div>
        {myList.length > 0 &&
          myList?.map((item) => {
            return (
              <div key={item.id}>
                {item.category === "병원" && (
                  <div>
                    <button onClick={() => navigate(`/hospital/${item.id}`)}>
                      게시글 보러가기
                    </button>
                    <button onClick={() => onDeleteHandler(item.id)}>
                      삭제
                    </button>
                  </div>
                )}
                {item.category === "미용" && (
                  <div>
                    <button onClick={() => navigate(`/shop/${item.id}`)}>
                      게시글 보러가기
                    </button>
                    <button onClick={() => onDeleteHandler(item.id)}>
                      삭제
                    </button>
                  </div>
                )}
                {item.category === "카페" && (
                  <div>
                    <button onClick={() => navigate(`/cafe/${item.id}`)}>
                      게시글 보러가기
                    </button>
                    <button onClick={() => onDeleteHandler(item.id)}>
                      삭제
                    </button>
                  </div>
                )}
                <div>{item.category}id</div>
                <div>{item.ceo}업종</div>
                <img src={item.reSizeImage} alt="img" />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PostList;
