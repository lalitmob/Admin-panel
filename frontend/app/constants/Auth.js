export const Login = {
  Icon: "/icon.svg",
  Iconalt: "logo",
  header: "welcome back!",
  email: {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
  },
  password: {
    name: "password",
    label: "Enter Password",
    placeholder: "Enter your password",
    type: {
      show: "text",
      hide: "password",
    },
  },
  error: {
    email: "",
    password:
      "Use at least 8 characters with 1 number, and one special character.",
  },
};
export const forgetPasswordConst = {
  Name: "forget password",
  text: "Enter the email associated with your account and we'll send you password reset link",
  Email: {
    name: "email",
    label: "Enter email address",
    type: "text",
  },
};
export const resetPasswordconst = {
  Name: "Reset Password",
  Password: {
    name: "password",
    label: "Password",
    type: {
      show: "text",
      hide: "password",
    },
  },
  ConfirmPassword: {
    name: "ConfirmPassword",
    label: "Confirm password",
    type: {
      show: "text",
      hide: "password",
    },
  },
};
