import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../scss/_sidebar.scss";

import { sidebarData } from "../data/sidebar";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(0);
  const handleIsActive = (index) => {
    setIsActive(index);
  };

  return (
    <div className="sideBar__container">
      <div className="sideBar">
        <div className="sideBar__user">
          <span>
            <img src={require("../asset/admin_icon.png")} alt="" />
          </span>
          <span>
            Xin chào, <strong>Hoai Nam</strong>
          </span>
        </div>
        <div>
          {sidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={`sideBar__item ${
                isActive === index ? "sideBar__item--isActive" : ""
              }`}
              onClick={() => handleIsActive(index)}
            >
              <div
                className={`sideBar__item__icon ${
                  isActive === index ? "sideBar__icon--isActive" : ""
                }`}
              >
                {item.icon}
              </div>
              <div
                className={`sideBar__item__title ${
                  isActive === index ? "sideBar__title--isActive" : ""
                }`}
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
