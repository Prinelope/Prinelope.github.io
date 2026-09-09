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
// LAP-BY-LAP CHART
//
// Creates a responsive SVG line chart directly from the
// drivers' lap-time arrays.
// ----------------------------------------------------------

function buildLapChart(driverA, driverB) {
  const width = 800;
  const height = 280;

  const padding = {
    top: 30,
    right: 30,
    bottom: 45,
    left: 65
  };

  const allLaps = [
    ...driverA.laps,
    ...driverB.laps
  ];

  const fastestTime = Math.min(...allLaps);
  const slowestTime = Math.max(...allLaps);

  // Add a little space above and below the data.
  const chartMin = fastestTime - 0.1;
  const chartMax = slowestTime + 0.1;

  const chartWidth =
    width - padding.left - padding.right;

  const chartHeight =
    height - padding.top - padding.bottom;


  function getX(index, totalLaps) {
    if (totalLaps === 1) {
      return padding.left + chartWidth / 2;
    }

    return (
      padding.left +
      (index / (totalLaps - 1)) * chartWidth
    );
  }


  function getY(lapTime) {
    const percentage =
      (lapTime - chartMin) /
      (chartMax - chartMin);

    return (
      padding.top +
      percentage * chartHeight
    );
  }


  function createPoints(laps) {
    return laps
      .map(function (lap, index) {
        return `${getX(index, laps.length)},${getY(lap)}`;
      })
      .join(" ");
  }


  function createCircles(laps, className) {
    return laps
      .map(function (lap, index) {
        return `
          <circle
            class="${className}"
            cx="${getX(index, laps.length)}"
            cy="${getY(lap)}"
            r="5"
          >
            <title>
              Lap ${index + 1}: ${formatLapTime(lap)}
            </title>
          </circle>
        `;
      })
      .join("");
  }


  const lapLabels = driverA.laps
    .map(function (_, index) {
      return `
        <text
          class="chart-lap-label"
          x="${getX(index, driverA.laps.length)}"
          y="${height - 15}"
          text-anchor="middle"
        >
          ${index + 1}
        </text>
      `;
    })
    .join("");


  return `
    <div class="lap-chart-section">

      <div class="lap-chart-heading">
        <div>
          <p class="analysis-label">
            Lap-by-lap pace
          </p>

          <h3>
            Pace progression
          </h3>
        </div>

        <div class="chart-legend">

          <span>
            <i class="legend-line driver-a-line"></i>
            ${driverA.name}
          </span>

          <span>
            <i class="legend-line driver-b-line"></i>
            ${driverB.name}
          </span>

        </div>
      </div>


      <div class="lap-chart-wrapper">

        <svg
          class="lap-chart"
          viewBox="0 0 ${width} ${height}"
          role="img"
          aria-label="Lap-by-lap pace comparison between ${driverA.name} and ${driverB.name}"
        >

          <line
            class="chart-axis"
            x1="${padding.left}"
            y1="${padding.top}"
            x2="${padding.left}"
            y2="${height - padding.bottom}"
          ></line>

          <line
            class="chart-axis"
            x1="${padding.left}"
            y1="${height - padding.bottom}"
            x2="${width - padding.right}"
            y2="${height - padding.bottom}"
          ></line>


          <text
            class="chart-axis-title"
            x="16"
            y="${height / 2}"
            transform="rotate(-90 16 ${height / 2})"
            text-anchor="middle"
          >
            LAP TIME
          </text>


          ${lapLabels}


          <polyline
            class="pace-line pace-line-a"
            points="${createPoints(driverA.laps)}"
          ></polyline>

          <polyline
            class="pace-line pace-line-b"
            points="${createPoints(driverB.laps)}"
          ></polyline>


          ${createCircles(
            driverA.laps,
            "pace-point pace-point-a"
          )}

          ${createCircles(
            driverB.laps,
            "pace-point pace-point-b"
          )}

        </svg>

      </div>

      <p class="chart-note">
        Lower points represent faster lap times.
        Hover over a point to see the lap time.
      </p>

    </div>
  `;
}

// ----------------------------------------------------------
// LAP-BY-LAP DELTA
//
// Compares the corresponding lap time from each driver
// and calculates who was faster on every lap.
// ----------------------------------------------------------

function buildLapDelta(driverA, driverB) {

  const numberOfLaps = Math.min(
    driverA.laps.length,
    driverB.laps.length
  );

  let rows = "";


  for (let index = 0; index < numberOfLaps; index++) {

    const driverALap = driverA.laps[index];
    const driverBLap = driverB.laps[index];

    const difference = Math.abs(
      driverALap - driverBLap
    );


    let fasterDriver = "";
    let winnerClass = "";


    if (driverALap < driverBLap) {

      fasterDriver = driverA.name;
      winnerClass = "driver-a-winner";

    } else if (driverBLap < driverALap) {

      fasterDriver = driverB.name;
      winnerClass = "driver-b-winner";

    } else {

      fasterDriver = "Equal";
      winnerClass = "";
    }


    rows += `
      <tr>

        <td>
          ${String(index + 1).padStart(2, "0")}
        </td>

        <td>
          ${formatLapTime(driverALap)}
        </td>

        <td>
          ${formatLapTime(driverBLap)}
        </td>

        <td class="${winnerClass}">
          ${fasterDriver}
        </td>

        <td>
          ${difference.toFixed(3)}s
        </td>

      </tr>
    `;
  }


  return `
    <div class="lap-delta-section">

      <div class="lap-delta-heading">

        <p class="analysis-label">
          Lap delta
        </p>

        <h3>
          Who was faster on each lap?
        </h3>

      </div>


      <div class="lap-table-wrapper">

        <table class="lap-table">

          <thead>
            <tr>
              <th>Lap</th>
              <th>${driverA.name}</th>
              <th>${driverB.name}</th>
              <th>Faster driver</th>
              <th>Gap</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>

        </table>

      </div>

    </div>
  `;
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
  // --------------------------------------------------------
  // COMPARISON ANALYSIS
  // --------------------------------------------------------

  const fastestLapGap =
    Math.abs(driverAFastest - driverBFastest);

  const averagePaceGap =
    Math.abs(driverAAverage - driverBAverage);

  const consistencyGap =
    Math.abs(driverAConsistency - driverBConsistency);


  let fastestLapWinner = "";
  let averagePaceWinner = "";
  let consistencyWinner = "";

  let driverAScore = 0;
  let driverBScore = 0;


  // Fastest lap comparison

  if (driverAFastest < driverBFastest) {
    fastestLapWinner = driverA.name;
    driverAScore++;
  } else if (driverBFastest < driverAFastest) {
    fastestLapWinner = driverB.name;
    driverBScore++;
  } else {
    fastestLapWinner = "Tie";
  }


  // Average pace comparison

  if (driverAAverage < driverBAverage) {
    averagePaceWinner = driverA.name;
    driverAScore++;
  } else if (driverBAverage < driverAAverage) {
    averagePaceWinner = driverB.name;
    driverBScore++;
  } else {
    averagePaceWinner = "Tie";
  }


  // Consistency comparison
  // Lower standard deviation = more consistent

  if (driverAConsistency < driverBConsistency) {
    consistencyWinner = driverA.name;
    driverAScore++;
  } else if (driverBConsistency < driverAConsistency) {
    consistencyWinner = driverB.name;
    driverBScore++;
  } else {
    consistencyWinner = "Tie";
  }


  // --------------------------------------------------------
  // OVERALL RESULT
  // --------------------------------------------------------

  let overallResult = "";

  if (driverAScore > driverBScore) {
    overallResult =
      `${driverA.name} leads the comparison ${driverAScore} to ${driverBScore}.`;
  } else if (driverBScore > driverAScore) {
    overallResult =
      `${driverB.name} leads the comparison ${driverBScore} to ${driverAScore}.`;
  } else {
    overallResult =
      "The drivers are level across the comparison metrics.";
  }


  // --------------------------------------------------------
  // DISPLAY RESULTS
  // --------------------------------------------------------

  results.innerHTML = `

    <div class="driver-results">

      <div class="driver-result">
        <p class="driver-result-label">
          Driver A
        </p>

        <h3>
          ${driverA.name}
        </h3>

        <p class="driver-team">
          ${driverA.team}
        </p>

        <dl class="driver-stats">

          <div>
            <dt>Fastest lap</dt>
            <dd>${formatLapTime(driverAFastest)}</dd>
          </div>

          <div>
            <dt>Average pace</dt>
            <dd>${formatLapTime(driverAAverage)}</dd>
          </div>

          <div>
            <dt>Consistency</dt>
            <dd>±${driverAConsistency.toFixed(3)}s</dd>
          </div>

        </dl>
      </div>


      <div class="driver-result">
        <p class="driver-result-label">
          Driver B
        </p>

        <h3>
          ${driverB.name}
        </h3>

        <p class="driver-team">
          ${driverB.team}
        </p>

        <dl class="driver-stats">

          <div>
            <dt>Fastest lap</dt>
            <dd>${formatLapTime(driverBFastest)}</dd>
          </div>

          <div>
            <dt>Average pace</dt>
            <dd>${formatLapTime(driverBAverage)}</dd>
          </div>

          <div>
            <dt>Consistency</dt>
            <dd>±${driverBConsistency.toFixed(3)}s</dd>
          </div>

        </dl>
      </div>

    </div>


    <div class="comparison-analysis">

      <p class="analysis-label">
        Analysis
      </p>

      <div class="analysis-row">
        <span>Fastest lap</span>

        <strong>
          ${fastestLapWinner}
        </strong>

        <span>
          ${fastestLapGap.toFixed(3)}s gap
        </span>
      </div>


      <div class="analysis-row">
        <span>Average pace</span>

        <strong>
          ${averagePaceWinner}
        </strong>

        <span>
          ${averagePaceGap.toFixed(3)}s gap
        </span>
      </div>


      <div class="analysis-row">
        <span>Consistency</span>

        <strong>
          ${consistencyWinner}
        </strong>

        <span>
          ${consistencyGap.toFixed(3)}s difference
        </span>
      </div>


      <div class="overall-result">

        <p>
          Overall comparison
        </p>

        <h3>
          ${overallResult}
        </h3>

      </div>

    </div>

${buildLapChart(driverA, driverB)}

${buildLapDelta(driverA, driverB)}

    <p class="data-note">
      Synthetic development dataset used to test the comparison logic.
      These are not official Formula 1 timing results.
    </p>

  `;

});