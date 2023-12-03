import { Button } from "react-daisyui";
import TeamTable from "./TeamTable";
import axios from "axios";
import { BACKEND_PORT } from "../constants";

const Team = ({ teamNumber, players, setTeamless }) => {
  // console.log("component was reloaded", players);

  let teamName;
  if (teamNumber % 2 === 1) {
    teamName = "Blue Team";
  } else {
    teamName = "Red Team";
  }
  const handleJoin = (event) => {
    event.preventDefault();
    // console.log(localStorage.getItem("playerId"));
    axios.post(localStorage.getItem("baseURL") + BACKEND_PORT + "joinTeam", {
      player: localStorage.getItem("playerId"),
      team: teamNumber,
    });
    setTeamless(false);
    localStorage.setItem("teamId", teamNumber);
  };
  console.log({ teamNumber });
  if (teamNumber === undefined) {
    return null;
  }
  return (
    <div
      className={`flex flex-col rounded items-center m-1 ${
        teamNumber % 2 === 1 ? "bg-cyan-500" : "bg-red-500"
      }`}
    >
      <div className={`m-1`}>
        <h1>{teamName}</h1>
      </div>

      <div className="w-full">
        <TeamTable players={players} />
      </div>

      <Button className="m-2" color="neutral" onClick={handleJoin}>
        Join
      </Button>
    </div>
  );
};
export default Team;
