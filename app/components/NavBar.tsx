import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex w-full justify-end gap-10 bg-slate-900 py-6 px-20">
      <Link href="/dashboard">Dashboard</Link>
      <Link href={"/login"}>Log In</Link>
      <Link href={"/register"}>Register</Link>
    </div>
  );
}
