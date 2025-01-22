import React from 'react';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Workflow, FileText, Upload, Package, Code } from "lucide-react"
import { motion } from "framer-motion"

interface StepsProgressProps {
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (index: number) => void;
  stepCorrectness: { [key: number]: boolean };
}

const STEPPER_STEPS = [
  {
    title: "Architecture",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Business Requirements",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Technical Setup",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Deployment Process",
    icon: <Upload className="h-5 w-5" />,
  },
  {
    title: "Creating a Custom Module",
    icon: <Package className="h-5 w-5" />,
  },
];

const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
  <div className={`flex-1 h-0.5 transition-colors ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
);

const StepsProgress: React.FC<StepsProgressProps> = ({ 
  currentStep, 
  completedSteps = [], 
  onStepClick = () => {},
  stepCorrectness
}) => {
  const handleStepClick = (index: number) => {
    if (completedSteps.includes(index - 1) || index === currentStep) {
      onStepClick(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav aria-label="Project Workflow Progress" className="w-full py-8">
        <ol className="flex items-center w-full">
          {STEPPER_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isClickable = completedSteps.includes(index) || stepNumber === currentStep;

            return (
              <motion.li
                key={step.title}
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="flex flex-col items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`w-12 h-12 rounded-full p-0 transition-colors border-2 ${
                            completedSteps.includes(index)
                              ? "bg-green-100 border-green-500 text-green-700"
                              : index === currentStep - 1
                                ? "bg-blue-100 border-blue-500 text-blue-700"
                                : "bg-gray-50 border-gray-300 text-gray-500"
                          } ${!isClickable ? "cursor-not-allowed opacity-60" : ""}`}
                          onClick={() => handleStepClick(stepNumber)}
                          disabled={!isClickable}
                        >
                          {step.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {isClickable 
                            ? `Step ${stepNumber}: ${step.title}`
                            : "Complete previous steps first"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="mt-3 text-center">
                    <div className="text-xs font-semibold text-gray-500">Step {stepNumber}</div>
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  </div>
                </div>
                {index < STEPPER_STEPS.length - 1 && (
                  <motion.div
                    className="absolute top-6 left-1/2 w-full h-0.5 -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  >
                    <StepConnector isCompleted={completedSteps.includes(index)} />
                  </motion.div>
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </motion.div>
  );
};

export default StepsProgress;