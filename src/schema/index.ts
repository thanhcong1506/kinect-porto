import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a  email"),

  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Password must have at least 5 character, with a mix of letters, numbers and symbols",
    })
    .required("Please input password"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a  email"),

  password: yup
    .string()
    // .min(5)
    // .matches(passwordRules, {
    //   message:
    //     "Password must have at least 5 character, with a mix of letters, numbers and symbols",
    // })
    .required("Please input password"),
});
