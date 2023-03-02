import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/Input";
import { ShowError, RedirectUser } from "../../helper/helper";
import { signin } from "../userApi";
import { saveUser } from "../userSlice";

function SignInForm(props) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  const { email, password, error, redirect } = values;

  const saveTokenLS = (data) => {
    localStorage.setItem("jwt", JSON.stringify(data));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { email, password };
    try {
      const response = await signin(body);
      dispatch(saveUser(response.data));
      setValues({ ...values, error: "", redirect: true });
      saveTokenLS(response.headers["x-auth-token"]);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
        setValues({ ...values, error: ex.response.data, redirect: false });
      }
    }
  };

  return (
    <React.Fragment>
      <ShowError error={error} /> <RedirectUser redirect={redirect} />
      <form onSubmit={handleSubmit} className="mt-3">
        <Input
          name="email"
          label="Email"
          value={email}
          onChange={handleChange("email")}
        />
        <Input
          name="password"
          label="Password"
          value={password}
          onChange={handleChange("password")}
        />
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
export default SignInForm;
