import "./error.css";
export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-txt">
        <img className="error-img" src="../../../public/error.png" />
        <h1>The page you are looking for does not exists!</h1>
      </div>
    </div>
  );
}
