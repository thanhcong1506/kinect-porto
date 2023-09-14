import { NextResponse } from "next/server";

const DATA_SOURCE_URL =
  "https://user-api.dev.grailfarmer.app/api/v1/games?limit=10&page=1";

const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);
  const newGames: NewGames[] = await res.json();
  return NextResponse.json(newGames);
}
