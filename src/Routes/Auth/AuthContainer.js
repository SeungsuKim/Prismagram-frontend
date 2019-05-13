import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("seungsu040@gmail.com");

  const requestSecret = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => setAction("signUp"), 2000);
      }
    },
    variables: { email: email.value }
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    },
    update: (_, { data }) => {
      const { createAccount } = data;
      if (!createAccount) {
        toast.error("Can't create account")
      } else {
        toast.success("Account created! Log in now");
        setTimeout(() => setAction("logIn"), 2000);
      }
    }
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          await requestSecret();
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          createAccount();
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All fields are required")
      }
    }
  }

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
} 