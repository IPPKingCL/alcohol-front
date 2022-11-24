import React from "react";

function Pagination({ num }: number |any){
    const pageNumbers = [];
    for (let i = 1; i <= num; i++) {
      pageNumbers.push(i);
    }
    
    const onclick = (num:any):any => {
        console.log(num);
        //getCurrentPage(num.number);
    }
    
    return (
        <div>
            {pageNumbers.map(number =>(
                <span onClick={onclick(number)}>{number}     </span>
            ))}
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

export default Pagination;