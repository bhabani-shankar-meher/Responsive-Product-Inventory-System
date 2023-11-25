import { createContext } from "react";

const NavContext = createContext({
    menu: false,
    setMenu: () => { },
});
export default NavContext;
