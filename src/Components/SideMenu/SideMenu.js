import React from "react";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
import NavContext from "../../Context/NavContext";

import {
    MdOutlineAnalytics,
    MdOutlineMessage,
    MdOutlineLogout,
    MdFilterHdr,
    MdApps,
    MdQueue,
    MdLayers
} from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import classes from "./SideMenu.module.css";
const NavUrl = ({ url, icon, description }) => {
    const { menu, setMenu } = useContext(NavContext);
    const checkWindowSize = () => {
        if (window.innerWidth < 1024) setMenu(!menu);
    };

    return (
        <li className={classes.li_navlink}>
            <NavLink
                to={`${url}`}
                className={({ isActive }) => (isActive ? classes.active : undefined)}
                onClick={() => checkWindowSize()}
            >
                {icon}
                <span className={classes.description}>{description}</span>
            </NavLink>
        </li>
    );
};
const SideMenu = () => {
    const { menu, setMenu } = useContext(NavContext);

    return (
        <div className={`${classes.navbar_container} ${menu ? classes.navbar_mobile_active : undefined}`}>
            <nav className={menu ? undefined : classes.nav_small}>
                <div className={classes.logo}>
                    <MdFilterHdr className={classes.logo_icon} />
                    <FaTimes
                        className={classes.mobile_cancel_icon}
                        onClick={() => {
                            setMenu(!menu);
                        }}
                    />
                </div>
                <ul className={classes.menu_container}>
                    <span className={classes.categories}>
                        {menu ? "Pages" : <BsThreeDots />}
                    </span>

                    <NavUrl
                        url="/"
                        icon={<MdApps />}
                        description="Products"
                    />
                    <NavUrl
                        url="add-product"
                        icon={<MdQueue />}
                        description="AddProduct"
                    />
                    <NavUrl
                        url="chart-view"
                        icon={<MdOutlineAnalytics />}
                        description="Chart"
                    />
                    <NavUrl
                        url="about"
                        icon={<MdLayers />}
                        description="About"
                    />

                    <NavUrl
                        url="contact-us"
                        icon={<MdOutlineMessage />}
                        description="ContactUs"
                    />
                </ul>
                <div className={`${classes.btn_logout}`}
                    onClick={() => {
                        setMenu(!menu);
                    }}
                >
                    <MdOutlineLogout />
                </div>
            </nav>
            <div
                className={menu ? classes.mobile_nav_background_active : undefined}
                onClick={() => {
                    setMenu(!menu);
                }}
            ></div>
        </div>
    );
};

export default SideMenu;