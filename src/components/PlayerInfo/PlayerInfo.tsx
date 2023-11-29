import classe from "./PlayerInfo.module.css";

interface PlayerInfoProps {
  pgName: string;
}

function PlayerStats({ pgName }: PlayerInfoProps) {
  return (
    <div className={classe.container}>
      <h5>Name:</h5>
      <h4>{pgName}</h4>
    </div>
  );
}

export default PlayerStats;
