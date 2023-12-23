import Card from "react-bootstrap/Card";
import Loader from "../../../../components/loader-animation/Loader";
import ErrorPage from "../../../error-page/ErrorPage";
import {
  useGetAllUsersQuery,
  useGetFollowRequestsQuery,
  useAcceptFollowRequestMutation,
} from "../../../../features/profile/profile";

function FollowRequests() {
  const {
    data: usersData,
    error: usersDataError,
    isLoading: usersIsLoading,
  } = useGetAllUsersQuery();

  const { data: followRequestsData } = useGetFollowRequestsQuery();

  const [acceptFollowRequest] = useAcceptFollowRequestMutation();

  let filteredData = [];
  if (followRequestsData && usersData) {
    for (let i = 0; i < usersData.data.length; i++) {
      for (let j = 0; j < followRequestsData.data.length; j++) {
        if (followRequestsData.data[j].followerId === usersData.data[i]._id) {
          filteredData.push(usersData.data[i]);
        }
      }
    }
  }

  async function handleAcceptFollowRequest(id) {
    const response = await acceptFollowRequest({ id });
    console.log(response);
  }

  return (
    <div className="mb-3">
      <h5>Follow Requests</h5>
      {usersIsLoading ? (
        <Loader />
      ) : usersDataError ? (
        <ErrorPage>{usersDataError.data.message}</ErrorPage>
      ) : followRequestsData?.data?.length > 0 ? (
        filteredData?.map((user) => {
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
                            onClick={() => handleAcceptFollowRequest(user._id)}
                          >
                            Accept
                          </button>
                        </span>
                      </span>
                    </span>
                  </Card.Title>
                  <Card.Text className="mt-1">
                    <code className="mt-1">{user.email}</code>
                    <span className="mt-1">
                      Your profile is
                      {user.isPrivate ? (
                        <code> private</code>
                      ) : (
                        <code> public</code>
                      )}
                    </span>
                    <span className="text mt-1 text-left">
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
              <Card.Title>There are no current Follow Requests</Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default FollowRequests;
