"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingModalProps {
  onClose: () => void
  onComplete?: () => void
}

const questions = [
  {
    question: "What kind of help do you expect Ellis to provide for you?",
    options: [
      "(a) More detailed action plan",
      "(b) Listening and communication support",
      "(c) Skill development resources",
    ],
  },
  {
    question: "I'm",
    options: ["(a) Tier 1 Educator", "(b) Tier 2 Educator", "(c) Tier 3 Educator"],
  },
  {
    question: "I'm",
    options: [
      "(a) I am a teacher with less than 3 years of experience",
      "(b) I am a teacher with 3–5 years of experience",
      "(c) I am a teacher with 5–10 years of experience",
    ],
  },
]

export default function OnboardingModal({ onClose, onComplete }: OnboardingModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showGreeting, setShowGreeting] = useState(false)

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex })
  }

  const getGreeting = () => {
    const tierOptions = ["Tier 1", "Tier 2", "Tier 3"]
    const experienceOptions = ["less than 3 years of experience", "3–5 years of experience", "5–10 years of experience"]

    const tier = answers[1] !== undefined ? tierOptions[answers[1]] : "Tier 1"
    const experience = answers[2] !== undefined ? experienceOptions[answers[2]] : "some"

    return `Hi alice, seems you are a ${tier} educator with ${experience}. Welcome onboard. Hope Ellis can help with you.`
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowGreeting(true)
    }
  }

  const handleFinish = () => {
    if (onComplete) {
      onComplete()
    }
    onClose()
  }

  const canProceed = answers[currentQuestion] !== undefined
  const allAnswered = Object.keys(answers).length === questions.length

  if (showGreeting) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl p-8 relative">
          <button
            onClick={handleFinish}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center py-8">
            <div className="mb-6">
              <Check className="h-16 w-16 text-primary mx-auto mb-4" />
            </div>
            <p className="text-xl leading-relaxed mb-8">{getGreeting()}</p>
            <Button onClick={handleFinish} size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Object.keys(answers).length}/{questions.length} answered
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-semibold mb-8 text-balance">{questions[currentQuestion].question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                answers[currentQuestion] === index
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {answers[currentQuestion] === index && <Check className="h-5 w-5 text-primary" />}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!canProceed}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
