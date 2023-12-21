import { useLoginUserMutation } from "../../../features/login-signUp/loginSignUpApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { errorToaster, successToaster } from "../../../utils/toaster.jsx";
import { setUserToken } from "../../../utils/getSessionData.js";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Enter your password"),
});

export default function LogIn() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const logInForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const { register, handleSubmit, formState } = logInForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    getLoginUserHandler(data);
  };

  async function getLoginUserHandler(data) {
    const response = await loginUser(data);
    if (response.error && response.error != undefined) {
      errorToaster(response.error.data.message);
    } else {
      const userData = response.data.data;
      setUserToken(userData.token);
      successToaster(`Welcome ${userData.firstname} ${userData.lastname}`),
        navigate("/home", {
          replace: true,
        });
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center form-container">
      <Form
        className="login-form flex-column d-flex justify-content-center align-items-center col-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="brand-logo text-center">Webogram</h1>
        <Form.Group className="login-form-group">
          <FloatingLabel
            label={
              <>
                Email Address <sup className="text-danger">*</sup>
              </>
            }
          >
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
          <FloatingLabel
            label={
              <>
                Password <sup className="text-danger">*</sup>
              </>
            }
          >
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
          {isLoading ? "Loading..." : "Log in"}
        </Button>
        <div className="d-flex justify-content-center align-items-center text-center mt-4 w-100">
          <hr className="col-5" />
          <span className="mx-3">OR</span>
          <hr className="col-5" />
        </div>
        <div className="col-7 text-center mt-4">
          Dont&apos;t have an account?
          <br />
          <NavLink to="/sign-up">SignUp</NavLink>
        </div>
      </Form>
    </div>
  );
}
