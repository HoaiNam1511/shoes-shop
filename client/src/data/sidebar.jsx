import { BiCategory } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

export const sidebarData = [
  {
    path: "/",
    title: "Home",
    icon: <AiFillHome />,
  },
  {
    path: "/category",
    title: "Category",
    icon: <BiCategory />,
  },
  {
    path: "/product",
    title: "Product",
    icon: <FaProductHunt />,
  },
];
