import { Frame } from "../model/frame";

/**
 *
 * @param remainingSkittles
 * @returns the number of hited skittles
 *
 * it use a basic Math.random() function passing the remaining skittle
 * in order to set a correct range of possible score
 */
export const rollBall = (remainingSkittles: number): number => {
  return Math.floor(Math.random() * remainingSkittles + 1);
};

/**
 *
 * @param matchFrame
 * @param currentFrame
 * @param hitScore
 * @returns the current frame each time the ball has been roll
 *
 * every turn of current frame a Frame obj has been built.
 * it depends by the hit score and evenly previous roll
 */
export const buildMatchFrame = (
  matchFrame: Frame[],
  currentFrame: number,
  hitScore: number
): Frame => {
  const currentMatchFrame = matchFrame[currentFrame];
  return {
    ...currentMatchFrame,
    firstScore: !currentMatchFrame.firstPlayed
      ? hitScore
      : currentMatchFrame.firstScore,
    firstPlayed: !currentMatchFrame.firstPlayed
      ? true
      : currentMatchFrame.firstPlayed,
    secondScore: currentMatchFrame.firstPlayed ? hitScore : 0,
    secondPlayed: currentMatchFrame.firstPlayed ? true : false,
    hitType:
      !currentMatchFrame.firstPlayed && hitScore === 10
        ? "STRIKE"
        : currentMatchFrame.firstPlayed &&
          currentMatchFrame.firstScore + hitScore === 10
        ? "SPARE"
        : currentMatchFrame.firstPlayed &&
          currentMatchFrame.firstScore + hitScore < 10
        ? "MIX"
        : "NONE",
    frameScore:
      currentMatchFrame.firstPlayed &&
      currentMatchFrame.firstScore + hitScore < 10
        ? currentMatchFrame.firstScore + hitScore
        : null,
    played:
      !currentMatchFrame.firstPlayed && hitScore === 10
        ? true
        : !currentMatchFrame.firstPlayed
        ? false
        : true,
  };
};

/**
 *
 * @param pgFrames
 * @returns the player score
 *
 * it is used to calculate player score every time
 * the player match data has been updated.
 * in this case, the player frames are the only played one,
 * so every time the score is calculated, it cycles only on played frames
 *
 * mind that the hitType is evaluated only at the end of the frame.
 * so it is evaluated after the first attempt if it hit a STRIKE, otherwise
 * after the second one.
 */
export const calculatePgScore = (pgFrames: Frame[]): number => {
  let score = 0;
  // cycling all the played frame
  for (let i = 0; i < pgFrames.length; i++) {
    if (pgFrames[i].hitType === "STRIKE") {
      // if intercept a STRIKE
      // cycle up to the next 2 frames in order to get
      // the next 2 hit score
      for (let j = i + 1; j < (i + 3 || pgFrames.length); j++) {
        // if the next hit of a STRIKE is a STRIKE too
        // need to check the next hit
        if (pgFrames[j]?.firstPlayed && pgFrames[j]?.hitType === "STRIKE") {
          if (pgFrames[j + 1]?.firstPlayed) {
            score +=
              pgFrames[j + 1]?.firstScore +
              pgFrames[j]?.firstScore +
              pgFrames[i]?.firstScore;
          } else {
            continue;
          }
          // if the next hit of a STRIKE is not a STRIKE
          // it checks if the next 2 hit exist.
          // if it is, it sum it on score, otherwise continue the cycle for the next hit
        } else if (
          pgFrames[j]?.firstPlayed &&
          pgFrames[j]?.hitType !== "STRIKE"
        ) {
          if (pgFrames[j]?.secondPlayed) {
            score +=
              pgFrames[i]?.firstScore +
              pgFrames[j]?.firstScore +
              pgFrames[j]?.secondScore;
          } else {
            continue;
          }
        }
      }
      // if intercept a SPARE
      // cycle up to the next 1 frame in order to get
      // the next hit score
    } else if (pgFrames[i].hitType === "SPARE") {
      for (let j = i + 1; j < (i + 2 || pgFrames.length); j++) {
        // if it found the next hit after spare
        // it sums it on score otherwise continue the cycle for the next hit
        if (pgFrames[j]?.firstPlayed) {
          score +=
            pgFrames[i]?.firstScore +
            pgFrames[i]?.secondScore +
            pgFrames[j]?.firstScore;
        } else {
          continue;
        }
      }
      // if it doesn't intercept nor STRIKE or SPARE
      // it simply add the first and second hit
    } else if (pgFrames[i].hitType === "MIX") {
      score += pgFrames[i]?.firstScore + pgFrames[i]?.secondScore;
    } else {
      continue;
    }
  }
  return score;
};
