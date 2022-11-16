import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handleAddClick = () => {
    setOpenModal(true);
  };
  return (
    <div style={{ display: "flex", position: "relative", minHeight: "670px" }}>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title="Thêm loại hàng"
          height={"200px"}
          width={"500px"}
        ></Modal>
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
            {/* <tbody>
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
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}
export default Product;
