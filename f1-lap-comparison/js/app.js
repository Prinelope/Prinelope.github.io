// ----------------------------------------------------------
// F1 LAP COMPARISON TOOL
// Prinel Pillay
//
// Synthetic development data is currently used to test
// the application's comparison and calculation logic.
//
// These lap times are NOT official Formula 1 timing data.
// ----------------------------------------------------------


// ----------------------------------------------------------
// DRIVER DATA
// ----------------------------------------------------------

const drivers = {
  NOR: {
    name: "Lando Norris",
    team: "McLaren",
    laps: [80.421, 80.115, 79.982, 80.246, 80.038]
  },

  PIA: {
    name: "Oscar Piastri",
    team: "McLaren",
    laps: [80.512, 80.084, 80.143, 80.301, 79.951]
  },

  RUS: {
    name: "George Russell",
    team: "Mercedes",
    laps: [80.334, 80.108, 80.021, 80.176, 80.090]
  },

  ANT: {
    name: "Kimi Antonelli",
    team: "Mercedes",
    laps: [80.683, 80.394, 80.221, 80.498, 80.307]
  },

  LEC: {
    name: "Charles Leclerc",
    team: "Ferrari",
    laps: [80.249, 80.037, 79.906, 80.184, 80.011]
  },

  HAM: {
    name: "Lewis Hamilton",
    team: "Ferrari",
    laps: [80.401, 80.176, 80.008, 80.267, 80.103]
  },

  VER: {
    name: "Max Verstappen",
    team: "Red Bull Racing",
    laps: [80.190, 79.978, 79.841, 80.022, 79.916]
  },

  HAD: {
    name: "Isack Hadjar",
    team: "Red Bull Racing",
    laps: [80.604, 80.372, 80.194, 80.438, 80.251]
  },

  LAW: {
    name: "Liam Lawson",
    team: "Racing Bulls",
    laps: [80.771, 80.506, 80.328, 80.612, 80.417]
  },

  LIN: {
    name: "Arvid Lindblad",
    team: "Racing Bulls",
    laps: [80.884, 80.623, 80.411, 80.703, 80.529]
  },

  GAS: {
    name: "Pierre Gasly",
    team: "Alpine",
    laps: [80.712, 80.458, 80.289, 80.547, 80.361]
  },

  COL: {
    name: "Franco Colapinto",
    team: "Alpine",
    laps: [80.903, 80.676, 80.481, 80.741, 80.598]
  },

  OCO: {
    name: "Esteban Ocon",
    team: "Haas",
    laps: [80.752, 80.497, 80.338, 80.582, 80.421]
  },

  BEA: {
    name: "Oliver Bearman",
    team: "Haas",
    laps: [80.821, 80.561, 80.374, 80.649, 80.466]
  },

  HUL: {
    name: "Nico Hulkenberg",
    team: "Audi",
    laps: [80.793, 80.542, 80.351, 80.624, 80.439]
  },

  BOR: {
    name: "Gabriel Bortoleto",
    team: "Audi",
    laps: [80.918, 80.664, 80.472, 80.739, 80.557]
  },

  SAI: {
    name: "Carlos Sainz",
    team: "Williams",
    laps: [80.528, 80.281, 80.116, 80.364, 80.207]
  },

  ALB: {
    name: "Alexander Albon",
    team: "Williams",
    laps: [80.612, 80.369, 80.194, 80.448, 80.283]
  },

  ALO: {
    name: "Fernando Alonso",
    team: "Aston Martin",
    laps: [80.579, 80.326, 80.151, 80.414, 80.239]
  },

  STR: {
    name: "Lance Stroll",
    team: "Aston Martin",
    laps: [80.849, 80.602, 80.423, 80.691, 80.506]
  },

  PER: {
    name: "Sergio Perez",
    team: "Cadillac",
    laps: [80.731, 80.482, 80.301, 80.569, 80.389]
  },

  BOT: {
    name: "Valtteri Bottas",
    team: "Cadillac",
    laps: [80.694, 80.446, 80.267, 80.531, 80.352]
  }
};


// ----------------------------------------------------------
// PAGE ELEMENTS
// ----------------------------------------------------------

const compareButton = document.getElementById("compare-button");

const driverASelect = document.getElementById("driver-a");

const driverBSelect = document.getElementById("driver-b");

const results = document.getElementById("results");


// ----------------------------------------------------------
// FASTEST LAP
// ----------------------------------------------------------

function getFastestLap(laps) {
  return Math.min(...laps);
}


// ----------------------------------------------------------
// AVERAGE LAP
// ----------------------------------------------------------

function getAverageLap(laps) {
  const total = laps.reduce(function (sum, lap) {
    return sum + lap;
  }, 0);

  return total / laps.length;
}


// ----------------------------------------------------------
// CONSISTENCY
//
// This calculates the standard deviation of the lap times.
//
// A smaller number means the driver's lap times are closer
// together and therefore more consistent.
// ----------------------------------------------------------

function getConsistency(laps) {
  const average = getAverageLap(laps);

  const squaredDifferences = laps.map(function (lap) {
    return Math.pow(lap - average, 2);
  });

  const totalSquaredDifference =
    squaredDifferences.reduce(function (sum, value) {
      return sum + value;
    }, 0);

  const variance =
    totalSquaredDifference / laps.length;

  return Math.sqrt(variance);
}


// ----------------------------------------------------------
// FORMAT LAP TIME
//
// Converts a value such as:
//
// 79.982
//
// into:
//
// 1:19.982
// ----------------------------------------------------------

function formatLapTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds =
    seconds - minutes * 60;

  return `${minutes}:${remainingSeconds
    .toFixed(3)
    .padStart(6, "0")}`;
}


// ----------------------------------------------------------
// COMPARE DRIVERS
// ----------------------------------------------------------

compareButton.addEventListener("click", function () {

  // Get the selected driver codes.

  const driverAKey = driverASelect.value;

  const driverBKey = driverBSelect.value;


  // --------------------------------------------------------
  // VALIDATION
  // --------------------------------------------------------

  if (driverAKey === driverBKey) {

    results.innerHTML = `
      <p>
        Please choose two different drivers to compare.
      </p>
    `;

    return;
  }


  // Find the selected drivers in our data.

  const driverA = drivers[driverAKey];

  const driverB = drivers[driverBKey];


  // Safety check in case a driver does not exist.

  if (!driverA || !driverB) {

    results.innerHTML = `
      <p>
        Driver data could not be found.
      </p>
    `;

    return;
  }


  // Safety check in case lap data is missing.

  if (!driverA.laps || !driverB.laps) {

    results.innerHTML = `
      <p>
        Timing data is unavailable for this comparison.
      </p>
    `;

    return;
  }


  // --------------------------------------------------------
  // DRIVER A CALCULATIONS
  // --------------------------------------------------------

  const driverAFastest =
    getFastestLap(driverA.laps);

  const driverAAverage =
    getAverageLap(driverA.laps);

  const driverAConsistency =
    getConsistency(driverA.laps);


  // --------------------------------------------------------
  // DRIVER B CALCULATIONS
  // --------------------------------------------------------

  const driverBFastest =
    getFastestLap(driverB.laps);

  const driverBAverage =
    getAverageLap(driverB.laps);

  const driverBConsistency =
    getConsistency(driverB.laps);


  // --------------------------------------------------------
  // DISPLAY RESULTS
  // --------------------------------------------------------

  results.innerHTML = `

    <p>
      <strong>${driverA.name}</strong>
      (${driverA.team})
      <br>
      Fastest lap:
      ${formatLapTime(driverAFastest)}
      <br>
      Average pace:
      ${formatLapTime(driverAAverage)}
      <br>
      Consistency:
      ±${driverAConsistency.toFixed(3)}s
    </p>


    <br>


    <p>
      <strong>${driverB.name}</strong>
      (${driverB.team})
      <br>
      Fastest lap:
      ${formatLapTime(driverBFastest)}
      <br>
      Average pace:
      ${formatLapTime(driverBAverage)}
      <br>
      Consistency:
      ±${driverBConsistency.toFixed(3)}s
    </p>


    <br>


    <p>
      <small>
        Synthetic development dataset used to test the
        comparison logic. These are not official Formula 1
        timing results.
      </small>
    </p>

  `;
});