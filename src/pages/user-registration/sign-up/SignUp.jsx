import { useSignUpUserMutation } from "../../../features/login-signUp/loginSignUpApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const schema = yup.object({
  firstname: yup.string().required("Enter your first name"),
  lastname: yup.string().required("Enter your last name"),
  username: yup.string().required("Enter your user-name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Enter your password"),
});

export default function SignUp() {
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const navigate = useNavigate();

  const logInForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const { register, handleSubmit, formState } = logInForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    getSignUpUserHandler(data);
  };

  async function getSignUpUserHandler(data) {
    const response = await signUpUser(data);
    if (response.error && response.error != undefined) {
      alert(response.error.status);
      console.log(response);
    } else {
      console.log("data", response.data);
      navigate("/");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center form-container">
      <Form
        className="login-form flex-column d-flex justify-content-center align-items-center col-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="brand-logo text-center mb-2">Webogram</h1>
        <span className="text-muted fs-5 col-8 text-center mb-3">
          Sign up to see photos and videos from your friends.
        </span>
        <Row className="mb-1">
          <Form.Group as={Col} className="login-form-group">
            <FloatingLabel label="First Name">
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First Name"
                className="input-control"
                {...register("firstname")}
              />
            </FloatingLabel>
            <Form.Text className="text-danger col-4">
              {errors.firstname?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} className="login-form-group">
            <FloatingLabel label="Last Name">
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="input-control"
                {...register("lastname")}
              />
            </FloatingLabel>
            <Form.Text className="text-danger col-4">
              {errors.lastname?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} className="login-form-group">
            <FloatingLabel label="Username">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                className="input-control"
                {...register("username")}
              />
            </FloatingLabel>
            <Form.Text className="text-danger col-4">
              {errors.username?.message}
            </Form.Text>
          </Form.Group>
        </Row>
        <Form.Group className="login-form-group">
          <FloatingLabel label="Email address">
            <Form.Control
              type="text"
              name="email"
              placeholder="Email Address"
              className="input-control"
              {...register("email")}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        <Form.Group className="login-form-group">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="input-control"
              {...register("password")}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Text className="text-danger">
          {errors.password?.message}
        </Form.Text>
        <Button
          disabled={isLoading}
          variant="primary"
          className="mt-2 w-100"
          type="submit"
        >
          {isLoading ? "Loading..." : "Sign up"}
        </Button>
        <div className="d-flex justify-content-center align-items-center text-center mt-4 w-100">
          <hr className="col-5" />
          <span className="mx-3">OR</span>
          <hr className="col-5" />
        </div>
        <div className="col-7 text-center mt-2">
          Already have an account?&nbsp;
          <NavLink to="/">LogIn</NavLink>
        </div>
      </Form>
    </div>
  );
}
