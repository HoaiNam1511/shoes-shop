const Category = require("../models/categorys");
const Category_group = require("../models/category_groups");
const ITEM_PER_PAGE = 10;
const getALLCategoryGroup = async (req, res) => {
    await Category_group.findAll({
        attributes: ["id", "category_group_title"],
    })
        .then((categoryGroups) => res.send(categoryGroups))
        .catch((error) => {
            console.log(error);
        });
};

const getAllCategory = async (req, res) => {
    let page = req.query.page;
    if (page) {
        const offset = (page - 1) * ITEM_PER_PAGE;
        await Category.findAndCountAll({
            attributes: ["id", "fk_category_group_id", "category_title"],
            include: [
                {
                    model: Category_group,
                    //attributes: ["category_group_title"],
                },
            ],
            offset: offset,
            limit: ITEM_PER_PAGE,
            order: [["fk_category_group_id", "ASC"]],
        })
            .then((categorys) => {
                const totalPage = Math.ceil(categorys.count / ITEM_PER_PAGE);
                res.send({
                    totalPage: totalPage,
                    data: categorys.rows,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        await Category.findAndCountAll({
            attributes: ["id", "fk_category_group_id", "category_title"],
            include: [
                {
                    model: Category_group,
                    //attributes: ["category_group_title"],
                },
            ],
            order: [["fk_category_group_id", "ASC"]],
        })
            .then((categorys) => {
                const totalPage = Math.ceil(categorys.count / ITEM_PER_PAGE);
                res.send({
                    totalPage: totalPage,
                    data: categorys.rows,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

const createCategory = async (req, res) => {
    const { categoryTitle, categoryGroupId } = req.body;
    await Category.create({
        fk_category_group_id: categoryGroupId,
        category_title: categoryTitle,
    })
        .then((categorys) => {
            res.send("created");
        })
        .catch((error) => {
            console.log(error);
        });
};

const updateCategory = async (req, res) => {
    const { categoryTitle, categoryGroupId } = req.body;
    const id = req.params.id;
    await Category.update(
        {
            fk_category_group_id: categoryGroupId,
            category_title: categoryTitle,
        },
        {
            where: {
                id: id,
            },
        }
    )
        .then((categorys) => {
            res.send("updated");
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.destroy({
        where: {
            id: id,
        },
    })
        .then((categorys) => {
            res.send("deleted");
        })
        .catch((error) => {
            console.log(error);
        });
};
module.exports = {
    getALLCategoryGroup,
    getAllCategory,
    createCategory,
    deleteCategory,
    updateCategory,
};
