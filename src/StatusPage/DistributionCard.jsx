import { useEffect, useState } from "react";

import processChampionName from "../nameAdjuster";
import axios from "axios";
import { BACKEND_PORT, DISTRIBUTED_PUNISHMENT, REWARD_KEY } from "../constants";

const DistributionCard = ({ champion, rewardStack, hasRewards }) => {
  const [loading, setLoading] = useState(false);
  const name = processChampionName(champion.championName);
  const championUrl = `https://static.bigbrain.gg/assets/lol/riot_static/13.24.1/img/champion/${name}.png`;
  const handleDistribution = async () => {
    console.log(localStorage.getItem("playerId"));
    setLoading(true);
    console.log(champion);
    await axios.post(
      localStorage.getItem("baseURL") + BACKEND_PORT + "confirmReward",
      {
        id: rewardStack[0].rewardId,
        punishment: {
          distributor: parseInt(localStorage.getItem("playerId")),
          punishmentType: DISTRIBUTED_PUNISHMENT,
          amount: localStorage.getItem(REWARD_KEY),
          recipient: champion.player,
        },
      }
    );
    setLoading(false);
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
        disabled={champion.player === null || !hasRewards || loading}
      >
        <img src={championUrl} alt={champion.name} style={imageStyle} />
        <h1>{champion.player?.playerName || "No Player"}</h1>
      </button>
    </div>
  );
};
export default DistributionCard;
