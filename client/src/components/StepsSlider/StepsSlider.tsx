import { useState } from 'react';
import { Flex } from '../../layout';
import Button from '../Button/Button';
import { StepperComponent } from '../Stepper/Stepper';

export interface TStep {
  title: string;
  description: string;
  children?: React.ReactNode;
  canProceed?: boolean;
}
export interface TStepsSlider {
  steps: TStep[];
}

export default function StepsSlider({ steps }: TStepsSlider) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevStep: number) => prevStep + 1);
  };
  const handlePrev = () => {
    setActiveStep((prevStep: number) => prevStep - 1);
  };

  return (
    <Flex direction="column" gap="50px" width="100%">
      <StepperComponent steps={steps} activeStep={activeStep} />
      {/* <h2>{steps[activeStep].title}</h2>
        <p>{steps[activeStep].description}</p> */}
      {steps[activeStep].children}
      <Flex gap="20px">
        {activeStep > 0 ? (
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            Prev
          </Button>
        ) : null}
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            buttonType={steps[activeStep]?.canProceed ? 'primary' : 'disabled'}
          >
            Continue
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
