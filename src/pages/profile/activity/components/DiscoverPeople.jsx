import Card from "react-bootstrap/Card";
import Loader from "../../../../components/loader-animation/Loader";
import ErrorPage from "../../../error-page/ErrorPage";
import {
  useFollowUserMutation,
  useGetAllUsersQuery,
} from "../../../../features/profile/profile";

function DiscoverPeople() {
  const { data, error, isLoading } = useGetAllUsersQuery();
  const [followUser] = useFollowUserMutation();

  async function handleFollowUser(userId) {
    if (confirm("You want to follow this user")) {
      const userData = await followUser({ userId });
      console.log(userId, userData);
    }
  }

  return (
    <div className="mx-2 mb-3">
      <h5>Discover People</h5>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorPage>{error.data.message}</ErrorPage>
      ) : data?.data?.length > 0 ? (
        data?.data?.map((user) => {
          return (
            <div key={user._id} className="d-flex justify-content-around mt-2">
              <Card className="activity-panel">
                <Card.Body className="activity-card-body">
                  <span className="user-activity">
                    <img src="/user-icon-on-transparent-background-free-png.webp" />
                  </span>
                </Card.Body>
                <Card.Body className="activity-card-body justify-content-start align-items-start">
                  <Card.Title className="title-section">
                    <span>
                      <span>
                        <span className="text-info d-flex align-items-center">
                          {user.firstname} {user.lastname}
                          <img
                            className="verified-icon mx-1"
                            src="/verifed.png"
                          />
                          <button
                            className="btn"
                            onClick={() => handleFollowUser(user._id)}
                          >
                            Follow
                          </button>
                        </span>
                      </span>
                    </span>
                  </Card.Title>
                  <Card.Text className="mt-1 d-flex flex-column flex-wrap">
                    <code className="mt-1">{user.email}</code>
                    <span className="mt-1">
                      Your profile is
                      {user.isPrivate ? (
                        <code> private</code>
                      ) : (
                        <code> public</code>
                      )}
                    </span>
                    <span className="text mt-1 text-wrap text-left">
                      <code>Bio</code> : The magic you are looking for is in the
                      work that you&apos;re avoiding!
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="d-flex w-100 justify-content-around mt-2">
          <Card>
            <Card.Body
              style={{
                width: "40vw",
                height: "30vh",
                objectFit: "cover",
              }}
              variant="top"
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Title>No Data Found</Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default DiscoverPeople;
