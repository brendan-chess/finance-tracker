import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex w-full justify-end bg-slate-900 py-6 px-20">
      <Link href={"/register"}>Register</Link>
    </div>
  );
}
