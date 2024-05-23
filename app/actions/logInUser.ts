"use server";

export async function logInUser(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch("http://0.0.0.0:3000/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return {
      error: false,
      message: "Successfully logged in",
      token: data.token,
    };
  }

  return { error: true, message: "There was a problem logging in", token: "" };
}
