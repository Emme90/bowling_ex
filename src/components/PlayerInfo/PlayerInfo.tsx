import classe from "./PlayerInfo.module.css";

interface PlayerInfoProps {
  pgName: string;
  pgTurn: boolean;
}

function PlayerStats({ pgName, pgTurn }: PlayerInfoProps) {
  return (
    <div
      className={classe.container}
      style={
        pgTurn ? { backgroundColor: "red" } : { backgroundColor: "inherit" }
      }
    >
      <h5>Name:</h5>
      <h4>{pgName}</h4>
    </div>
  );
}

export default PlayerStats;
