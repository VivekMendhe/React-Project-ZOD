import { NavLink } from "react-router-dom";
import { ModeToggle } from "../components/ui/Mode-Toggle";
const Header = () => {
  return (
    <div className="h-20 flex justify-between items-center">
      <div className="ml-3 ">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products" className="ml-4">
          Products
        </NavLink>
        <NavLink to="/add-products" className="ml-4">
          Add Products
        </NavLink>
      </div>
      <ul className=" flex items-center gap-4 mr-3">
        <li>
          <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Header;
