import { useEffect, useState } from "react";
import { Frame } from "../../model/frame";
import { calculatePgScore } from "../../utils/utilityFunc";
import classes from "./TurnStats.module.css";

// mock const used only to show the correct number of frame
// it doesn't count about hiting STRIKE or SPARE on the last attempt
const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface TurnStatsProps {
  matchStarted: boolean;
  currentFrame: number;
  pg1Turns: Frame[];
  pg2Turns: Frame[];
}

function TurnStats({
  currentFrame,
  matchStarted,
  pg1Turns,
  pg2Turns,
}: TurnStatsProps) {
  const [pg1TotalScore, setPg1TotalScore] = useState(0);
  const [pg2TotalScore, setPg2TotalScore] = useState(0);

  useEffect(() => {
    setPg1TotalScore(0);
    setPg2TotalScore(0);
  }, [matchStarted]);

  useEffect(() => {
    if (pg1Turns.length > 0) {
      let score = calculatePgScore(pg1Turns);
      setPg1TotalScore(score);
    }
    if (pg2Turns.length > 0) {
      let score = calculatePgScore(pg2Turns);
      setPg2TotalScore(score);
    }
  }, [pg1Turns, pg2Turns, currentFrame]);
  return (
    <>
      {matchStarted ? (
        <>
          {frames.map((val: number, index: number) => {
            if (index <= currentFrame) {
              const pg1Frame = pg1Turns[index];
              const pg2Frame = pg2Turns[index];
              return (
                <div key={`${index}`}>
                  <div className={classes.rowContainer}>
                    <div className={classes.pgTurn}>
                      <h4>Attemps:</h4>
                      <div>
                        <span>
                          {pg1Frame?.firstScore ? pg1Frame?.firstScore : ""}
                        </span>
                        <span>
                          {pg1Frame?.secondScore ? pg1Frame?.secondScore : ""}{" "}
                        </span>
                      </div>
                      <p>{pg1Frame?.hitType}</p>
                    </div>
                    <div className={classes.frameCount}>{index + 1}</div>
                    <div className={classes.pgTurn}>
                      <h4>Attemps:</h4>
                      <div>
                        <span>
                          {pg2Frame?.firstScore ? pg2Frame?.firstScore : ""}
                        </span>
                        <span>
                          {pg2Frame?.secondScore ? pg2Frame?.secondScore : ""}{" "}
                        </span>
                      </div>
                      <p>{pg2Frame?.hitType}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div
            className={classes.rowContainer}
            style={{ paddingTop: "2.5rem", marginBottom: "2rem" }}
          >
            <div className={classes.pg1Result}>{pg1TotalScore}</div>
            <div>
              <strong>TOTAL SCORE</strong>
            </div>
            <div className={classes.pg2Result}>{pg2TotalScore}</div>
          </div>
        </>
      ) : (
        <div className={classes.emptyTurns}>
          <h5>...the match is about to started...</h5>
        </div>
      )}
    </>
  );
}

export default TurnStats;
