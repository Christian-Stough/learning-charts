async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const puuid = await json(
  `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Platy/uwu?api_key=RGAPI-c9389e06-7218-4510-9db0-92badcaf8ee5`
).then((resp) => resp.puuid);

const matches = await json(
  `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=50&api_key=RGAPI-c9389e06-7218-4510-9db0-92badcaf8ee5`
);

let results = [];

for (var match in matches) {
  results.push(
    await json(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[match]}?api_key=RGAPI-c9389e06-7218-4510-9db0-92badcaf8ee5`
    )
  );

  setTimeout(() => {}, 1000);
}

process.stdout.write(JSON.stringify(results));
