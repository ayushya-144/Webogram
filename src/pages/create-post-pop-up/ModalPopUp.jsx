import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateUserPostsMutation } from "../../features/homepage/home";
import { errorToaster, successToaster } from "../../utils/toaster";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

function ModalPopUp({ show, handleClose }) {
  const [createUserPosts, { isLoading }] = useCreateUserPostsMutation();
  // const navigate = useNavigate();
  const postsForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = postsForm;
  const { errors } = formState;

  useEffect(() => {
    if (show) {
      reset();
    }
  }, [show, reset]);

  const onSubmit = (data) => {
    createUserPostsHandler(data);
  };

  // console.log(search, isMyPostsOnly, isPrivate);
  async function createUserPostsHandler(data) {
    const response = await createUserPosts(data);
    if (response.error && response.error != undefined) {
      errorToaster(response.error.status);
    } else {
      reset();
      handleClose();
      successToaster("Post Uploaded Successfully");
      // navigate("/home");
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
              <FloatingLabel
                label={
                  <>
                    Title <sup className="text-danger">*</sup>
                  </>
                }
                className="mb-3"
              >
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
              <FloatingLabel
                label={
                  <>
                    Description <sup className="text-danger">*</sup>
                  </>
                }
                className="mb-3"
              >
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
