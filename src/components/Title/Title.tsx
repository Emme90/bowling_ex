import classe from "./Title.module.css";

interface TitleProps {
  pg1Name: string;
  pg2Name: string;
}

function Title({ pg1Name, pg2Name }: TitleProps) {
  return (
    <div className={classe.headerContainer}>
      <h2 className={classe.title}>CGM - bowling project</h2>
      <h5 className={classe.subTitle}>
        {pg1Name} <strong style={{ fontSize: "50%" }}>vs</strong> {pg2Name}
      </h5>
    </div>
  );
}

export default Title;
