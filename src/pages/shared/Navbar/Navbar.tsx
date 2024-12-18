import { IoMenu } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/Drawer";
import { MenuLinks } from "../../../utilities/list";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
  TUser,
} from "../../../redux/features/auth/authSlice";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/logIn");
  };

  const conditionalLinks = (
    <>
      {!user && (
        <Link to={"/logIn"} className="primary-border-btn">
          Login
        </Link>
      )}
      {user && (
        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
          <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
          <button onClick={handleLogout} className="primary-border-btn">
            Logout
          </button>
        </div>
      )}
    </>
  );
  return (
    <div className="h-[60px] flex justify-between items-center bg-slate-100 lg:px-[60px] px-5 py-2 text-primary">
      <Link to={"/"} className="flex gap-x-2 items-center">
        <p className="text-3xl font-bold">
          <span className="text-green-500">Car</span>{" "}
          <span className="text-red-500">Wash</span>
        </p>
      </Link>
      <div className="md:flex items-center gap-x-3 font-medium hidden">
        {MenuLinks?.map((menu, idx) => (
          <Link key={idx} to={menu?.path}>
            {menu?.name}
          </Link>
        ))}
        {conditionalLinks}
      </div>
      <div className="md:hidden block">
        <Drawer direction="right">
          <DrawerTrigger>
            <IoMenu className="text-2xl" />{" "}
          </DrawerTrigger>
          <DrawerContent className="right-0 top-0 mt-0 ms-[200px] rounded-r-none">
            <DrawerClose className="flex justify-end m-2">
              <AiOutlineCloseSquare className=" text-3xl p-1" />
            </DrawerClose>
            <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4 ">
              {MenuLinks?.map((menu, idx) => (
                <Link key={idx} to={menu?.path}>
                  {menu?.name}
                </Link>
              ))}
              {conditionalLinks}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
