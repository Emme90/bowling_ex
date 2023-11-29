import { Frame } from "../model/frame";

/**
 * default match data populated during each ball roll
 */
export const pg1DefaultMatchScore = new Array<Frame>(10).fill({
  hitType: "NONE",
  firstScore: 0,
  firstPlayed: false,
  secondScore: 0,
  secondPlayed: false,
  frameScore: 0,
  played: false,
});

export const pg2DefaultMatchScore = new Array<Frame>(10).fill({
  hitType: "NONE",
  firstScore: 0,
  firstPlayed: false,
  secondScore: 0,
  secondPlayed: false,
  frameScore: 0,
  played: false,
});
