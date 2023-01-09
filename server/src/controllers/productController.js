const multer = require("multer");
const path = require("path");
const Product = require("../models/products");
const Product_image = require("../models/product_images");
const ITEM_PER_PAGE = 7;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage }).array("productImages", 12);
const createProduct = async (req, res) => {
    upload(req, res, async function () {
        // if (err instanceof multer.MulterError) {
        //   // Một lỗi của Multer xảy ra khi upload.
        // } else if (err) {
        //   // Một lỗi không xác định xảy ra khi upload.
        // } else {
        // }
        const imageArray = req.files;
        const {
            productName,
            productPrice,
            productSex,
            categoryStatusId,
            categoryStyleId,
            categoryLineId,
            categoryCollectionId,
            categoryMaterialId,
        } = req.body;

        try {
            await Product.create({
                product_code: "",
                product_name: productName,
                product_price: productPrice,
                product_sex: productSex,
                fk_category_status_id: categoryStatusId,
                fk_category_style_id: categoryStyleId,
                fk_category_line_id: categoryLineId,
                fk_category_collection_id: categoryCollectionId,
                fk_category_material_id: categoryMaterialId,
            });
        } catch (error) {
            console.log(error);
        }

        let productId;
        try {
            productId = await Product.findOne({
                attributes: ["id"],
                order: [["id", "DESC"]],
            });
        } catch (error) {
            console.log(error);
        }

        //Cach 1
        const newArrayImg = imageArray.map((item) => ({
            fk_product_id: productId.id,
            image: item.filename,
        }));

        //Cach 2
        // const insert_data = imageArray.reduce(
        //   (accumulator, currentValue) => [
        //     ...accumulator,
        //     { image: currentValue.filename },
        //   ],
        //   []
        // );

        try {
            await Product_image.bulkCreate(newArrayImg);
            res.send({
                message: "Add product success",
                action: "add",
            });
        } catch (error) {
            console.log(error);
        }
    });
};

const getAllProduct = async (req, res) => {
    let page = req.query.page;
    if (page) {
        let offSet = (page - 1) * ITEM_PER_PAGE;
        try {
            const products = await Product.findAndCountAll({
                attributes: [
                    "id",
                    "product_code",
                    "product_name",
                    "product_price",
                    "product_sex",
                    "fk_category_status_id",
                    "fk_category_style_id",
                    "fk_category_line_id",
                    "fk_category_collection_id",
                    "fk_category_material_id",
                ],
                offset: offSet,
                limit: ITEM_PER_PAGE,
                include: [{ model: Product_image, as: "product_images" }],
                order: [["id", "DESC"]],
            });
            const totalPage = await Math.ceil(products.count / ITEM_PER_PAGE);
            res.send({
                totalPage: totalPage,
                data: products.rows,
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const products = await Product.findAndCountAll({
                attributes: [
                    "id",
                    "product_code",
                    "product_name",
                    "product_price",
                    "product_sex",
                    "fk_category_status_id",
                    "fk_category_style_id",
                    "fk_category_line_id",
                    "fk_category_collection_id",
                    "fk_category_material_id",
                ],
                include: [{ model: Product_image, as: "product_images" }],
                order: [["id", "DESC"]],
            });
            res.send({
                totalPage: products.count,
                data: products.rows,
            });
        } catch (error) {
            console.log(error);
        }
    }
};
const updateProduct = async (req, res) => {
    upload(req, res, async function () {
        const { id } = req.params;
        const {
            productName,
            productPrice,
            productSex,
            categoryStatusId,
            categoryStyleId,
            categoryLineId,
            categoryCollectionId,
            categoryMaterialId,
        } = req.body;

        const imageFilesArray = req.files;
        const imageFilesArr = imageFilesArray.map((item) => ({
            fk_product_id: id,
            image: item.filename,
        }));
        const imageArray = JSON.parse(req.body.images);

        const imagesArr = imageArray.map((item) => ({
            fk_product_id: id,
            image: item.image,
        }));
        const newArrayImg = [...imagesArr, ...imageFilesArr];

        try {
            await Product.update(
                {
                    product_name: productName,
                    product_price: productPrice,
                    product_sex: productSex,
                    fk_category_status_id: categoryStatusId,
                    fk_category_style_id: categoryStyleId,
                    fk_category_line_id: categoryLineId,
                    fk_category_collection_id: categoryCollectionId,
                    fk_category_material_id: categoryMaterialId,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }

        try {
            await Product_image.destroy({
                where: {
                    fk_product_id: id,
                },
            });
        } catch (error) {
            console.log(error);
        }

        try {
            await Product_image.bulkCreate(newArrayImg);
            res.send({
                message: "Update category success",
                action: "update",
            });
        } catch (error) {
            console.log(error);
        }
    });
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({
            where: {
                id: id,
            },
        });
        res.send({
            message: "Delete category success",
            action: "delete",
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
};
