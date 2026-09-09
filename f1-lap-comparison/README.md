# F1 Lap Comparison Tool

This is a small motorsport project I built to practise JavaScript, data handling and visualisation in a way that connects with my interest in Formula 1.

The tool lets you choose a circuit, select a session type, compare two drivers and then view a simulated lap analysis.

The project is built with HTML, CSS and vanilla JavaScript.

## Current status

Version 1 is working and still being developed.

At the moment, the project uses simulated data rather than official Formula 1 timing data.

The main goal was to build the comparison logic myself and understand how the data could be processed and displayed clearly.

## What the tool does

You can:

- choose a circuit
- view the circuit layout
- view information about the circuit
- choose a session type
- select two drivers
- generate simulated lap times
- compare fastest lap
- compare average pace
- compare consistency
- see an overall comparison
- view a lap-by-lap pace graph
- compare the time difference on each lap

## Circuits

The current version includes:

- Monza
- Silverstone
- Spa-Francorchamps
- Suzuka
- Monaco

Each circuit has its own reference lap time and a few characteristics that are used by the simulation.

These include:

- circuit type
- speed profile
- technical demand
- overtaking difficulty
- lap variation

I started with five circuits so I could focus on getting the logic working properly before adding more.

## Session types

There are three session options.

### Qualifying simulation

A shorter run with a quicker simulated pace and lower lap variation.

### Race pace simulation

A longer run with a slower simulated pace and slightly more variation.

### Practice simulation

A medium-length run with a wider range of lap variation.

These are rules I created for the project and are not intended to represent an official Formula 1 model.

## How the simulation works

Each simulated lap is built from a few different values:

```text
Circuit reference time
+
Session adjustment
+
Driver pace offset
+
Circuit variation
+
Lap progression
=
Simulated lap time