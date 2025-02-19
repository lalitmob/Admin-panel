const validation = {
  login: (data, setError) => {
    const validate = {};
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data.email) {
      validate.email = "Email is a required field";
    } else if (!email_regex.test(data.email)) {
      validate.email = "Please enter valid email";
    }
    if (!data.password) {
      validate.password = "Password field is required";
    } else if (!password_regex.test(data.password)) {
      validate.password =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (Object.keys(validate).length > 0) {
      setError(validate);
    }
  },
};
export default validation;
