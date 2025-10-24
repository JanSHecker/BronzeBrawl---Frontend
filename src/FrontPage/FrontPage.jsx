import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Add these imports
import NameForm from "./NameForm";
import { GAME_ID_KEY } from "../constants";
import axios from "axios";

const FrontPage = () => {
  // Remove 'async' here
  const params = useParams();
  const gameId = params.parameter;
  const [lolVersion, setLolVersion] = useState(null); // State for version

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const version = await getGameVersion();
        setLolVersion(version);
      } catch (error) {
        console.error("Error fetching version:", error);
      }
    };
    fetchVersion();
  }, []); // Empty dependency array means this runs once on mount

  localStorage.setItem(GAME_ID_KEY, gameId);
  const currentDomain = "http://" + window.location.hostname;
  localStorage.setItem("baseURL", currentDomain);

  return (
    <>
      <img
        src="../bronzeIcon150.png"
        alt="bronze brawl with icon"
        className="mb-8 max-w-full h-auto"
      />
      <NameForm />
      <h1>Gamed ID: {gameId}</h1>
      <h1>
        Running on League of Legends version: {lolVersion || "Loading..."}
      </h1>{" "}
      {/* Display version or loading text */}
    </>
  );
};

export default FrontPage;

async function getGameVersion() {
  const versionResponse = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  console.log(versionResponse.data); // This will now log
  return versionResponse.data[0];
}
