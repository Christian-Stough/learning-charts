---
theme: dashboard
toc: false
---

# Nobel Prize Data

```js
const land = FileAttachment("./data/land.json").json();
const data = FileAttachment("./data/nobel.json").json();
```

```js
const winners = data.laureates;

const categories = new Set();

categories.add("All");

winners.forEach((winner) => categories.add(winner.nobelPrizes[0].category.en));

const filter = view(
  Inputs.select(categories, { value: "steelblue", label: "Category" })
);

const longitude = view(Inputs.range([-180, 180], { step: 1 }));
```

```js
const filteredWinners = winners.filter((winner) =>
  filter.toLowerCase() === "all"
    ? true
    : winner.nobelPrizes[0].category.en === filter
);
```

```js
function genderPlot(data, { width } = {}) {
  const maleCount = data.filter((winner) => winner.gender === "male").length;
  const femaleCount = data.filter(
    (winner) => winner.gender === "female"
  ).length;

  const dataToUse = [
    { gender: "male", count: maleCount },
    { gender: "female", count: femaleCount },
  ];

  return Plot.plot({
    marginTop: 20,
    marginRight: 20,
    marginBottom: 30,
    marginLeft: 40,
    grid: true,
    marks: [
      Plot.barY(dataToUse, { x: "gender", y: "count", fill: "#0369a1" }),

      Plot.frame(),
    ],
  });
}
```

```js
function locationPlot(data, { width } = {}) {
  const cities = data
    .filter((winner) => winner.birth.place)
    .map((winner, index) => ({ ...winner.birth.place.cityNow, index: index }));

  return Plot.plot({
    projection: { type: "orthographic", rotate: [-longitude, -30] },
    r: { transform: (d) => Math.pow(10, d) }, // convert Richter to amplitude
    marks: [
      Plot.geo(land, { fill: "currentColor", fillOpacity: 0.2 }),
      Plot.sphere(),

      Plot.dot(cities, {
        x: "longitude",
        y: "latitude",
        r: 10,
        stroke: "red",
        fill: "red",
        fillOpacity: 0.2,
        title: (d) => {
          const location = d.en;
          const name = data[d.index].fullName.en;

          return `${location} - ${name}`;
        },
      }),
    ],
  });
}
```

<style>
    .h-fit{
        height:fit-content;
    }
</style>

<div class="grid grid-cols-2">
<div class="card grid-colspan-1 h-fit">${resize((width) => genderPlot(filteredWinners, {width}))}</div>

<div class="card grid-colspan-1">${resize((width) => locationPlot(filteredWinners, {width}))}</div>

</div>
