import { useEffect } from "react";

import processChampionName from "../nameAdjuster";
import axios from "axios";
import { BACKEND_PORT } from "../constants";

const DistributionCard = ({ champion, rewardStack, hasRewards }) => {
  const name = processChampionName(champion.championName);
  const championUrl = `https://static.bigbrain.gg/assets/lol/riot_static/13.22.1/img/champion/${name}.png`;
  const handleDistribution = async () => {
    console.log(localStorage.getItem("playerId"));
    await axios.post(
      localStorage.getItem("baseURL") + BACKEND_PORT + "createPunishment",
      {
        distributor: parseInt(localStorage.getItem("playerId")),
        punishmentType: 2,
        amount: 3,
        recipient: champion.player,
      }
    );
    console.log(champion);
    await axios.post(
      localStorage.getItem("baseURL") + BACKEND_PORT + "confirmReward",
      {
        id: rewardStack[0].rewardId,
      }
    );
  };
  const imageStyle = {
    filter:
      champion.player === null || !hasRewards ? "grayscale(100%)" : "none",
  };
  useEffect(() => {});
  return (
    <div className="flex flex-column justify-center w-1/4 m-1">
      <button
        onClick={handleDistribution}
        disabled={champion.player === null || !hasRewards}
      >
        <img src={championUrl} alt={champion.name} style={imageStyle} />
        <h1>{champion.player?.playerName || "No Player"}</h1>
      </button>
    </div>
  );
};
export default DistributionCard;
