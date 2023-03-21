import React from "react";

function Pagenation({ page, size, totalCount, pageHandler }) {
  const totalPages = Math.ceil(totalCount / size);

  const clickHandler = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    pageHandler(page);
  };
  return (
    <div>
      <ul>
        {[...Array(totalPages)].map((item, index) => (
          <li key={index + 1} onClick={() => clickHandler(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagenation;
