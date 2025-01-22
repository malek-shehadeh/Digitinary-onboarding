import { useState, useEffect } from "react"
import { Workflow, FileText, Code, Upload, Package } from "lucide-react"
import "./App.css"
import { Stepper } from "./components/Stepper/stepper"
import { motion } from "framer-motion"

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { title: "Architecture", icon: <Workflow className="h-5 w-5" /> },
    { title: "Business Requirements", icon: <FileText className="h-5 w-5" /> },
    { title: "Technical Setup", icon: <Code className="h-5 w-5" /> },
    { title: "Deployment Process", icon: <Upload className="h-5 w-5" /> },
    { title: "Creating a Custom Module", icon: <Package className="h-5 w-5" /> },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer)
          return prev
        }
        setCompletedSteps((current) => [...current, prev])
        return prev + 1
      })
    }, 1500) // Move to next step every 1.5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Stepper
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={(index) => {
          setCurrentStep(index)
          setCompletedSteps([...Array(index)].map((_, i) => i))
        }}
      />
    </motion.div>
  )
}

export default App

