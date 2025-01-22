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

// Add new connector component for better line visualization
const StepConnector = ({ isCompleted, isActive }: { isCompleted: boolean; isActive: boolean }) => (
  <div className="relative w-full h-0.5">
    <div
      className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
        isCompleted 
          ? "bg-gradient-to-r from-green-500 to-green-600" 
          : isActive
            ? "bg-gradient-to-r from-blue-400 to-gray-300"
            : "bg-gray-200"
      }`}
    />
    {isCompleted && (
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"
        initial={{ left: 0 }}
        animate={{ left: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    )}
  </div>
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

  // Enhanced container variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.4,
        delayChildren: 0.6,
        duration: 0.8,
      },
    },
  };

  // Enhanced step variants with hover effect
  const stepVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <nav aria-label="Project Workflow Progress" className="relative">
        <ol className="flex items-center justify-between w-full">
          {STEPPER_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isClickable = completedSteps.includes(index) || stepNumber === currentStep;
            const isCompleted = completedSteps.includes(index);
            const isActive = stepNumber === currentStep;

            return (
              <motion.li
                key={step.title}
                className="flex-1 relative flex flex-col items-center"
                variants={stepVariants}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full flex justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className={`w-14 h-14 rounded-full p-0 transition-all duration-300 border-2 relative z-10 
                              ${isCompleted
                                ? "bg-gradient-to-br from-green-50 to-green-100 border-green-500 text-green-700 shadow-lg shadow-green-100"
                                : isActive
                                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500 text-blue-700 shadow-lg shadow-blue-100"
                                  : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 text-gray-500"
                              } ${!isClickable ? "cursor-not-allowed opacity-60" : "hover:shadow-xl hover:-translate-y-0.5 transform transition-all"}`}
                            onClick={() => handleStepClick(stepNumber)}
                            disabled={!isClickable}
                          >
                            <motion.div
                              initial={{ rotate: 0 }}
                              animate={{ rotate: isCompleted ? 360 : 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              {step.icon}
                            </motion.div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="bg-white px-3 py-2 rounded-lg shadow-xl border border-gray-100"
                        >
                          <p className="text-sm font-medium">
                            {isClickable 
                              ? `Step ${stepNumber}: ${step.title}`
                              : "Complete previous steps first"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {index < STEPPER_STEPS.length - 1 && (
                      <div className="absolute top-1/2 left-[calc(50%+28px)] right-0 -translate-y-1/2 w-[calc(100%-56px)] z-0">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 1.2 + (0.3 * index) }}
                        >
                          <StepConnector 
                            isCompleted={isCompleted} 
                            isActive={isActive} 
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  <motion.div 
                    className="mt-4 text-center w-full"
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.3,
                          duration: 0.6,
                          ease: "easeOut"
                        } 
                      }
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 mb-1">Step {stepNumber}</div>
                    <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {step.title}
                    </div>
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </motion.div>
  );
};

export default StepsProgress;