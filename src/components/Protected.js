import { Navigate } from "react-router-dom";
const Protected = ({ isAuthenticated, children }) => {
  //A protected component which sheilds its children until the user is authenticated, i.e. the isAuthenticated flag is "true".
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;