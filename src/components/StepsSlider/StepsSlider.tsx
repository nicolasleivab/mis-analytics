import { useState } from "react";
import { Flex } from "../../layout";
import Button from "../Button/Button";

export type TStep = {
  title: string;
  description: string;
  children?: React.ReactNode;
};
export type TStepsSlider = {
  steps: TStep[];
};

export default function StepsSlider({ steps }: TStepsSlider) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevStep: number) => prevStep + 1);
  };
  const handlePrev = () => {
    setActiveStep((prevStep: number) => prevStep - 1);
  };

  return (
    <Flex direction="column" gap="50px">
      <h2>{steps[activeStep].title}</h2>
      <p>{steps[activeStep].description}</p>
      {steps[activeStep].children}
      <Flex gap="20px">
        {activeStep > 0 ? (
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            Prev
          </Button>
        ) : null}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Continue</Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
