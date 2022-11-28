
function Pagination({ num,getCurrentPage }: number |any){
    const pageNumbers = [];
    for (let i = 1; i <= num; i++) {
      pageNumbers.push(i);
    }
    
    const onclick = (e:any) => {
        getCurrentPage(e.target.value);
    }
    
    return (
        <div className="paging">
            {pageNumbers.map(number =>(
                <li className="bar_menu" key={number} onClick={onclick} value={number}>{number}     </li>
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