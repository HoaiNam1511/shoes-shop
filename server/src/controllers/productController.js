const multer = require("multer");
const path = require("path");
const Product = require("../models/products");
const Product_image = require("../models/product_images");

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
            categoryStatusId,
            categoryStyleId,
            categoryLineId,
            categoryCollectionId,
            categoryMaterialId,
        } = req.body;

        await Product.create({
            product_code: "",
            product_title: productName,
            product_price: productPrice,
            fk_category_status_id: categoryStatusId,
            fk_category_style_id: categoryStyleId,
            fk_category_line_id: categoryLineId,
            fk_category_collection_id: categoryCollectionId,
            fk_category_material_id: categoryMaterialId,
        })
            .then((result) => {
                console.log("success");
            })
            .catch((error) => {
                console.log(error);
            });

        const productId = await Product.findOne({
            attributes: ["id"],
            order: [["id", "DESC"]],
        })
            .then((productId) => {
                return productId.id;
            })
            .catch((error) => {
                console.log(error);
            });
        //Cach 1
        const newArrayImg = imageArray.map((item) => ({
            fk_product_id: productId,
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
        await Product_image.bulkCreate(newArrayImg)
            .then((product) => {
                res.send("success");
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

const getAllProduct = async (req, res) => {
    await Product.findAll({
        attributes: [
            "id",
            "product_code",
            "product_title",
            "product_price",
            "fk_category_status_id",
            "fk_category_style_id",
            "fk_category_line_id",
            "fk_category_collection_id",
            "fk_category_material_id",
        ],
        include: [{ model: Product_image }],
        order: [["id", "DESC"]],
    })
        .then((products) => {
            res.send(products);
        })
        .catch((error) => {
            console.log(error);
        });
};
const updateProduct = async (req, res) => {
    upload(req, res, async function () {
        const { id } = req.params;

        const {
            productName,
            productPrice,
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

        await Product.update(
            {
                product_title: productName,
                product_price: productPrice,
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
        )
            .then((products) => {
                console.log("updated");
            })
            .catch((error) => {
                console.log(error);
            });
        await Product_image.destroy({
            where: {
                fk_product_id: id,
            },
        });
        await Product_image.bulkCreate(newArrayImg)
            .then((product) => {
                res.send("success");
            })
            .catch((error) => {
                console.log(error);
            });
    });
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.destroy({
        where: {
            id: id,
        },
    })
        .then(() => res.send("success"))
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
};
