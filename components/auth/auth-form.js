"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./auth-form.module.css";
import { userSignUpSchema } from "@/schema";

import axios from "axios";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSignUpSchema), // Apply the zodResolver
  });
  const [errRes, setErrRes] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmit(data) {
    setErrRes("");
    if (isLogin) {
      // for login mode
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (res?.error) {
          setErrRes("Invalid email or password");
          //toast.error("Invalid email or password");
        } else {
          setErrRes("");
          console.log("login success");
          //toast.success("Successful login");
          router.replace("/");
        }
      } catch (err) {
        setErrRes(err.response.data.message);
      }
    } else {
      // for Sign up mode
      try {
        const response = await axios.post("/api/auth/signUp", data);
      } catch (err) {
        setErrRes(err.response.data.message);
      }
    }
  }
  //console.log("errors", errors);

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" {...register("email")} />
          {errors?.email?.message || (errRes && <span className={classes.error}>{errors?.email?.message || errRes}</span>)}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors?.password?.message && <span className={classes.error}>{errors?.password?.message}</span>}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
