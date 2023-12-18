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
      <span className="d-flex align-items-center text-wrap justify-content-around">
        <span className="mx-1">{errorMessage}</span>
        <button
          className="btn btn-secondary text-right mx-0 p-0"
          onClick={() => toast.dismiss(t.id)}
        >
          <i className="fa fa-times w-100 h-100 text-sm text-white fs-6"></i>
        </button>
      </span>
    ),
    {
      style,
    }
  );
};

export const successToaster = (errorMessage) => {
  toast.success(
    (t) => (
      <span className="d-flex align-items-center text-wrap justify-content-evenly">
        <span className="mx-1">{errorMessage}</span>
        <button
          className="btn btn-secondary text-right mx-0 p-0"
          onClick={() => toast.dismiss(t.id)}
        >
          <i className="fa fa-times w-100 h-100 text-sm text-white fs-6"></i>
        </button>
      </span>
    ),
    {
      style,
    }
  );
};
