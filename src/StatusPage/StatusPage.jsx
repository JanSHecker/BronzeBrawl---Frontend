import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PunishmentDisplay from "./PunishmentDisplay";
import RewardDisplay from "./RewardDisplay";
import { BACKEND_PORT } from "../constants";
import ChampionRotation from "./ChampionRotation";
import { useNavigate } from "react-router-dom";

const StatusPage = () => {
  const imgURL = `https://static.bigbrain.gg/assets/lol/riot_static/13.22.1/img/champion/${localStorage.getItem(
    "activeChampionName"
  )}.png`;
  const navigate = useNavigate();
  const [kda, setKda] = useState([]);
  const [changeCounter, setChangeCounter] = useState([]);
  const [punishmentStack, setPunishmentStack] = useState([]);
  const [rewardStack, setRewardStack] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);

  const unfulfilledPunishments = punishmentStack.filter(
    (punishment) => !punishment.recieved
  );
  const unfullfilledRewards = rewardStack.filter(
    (reward) => !reward.distributed
  );
  // const fulfilledPunishments = punishmentStack.filter(
  //   (punishment) => !punishment.recieved
  // );

  const rotationMode = localStorage.getItem("rotationMode");

  const requestRunningRef = useRef(false);

  useEffect(() => {
    handleChampionRotation(changeCounter, navigate);
    const fetchEvents = async () => {
      if (requestRunningRef.current === true) {
        return;
      }
      requestRunningRef.current = true;
      const response = await axios.get(
        localStorage.getItem("baseURL") + BACKEND_PORT + "Status",
        {
          params: {
            playerId: parseInt(localStorage.getItem("playerId")),
            championId: localStorage.getItem("activeChampionId"),
            enemyTeam: localStorage.getItem("enemyTeamId"),
          },
        }
      );
      const Allstatus = response.data;
      console.log(localStorage.getItem("enemyTeamId"));
      setPunishmentStack(Allstatus.punishments);
      setRewardStack(Allstatus.rewards);
      setKda(Allstatus.kda);
      setChangeCounter(Allstatus.counter);
      setEnemyTeam(Allstatus.enemyTeam);
      requestRunningRef.current = false;
    };
    fetchEvents();
    const intervalId = setInterval(() => {
      fetchEvents();
    }, 100);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex flex-col text-center justify-center bg-slate-300 border border-black rounded p-1">
            <img src={imgURL} alt="champion icon" className="m-1"></img>
            <h1 className="m-0.5 border border-black">{`${kda[0]}/${kda[1]}/${kda[2]}`}</h1>
          </div>
          <ChampionRotation
            changeCounter={changeCounter}
            rotationMode={rotationMode}
          />
        </div>
        <PunishmentDisplay punishmentStack={unfulfilledPunishments} />
        <RewardDisplay
          rewardStack={unfullfilledRewards}
          enemyTeam={enemyTeam}
        />
      </div>
    </>
  );
};
export default StatusPage;

const handleChampionRotation = (changeCounter, navigate) => {
  const rotationMode = localStorage.getItem("rotationMode");
  console.log(changeCounter);
  if (changeCounter === "∞") navigate("/");
  let i;
  if (rotationMode === "Kills") i = 0;
  if (rotationMode === "Deaths") i = 1;
  if (changeCounter[i] <= 0) {
    localStorage.setItem("changeAllowed", "championOnly");
    navigate("/champion");
  }
};
