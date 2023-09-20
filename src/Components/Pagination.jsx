import './Pagination.css'

function Pagination({ totalPosts, postPerPage, setCurrentPage, currentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination-container'>
            {
                pages.map((page, index) => {
                    return (
                        <button className={page == currentPage ?  'active' : ''} onClick={() => setCurrentPage(page)} key={index}>{page}</button>
                    )
                })
            }
        </div>
    )
}

export default Pagination