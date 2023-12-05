import { Table } from "react-daisyui";
import Player from "./Player";

const TeamTable = ({ players, setTeam }) => {
  return (
    <div>
      <Table className="w-full h-full">
        <Table.Body>
          {Array.from({ length: 5 }).map((_, index) => {
            const player = players[index];
            return (
              <tr key={index}>
                <td className="h-10">
                  {player ? (
                    <Player playerName={player.playerName} setTeam={setTeam} />
                  ) : (
                    "..."
                  )}
                </td>
              </tr>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default TeamTable;
