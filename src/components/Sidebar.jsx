import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Authslice";
import "../css/Sidebar.css";
import Swal from "sweetalert2";
import Resizehook from "../hooks/Resizehook";
import { AiFillProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Sidebar = ({ show, setShow }) => {
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const widthResize = Resizehook();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          dispatch(logout());
          navigate("/");
        });
      }
    });
  };

  return (
    <div
      className={
        widthResize > 991 ? "sidebar sidewidth" : "sidebar sideunwidth"
      }
    >
      <div className="sidebar-user">
        <div className="user-avatar">
          <CgProfile />
        </div>
        <div className="user-info">
          <p className="user-name">{user?.firstName}</p>
          <p className="user-email">{user?.email}</p>
        </div>
      </div>

      <hr className="sidebar-divider" />
      <nav className="sidebar-nav">
        <NavLink
          onClick={() => {
            if (widthResize < 992) {
              setShow(false);
            }
          }}
          to="/products"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " nav-item--active" : "")
          }
        >
          <span className="nav-icon">
            <AiFillProduct />
          </span>
          Product List
        </NavLink>

        <NavLink
          onClick={() => {
            if (widthResize < 992) {
              setShow(false);
            }
          }}
          to="/profile"
          className={({ isActive }) =>
            "nav-item" + (isActive ? " nav-item--active" : "")
          }
        >
          <span className="nav-icon">
            <CgProfile />
          </span>
          Profile Page
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
