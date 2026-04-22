import React from "react";
import { useSelector } from "react-redux";
import "../css/Profilepage.css";

const ProfilePage = () => {
  // const user = useSelector((state) => state.auth.user);
  // console.log("userdetail", user);
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  // if (!user) return <p style={{ color:"#fff" }}>Loading user...</p>;
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Profile Page</h1>
        <p className="profile-sub mb-3">Your account details</p>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{user?.gender}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Age</span>
            <span className="detail-value">{user?.age}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Role</span>
            <span className="detail-value">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
