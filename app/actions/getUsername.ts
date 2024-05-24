"use server";

import { cookies } from "next/headers";

export async function getUsername() {
  const token = cookies().get("finance-tracker-token");

  if (token === undefined) {
    return null;
  }

  const response = await fetch("http://0.0.0.0:3000/api/user/username", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token.value }),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  return null;
}
