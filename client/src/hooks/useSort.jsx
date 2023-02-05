import { useEffect } from "react";
import { useState } from "react";

function useSort(dataPass, column) {
    const [data, setData] = useState(dataPass);
    const [col, setCol] = useState(column);
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        let newData = data;
        // e.target.innerHTML = "&#9650;";
        if (order === "ASC") {
            newData = data.sort((data1, data2) =>
                data1[col] > data2[col] ? 1 : data1[col] > data2[col] ? 0 : -1
            );
            setOrder("DESC");
            setData(data);
        } else if (order === "DESC") {
            // e.target.innerHTML = "&#9660;";
            newData = data.sort((data1, data2) =>
                data1[col] < data2[col] ? 1 : data1[col] < data2[col] ? 0 : -1
            );
            setOrder("ASC");
            setData(data);
        }
    }, []);
    return data;
}

export default useSort;
