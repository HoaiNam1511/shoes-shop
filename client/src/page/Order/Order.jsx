import PropTypes from "prop-types";
import styles from "./Order.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useState } from "react";
const cx = classNames.bind(styles);
function Order() {
    const [arr, setArr] = useState([]);
    useEffect(() => {
        setArr([
            {
                id: 1,
                name: "C",
            },
            {
                id: 2,
                name: "A",
            },
            {
                id: 3,
                name: "B",
            },
        ]);
    }, []);

    const handleSortCategory = (e) => {
        let newCategorySort;
        if (e.target.value == 1) {
            console.log("come");
            const newCategorySort = arr.sort((category1, category2) =>
                category1.id > category2.id
                    ? 1
                    : category1.id > category2.id
                    ? 0
                    : -1
            );
            console.log(newCategorySort);
            setArr(newCategorySort);
        } else if (e.target.value == 2) {
            console.log("come 1");
            const newCategorySort = arr.sort((category1, category2) =>
                category1.id < category2.id
                    ? 1
                    : category1.id < category2.id
                    ? 0
                    : -1
            );
            console.log(newCategorySort);
            setArr(newCategorySort);
        }
    };
    return (
        <div>
            <select onChange={handleSortCategory}>
                <option value="1">High to low</option>
                <option value="2">Low to high</option>
            </select>
            {arr.map((i) => (
                <h3>{i.name}</h3>
            ))}
        </div>
    );
}

export default Order;
