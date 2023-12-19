import { useGetUserPostsQuery } from "../../features/homepage/home";
import Card from "react-bootstrap/Card";
import ErrorPage from "../error-page/ErrorPage";
import Loader from "../../components/loader-animation/Loader";
import { useSearchParams } from "react-router-dom";
// import { useDeferredValue } from "react";

export default function Home() {
  const [searchQuery] = useSearchParams({
    search: "",
    isMyPostsOnly: false,
    isPrivate: false,
  });
  const search =
    searchQuery.get("search") !== "" ? searchQuery.get("search") : "";
  const isMyPostsOnly = searchQuery.get("isMyPostsOnly") === "true" ? true : "";
  const isPrivate = searchQuery.get("isPrivate") === "true" ? true : "";
  // const deferredSearch = useDeferredValue(search);
  const { data, error, isLoading } = useGetUserPostsQuery({
    search,
    isMyPostsOnly,
    isPrivate,
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorPage>{error.data.message}</ErrorPage>
      ) : data?.data?.length > 0 ? (
        data?.data?.map((post) => {
          // const tempImageId = Math.ceil(Math.random() * 10);
          return (
            <div key={post._id} className="d-flex justify-content-around mt-2">
              <Card>
                <Card.Img
                  style={{
                    width: "30rem",
                    height: "25rem",
                    objectFit: "cover",
                  }}
                  variant="top"
                  src={`images/nature-3.jpg`}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="d-flex w-100 justify-content-around mt-4">
          <Card>
            <Card.Body
              style={{
                width: "95vw",
                height: "80vh",
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
