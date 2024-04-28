import fs from "fs";
import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth";
import { userSignUpSchema } from "@/schema";
import { buildPath, extractData } from "@/lib/file-helper";

export const POST = async (request) => {
  const data = await request.json();

  console.log("server", data);

  // validate data on server
  const valiadateResult = userSignUpSchema.safeParse(data);

  if (valiadateResult.success) {
    const hashPass = await hashPassword(valiadateResult.data.password);
    // store in DB
    const newUser = {
      email: valiadateResult.data.email,
      password: hashPass,
      id: Math.floor(Math.random() * 1000000 + 1),
    };

    const filePath = buildPath("user.json");
    // Read user data from the JSON file
    const dataUser = extractData(filePath);

    // check user exsist on db
    const exsitsUser = dataUser.find((user) => user.email === valiadateResult.data.email);
    if (exsitsUser && Object.keys(exsitsUser).length !== 0) {
      return new NextResponse("Email is already in use", { status: 405, message: "User exsisted !! Please try another email to create new user" });
    }

    dataUser.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(dataUser));

    return new NextResponse("Email is already in use", { status: 200, message: "Successfull created user" });
  }
};
