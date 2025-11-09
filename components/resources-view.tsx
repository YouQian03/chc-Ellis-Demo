"use client"

import type React from "react"
import { useState } from "react"
import { Search, Zap, Newspaper, Bookmark, Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const quickSearchTags = [
  "classroom management",
  "student anxiety",
  "teacher burnout",
  "behavioral interventions",
  "mindfulness",
]

const classManagementPodcasts = [
  {
    id: 1,
    title: "The Classroom Teacher",
    host: "Dr. Sarah Johnson",
    description: "Evidence-based strategies for creating positive and productive learning environments",
    image: "/classroom-teacher-podcast.jpg",
    duration: "45 min",
    episodes: 128,
    category: "Management",
  },
  {
    id: 2,
    title: "Effective Management Strategies",
    host: "Michael Chen",
    description: "Practical approaches to behavior management and increasing student engagement",
    image: "/education-management-podcast.jpg",
    duration: "30 min",
    episodes: 96,
    category: "Behavior",
  },
  {
    id: 3,
    title: "Positive Discipline in Action",
    host: "Emma Rodriguez",
    description: "Build respectful, responsible classrooms through proven positive discipline techniques",
    image: "/positive-discipline-education.jpg",
    duration: "20 min",
    episodes: 215,
    category: "Discipline",
  },
  {
    id: 4,
    title: "Teacher Toolkit Essentials",
    host: "James Williams",
    description: "Essential classroom management tools and practical techniques for educators",
    image: "/teacher-tools-podcast.jpg",
    duration: "35 min",
    episodes: 84,
    category: "Tools",
  },
  {
    id: 5,
    title: "Building Classroom Culture",
    host: "Dr. Lisa Martinez",
    description: "Create strong classroom communities through effective leadership and management",
    image: "/classroom-community-podcast.jpg",
    duration: "40 min",
    episodes: 102,
    category: "Culture",
  },
  {
    id: 6,
    title: "The Engaged Educator",
    host: "Tom Anderson",
    description: "Proven strategies for maximizing student engagement and classroom organization",
    image: "/engaged-teacher-podcast.jpg",
    duration: "28 min",
    episodes: 145,
    category: "Engagement",
  },
]

const studentAnxietyPodcasts = [
  {
    id: 7,
    title: "Understanding Student Anxiety",
    host: "Dr. Jennifer Park",
    description: "Expert guidance on identifying and supporting students struggling with anxiety disorders",
    image: "/calming-mental-health-podcast-cover-with-soft-colo.jpg",
    duration: "42 min",
    episodes: 89,
    category: "Mental Health",
  },
  {
    id: 8,
    title: "Calm Classrooms",
    host: "Rachel Thompson",
    description: "Creating safe spaces and implementing anxiety-reduction techniques in educational settings",
    image: "/peaceful-education-podcast-with-blue-tones.jpg",
    duration: "35 min",
    episodes: 134,
    category: "Wellness",
  },
  {
    id: 9,
    title: "Supporting Anxious Learners",
    host: "Dr. Marcus Lee",
    description: "Evidence-based strategies for helping anxious students thrive academically and emotionally",
    image: "/supportive-mental-health-education-podcast.jpg",
    duration: "38 min",
    episodes: 76,
    category: "Support",
  },
  {
    id: 10,
    title: "Mindfulness in Education",
    host: "Sarah Bennett",
    description: "Practical mindfulness exercises and breathing techniques to help students manage anxiety",
    image: "/zen-mindfulness-education-podcast-cover.jpg",
    duration: "25 min",
    episodes: 198,
    category: "Mindfulness",
  },
  {
    id: 11,
    title: "The Resilient Student",
    host: "Dr. Amanda Garcia",
    description: "Building emotional resilience and coping skills for students facing anxiety challenges",
    image: "/strong-resilience-mental-health-podcast.jpg",
    duration: "40 min",
    episodes: 112,
    category: "Resilience",
  },
  {
    id: 12,
    title: "School Psychology Today",
    host: "Dr. Robert Chen",
    description: "Professional insights on anxiety interventions and mental health support in schools",
    image: "/professional-psychology-education-podcast.jpg",
    duration: "50 min",
    episodes: 67,
    category: "Psychology",
  },
]

export default function ResourcesView() {
  const [searchMode, setSearchMode] = useState<"web" | "news">("web")
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const query = searchQuery.toLowerCase()
  const isClassManagement = query.includes("class")
  const isStudentAnxiety = query.includes("anxiety") || query.includes("student anxiety")

  const shouldShowPodcasts = hasSearched && (isClassManagement || isStudentAnxiety)
  const podcastsToShow = isStudentAnxiety ? studentAnxietyPodcasts : classManagementPodcasts
  const resultTitle = isStudentAnxiety ? "Student Anxiety Resources" : "Classroom Management Podcasts"
  const resultSubtitle = isStudentAnxiety
    ? "Mental health support and anxiety management strategies"
    : "Expert insights and practical strategies"

  const handleSearch = () => {
    console.log("[v0] Search clicked, query:", searchQuery)
    setHasSearched(true)
  }

  const handleQuickSearch = (tag: string) => {
    console.log("[v0] Quick search clicked, tag:", tag)
    setSearchQuery(tag)
    setHasSearched(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHasSearched(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-balance">Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">
            Discover evidence-based resources for mental health support, classroom management, and student wellbeing
            from trusted organizations and recent news.
          </p>
        </div>

        {/* Search Controls */}
        <div className="space-y-6 bg-card rounded-2xl p-8 border border-border shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground">Search Mode:</span>
            <div className="flex gap-2">
              <Button
                variant={searchMode === "web" ? "default" : "outline"}
                onClick={() => setSearchMode("web")}
                className="gap-2 rounded-lg"
                size="lg"
              >
                <Zap className="h-4 w-4" />
                Web Resources
              </Button>
              <Button
                variant={searchMode === "news" ? "default" : "outline"}
                onClick={() => setSearchMode("news")}
                className="gap-2 rounded-lg"
                size="lg"
              >
                <Newspaper className="h-4 w-4" />
                Latest News
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for mental health resources, classroom strategies..."
                className="pl-12 h-14 text-base rounded-xl border-2 focus-visible:ring-2"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="gap-2 h-14 px-8 rounded-xl font-semibold">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>

          {/* Quick Search Tags */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Quick search:</span>
            <div className="flex flex-wrap gap-2">
              {quickSearchTags.map((tag) => (
                <Button
                  key={tag}
                  variant="secondary"
                  size="lg"
                  onClick={() => handleQuickSearch(tag)}
                  className="rounded-full px-6 font-medium hover:scale-105 transition-transform"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {shouldShowPodcasts && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{resultTitle}</h2>
                <p className="text-muted-foreground mt-1">{resultSubtitle}</p>
              </div>
              <Button variant="outline" size="lg" className="gap-2 rounded-xl bg-transparent">
                <Bookmark className="h-4 w-4" />
                Save All
              </Button>
            </div>

            {/* Podcast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcastsToShow.map((podcast) => (
                <Card
                  key={podcast.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary rounded-2xl"
                >
                  {/* Podcast Cover */}
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={podcast.image || "/placeholder.svg"}
                      alt={podcast.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <Button size="lg" className="gap-2 rounded-full shadow-xl">
                        <Play className="h-5 w-5" />
                        Listen Now
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {podcast.category}
                      </span>
                    </div>
                  </div>

                  {/* Podcast Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {podcast.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">by {podcast.host}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{podcast.description}</p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium">{podcast.duration}</span>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{podcast.episodes} episodes</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!shouldShowPodcasts && (
          <div className="space-y-6 mt-12">
            <h2 className="text-3xl font-bold tracking-tight">Saved Learning</h2>
            <Card className="text-center py-20 border-2 border-dashed rounded-2xl">
              <Bookmark className="h-16 w-16 mx-auto mb-6 text-muted-foreground/40" />
              <h3 className="text-xl font-semibold mb-2">No saved resources yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Search and save resources to build your personalized collection
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
