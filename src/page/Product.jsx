import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FaPlus, FaUpload } from "react-icons/fa";
import "../scss/_base.scss";
import "../scss/_global.scss";
import "../scss/_product.scss";

function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [categoryStatus, setCategoryStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [formSelect, setFormSelect] = useState("form1");

  const productsPerPage = 10;
  const pagesVisited = productsPerPage * pageNumber;
  const changePage = (e) => {
    setPageNumber(e.target.value);
  };
  const pageCount = Math.ceil(products.length / productsPerPage);
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
    const imageProduct = item.Product_images.map((newItem) => {
      return newItem;
    });
    setImages(imageProduct);
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
    Array.from(imageFiles).forEach((imageFile) => {
      productData.append("productImages", imageFile);
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

    await axios
      .post("http://localhost:8080/product/create/", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data === "success") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateProduct = async () => {
    let productData = new FormData();
    Array.from(imageFiles).forEach((image) => {
      productData.append("productImages", image);
    });
    productData.append("images", JSON.stringify(images));
    productData.append("productTitle", productTitle);
    productData.append("productPrice", productPrice);
    productData.append("categoryStatusId", categoryStatusId);
    productData.append("categoryStyleId", categoryStyleId);
    productData.append("categoryLineId", categoryLineId);
    productData.append("categoryCollectionId", categoryCollectionId);
    productData.append("categoryMaterialId", categoryMaterialId);

    await axios
      .put(`http://localhost:8080/product/update/${productId}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data === "success") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8080/product/delete/${id}`)
      .then((res) => {
        if (res.data === "success") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/category/get/")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/get/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const initialCategoryId = categorys.filter(
    (data, index, self) =>
      index ===
      self.findIndex(
        (i) => i.fk_category_group_id === data.fk_category_group_id
      )
  );
  console.log(initialCategoryId);

  const handleUploadFile = (e) => {
    console.log("come");
    setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const handleDeleteImage = (index) => {
    //Xem lai phan nay
    let imgArr = Array.from(images);
    imgArr.splice(index, 1);
    setImages(imgArr);
  };
  const handleDeleteImageFile = (index) => {
    let imgFileArr = Array.from(imageFiles);
    imgFileArr.splice(index, 1);
    setImageFiles(imgFileArr);
  };
  return (
    <div className="product__container">
      {openModal && (
        <Modal
          title={modalTitle}
          closeModal={setOpenModal}
          height={"520px"}
          width={"400px"}
        >
          <div className="product__modal">
            <div className="product__modal__selection">
              <button
                className={`product__modal__selection__btn ${
                  formSelect === "form1"
                    ? "product__modal__selection--active"
                    : ""
                }`}
                name="form1"
                onClick={handleChangeForm}
              >
                Thông tin
              </button>
              <button
                className={`product__modal__selection__btn ${
                  formSelect === "form2"
                    ? "product__modal__selection--active"
                    : ""
                }`}
                name="form2"
                onClick={handleChangeForm}
              >
                Hình ảnh
              </button>
            </div>
            {/* form1 */}
            <div
              className={`product__modal__form ${
                formSelect === "form1" ? "product__modal__form--active" : ""
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
              className={`product__modal__form ${
                formSelect === "form2" ? "product__modal__form--active" : ""
              }`}
            >
              <input
                className="product__modal__form__file"
                type="file"
                id="file-upload"
                onChange={handleUploadFile}
                multiple="multiple"
              />
              <label
                htmlFor="file-upload"
                className="product__modal__form__upload"
              >
                <FaUpload className="product__modal__form__upload__icon"></FaUpload>
                <div className="product__modal__form__upload__title">
                  Select a file or drag here
                </div>
              </label>
              <div className="product__modal__form__image">
                {imageFiles.length > 0 &&
                  imageFiles.map((item, index) => (
                    <div className="product__container__image">
                      <button
                        className="product__image__btn"
                        onClick={() => handleDeleteImageFile(index)}
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

                {images.length > 0 &&
                  images.map((item, index) => (
                    <div className="product__container__image">
                      <button
                        className="product__image__btn"
                        onClick={() => handleDeleteImage(index)}
                      >
                        x
                      </button>
                      <img
                        key={index}
                        className="product__image"
                        src={`http://localhost:8080/images/${item.image}`}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="product__modal__btn--bottom">
              {categoryStatus === "add" ? (
                <Button onClick={handleAddProduct}>Thêm</Button>
              ) : (
                <Button onClick={handleUpdateProduct}>Sửa</Button>
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
                <th>Id</th>
                <th>Product Code</th>
                <th>Image</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Detail</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products
                .slice(pagesVisited, pagesVisited + productsPerPage)
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product_code}</td>
                    <td>
                      <img
                        height={"50px"}
                        width={"50px"}
                        src={`http://localhost:8080/images/${
                          product.Product_images.length > 0
                            ? product.Product_images[0].image
                            : "1669846349022.jpg"
                        }`}
                        alt=""
                      />
                    </td>
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
        <div className="pagination">
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
