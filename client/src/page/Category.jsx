import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../scss/_category.scss";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

import { useCallback } from "react";

function Category() {
  const [categoryGroup, setCategoryGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryGroupId, setCategoryGroupId] = useState(1);
  const [categoryStatus, setCategoryStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const handleAddClick = useCallback(() => {
    setCategoryStatus("add");
    setOpenModal(true);
  }, []);
  const handleUpdateClick = (
    idParam,
    categoryTitleParam,
    categoryGroupIdParam
  ) => {
    console.log(categoryTitle);
    setCategoryId(idParam);
    setCategoryTitle(categoryTitleParam);
    setCategoryGroupId(categoryGroupIdParam);
    setCategoryStatus("update");
    setOpenModal(true);
  };

  const handleCategoryChange = useCallback((e) => {
    setCategoryTitle(e.target.value);
  }, []);

  const handleSelectCategory = useCallback((e) => {
    setCategoryGroupId(e.target.value);
  }, []);

  const handleAddCategory = useCallback(async () => {
    await Axios.post("http://localhost:8080/category/create/", {
      categoryGroupId: categoryGroupId,
      categoryTitle: categoryTitle,
    });
    setReload(!reload);
    setCategoryTitle("");
  }, [categoryTitle]);

  const handleUpdateCategory = useCallback(async () => {
    await Axios.put("http://localhost:8080/category/update/" + categoryId, {
      categoryGroupId: categoryGroupId,
      categoryTitle: categoryTitle,
    });
    setReload(!reload);
    setCategoryTitle("");
  }, [categoryTitle, categoryGroupId]);

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

  //paginate
  useEffect(() => {
    const fetchPosts = async () => {};

    fetchPosts();
  }, []);

  // // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(paginate);
  return (
    <div style={{ display: "flex" }}>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title="Thêm loại hàng"
          height={"200px"}
          width={"500px"}
        >
          <select
            name="pets"
            id="pet-select"
            onChange={handleSelectCategory}
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
            {/* <option value="">--Please choose an option--</option> */}
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
            style={{
              height: "37px",
              width: "calc(100% - 10px)",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              lineHeight: "1.5",
              fontSize: "16px",
              fontWeight: "400",
              padding: "0 0 0 10px",
              marginBottom: "10px",
            }}
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
        <div className="catagory__table__container">
          <table className="category__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Group</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.category_group_title}</td>
                  <td>{item.category_title}</td>
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
      </div>
    </div>
  );
}
export default Category;
