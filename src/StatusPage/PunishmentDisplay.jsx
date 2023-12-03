import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import processChampionName from "../nameAdjuster";
import axios from "axios";
import { BACKEND_PORT } from "../constants";

const PunishmentDisplay = ({ punishmentStack }) => {
  const hourglassUrl = "item/3157";
  let urlEnd;
  let message;
  if (punishmentStack.length === 0) {
    urlEnd = hourglassUrl;
    message = `You haven't recieved any punishments.`;
  } else if (punishmentStack[0].punishmentType === 1) {
    urlEnd =
      "champion/" +
      processChampionName(punishmentStack[0].takedown.killer.championName);
    message = `You were Killed! Drink ${punishmentStack[0].amount}.`;
  } else if (punishmentStack[0].punishmentType === 2) {
    urlEnd = "item/3134";
    message = `You recieved a punishment from another Player. Drink ${punishmentStack[0].amount}!`;
  }
  const baseUrl =
    "https://static.bigbrain.gg/assets/lol/riot_static/13.23.1/img/";

  const imgURL = baseUrl + `${urlEnd}.png`;

  return (
    <div>
      <div className="flex flex-col bg-slate-300 gap-1 items-center border rounded border-black p-1">
        <h1>{message}</h1>
        <img
          src={imgURL}
          alt="champion icon"
          className="m-1 scale-75 border border-black"
        ></img>

        <PunishmentButton
          className="justify-self-center"
          isActive={punishmentStack.length > 0}
          punishmentStack={punishmentStack}
        />
      </div>
    </div>
  );
};
export default PunishmentDisplay;

const PunishmentButton = ({ isActive, punishmentStack }) => {
  const remainingPunishments = punishmentStack.length;
  const handleDone = () => {
    axios.post(
      localStorage.getItem("baseURL") + BACKEND_PORT + "confirmPunishment",
      {
        id: punishmentStack[0].punishmentId,
      }
    );
  };
  if (isActive) {
    return (
      <div className="grid grid-cols-3 w-full">
        <div></div>
        <Button
          className="m-2 justify-self-center"
          color="primary"
          onClick={handleDone}
        >
          Done
        </Button>
        <div className="justify-self-end text-center border border-black p-3 m-1 bg-primary">
          <h1 className="text-white">{remainingPunishments}</h1>
          <h3 className="text-white">Remaining</h3>
        </div>
      </div>
    );
  } else
    return (
      <div className="text-center">
        <h1>Count yourself lucky!</h1>
        <div> </div>
      </div>
    );
};
