import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import Team from "./Team";
import { BACKEND_PORT, GAME_ID_KEY } from "../constants";

const TeamSelectionPage = () => {
  const [bluePlayers, setBluePlayers] = useState([]);
  const [redPlayers, setRedPlayers] = useState([]);
  const [teamless, setTeamless] = useState(true);
  const [blueID, setBlueID] = useState();
  const [redID, setRedID] = useState();
  const navigate = useNavigate();
  if (localStorage.getItem("changeAllowed") === "false") {
    navigate("/status");
  }
  if (localStorage.getItem("changeAllowed") === "championOnly") {
    navigate("/champion");
  }

  // console.log({ bluePlayers }, { redPlayers });
  const handleReady = (event) => {
    event.preventDefault();
    navigate("/champion");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        localStorage.getItem("baseURL") + BACKEND_PORT + "getTeams",
        {
          params: { id: localStorage.getItem(GAME_ID_KEY) },
        }
      );
      console.log(res.data);
      const allPlayers = res.data.players;
      const teams = res.data.teams;
      // console.log({ Allplayers });
      const bluePlayersData = allPlayers.blue;
      const redPlayersData = allPlayers.red;
      console.log(allPlayers);
      setBluePlayers(bluePlayersData);
      setRedPlayers(redPlayersData);
      setBlueID(teams[0].teamId);
      setRedID(teams[1].teamId);
    };

    // Call fetchData immediately
    fetchData();

    // Setup interval to call fetchData every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <img src="./PickYourTeam.png" alt="pick your team"></img>
      <div className="grid grid-cols-2 w-full">
        <Team
          teamNumber={blueID}
          players={bluePlayers}
          setTeamless={setTeamless}
        />
        <Team
          teamNumber={redID}
          players={redPlayers}
          setTeamless={setTeamless}
        />
      </div>
      <Button
        color="primary"
        wide="true"
        className="m-8"
        onClick={handleReady}
        disabled={teamless}
      >
        READY
      </Button>
    </>
  );
};
export default TeamSelectionPage;
