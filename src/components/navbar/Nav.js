import { Navbar } from "flowbite-react/lib/esm/components";
import { Dropdown, Avatar } from "flowbite-react";
import GrupBareng from "../../assets/GrupBareng.png";
import ToggleMode from "./partials/ToggleMode";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Tooltip } from "flowbite-react/lib/esm/components/Tooltip";
import { auth } from "../../services/firebase";

const Nav = ({ user, verify }) => {
  const route = useLocation();

  return (
    <Navbar
      fluid={true}
      className="bg-slate-100 dark:bg-slate-800 lg:px-14 fixed w-full z-10 shadow-sm"
    >
      <Navbar.Brand>
        <Tooltip animation={true} content="Grup Bareng">
          <Link to="/">
            <img
              src={GrupBareng}
              className="mr-3 ml-2 h-6 sm:h-6 inline"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Grup Bareng
            </span>
          </Link>
        </Tooltip>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ToggleMode />
        {user !== null ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img={user.photoURL}
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.displayName}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => auth.signOut()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          ""
        )}
      </div>
      {user !== null && verify ? (
        <Navbar.Collapse>
          <Navbar.Link active={route.pathname === "/" ?? true}>
            <Link to="/">Chats</Link>
          </Navbar.Link>
          <Navbar.Link active={route.pathname === "/member" ?? true}>
            <Link to="member">Members</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      ) : (
        ""
      )}
    </Navbar>
  );
};

export default Nav;
