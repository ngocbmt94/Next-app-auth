"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";
import { useAuthenticated } from "@/hook/useAuthenticated";

function MainNavigation() {
  const { isAuthenticated } = useAuthenticated();
  console.log("isAuthenticated", isAuthenticated);
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!isAuthenticated && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
