
import { Link } from "react-router-dom";

import useClickOutside from "../../CustomHooks/ClickOutside";
import { useState } from "react";

import classes from "./MyProfile.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { authenticationData } from "../../store/action/login"

const MyProfile = (props) => {
    const { isAuthenticated, userDetail } = props;
    const [isProfileOpen, setisProfileOpen] = useState(false);
    const dispatch = useDispatch();
    let domNode = useClickOutside(() => {
        setisProfileOpen(false);
    });
    return (
        <div
            ref={domNode}
            className={classes.avatar_container}
            onClick={() => {
                setisProfileOpen(!isProfileOpen);
            }}
        >
            <div className={classes.icon_avatar_container}>
                <FiUser />
            </div>

            <div className={classes.name}>
                {
                    isAuthenticated ? (
                        <span>{userDetail.firstName}</span>
                    )
                        : (<span>LogIn/SignUp</span>)
                }
                <MdKeyboardArrowDown />
            </div>

            <div className={`${classes.menu} ${isProfileOpen ? classes.menu_active : ""}`}>
                <div className={classes.info}>
                    {
                        isAuthenticated && (
                            <span className={classes.name}>{userDetail.firstName}</span>
                            // <span className={classes.role}>Adminstrator</span>
                        )
                    }
                </div>
                <div className={classes.settings}>
                    {
                        isAuthenticated ? (
                            <span>
                                <Link to="/my-profile">MyProfile</Link><br></br>
                                <Link onClick={() => { dispatch(authenticationData(false)) }} to="/">Log Out</Link>
                            </span>
                        )
                            : (<span>
                                <Link to="/login">LogIn</Link><br></br>
                                <Link to="/signup">SignUp</Link>
                            </span>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
