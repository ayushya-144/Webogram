import { useGetUserPostsQuery } from "./home";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

function Home() {
  const { data, isLoading } = useGetUserPostsQuery(
    sessionStorage.getItem("userToken")
  );
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
      ) : (
        data.data?.map((post) => {
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
                  src="/painting-mountain-lake-with-mountain-background.jpg"
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

export default Home;
