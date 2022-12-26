import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import Button from "../../components/Button/Button";

import { setModalShow } from "../../redux/Slice/modalSlice";
import { addCategoryGroup } from "../../redux/Slice/categorySlice";

import * as categoryService from "../../service/categoryService";
const cx = classNames.bind(styles);

function Category() {
    const dispatch = useDispatch();
    const handleAddProduct = () => {
        dispatch(setModalShow(true));
    };

    useEffect(() => {
        const result = async () => {
            try {
                const response = await categoryService.getCategoryGroup();
                dispatch(addCategoryGroup(response));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [dispatch]);
    return (
        <div>
            <Button
                onClick={handleAddProduct}
                leftIcon={<AddIcon fontSize="large" />}
            >
                Add
            </Button>
            <CategoryModal></CategoryModal>
        </div>
    );
}

export default Category;
