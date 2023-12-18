import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdateUserPostsMutation } from "../../features/profile/profile";
import { useEffect } from "react";
import { errorToaster, successToaster } from "../../utils/toaster";

const schema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
});

export default function ProfileModalPopUp({ show, handleClose, data }) {
  const [updateUserPosts, { isLoading }] = useUpdateUserPostsMutation();
  const postsForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = postsForm;
  const { errors } = formState;
  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = (formData) => {
    createUserPostsHandler(formData);
  };

  async function createUserPostsHandler(formData) {
    const response = await updateUserPosts(formData);
    if (response.error && response.error != undefined) {
      console.log(response.error);
      errorToaster(response.error.status);
    } else {
      reset();
      handleClose();
      successToaster("Profile Updated successfully");
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <FloatingLabel label="Firstname" className="mb-3">
              <Form.Control
                placeholder="Firstname"
                type="text"
                id="firstname"
                {...register("firstname")}
              />
            </FloatingLabel>
            <Form.Text className="text-danger">
              {errors.title?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Lastname" className="mb-3">
              <Form.Control
                placeholder="Lastname"
                type="text"
                id="lastname"
                {...register("lastname")}
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
            <label className="form-check-label mx-2" htmlFor="flexCheckDefault">
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
            {isLoading ? "Loading..." : "Update Profile"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
