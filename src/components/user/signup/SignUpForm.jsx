import React, { useState } from "react";
import Input from "../../common/Input";
import { ShowSuccess, ShowError } from "../../helper/helper";
import { signup } from "../userApi";

function SignUpForm(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = { name, email, password };
      await signup(body);
      setValues({ ...values, error: "", success: true });
    } catch (ex) {
      setValues({ ...values, error: ex.response.data, success: false });
    }
  };

  return (
    <React.Fragment>
      <ShowError error={error} />
      <ShowSuccess
        success={success}
        label="SignIn"
        link="/signin"
        successMessage="Account Successfully Created. Please Login"
      />
      <form onSubmit={handleSubmit} className="mt-3">
        <Input
          name="name"
          label="Name"
          value={name}
          onChange={handleChange("name")}
        />
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

export default SignUpForm;
