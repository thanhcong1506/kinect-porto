export default async function getNewgames() {
  const res = await fetch("http://locahost:3000/api/games/newgame");

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
