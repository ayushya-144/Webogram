import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateUserPostsMutation } from "../../features/homepage/home";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

function ModalPopUp({ show, handleClose }) {
  const [createUserPosts, { isLoading }] = useCreateUserPostsMutation();
  const postsForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = postsForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    createUserPostsHandler(data);
  };

  async function createUserPostsHandler(data) {
    const response = await createUserPosts(data);
    if (response.error && response.error != undefined) {
      alert(response.error.status);
    } else {
      reset();
      handleClose();
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <FloatingLabel label="Title" className="mb-3">
                <Form.Control
                  placeholder="Title"
                  type="text"
                  id="postTitle"
                  {...register("title")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.title?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Description" className="mb-3">
                <Form.Control
                  placeholder="Description"
                  type="text"
                  id="postDescription"
                  {...register("description")}
                />
              </FloatingLabel>
              <Form.Text className="text-danger">
                {errors.description?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                {...register("isPrivate")}
              />
              <label
                className="form-check-label mx-2"
                htmlFor="flexCheckDefault"
              >
                Private
              </label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Close
            </Button>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? "Loading..." : "Create Post"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalPopUp;
