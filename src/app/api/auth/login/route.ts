import { NextResponse } from "next/server";

const DATA_SOURCE_URL =
  "https://user-api.dev.grailfarmer.app/api/v1/auth/login-email";

export async function POST(request: Request) {
  const { email, password, id }: Partial<User> = await request.json();

  if (!email || !password)
    return NextResponse.json({ message: "Missing required data" });

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const newUser: User = await res.json();

  return NextResponse.json(newUser);
}
