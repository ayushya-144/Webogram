import toast from "react-hot-toast";
const style = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

export const errorToaster = (errorMessage) => {
  console.log(errorMessage);
  toast.error(
    (t) => (
      <span className="d-flex align-items-center text-wrap">
        <span className="mx-1">{errorMessage}</span>
        <button className="btn mx-0 p-0" onClick={() => toast.dismiss(t.id)}>
          <i className="fa fa-times text-white fs-6"></i>
        </button>
      </span>
    ),
    {
      style,
    }
  );
};

export const successToaster = (successMessage) => {
  toast.success(
    (t) => (
      <span className="d-flex align-items-center text-wrap">
        <span className="mx-1">{successMessage}</span>
        <button className="btn mx-0 p-0" onClick={() => toast.dismiss(t.id)}>
          <i className="fa fa-times text-white fs-6"></i>
        </button>
      </span>
    ),
    {
      style,
    }
  );
};
