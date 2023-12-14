import { useGetUserPostsQuery } from "../../features/homepage/home";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { getUserToken } from "./../../utils/getSessionData";
import { useLayoutEffect, useState } from "react";
import ErrorPage from "../error-page/ErrorPage";

export default function Home() {
  const [isUnAuthorized, setIsUnAuthorized] = useState(true);
  useLayoutEffect(() => {
    if (getUserToken()) {
      setIsUnAuthorized(false);
    }
  }, []);
  const { data, error, isLoading } = useGetUserPostsQuery(getUserToken(), {
    skip: isUnAuthorized,
  });
  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-around">
          <Card style={{ width: "30rem", height: "25rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </div>
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
