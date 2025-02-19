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
