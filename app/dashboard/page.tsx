// import { cookies } from "next/headers";
// import { getUsername } from "../actions/getUsername";

import { getUsername } from "../actions/getUsername";

// export default async function Page() {
//   const token = cookies().get("finance-tracker-token");

//   if (token !== undefined) {
//     const username = await getUsername(token.value);

//     return <div>{username.username}</div>;
//   }

//   return <div>log in</div>;
// }

export default async function Page() {
  const username = await getUsername();

  return <div>{username?.username}</div>;
}
