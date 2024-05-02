async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const winners = await json(`https://api.nobelprize.org/2.1/laureates`);

process.stdout.write(JSON.stringify(winners));
