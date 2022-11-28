import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { FaPlus } from "react-icons/fa";
import "../scss/_category.scss";
import "../scss/_global.scss";
import Button from "../components/Button";
import Modal from "../components/Modal";

function Category() {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [categoryStatus, setCategoryStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [category, setCategory] = useState({
    categoryId: "",
    categoryTitle: "",
    categoryGroupId: 1,
  });
  const { categoryId, categoryTitle, categoryGroupId } = category;

  const handleAddClick = useCallback(() => {
    setCategoryStatus("add");
    setModalTitle("Thêm loại sản phẩm");
    setOpenModal(true);
  }, []);

  const handleUpdateClick = (item) => {
    setCategory({
      categoryId: item.id,
      categoryTitle: item.category_title,
      categoryGroupId: item.fk_category_group_id,
    });
    setCategoryStatus("update");
    setModalTitle("Sửa loại sản phẩm");
    setOpenModal(true);
  };

  const handleChangeCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const handleAddCategory = async () => {
    await Axios.post("http://localhost:8080/category/create/", {
      categoryGroupId: categoryGroupId,
      categoryTitle: categoryTitle,
    });
    setCategory({ ...category, categoryTitle: "" });
    setReload(!reload);
  };

  const handleUpdateCategory = async () => {
    await Axios.put(`http://localhost:8080/category/update/${categoryId}`, {
      categoryGroupId: categoryGroupId,
      categoryTitle: categoryTitle,
    });
    setCategory({ ...category, categoryTitle: "" });
    setReload(!reload);
  };

  const handleDeleteCategory = async (id) => {
    await Axios.delete(`http://localhost:8080/category/delete/${id}`);
    setReload(!reload);
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/category/getAllCategoryGroup/").then(
      (res) => {
        setCategoryGroups(res.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/category/get/").then((res) => {
      setCategorys(res.data);
    });
  }, [reload]);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(categorys.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div style={{ display: "flex", position: "relative", minHeight: "670px" }}>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title={modalTitle}
          height={"200px"}
          width={"500px"}
        >
          <select
            name="categoryGroupId"
            id="pet-select"
            onChange={handleChangeCategory}
            value={categoryGroupId}
            className="select"
          >
            {categoryGroups.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category_group_title}
              </option>
            ))}
          </select>
          <input
            className="input__text"
            type="text"
            name="categoryTitle"
            value={categoryTitle}
            placeholder="Tên loại ..."
            onChange={handleChangeCategory}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "25px",
            }}
          >
            {categoryStatus === "add" ? (
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
              {categorys
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
                        onClick={() => handleUpdateClick(item)}
                      >
                        Sửa
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {categorys.length > 0 && (
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
              previousLinkClassName={"previous__btn"}
              nextLinkClassName={"next__btn"}
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
