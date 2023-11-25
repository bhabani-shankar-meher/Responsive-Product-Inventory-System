import React from "react";
import { useContext } from "react";

import NavContext from "../../Context/NavContext";
import { useSelector } from "react-redux";
import { MdOutlineMenu } from "react-icons/md";

import classes from "./TopMenu.module.css";
import MyProfile from "../MyProfile/MyProfile";

const TopMenu = () => {
    const { menu, setMenu } = useContext(NavContext);

    const { isAuthenticated, userDetail } = useSelector((state) => state.login);
    // const [menu, setMenu] = useState(false);
    return (
        <div className={classes.container}>
            <div
                className={classes.burger_container}
                onClick={() => {
                    setMenu(!menu);
                }}
            >
                <MdOutlineMenu />
            </div>
            <div className={classes.actions}>
                PRODUCT INVENTORY
            </div>
            <MyProfile isAuthenticated={isAuthenticated} userDetail={userDetail} />
        </div>
    );
};
export default TopMenu;