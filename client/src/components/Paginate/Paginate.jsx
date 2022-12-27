import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./Paginate.module.scss";
const cx = classNames.bind(styles);
function Paginate({ data, itemsPerPage, onClick }) {
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        //event.selected chua vi tri cua trang * so luong phan tu hien thi
        const newOffset = (event.selected * itemsPerPage) % data.length;
        onClick(newOffset);
    };

    return (
        <div className={cx("wrapper")}>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={cx("pagination-btn")}
                previousLinkClassName={cx("previous-btn")}
                nextLinkClassName={cx("next-btn")}
                disabledClassName={cx("pagination--disabled")}
                activeClassName={cx("active")}
            />
        </div>
    );
}

export default Paginate;
