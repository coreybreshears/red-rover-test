import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <Link to="/decode">
        <h1>Decorder</h1>
      </Link>
    </div>
  );
};

export default Main;
