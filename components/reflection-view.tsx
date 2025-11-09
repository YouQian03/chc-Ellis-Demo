"use client"

import { useState } from "react"
import { MessageSquare, BarChart3, Clock, CheckCircle, Lightbulb, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReflectionView() {
  const [selectedView, setSelectedView] = useState<"history" | "analytics">("history")
  const [timePeriod, setTimePeriod] = useState<"7days" | "30days" | "90days">("7days")
  const [selectedScenario, setSelectedScenario] = useState<string>("Classroom Management")

  const chatHistories = [
    {
      id: 1,
      name: "Chat 1",
      date: "2025-01-08",
      preview: "Discussion about classroom management strategies...",
      messageCount: 12,
    },
    {
      id: 2,
      name: "Chat 2",
      date: "2025-01-07",
      preview: "Exploring student engagement techniques...",
      messageCount: 8,
    },
    {
      id: 3,
      name: "Chat 3",
      date: "2025-01-06",
      preview: "Planning for differentiated instruction...",
      messageCount: 10,
    },
    {
      id: 4,
      name: "Chat 4",
      date: "2025-01-05",
      preview: "Reviewing assessment methods...",
      messageCount: 10,
    },
  ]

  const scenarioData = {
    "Classroom Management": {
      count: 15,
      suggestions: [
        "Implement positive reinforcement system",
        "Create clear classroom rules",
        "Use non-verbal cues for behavior",
        "Establish consistent routines",
      ],
      actions: {
        completed: 5,
        pending: 2,
        todo: 3,
      },
      resources: [
        {
          title: "Effective Classroom Management Techniques",
          type: "Podcast",
          duration: "28 min",
        },
        {
          title: "Building a Positive Learning Environment",
          type: "Article",
          duration: "10 min read",
        },
        {
          title: "Behavior Management Strategies",
          type: "Video",
          duration: "18 min",
        },
      ],
    },
    "Parent Communication": {
      count: 8,
      suggestions: [
        "Schedule weekly email updates",
        "Host virtual parent-teacher conferences",
        "Share student progress reports",
        "Create a communication calendar",
      ],
      actions: {
        completed: 4,
        pending: 2,
        todo: 2,
      },
      resources: [
        {
          title: "Effective Parent Communication Strategies",
          type: "Article",
          duration: "8 min read",
        },
        {
          title: "Building Trust with Parents",
          type: "Podcast",
          duration: "25 min",
        },
        {
          title: "Parent Engagement Best Practices",
          type: "Video",
          duration: "15 min",
        },
      ],
    },
    "Student Engagement": {
      count: 12,
      suggestions: [
        "Incorporate collaborative learning",
        "Use technology-based activities",
        "Provide choice in assignments",
        "Implement gamification elements",
      ],
      actions: {
        completed: 3,
        pending: 1,
        todo: 3,
      },
      resources: [
        {
          title: "Engaging Students in Active Learning",
          type: "Podcast",
          duration: "32 min",
        },
        {
          title: "21st Century Engagement Strategies",
          type: "Article",
          duration: "12 min read",
        },
        {
          title: "Creating Interactive Lessons",
          type: "Video",
          duration: "20 min",
        },
      ],
    },
    "Lesson Planning": {
      count: 6,
      suggestions: [
        "Design backward from learning objectives",
        "Incorporate differentiated instruction",
        "Plan for formative assessments",
        "Include reflection time",
      ],
      actions: {
        completed: 2,
        pending: 1,
        todo: 1,
      },
      resources: [
        {
          title: "Effective Lesson Planning Framework",
          type: "Article",
          duration: "15 min read",
        },
        {
          title: "Planning for Diverse Learners",
          type: "Podcast",
          duration: "30 min",
        },
        {
          title: "Assessment Integration in Planning",
          type: "Video",
          duration: "22 min",
        },
      ],
    },
  }

  const scenarios = Object.keys(scenarioData)
  const currentScenario = scenarioData[selectedScenario as keyof typeof scenarioData]

  const maxCount = Math.max(...scenarios.map((s) => scenarioData[s as keyof typeof scenarioData].count))

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Reflection</h1>
        <p className="text-muted-foreground mt-2">
          Review your conversation history and track your professional development
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="p-6 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant={selectedView === "history" ? "default" : "outline"}
            onClick={() => setSelectedView("history")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Chat History
          </Button>
          <Button
            variant={selectedView === "analytics" ? "default" : "outline"}
            onClick={() => setSelectedView("analytics")}
            className="gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedView === "history" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
            <div className="grid gap-4">
              {chatHistories.map((chat) => (
                <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{chat.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3" />
                            {chat.date}
                          </CardDescription>
                        </div>
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">{chat.messageCount} messages</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{chat.preview}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === "analytics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Analytics</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={timePeriod === "7days" ? "default" : "outline"}
                  onClick={() => setTimePeriod("7days")}
                >
                  Last 7 Days
                </Button>
                <Button
                  size="sm"
                  variant={timePeriod === "30days" ? "default" : "outline"}
                  onClick={() => setTimePeriod("30days")}
                >
                  Last 30 Days
                </Button>
                <Button
                  size="sm"
                  variant={timePeriod === "90days" ? "default" : "outline"}
                  onClick={() => setTimePeriod("90days")}
                >
                  Last 90 Days
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Historical Scenarios
                </CardTitle>
                <CardDescription>Frequency of interactions by scenario type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenarios.map((scenario) => {
                    const data = scenarioData[scenario as keyof typeof scenarioData]
                    const percentage = (data.count / maxCount) * 100
                    return (
                      <div key={scenario} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{scenario}</span>
                          <span className="text-muted-foreground">{data.count} interactions</span>
                        </div>
                        <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 20 && <span className="text-white text-xs font-semibold">{data.count}</span>}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scenario Details</CardTitle>
                <CardDescription>Select a scenario to view actions and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {scenarios.map((scenario) => (
                    <Button
                      key={scenario}
                      size="sm"
                      variant={selectedScenario === scenario ? "default" : "outline"}
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      {scenario}
                    </Button>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Action Summary for selected scenario */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      Action Summary
                    </h4>
                    <ul className="space-y-2">
                      {currentScenario.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Status for selected scenario */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Actions
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{currentScenario.actions.completed}</div>
                        <div className="text-xs text-muted-foreground mt-1">Completed</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{currentScenario.actions.pending}</div>
                        <div className="text-xs text-muted-foreground mt-1">Pending</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-600">{currentScenario.actions.todo}</div>
                        <div className="text-xs text-muted-foreground mt-1">To Do</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      Recommended Resources
                    </h4>
                    <div className="space-y-3">
                      {currentScenario.resources.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <BookOpen className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.type} • {item.duration}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
