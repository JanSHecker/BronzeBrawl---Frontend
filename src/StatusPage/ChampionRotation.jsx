import React from "react";

const ChampionRotation = ({ changeCounter, rotationMode }) => {
  if (rotationMode === "Kills") {
    return (
      <div className="flex flex-col text-center justify-evenly border border-black rounded p-1 bg-slate-300">
        <h1 className="text-5xl">{changeCounter[0]}</h1>
        <div>
          <h3>{rotationMode} until you have to</h3>
          <h3>pick a new Champion!</h3>
        </div>
      </div>
    );
  }
  if (rotationMode === "Deaths") {
    return (
      <div className="flex flex-col text-center justify-evenly bg-slate-300 border border-black p-1">
        <h1 className="text-5xl">{changeCounter[1]}</h1>
        <div>
          <h3>{rotationMode} until you have to</h3>
          <h3>pick a new Champion!</h3>
        </div>
      </div>
    );
  }
};

export default ChampionRotation;
