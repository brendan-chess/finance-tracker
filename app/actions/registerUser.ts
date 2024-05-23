"use server";

export async function registerUser(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://0.0.0.0:3000/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return "Registered Successfully";
  }

  return "There was an error registering";
}
