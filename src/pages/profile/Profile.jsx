import { useGetUserProfileQuery } from "../../features/profile/profile";
import Card from "react-bootstrap/Card";
import "./profile.css";
import ProfileModalPopUp from "./ProfileModalPopUp";
import { useState } from "react";
import Loader from "../../components/loader-animation/Loader";

export default function Profile() {
  const { data, isLoading } = useGetUserProfileQuery();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container-fluid profile-container d-flex justify-content-center align-items-center mt-5">
      <ProfileModalPopUp
        show={show}
        handleClose={handleClose}
        data={data?.data}
      />
      <Card className="profile-panel">
        <Card.Body className="profile-card-body">
          <span className="user-profile">
            <img src="/user-icon-on-transparent-background-free-png.webp" />
          </span>
        </Card.Body>
        <Card.Body className="profile-card-body justify-content-start mt-5 align-items-start">
          <Card.Title className="title-section">
            <span>
              <span>
                <span className="text-info d-flex align-items-center">
                  {data.data?.username}
                  {data.data?.isVerified && (
                    <img className="verified-icon mx-1" src="/verifed.png" />
                  )}
                  <button className="btn" onClick={handleShow}>
                    Edit
                  </button>
                </span>
              </span>
              <span className="mt-2">
                {data.data?.totalFollower} followers {data.data?.totalFollowing}{" "}
                following
              </span>
            </span>
          </Card.Title>
          <Card.Text className="mt-4">
            <span className="profile-body-title">
              {data.data?.firstname + " " + data.data?.lastname}
            </span>
            <code className="mt-1">{data.data.email}</code>
            <span className="mt-1">
              Your profile is
              {data.data?.isPrivate ? (
                <code> private</code>
              ) : (
                <code> public</code>
              )}
            </span>
            <span className="text mt-3 text-left">
              <code>Bio</code> : The magic you are looking for is in the work
              that you&apos;re avoiding!
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
