import axios from "axios";

import { useNavigate } from "react-router-dom";
import processChampionName from "../nameAdjuster";
import { BACKEND_PORT } from "../constants";

const ChampionCard = ({ champion }) => {
  const navigate = useNavigate();
  // console.log(champion.championName);

  const name = processChampionName(champion.championName);

  const handleChampionSelection = async () => {
    const body = {
      player: localStorage.getItem("playerId"),
      champion: champion.championId,
      counter: localStorage.getItem("defaultRotationCounter"),
    };
    await axios.post(
      localStorage.getItem("baseURL") + BACKEND_PORT + "chooseChampion",
      body
    );
    localStorage.setItem("activeChampionId", champion.championId);
    localStorage.setItem("activeChampionName", name);
    localStorage.setItem("changeAllowed", false);
    navigate("/status");
  };

  const championUrl = `https://static.bigbrain.gg/assets/lol/riot_static/13.24.1/img/champion/${name}.png`;
  const imageStyle = {
    filter: champion.player !== null ? "grayscale(100%)" : "none",
  };
  return (
    <button
      className="flex flex-column justify-center w-1/4 m-1"
      onClick={handleChampionSelection}
      disabled={champion.player !== null}
    >
      <img src={championUrl} alt={champion.name} style={imageStyle} />
    </button>
  );
};

export default ChampionCard;
