import { Pagination } from "@mui/material";
import React from "react";
import { number } from "yup";

function PaginationBoard({ num, getCurrentPage }: number | any) {
  const pageNumbers = [];
  for (let i = 1; i <= num; i++) {
    pageNumbers.push(i);
  }

  const onclick = (e: React.ChangeEvent<unknown>, page: number) => {
    getCurrentPage(page);
  }

  return (
    <div className="paging">
      <Pagination count={pageNumbers.length} onChange={onclick} color="primary" 
      sx={{
        alignItems: "center"
      }}/>
    </div>
  )
  /*return (
      
      <div className="pagination" >
      {pageNumbers.map(number => (
        <li key={number} className="page-item" >
          <div
            role="presentation"
            onClick={() => getCurrentPage(number)}
            className="page-link"
          >
            {number}
          </div>
        </li>
      ))}
    </div>
 
  )*/
}

export default PaginationBoard;