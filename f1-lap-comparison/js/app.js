// ==========================================================
// F1 LAP COMPARISON TOOL
// Prinel Pillay
//
// This project currently uses a synthetic simulation model.
// Lap times and driver pace values are illustrative only.
// They are NOT official Formula 1 timing data or predictions.
// ==========================================================


// ----------------------------------------------------------
// TRACK DATA
// ----------------------------------------------------------

const tracks = {

monza: {
  name: "Monza",
  country: "Italy",

  referenceLap: 80.500,
  lapVariation: 0.45,

  type: "Permanent circuit",
  speedProfile: "Very high",
  technicalDemand: "Medium",
  overtaking: "Moderate",

  image: "assets/tracks/monza.jpg"
},

silverstone: {
  name: "Silverstone",
  country: "United Kingdom",

  referenceLap: 86.800,
  lapVariation: 0.50,

  type: "Permanent circuit",
  speedProfile: "High",
  technicalDemand: "High",
  overtaking: "Moderate",

  image: "assets/tracks/silverstone.jpg"
},

spa: {
  name: "Spa-Francorchamps",
  country: "Belgium",

  referenceLap: 105.500,
  lapVariation: 0.65,

  type: "Permanent circuit",
  speedProfile: "Very high",
  technicalDemand: "High",
  overtaking: "Moderate",

  image: "assets/tracks/spa.jpg"
},

suzuka: {
  name: "Suzuka",
  country: "Japan",

  referenceLap: 91.500,
  lapVariation: 0.55,

  type: "Permanent circuit",
  speedProfile: "High",
  technicalDemand: "Very high",
  overtaking: "Difficult",

  image: "assets/tracks/suzuka.jpg"
},

monaco: {
  name: "Monaco",
  country: "Monaco",

  referenceLap: 73.800,
  lapVariation: 0.48,

  type: "Street circuit",
  speedProfile: "Low",
  technicalDemand: "Very high",
  overtaking: "Very difficult",

  image: "assets/tracks/monaco.jpg"
}

};

// ----------------------------------------------------------
// SESSION DATA
//
// These settings control how the development simulation
// behaves for each session type.
//
// They are illustrative rules, not real Formula 1 models.
// ----------------------------------------------------------

const sessions = {

  qualifying: {
    name: "Qualifying simulation",

    lapCount: 5,

    paceAdjustment: -0.25,

    variationMultiplier: 0.75
  },


  race: {
    name: "Race pace simulation",

    lapCount: 8,

    paceAdjustment: 1.80,

    variationMultiplier: 1.15
  },


  practice: {
    name: "Practice simulation",

    lapCount: 6,

    paceAdjustment: 0.80,

    variationMultiplier: 1.35
  }

};

// ----------------------------------------------------------
// DRIVER DATA
//
// simulatedPaceOffset is part of the development model only.
// A lower value produces a slightly quicker simulated pace.
// It is not a real-world performance rating.
// ----------------------------------------------------------

const drivers = {

  NOR: {
    name: "Lando Norris",
    team: "McLaren",
    simulatedPaceOffset: 0.10
  },

  PIA: {
    name: "Oscar Piastri",
    team: "McLaren",
    simulatedPaceOffset: 0.14
  },

  RUS: {
    name: "George Russell",
    team: "Mercedes",
    simulatedPaceOffset: 0.18
  },

  ANT: {
    name: "Kimi Antonelli",
    team: "Mercedes",
    simulatedPaceOffset: 0.32
  },

  LEC: {
    name: "Charles Leclerc",
    team: "Ferrari",
    simulatedPaceOffset: 0.12
  },

  HAM: {
    name: "Lewis Hamilton",
    team: "Ferrari",
    simulatedPaceOffset: 0.20
  },

  VER: {
    name: "Max Verstappen",
    team: "Red Bull Racing",
    simulatedPaceOffset: 0.08
  },

  HAD: {
    name: "Isack Hadjar",
    team: "Red Bull Racing",
    simulatedPaceOffset: 0.34
  },

  LAW: {
    name: "Liam Lawson",
    team: "Racing Bulls",
    simulatedPaceOffset: 0.42
  },

  LIN: {
    name: "Arvid Lindblad",
    team: "Racing Bulls",
    simulatedPaceOffset: 0.48
  },

  GAS: {
    name: "Pierre Gasly",
    team: "Alpine",
    simulatedPaceOffset: 0.36
  },

  COL: {
    name: "Franco Colapinto",
    team: "Alpine",
    simulatedPaceOffset: 0.46
  },

  OCO: {
    name: "Esteban Ocon",
    team: "Haas",
    simulatedPaceOffset: 0.40
  },

  BEA: {
    name: "Oliver Bearman",
    team: "Haas",
    simulatedPaceOffset: 0.43
  },

  HUL: {
    name: "Nico Hulkenberg",
    team: "Audi",
    simulatedPaceOffset: 0.38
  },

  BOR: {
    name: "Gabriel Bortoleto",
    team: "Audi",
    simulatedPaceOffset: 0.45
  },

  SAI: {
    name: "Carlos Sainz",
    team: "Williams",
    simulatedPaceOffset: 0.26
  },

  ALB: {
    name: "Alexander Albon",
    team: "Williams",
    simulatedPaceOffset: 0.30
  },

  ALO: {
    name: "Fernando Alonso",
    team: "Aston Martin",
    simulatedPaceOffset: 0.24
  },

  STR: {
    name: "Lance Stroll",
    team: "Aston Martin",
    simulatedPaceOffset: 0.41
  },

  PER: {
    name: "Sergio Perez",
    team: "Cadillac",
    simulatedPaceOffset: 0.35
  },

  BOT: {
    name: "Valtteri Bottas",
    team: "Cadillac",
    simulatedPaceOffset: 0.33
  }

};


// ----------------------------------------------------------
// PAGE ELEMENTS
// ----------------------------------------------------------

const compareButton =
  document.getElementById("compare-button");

const trackSelect =
  document.getElementById("track");

  const sessionSelect =
  document.getElementById("session");

const driverASelect =
  document.getElementById("driver-a");

const driverBSelect =
  document.getElementById("driver-b");

const results =
  document.getElementById("results");

const trackName =
  document.getElementById("track-name");

const trackCountry =
  document.getElementById("track-country");

const trackImage =
  document.getElementById("track-image");

  const trackType =
  document.getElementById("track-type");

const trackSpeed =
  document.getElementById("track-speed");

const trackTechnical =
  document.getElementById("track-technical");

const trackOvertaking =
  document.getElementById("track-overtaking");


// ----------------------------------------------------------
// TRACK DISPLAY
// ----------------------------------------------------------

function updateTrackDisplay() {

  const selectedTrack =
    tracks[trackSelect.value];

  trackName.textContent =
    selectedTrack.name;

  trackCountry.textContent =
    selectedTrack.country;

    trackType.textContent =
  selectedTrack.type;

trackSpeed.textContent =
  selectedTrack.speedProfile;

trackTechnical.textContent =
  selectedTrack.technicalDemand;

trackOvertaking.textContent =
  selectedTrack.overtaking;

  trackImage.src =
    selectedTrack.image;

  trackImage.alt =
    `${selectedTrack.name} circuit layout`;
}


trackSelect.addEventListener(
  "change",
  updateTrackDisplay
);

updateTrackDisplay();


// ----------------------------------------------------------
// DETERMINISTIC DEVELOPMENT NOISE
//
// This gives us repeatable variation rather than completely
// random results every time the compare button is pressed.
// ----------------------------------------------------------

function createNumberFromText(text) {

  let hash = 0;

  for (let index = 0; index < text.length; index++) {

    hash =
      ((hash << 5) - hash) +
      text.charCodeAt(index);

    hash = hash | 0;
  }

  return Math.abs(hash);
}


function getSeededVariation(seed) {

  const value =
    Math.sin(seed) * 10000;

  return value - Math.floor(value);
}

// ----------------------------------------------------------
// CIRCUIT VARIATION MODEL
//
// Circuit characteristics influence how much simulated
// lap-to-lap variation is applied.
//
// These are development rules for the simulation, not
// real Formula 1 performance calculations.
// ----------------------------------------------------------

function getCircuitVariationMultiplier(track) {

  let multiplier = 1;


  // More technically demanding circuits create slightly
  // greater simulated lap-to-lap variation.

  if (track.technicalDemand === "High") {
    multiplier += 0.10;
  }

  if (track.technicalDemand === "Very high") {
    multiplier += 0.20;
  }


  // Street circuits receive a small additional variation.

  if (track.type === "Street circuit") {
    multiplier += 0.10;
  }


  return multiplier;
}

// ----------------------------------------------------------
// GENERATE SIMULATED LAPS
// ----------------------------------------------------------

function generateLaps(
  driver,
  driverCode,
  track,
  trackCode,
  session,
  sessionCode
) {

  const laps = [];

  const circuitVariation =
    track.lapVariation *
    getCircuitVariationMultiplier(track) *
    session.variationMultiplier;


  for (
    let lapIndex = 0;
    lapIndex < session.lapCount;
    lapIndex++
  ) {

    const seed =
      createNumberFromText(
        `${trackCode}-${sessionCode}-${driverCode}-${lapIndex}`
      );


    const variation =
      (
        getSeededVariation(seed) - 0.5
      ) * circuitVariation;


    // Small progression across the simulated run.
    // Earlier laps receive a little more time.
    // Later laps gradually move closer to the baseline.

    const progress =
      session.lapCount === 1
        ? 0
        : lapIndex / (session.lapCount - 1);


    const lapProgression =
      0.18 - (progress * 0.24);


    const lapTime =
      track.referenceLap +
      session.paceAdjustment +
      driver.simulatedPaceOffset +
      variation +
      lapProgression;


    laps.push(
      Number(
        lapTime.toFixed(3)
      )
    );
  }


  return laps;
}


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

  const total =
    laps.reduce(function (sum, lap) {

      return sum + lap;

    }, 0);

  return total / laps.length;
}


// ----------------------------------------------------------
// CONSISTENCY
//
// Standard deviation of lap times.
// Lower = more consistent.
// ----------------------------------------------------------

function getConsistency(laps) {

  const average =
    getAverageLap(laps);

  const squaredDifferences =
    laps.map(function (lap) {

      return Math.pow(
        lap - average,
        2
      );
    });


  const total =
    squaredDifferences.reduce(
      function (sum, value) {

        return sum + value;

      },
      0
    );


  const variance =
    total / laps.length;


  return Math.sqrt(variance);
}


// ----------------------------------------------------------
// FORMAT LAP TIME
// ----------------------------------------------------------

function formatLapTime(seconds) {

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds - minutes * 60;


  return `${minutes}:${remainingSeconds
    .toFixed(3)
    .padStart(6, "0")}`;
}


// ----------------------------------------------------------
// LAP-BY-LAP PACE CHART
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


  const fastestTime =
    Math.min(...allLaps);

  const slowestTime =
    Math.max(...allLaps);


  const chartMin =
    fastestTime - 0.1;

  const chartMax =
    slowestTime + 0.1;


  const chartWidth =
    width -
    padding.left -
    padding.right;

  const chartHeight =
    height -
    padding.top -
    padding.bottom;


  function getX(index, totalLaps) {

    if (totalLaps === 1) {

      return (
        padding.left +
        chartWidth / 2
      );
    }


    return (
      padding.left +
      (
        index /
        (totalLaps - 1)
      ) *
      chartWidth
    );
  }


  function getY(lapTime) {

    const percentage =
      (
        lapTime -
        chartMin
      ) /
      (
        chartMax -
        chartMin
      );


    return (
      padding.top +
      percentage *
      chartHeight
    );
  }


  function createPoints(laps) {

    return laps
      .map(function (lap, index) {

        return `${getX(
          index,
          laps.length
        )},${getY(lap)}`;

      })
      .join(" ");
  }


  function createCircles(
    laps,
    className
  ) {

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


  const lapLabels =
    driverA.laps
      .map(function (_, index) {

        return `
          <text
            class="chart-lap-label"
            x="${getX(
              index,
              driverA.laps.length
            )}"
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
        Lower lap times appear higher on the chart.
        Hover over a point to view its simulated lap time.
      </p>

    </div>
  `;
}


// ----------------------------------------------------------
// LAP-BY-LAP DELTA
// ----------------------------------------------------------

function buildLapDelta(driverA, driverB) {

  const numberOfLaps =
    Math.min(
      driverA.laps.length,
      driverB.laps.length
    );


  let rows = "";

  let driverALapWins = 0;
  let driverBLapWins = 0;
  let tiedLaps = 0;

  let biggestGap = 0;
  let biggestGapDriver = "";
  let biggestGapLap = 0;


  for (
    let index = 0;
    index < numberOfLaps;
    index++
  ) {

    const driverALap =
      driverA.laps[index];

    const driverBLap =
      driverB.laps[index];


    const difference =
      Math.abs(
        driverALap -
        driverBLap
      );


    let fasterDriver = "";
    let winnerClass = "";


    if (driverALap < driverBLap) {

      fasterDriver =
        driverA.name;

      winnerClass =
        "driver-a-winner";

      driverALapWins++;

    } else if (
      driverBLap <
      driverALap
    ) {

      fasterDriver =
        driverB.name;

      winnerClass =
        "driver-b-winner";

      driverBLapWins++;

    } else {

      fasterDriver =
        "Equal";

      tiedLaps++;
    }


    if (difference > biggestGap) {

      biggestGap =
        difference;

      biggestGapDriver =
        fasterDriver;

      biggestGapLap =
        index + 1;
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


      <div class="lap-summary">

        <div>

          <span>
            ${driverA.name}
          </span>

          <strong>
            ${driverALapWins}
          </strong>

          <small>
            Laps faster
          </small>

        </div>


        <div>

          <span>
            ${driverB.name}
          </span>

          <strong>
            ${driverBLapWins}
          </strong>

          <small>
            Laps faster
          </small>

        </div>


        <div>

          <span>
            Tied laps
          </span>

          <strong>
            ${tiedLaps}
          </strong>

          <small>
            Equal pace
          </small>

        </div>

      </div>


      <div class="biggest-advantage">

        <span>
          Biggest lap advantage
        </span>

        <strong>
          ${biggestGapDriver}
        </strong>

        <span>
          Lap ${biggestGapLap}
          · ${biggestGap.toFixed(3)}s
        </span>

      </div>


      <div class="lap-table-wrapper">

        <table class="lap-table">

          <thead>

            <tr>

              <th>
                Lap
              </th>

              <th>
                ${driverA.name}
              </th>

              <th>
                ${driverB.name}
              </th>

              <th>
                Faster driver
              </th>

              <th>
                Gap
              </th>

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

compareButton.addEventListener(
  "click",
  function () {

    const trackKey =
  trackSelect.value;

const sessionKey =
  sessionSelect.value;

const driverAKey =
  driverASelect.value;

const driverBKey =
  driverBSelect.value;


    // ------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------

    if (driverAKey === driverBKey) {

      results.innerHTML = `
        <p>
          Please choose two different drivers to compare.
        </p>
      `;

      return;
    }


const selectedTrack =
  tracks[trackKey];

const selectedSession =
  sessions[sessionKey];

const driverAData =
  drivers[driverAKey];

const driverBData =
  drivers[driverBKey];


    if (
  !selectedTrack ||
  !selectedSession ||
  !driverAData ||
  !driverBData
) {

      results.innerHTML = `
        <p>
          Comparison data could not be loaded.
        </p>
      `;

      return;
    }


    // Create temporary comparison objects so the global
    // driver data itself is not modified.

    const driverA = {
      ...driverAData,

      laps: generateLaps(
  driverAData,
  driverAKey,
  selectedTrack,
  trackKey,
  selectedSession,
  sessionKey
)
    };


    const driverB = {
      ...driverBData,

      laps: generateLaps(
  driverBData,
  driverBKey,
  selectedTrack,
  trackKey,
  selectedSession,
  sessionKey
)
    };


    // ------------------------------------------------------
    // CALCULATIONS
    // ------------------------------------------------------

    const driverAFastest =
      getFastestLap(
        driverA.laps
      );

    const driverBFastest =
      getFastestLap(
        driverB.laps
      );


    const driverAAverage =
      getAverageLap(
        driverA.laps
      );

    const driverBAverage =
      getAverageLap(
        driverB.laps
      );


    const driverAConsistency =
      getConsistency(
        driverA.laps
      );

    const driverBConsistency =
      getConsistency(
        driverB.laps
      );


    // ------------------------------------------------------
    // COMPARISON GAPS
    // ------------------------------------------------------

    const fastestLapGap =
      Math.abs(
        driverAFastest -
        driverBFastest
      );

    const averagePaceGap =
      Math.abs(
        driverAAverage -
        driverBAverage
      );

    const consistencyGap =
      Math.abs(
        driverAConsistency -
        driverBConsistency
      );


    let fastestLapWinner = "";
    let averagePaceWinner = "";
    let consistencyWinner = "";

    let driverAScore = 0;
    let driverBScore = 0;


    // Fastest lap

    if (
      driverAFastest <
      driverBFastest
    ) {

      fastestLapWinner =
        driverA.name;

      driverAScore++;

    } else if (
      driverBFastest <
      driverAFastest
    ) {

      fastestLapWinner =
        driverB.name;

      driverBScore++;

    } else {

      fastestLapWinner =
        "Tie";
    }


    // Average pace

    if (
      driverAAverage <
      driverBAverage
    ) {

      averagePaceWinner =
        driverA.name;

      driverAScore++;

    } else if (
      driverBAverage <
      driverAAverage
    ) {

      averagePaceWinner =
        driverB.name;

      driverBScore++;

    } else {

      averagePaceWinner =
        "Tie";
    }


    // Consistency

    if (
      driverAConsistency <
      driverBConsistency
    ) {

      consistencyWinner =
        driverA.name;

      driverAScore++;

    } else if (
      driverBConsistency <
      driverAConsistency
    ) {

      consistencyWinner =
        driverB.name;

      driverBScore++;

    } else {

      consistencyWinner =
        "Tie";
    }


    // ------------------------------------------------------
    // OVERALL RESULT
    // ------------------------------------------------------

    let overallResult = "";


    if (
      driverAScore >
      driverBScore
    ) {

      overallResult =
        `${driverA.name} leads the simulated comparison ${driverAScore} to ${driverBScore}.`;

    } else if (
      driverBScore >
      driverAScore
    ) {

      overallResult =
        `${driverB.name} leads the simulated comparison ${driverBScore} to ${driverAScore}.`;

    } else {

      overallResult =
        "The drivers are level across the simulated comparison metrics.";
    }


    // ------------------------------------------------------
    // DISPLAY
    // ------------------------------------------------------

    results.innerHTML = `

      <p class="analysis-label">
  ${selectedTrack.name} · ${selectedTrack.country}
</p>

<p class="session-result-label">
  ${selectedSession.name}
  · ${selectedSession.lapCount} simulated laps
</p>


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

              <dt>
                Fastest lap
              </dt>

              <dd>
                ${formatLapTime(driverAFastest)}
              </dd>

            </div>


            <div>

              <dt>
                Average pace
              </dt>

              <dd>
                ${formatLapTime(driverAAverage)}
              </dd>

            </div>


            <div>

              <dt>
                Consistency
              </dt>

              <dd>
                ±${driverAConsistency.toFixed(3)}s
              </dd>

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

              <dt>
                Fastest lap
              </dt>

              <dd>
                ${formatLapTime(driverBFastest)}
              </dd>

            </div>


            <div>

              <dt>
                Average pace
              </dt>

              <dd>
                ${formatLapTime(driverBAverage)}
              </dd>

            </div>


            <div>

              <dt>
                Consistency
              </dt>

              <dd>
                ±${driverBConsistency.toFixed(3)}s
              </dd>

            </div>

          </dl>

        </div>

      </div>


      <div class="comparison-analysis">

        <p class="analysis-label">
          Analysis
        </p>


        <div class="analysis-row">

          <span>
            Fastest lap
          </span>

          <strong>
            ${fastestLapWinner}
          </strong>

          <span>
            ${fastestLapGap.toFixed(3)}s gap
          </span>

        </div>


        <div class="analysis-row">

          <span>
            Average pace
          </span>

          <strong>
            ${averagePaceWinner}
          </strong>

          <span>
            ${averagePaceGap.toFixed(3)}s gap
          </span>

        </div>


        <div class="analysis-row">

          <span>
            Consistency
          </span>

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


      ${buildLapChart(
        driverA,
        driverB
      )}


      ${buildLapDelta(
        driverA,
        driverB
      )}


      <p class="data-note">
        Synthetic circuit-based simulation used to demonstrate
        JavaScript calculation, comparison and visualisation logic.
        Lap times and driver pace parameters are illustrative and
        are not official Formula 1 timing data or performance predictions.
      </p>

    `;
  }
);