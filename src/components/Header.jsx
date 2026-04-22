import React, { useState } from "react";
import "../css/Header.css";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { Offcanvas } from "react-bootstrap";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="header">
        <p className="Headername">Assessment</p>
        <AiOutlineMenu
          fontSize={20}
          onClick={() => setShow(true)}
          color="#fff"
        />
        <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Assessment</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar show={show} setShow={setShow} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Header;
