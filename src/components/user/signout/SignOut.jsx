import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../userSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("jwt");
    dispatch(removeUser());
    navigate("../");
  }, []);

  return null;
};

export default SignOut;
