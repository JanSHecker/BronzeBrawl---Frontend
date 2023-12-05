import { PLAYER_NAME_KEY } from "../constants";

const Player = ({ playerName }) => {
  if (playerName === localStorage.getItem(PLAYER_NAME_KEY)) {
    return <h1 className="font-semibold">{playerName} (you)</h1>;
  } else {
    return <h1>{playerName}</h1>;
  }
};
export default Player;
