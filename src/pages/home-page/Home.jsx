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
  // const search = searchQuery.get("search");
  // const deferredSearch = useDeferredValue(search);
  const { data, error, isLoading } = useGetUserPostsQuery(searchQuery);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorPage>{error.data.message}</ErrorPage>
      ) : (
        data?.data?.map((post) => {
          const tempImageId = Math.ceil(Math.random() * 10);
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
                  src={`images/nature-${tempImageId}.jpg`}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
}
