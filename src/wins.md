---
theme: dashboard
toc: false
---

# Riot Data

```js
const name = view(
  Inputs.text({
    label: html`<b>Summoner Name</b>`,
    placeholder: "Enter Summoner Name...",
  })
);

const matches = FileAttachment("./data/matches.json").json();
```

```js
function matchPlot(data, { width } = {}) {
  const playerMatches = data.map((match) => {
    return match.info.participants.filter(
      (person) =>
        person.puuid ===
        "f70aMESBn2cgAA9ZSE5cdCYuaE6_-6qVPBnbLkDVgz1UezcIBHyLcdyzqnPQle9KptD-RQNysN6-ag"
    )[0];
  });

  const wins = playerMatches.filter((match) => match.win);

  const losses = playerMatches.filter((match) => !match.win);

  const dataToUse = [
    { results: "win", count: wins.length },
    { results: "loss", count: losses.length },
  ];

  // results: win, count: int

  return Plot.plot({
    marginTop: 20,
    marginRight: 20,
    marginBottom: 30,
    marginLeft: 40,
    grid: true,
    marks: [
      Plot.barY(dataToUse, { x: "results", y: "count", fill: "darkblue" }),

      Plot.frame(),
    ],
  });
}
```

<div class="grid grid-cols-2">
<div class="card grid-colspan-1">${resize((width) => matchPlot(matches, {width}))}</div>

</div>
