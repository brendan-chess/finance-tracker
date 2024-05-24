import { getUser } from "@/app/actions/getUser";
import { Users } from "kysely-codegen";

export default async function Page() {
  const user: Pick<Users, "username" | "email" | "created_at"> | null =
    await getUser();

  if (user === null) return <div>Could not get account details</div>;

  const { username, email, created_at } = user;

  return (
    <div className="mx-auto w-fit">
      <div className="text-2xl font-bold mb-8">Account Details</div>
      <div className="text-sm text-slate-400 font-medium">Username</div>
      <div className="mt-1 mb-6">{username}</div>
      <div className="text-sm text-slate-400 font-medium">Email</div>
      <div className="mt-1 mb-6">{email}</div>
      <div className="text-sm text-slate-400 font-medium">Date Created</div>
      <div className="mt-1 mb-6">{created_at.toString().slice(0, 10)}</div>
    </div>
  );
}
