import { getUsername } from "../actions/getUsername";

export default async function Page() {
  const username = await getUsername();

  return <div>{username?.username}</div>;
}
