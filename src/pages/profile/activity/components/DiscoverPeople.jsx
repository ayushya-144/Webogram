import Card from "react-bootstrap/Card";
import Loader from "../../../../components/loader-animation/Loader";
import ErrorPage from "../../../error-page/ErrorPage";
import {
  useFollowUserMutation,
  useGetAllUsersQuery,
  useGetUserProfileQuery,
} from "../../../../features/profile/profile";

function DiscoverPeople() {
  const {
    data: profileUserData,
    // error: profileUserError,
    isLoading: profileUserLoading,
  } = useGetUserProfileQuery();
  const {
    data: allUsersData,
    error: allUsersError,
    isLoading: allUsersLoading,
  } = useGetAllUsersQuery();
  const [followUser] = useFollowUserMutation();
  // console.log(data);
  async function handleFollowUser(id) {
    if (confirm("You want to follow this user")) {
      const response = await followUser({ id });
      console.log({ id }, response);
    }
  }
  // if (!allUsersLoading && !profileUserLoading) {
  //   for (let i = 0; i < allUsersData.data.length; i++) {
  //     for (let j = 0; j < profileUserData.data.following.length; j++) {
  //       if (profileUserData.data.following[j].followingId) {
  //         if (
  //           profileUserData.data.following[j].followingId !==
  //           allUsersData.data[i]._id
  //         ) {
  //           filteredData.push(allUsersData.data[i]);
  //         }
  //       }
  //     }
  //   }
  // }

  if (!allUsersLoading && !profileUserLoading) {
    var filteredData = allUsersData.data.map((user) => {
      for (let i = 0; i < profileUserData.data.following.length; i++) {
        if (profileUserData.data.following[i].followingId) {
          if (profileUserData.data.following[i].followingId !== user._id) {
            return user;
          }
        }
      }
    });
  }

  console.log(filteredData);

  return (
    <div className="mx-2 mb-3">
      <h5>Discover People</h5>
      {allUsersLoading ? (
        <Loader />
      ) : allUsersError ? (
        <ErrorPage>{allUsersError.data.message}</ErrorPage>
      ) : allUsersData?.data?.length > 0 ? (
        allUsersData?.data?.map((user) => {
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
