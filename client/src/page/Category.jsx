import React from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../scss/_category.scss";
import "../scss/_global.scss";
import Button from "../components/Button";
import Modal from "../components/Modal";

import { useCallback } from "react";
import { useRef } from "react";

function Category() {
  const [categoryGroup, setCategoryGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const refCategoryStatus = useRef();
  const refCategoryGroupId = useRef(1);
  const refCategoryId = useRef();
  const refModalTitle = useRef();

  const handleAddClick = useCallback(() => {
    refCategoryStatus.current = "add";
    refModalTitle.current = "Thêm loại sản phẩm";
    refCategoryGroupId.current = 1;
    setOpenModal(true);
  }, []);

  const handleUpdateClick = (
    idParam,
    categoryTitleParam,
    categoryGroupIdParam
  ) => {
    refCategoryId.current = idParam;
    setCategoryTitle(categoryTitleParam);
    refCategoryGroupId.current = categoryGroupIdParam;
    refModalTitle.current = "Sửa loại sản phẩm";
    refCategoryStatus.current = "update";
    setOpenModal(true);
  };

  const handleCategoryChange = (e) => {
    setCategoryTitle(e.target.value);
  };

  const handleSelectCategory = (e) => {
    refCategoryGroupId.current = e.target.value;
  };

  const handleAddCategory = async () => {
    await Axios.post("http://localhost:8080/category/create/", {
      categoryGroupId: refCategoryGroupId.current,
      categoryTitle: categoryTitle,
    });
    setReload(!reload);
    setCategoryTitle("");
  };

  const handleUpdateCategory = async () => {
    await Axios.put(
      "http://localhost:8080/category/update/" + refCategoryId.current,
      {
        categoryGroupId: refCategoryGroupId.current,
        categoryTitle: categoryTitle,
      }
    );
    setReload(!reload);
    setCategoryTitle("");
  };

  const handleDeleteCategory = async (id) => {
    await Axios.delete("http://localhost:8080/category/delete/" + id);
    setReload(!reload);
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/category/getAllCategoryGroup/").then(
      (res) => {
        setCategoryGroup(res.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/category/get/").then((res) => {
      setCategory(res.data);
    });
  }, [reload]);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(category.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div style={{ display: "flex", position: "relative", minHeight: "670px" }}>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title={refModalTitle.current}
          height={"200px"}
          width={"500px"}
        >
          <select
            name="pets"
            id="pet-select"
            onChange={handleSelectCategory}
            value={refCategoryGroupId.current}
            style={{
              height: "37px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              lineHeight: "1.5",
              fontSize: "16px",
              fontWeight: "400",
              outline: "none",
              padding: "0 10px 0 10px",
              marginBottom: "10px",
            }}
          >
            {categoryGroup.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category_group_title}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={categoryTitle}
            placeholder="Tên loại ..."
            onChange={handleCategoryChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "50%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            {refCategoryStatus.current === "add" ? (
              <Button onClick={handleAddCategory}>Thêm</Button>
            ) : (
              <Button onClick={handleUpdateCategory}>Sửa</Button>
            )}
          </div>
        </Modal>
      )}

      <div>
        <Button onClick={handleAddClick}>
          <FaPlus color="#ffffff" fontSize="13px" />
          Thêm
        </Button>
        <div className="table__container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Id</th>
                <th style={{ width: "350px" }}>Category Group</th>
                <th style={{ width: "450px" }}>Category</th>
                <th style={{ width: "130px" }}>Delete</th>
                <th style={{ width: "130px" }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {category
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category_group_title}</td>
                    <td>
                      <div style={{ width: "450px" }}>
                        {item.category_title}
                      </div>
                    </td>
                    <td>
                      <Button
                        height={"30px"}
                        width={"70px"}
                        backgroundColor={"red"}
                        onClick={() => handleDeleteCategory(item.id)}
                      >
                        Xoá
                      </Button>
                    </td>
                    <td>
                      <Button
                        height={"30px"}
                        width={"70px"}
                        backgroundColor={"blue"}
                        onClick={() =>
                          handleUpdateClick(
                            item.id,
                            item.category_title,
                            item.fk_category_group_id
                          )
                        }
                      >
                        Sửa
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {category.length > 0 && (
          <div
            className="pagination"
            style={{ position: "absolute", bottom: "0" }}
          >
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination__btn"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"pagination--disabled"}
              activeClassName={"pagination--active"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default Category;
