import "./activity.css";
import DiscoverPeople from "./components/DiscoverPeople";
import FollowRequests from "./components/FollowRequests";

export default function Activity() {
  return (
    <div className="container-fluid profile-container d-flex justify-content-center align-items-center mt-2">
      <div className="d-flex activity-container">
        <DiscoverPeople />
        <FollowRequests />
      </div>
    </div>
  );
}
