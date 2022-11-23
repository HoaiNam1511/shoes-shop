import React from "react";
import { useState } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import "../scss/_base.scss";
import { useEffect } from "react";
import { useRef } from "react";
function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const buttonTitle = useRef();
  const productPerPage = 10;
  const pagesVisited = productPerPage * pageNumber;
  const changePage = (e) => {
    setPageNumber(e.target.value);
  };
  const pageCount = Math.ceil(productData.length / productPerPage);

  const [product, setProduct] = useState({
    productId: "",
    productTitle: "",
    productPrice: "",
    categoryStatusId: "",
    categoryStyleId: "",
    categoryLineId: "",
    categoryCollectionId: "",
    categoryMaterialId: "",
  });
  const {
    productId,
    productTitle,
    productPrice,
    categoryStatusId,
    categoryStyleId,
    categoryLineId,
    categoryCollectionId,
    categoryMaterialId,
  } = product;
  const handleAddClick = () => {
    buttonTitle.current = "add";
    setOpenModal(true);
  };
  const handleUpdateClick = (item) => {
    setProduct({
      productId: item.id,
      productTitle: item.product_title,
      productPrice: item.product_price,
      categoryStatusId: item.fk_category_status_id,
      categoryStyleId: item.fk_category_style_id,
      categoryLineId: item.fk_category_line_id,
      categoryCollectionId: item.fk_category_collection_id,
      categoryMaterialId: item.fk_category_material,
    });
    setOpenModal(true);
  };

  const handleValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleAddProduct = async () => {
    await Axios.post("http://localhost:8080/product/create/", {
      productTitle: productTitle,
      productPrice: productPrice,
      categoryStatusId: categoryStatusId,
      categoryStyleId: categoryStyleId,
      categoryLineId: categoryLineId,
      categoryCollectionId: categoryCollectionId,
      categoryMaterialId: categoryMaterialId,
    });
    setReload(!reload);
  };
  const handleUpdateProduct = async () => {
    await Axios.put("http://localhost:8080/product/update/" + productId, {
      productTitle: productTitle,
      productPrice: productPrice,
      categoryStatusId: categoryStatusId,
      categoryStyleId: categoryStyleId,
      categoryLineId: categoryLineId,
      categoryCollectionId: categoryCollectionId,
      categoryMaterialId: categoryMaterialId,
    });
    setReload(!reload);
  };
  const handleDeleteProduct = async (id) => {
    await Axios.delete("http://localhost:8080/product/delete/" + id).then(
      (res) => {
        if (res.data === "success") {
          setReload(!reload);
        }
      }
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/category/get/").then((res) => {
      setCategoryData(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/product/get/").then((res) => {
      setProductData(res.data);
    });
  }, [reload]);
  return (
    <div style={{ display: "flex", position: "relative", minHeight: "670px" }}>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          title="Thêm sản phẩm"
          height={"520px"}
          width={"500px"}
        >
          <div>
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product Title ..."
              name="productTitle"
              onChange={handleValueChange}
              value={productTitle}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              placeholder="Product Title ..."
              name="productPrice"
              onChange={handleValueChange}
              value={productPrice}
            />
          </div>
          <div>
            <label>Status</label>
            <select
              name="categoryStatusId"
              onChange={handleValueChange}
              value={categoryStatusId}
              className="select"
            >
              {categoryData.map(
                (item) =>
                  item.fk_category_group_id === 1 && (
                    <option value={item.id}>{item.category_title}</option>
                  )
              )}
            </select>
          </div>
          <div>
            <label>Style</label>
            <select
              name="categoryStyleId"
              onChange={handleValueChange}
              value={categoryStyleId}
              className="select"
            >
              {categoryData.map(
                (item) =>
                  item.fk_category_group_id === 2 && (
                    <option value={item.id}>{item.category_title}</option>
                  )
              )}
            </select>
          </div>
          <div>
            <label>Category Line</label>
            <select
              name="categoryLineId"
              onChange={handleValueChange}
              value={categoryLineId}
              className="select"
            >
              {categoryData.map(
                (item) =>
                  item.fk_category_group_id === 3 && (
                    <option value={item.id}>{item.category_title}</option>
                  )
              )}
            </select>
          </div>
          <div>
            <div>
              <label>Colection</label>
              <select
                name="categoryCollectionId"
                onChange={handleValueChange}
                value={categoryCollectionId}
                className="select"
              >
                {categoryData.map(
                  (item) =>
                    item.fk_category_group_id === 4 && (
                      <option value={item.id}>{item.category_title}</option>
                    )
                )}
              </select>
            </div>
            <div>
              <label>Material</label>
              <select
                name="categoryMaterialId"
                onChange={handleValueChange}
                value={categoryMaterialId}
                className="select"
              >
                {categoryData.map(
                  (item) =>
                    item.fk_category_group_id === 5 && (
                      <option value={item.id}>{item.category_title}</option>
                    )
                )}
              </select>
            </div>
            {buttonTitle.current === "add" ? (
              <Button onClick={handleAddProduct}>Thêm</Button>
            ) : (
              <Button onClick={handleUpdateProduct}>Sửa</Button>
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
                <th>Id</th>
                <th>Product Code</th>
                <th>Product Title</th>
                <th>Product Price</th>
                <th>Detail</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {productData
                .slice(pagesVisited, pagesVisited + productPerPage)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_code}</td>
                    <td>
                      <div>{item.product_title}</div>
                    </td>
                    <td>
                      <div>{item.product_price}</div>
                    </td>
                    <td>
                      <Button
                        height={"30px"}
                        width={"70px"}
                        backgroundColor={"red"}
                      >
                        Xem
                      </Button>
                    </td>
                    <td>
                      <Button
                        height={"30px"}
                        width={"70px"}
                        backgroundColor={"red"}
                        onClick={() => handleDeleteProduct(item.id)}
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
      </div>
      {productData.length > 0 && (
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
  );
}
export default Product;
