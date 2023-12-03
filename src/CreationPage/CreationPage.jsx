import { useState } from "react";
import CreationForm from "./CreationForm";
import Linkbox from "./Linkbox";

const CreationPage = () => {
  const [gameId, setGameId] = useState("");
  let currentDomain = window.location.href;
  currentDomain = currentDomain.toString().split(":");
  currentDomain = currentDomain[0] + ":" + currentDomain[1];
  console.log(currentDomain);
  return (
    <div className="border rounded border-black p-2 bg-slate-300">
      {/* <img
        src="./bronzeIcon150.png"
        alt="bronze brawl with icon"
        className="mb-8 max-w-full h-auto"
      /> */}
      <CreationForm setGameId={setGameId} currentDomain={currentDomain} />
      <Linkbox gameId={gameId} currentDomain={currentDomain} />
    </div>
  );
};

export default CreationPage;
