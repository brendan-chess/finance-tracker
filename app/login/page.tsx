"use client";

import { useFormState } from "react-dom";
import { logInUser } from "../actions/logInUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [state, formAction] = useFormState(logInUser, null);
  const router = useRouter();

  useEffect(() => {
    if (state && state.error === false) {
      localStorage.setItem("finance-tracker-token", state.token);
      router.push("/dashboard");
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center mx-auto bg-slate-900 mt-20 pt-16 pb-12 w-[500px] rounded-xl">
      <div className="text-2xl font-bold mb-4">Log In</div>
      <div className="text-sm font-medium mb-8 text-slate-300">
        Please enter the following information
      </div>
      <form action={formAction}>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-slate-100"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="p-2 bg-slate-300 text-slate-950 font-medium rounded-md mt-2 mb-8"
          required
          autoComplete="off"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-100"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="p-2 bg-slate-300 text-slate-950 font-medium rounded-md mt-2 mb-12"
          required
          autoComplete="off"
        />
        <button
          type="submit"
          className="block mx-auto py-2 px-4 bg-slate-600 text-slate-100 text-sm font-medium rounded hover:bg-slate-500 mb-8"
        >
          Log In
        </button>
        <div className="text-sm font-medium text-slate-300 mx-auto w-fit h-2">
          {state?.message}
        </div>
      </form>
    </div>
  );
}
