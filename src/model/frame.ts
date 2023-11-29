/**
 * Frame interface, used to understand during each turns of each frame
 * how it is going
 */
export interface Frame {
  hitType: "STRIKE" | "SPARE" | "MIX" | "NONE";
  firstScore: number;
  firstPlayed: boolean;
  secondScore: number;
  secondPlayed: boolean;
  frameScore: number | null;
  played: boolean;
}
