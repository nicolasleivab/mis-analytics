import React from "react";
import {
  Head,
  LeftShoulder,
  RightShoulder,
  Chest,
  Stomach,
  LeftArm,
  RightArm,
  LeftLeg,
  RightLeg,
  LeftHand,
  RightHand,
  LeftFoot,
  RightFoot,
} from "./index";

const HumanBody = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="300"
    height="600"
    viewBox="0 0 300 600"
  >
    <Head />
    <LeftShoulder />
    <RightShoulder />
    <Chest />
    <Stomach />
    <LeftArm />
    <RightArm />
    <LeftLeg />
    <RightLeg />
    <LeftHand />
    <RightHand />
    <LeftFoot />
    <RightFoot />
  </svg>
);

export default HumanBody;
