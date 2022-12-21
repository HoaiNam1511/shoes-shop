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
      categoryGroupId: item.Category_group.id,
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
    })
      .then((res) => {
        if (res.data === "created") {
          setCategory({ ...category, categoryTitle: "" });
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateCategory = async () => {
    await Axios.put(`http://localhost:8080/category/update/${categoryId}`, {
      categoryGroupId: categoryGroupId,
      categoryTitle: categoryTitle,
    })
      .then((res) => {
        if (res.data === "updated") {
          setCategory({ ...category, categoryTitle: "" });
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCategory = async (id) => {
    await Axios.delete(`http://localhost:8080/category/delete/${id}`)
      .then((res) => {
        if (res.data === "deleted") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/category/getAllCategoryGroup/")
      .then((res) => {
        setCategoryGroups(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/category/get/")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const categorysPerPage = 10;
  const pagesVisited = pageNumber * categorysPerPage;
  const pageCount = Math.ceil(categorys.length / categorysPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="category__container">
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title={modalTitle}
          height={"200px"}
          width={"500px"}
        >
          <div className="category__modal">
            <select
              name="categoryGroupId"
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
            <div className=" category__modal__bottom--btn">
              {categoryStatus === "add" ? (
                <Button onClick={handleAddCategory}>Thêm</Button>
              ) : (
                <Button onClick={handleUpdateCategory}>Sửa</Button>
              )}
            </div>
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
                .slice(pagesVisited, pagesVisited + categorysPerPage)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.Category_group.category_group_title}</td>
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
