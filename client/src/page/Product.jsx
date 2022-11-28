import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FaPlus, FaUpload } from "react-icons/fa";
import "../scss/_base.scss";
import "../scss/_global.scss";
import "../scss/_product.scss";
import axios from "axios";

function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const [categoryStatus, setCategoryStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [formSelect, setFormSelect] = useState("form1");

  const productPerPage = 10;
  const pagesVisited = productPerPage * pageNumber;
  const changePage = (e) => {
    setPageNumber(e.target.value);
  };
  const pageCount = Math.ceil(products.length / productPerPage);

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
    setCategoryStatus("add");
    setModalTitle("Thêm sản phẩm");
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
    setCategoryStatus("update");
    setModalTitle("Sửa sản phẩm");
    setOpenModal(true);
  };

  const handleValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeForm = (e) => {
    setFormSelect(e.target.name);
  };
  const handleAddProduct = async () => {
    let productData = new FormData();
    Array.from(images).forEach((image) => {
      console.log(image);
      productData.append("productImages", image);
    });
    productData.append("productTitle", productTitle);
    productData.append("productPrice", productPrice);
    productData.append(
      "categoryStatusId",
      categoryStatusId !== "" ? categoryStatusId : initialCategoryId[0].id
    );
    productData.append(
      "categoryStyleId",
      categoryStyleId !== "" ? categoryStyleId : initialCategoryId[1].id
    );
    productData.append(
      "categoryLineId",
      categoryLineId !== "" ? categoryLineId : initialCategoryId[2].id
    );
    productData.append(
      "categoryCollectionId",
      categoryCollectionId !== ""
        ? categoryCollectionId
        : initialCategoryId[3].id
    );
    productData.append(
      "categoryMaterialId",
      categoryMaterialId !== "" ? categoryMaterialId : initialCategoryId[4].id
    );

    axios.post("http://localhost:8080/product/create/", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setReload(!reload);
  };
  const handleUpdateProduct = async () => {
    await Axios.put(`http://localhost:8080/product/update/${productId}`, {
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
    await Axios.delete(`http://localhost:8080/product/delete/${id}`).then(
      (res) => {
        if (res.data === "success") {
          setReload(!reload);
        }
      }
    );
  };
  useEffect(() => {
    Axios.get("http://localhost:8080/category/get/").then((res) => {
      setCategorys(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/product/get/").then((res) => {
      setProducts(res.data);
    });
  }, [reload]);

  const initialCategoryId = categorys.filter(
    (data, index, self) =>
      index ===
      self.findIndex(
        (i) => i.fk_category_group_id === data.fk_category_group_id
      )
  );

  const handleUploadFile = (e) => {
    setImages(e.target.files);
  };

  const handleDeleteImage = (index) => {
    //Xem lai phan nay
    let fileArr = Array.from(images);
    fileArr.splice(index, 1);
    setImages(fileArr);
  };

  return (
    <div style={{ display: "flex", position: "relative", minHeight: "670px" }}>
      {openModal && (
        <Modal
          title={modalTitle}
          closeModal={setOpenModal}
          height={"520px"}
          width={"400px"}
        >
          <div className="modal__selection">
            <button
              className={`modal__selection__btn ${
                formSelect === "form1" ? "modal__selection--active" : ""
              }`}
              name="form1"
              onClick={handleChangeForm}
            >
              Thông tin
            </button>
            <button
              className={`modal__selection__btn ${
                formSelect === "form2" ? "modal__selection--active" : ""
              }`}
              name="form2"
              onClick={handleChangeForm}
            >
              Hình ảnh
            </button>
          </div>
          {/* form1 */}
          <div
            className={`modal__form ${
              formSelect === "form1" ? "modal__form--active" : ""
            }`}
          >
            <div>
              <label>Product Name</label>
              <input
                className="input__text"
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
                className="input__text"
                type="text"
                placeholder="Product Title ..."
                name="productPrice"
                onChange={handleValueChange}
                value={productPrice}
              />
            </div>
            <div className="flex__container">
              <div className="flex__container__child">
                <label>Status</label>
                <select
                  name="categoryStatusId"
                  onChange={handleValueChange}
                  value={categoryStatusId}
                  className="select"
                >
                  {categorys.map(
                    (item) =>
                      item.fk_category_group_id === 1 && (
                        <option value={item.id}>{item.category_title}</option>
                      )
                  )}
                </select>
              </div>
              <div className="flex__container__child">
                <label>Style</label>
                <select
                  name="categoryStyleId"
                  onChange={handleValueChange}
                  value={categoryStyleId}
                  className="select"
                >
                  {categorys.map(
                    (item) =>
                      item.fk_category_group_id === 2 && (
                        <option value={item.id}>{item.category_title}</option>
                      )
                  )}
                </select>
              </div>
            </div>
            <div className="flex__container">
              <div className="flex__container__child">
                <label>Category Line</label>
                <select
                  name="categoryLineId"
                  onChange={handleValueChange}
                  value={categoryLineId}
                  className="select"
                >
                  {categorys.map(
                    (item) =>
                      item.fk_category_group_id === 3 && (
                        <option value={item.id}>{item.category_title}</option>
                      )
                  )}
                </select>
              </div>

              <div className="flex__container__child">
                <label>Colection</label>
                <select
                  name="categoryCollectionId"
                  onChange={handleValueChange}
                  value={categoryCollectionId}
                  className="select"
                >
                  {categorys.map(
                    (item) =>
                      item.fk_category_group_id === 4 && (
                        <option value={item.id}>{item.category_title}</option>
                      )
                  )}
                </select>
              </div>
            </div>
            <div>
              <label>Material</label>
              <select
                name="categoryMaterialId"
                onChange={handleValueChange}
                value={categoryMaterialId}
                className="select"
              >
                {categorys.map(
                  (item) =>
                    item.fk_category_group_id === 5 && (
                      <option value={item.id}>{item.category_title}</option>
                    )
                )}
              </select>
            </div>
          </div>
          {/* form2 */}
          <div
            className={`modal__form ${
              formSelect === "form2" ? "modal__form--active" : ""
            }`}
          >
            <input
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleUploadFile}
              multiple="multiple"
            />
            <label htmlFor="file-upload" className="modal__form__upload">
              <FaUpload className="modal__form__upload__icon"></FaUpload>
              <div className="modal__form__upload__title">
                Select a file or drang here
              </div>
            </label>
            <div className="modal__form__image">
              {Array.from(images).map((item, index) => (
                <div className="product__container">
                  <button
                    className="product__image__btn"
                    onClick={() => handleDeleteImage(index)}
                  >
                    x
                  </button>
                  <img
                    key={index}
                    className="product__image"
                    src={item ? URL.createObjectURL(item) : null}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "25px",
            }}
          >
            {categoryStatus === "add" ? (
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
              {products
                .slice(pagesVisited, pagesVisited + productPerPage)
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product_code}</td>
                    <td>
                      <div>{product.product_title}</div>
                    </td>
                    <td>
                      <div>{product.product_price}</div>
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
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Xoá
                      </Button>
                    </td>
                    <td>
                      <Button
                        height={"30px"}
                        width={"70px"}
                        backgroundColor={"blue"}
                        onClick={() => handleUpdateClick(product)}
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
      {products.length > 0 && (
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
