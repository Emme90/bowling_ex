import { useState } from "react";
import "./App.css";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import Title from "./components/Title/Title";
import TurnStats from "./components/TurnStats/TurnStats";
import { pg1DefaultMatchScore, pg2DefaultMatchScore } from "./data/emptyState";
import matchData from "./data/match.json";
import { Frame } from "./model/frame";
import { buildMatchFrame, rollBall } from "./utils/utilityFunc";

let pg1MatchScore = [...pg1DefaultMatchScore];
let pg2MatchScore = [...pg2DefaultMatchScore];

let pg1RemainSkittle: number = 10;
let pg2RemainSkittle: number = 10;
let currentFrame: number = 0;
let frameLimit = 9;

function App() {
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  const [pg1Frames, setPg1Frames] = useState<Frame[]>([]);
  const [pg2Frames, setPg2Frames] = useState<Frame[]>([]);

  const rollBallHandler = () => {
    if (!matchEnded) {
      // check if pg1 has already played this frame
      if (!pg1MatchScore[currentFrame].played) {
        // get hit score in range of remainig skittle
        const hitScore = rollBall(pg1RemainSkittle);
        // set remaining skittle
        pg1RemainSkittle = 10 - hitScore;

        // populate pg1 match data
        pg1MatchScore[currentFrame] = buildMatchFrame(
          pg1MatchScore,
          currentFrame,
          hitScore
        );

        // extract only played frame in order to set properly rows
        const playedFrame = pg1MatchScore.filter(
          (_, index: number) => index <= currentFrame
        );
        // react setter for display played rows
        setPg1Frames(playedFrame);
      } else if (!pg2MatchScore[currentFrame].played) {
        // same for pg2...
        const hitScore = rollBall(pg2RemainSkittle);
        pg2RemainSkittle = 10 - hitScore;

        pg2MatchScore[currentFrame] = buildMatchFrame(
          pg2MatchScore,
          currentFrame,
          hitScore
        );
        const playedFrame = pg2MatchScore.filter(
          (_, index: number) => index <= currentFrame
        );
        setPg2Frames(playedFrame);
      } else {
        if (currentFrame < frameLimit) {
          currentFrame++;
          pg1RemainSkittle = 10;
          pg2RemainSkittle = 10;
        } else {
          setMatchEnded(true);
        }
      }
    }
  };

  // start method
  const startMatchHandler = () => {
    setMatchStarted(true);
  };

  // reset method
  const resetMatchHandler = () => {
    // reset var in order to show properly messages
    setMatchEnded(false);
    setMatchStarted(false);

    // reset pg's match data to default ones
    pg1MatchScore = [...pg1DefaultMatchScore];
    pg2MatchScore = [...pg2DefaultMatchScore];

    // reset local var which is not affected by react rerendering
    currentFrame = 0;
    pg1RemainSkittle = 10;
    pg2RemainSkittle = 10;
  };

  return (
    <div className="App">
      <Title pg1Name={matchData[0].surname} pg2Name={matchData[1].surname} />
      <div className="stats-container">
        <div>
          <PlayerInfo pgName={`${matchData[0].name} ${matchData[0].surname}`} />
        </div>
        <div>
          <h6>FRAMES</h6>
        </div>
        <div>
          <PlayerInfo pgName={`${matchData[1].name} ${matchData[1].surname}`} />
        </div>
      </div>
      <TurnStats
        currentFrame={currentFrame}
        matchStarted={matchStarted}
        pg1Turns={pg1Frames}
        pg2Turns={pg2Frames}
      />
      <div className="cta-roll-ball-container">
        {!matchEnded && !matchStarted ? (
          <button onClick={startMatchHandler}>START GAME</button>
        ) : !matchEnded && matchStarted ? (
          <button onClick={rollBallHandler}>ROLL THE BALL</button>
        ) : (
          <button onClick={resetMatchHandler}>RESET GAME</button>
        )}
      </div>
    </div>
  );
}

export default App;
