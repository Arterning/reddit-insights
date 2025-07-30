"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  TrendingUp,
  Users,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Lightbulb,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react"

// Mock data for demonstration
const mockAnalysisData = {
  demandIntensity: 78,
  sentimentScore: 6.4,
  discussionVolume: 1247,
  competitorCount: 23,
  painPointsCount: 15,
  trendDirection: "rising",
  subredditsAnalyzed: ["r/entrepreneur", "r/startups", "r/SaaS", "r/productivity", "r/smallbusiness"],
  topPosts: [
    {
      title: "Anyone else struggling with project management tools?",
      subreddit: "r/entrepreneur",
      upvotes: 234,
      comments: 67,
      sentiment: "negative",
      relevance: 94,
      url: "#",
    },
    {
      title: "Built a simple task tracker, thoughts?",
      subreddit: "r/SaaS",
      upvotes: 156,
      comments: 43,
      sentiment: "positive",
      relevance: 87,
      url: "#",
    },
    {
      title: "Why do all PM tools suck for small teams?",
      subreddit: "r/startups",
      upvotes: 189,
      comments: 52,
      sentiment: "negative",
      relevance: 91,
      url: "#",
    },
  ],
  painPoints: [
    { point: "Complex setup process", frequency: 89, sentiment: -0.7 },
    { point: "Expensive pricing for small teams", frequency: 76, sentiment: -0.8 },
    { point: "Too many features, overwhelming UI", frequency: 64, sentiment: -0.6 },
    { point: "Poor mobile experience", frequency: 52, sentiment: -0.5 },
    { point: "Limited integrations", frequency: 41, sentiment: -0.4 },
  ],
  competitors: [
    { name: "Asana", mentions: 234, sentiment: 0.2 },
    { name: "Trello", mentions: 189, sentiment: 0.4 },
    { name: "Monday.com", mentions: 156, sentiment: -0.1 },
    { name: "Notion", mentions: 143, sentiment: 0.6 },
    { name: "ClickUp", mentions: 98, sentiment: 0.1 },
  ],
  improvements: [
    {
      category: "User Experience",
      suggestion: "Focus on simplicity - users consistently complain about complex setup processes",
      priority: "High",
      impact: "Reduce onboarding friction by 60%",
    },
    {
      category: "Pricing",
      suggestion: "Offer a generous free tier for small teams (3-5 users)",
      priority: "High",
      impact: "Address #1 pain point for 76% of discussions",
    },
    {
      category: "Mobile",
      suggestion: "Prioritize mobile-first design - 52% mention poor mobile experience",
      priority: "Medium",
      impact: "Capture mobile-heavy user segments",
    },
    {
      category: "Features",
      suggestion: "Start with core features only - avoid feature bloat mentioned in 64% of complaints",
      priority: "High",
      impact: "Differentiate from overwhelming competitors",
    },
  ],
}

const subredditSuggestions = [
  "r/entrepreneur",
  "r/startups",
  "r/SaaS",
  "r/productivity",
  "r/smallbusiness",
  "r/webdev",
  "r/marketing",
  "r/freelance",
  "r/solopreneur",
  "r/business",
]

export default function RedditIdeaValidator() {
  const [idea, setIdea] = useState("")
  const [targetUser, setTargetUser] = useState("")
  const [problem, setProblem] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [subredditInput, setSubredditInput] = useState("")
  const [filteredSubreddits, setFilteredSubreddits] = useState<string[]>([])

  const handleSubredditInputChange = (value: string) => {
    setSubredditInput(value)
    if (value) {
      const filtered = subredditSuggestions.filter((sub) => sub.toLowerCase().includes(value.toLowerCase()))
      setFilteredSubreddits(filtered.slice(0, 5))
    } else {
      setFilteredSubreddits([])
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate analysis time
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const getDemandLevel = (score: number) => {
    if (score >= 80) return { level: "Very High", color: "bg-green-500" }
    if (score >= 60) return { level: "High", color: "bg-blue-500" }
    if (score >= 40) return { level: "Medium", color: "bg-yellow-500" }
    return { level: "Low", color: "bg-red-500" }
  }

  const getSentimentColor = (sentiment: string | number) => {
    if (typeof sentiment === "string") {
      return sentiment === "positive" ? "text-green-600" : "text-red-600"
    }
    return sentiment > 0 ? "text-green-600" : "text-red-600"
  }

  if (showResults) {
    const demandLevel = getDemandLevel(mockAnalysisData.demandIntensity)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button variant="outline" onClick={() => setShowResults(false)} className="mb-4">
              ← Back to Analysis
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation Results</h1>
            <p className="text-gray-600">Comprehensive market analysis for your idea</p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Demand Intensity</p>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalysisData.demandIntensity}%</p>
                    <Badge className={`${demandLevel.color} text-white mt-2`}>{demandLevel.level}</Badge>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Discussion Volume</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockAnalysisData.discussionVolume.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-2">↑ 23% this week</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sentiment Score</p>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalysisData.sentimentScore}/10</p>
                    <p className="text-sm text-blue-600 mt-2">Mixed sentiment</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Competitors Found</p>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalysisData.competitorCount}</p>
                    <p className="text-sm text-orange-600 mt-2">High competition</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Top Posts</TabsTrigger>
              <TabsTrigger value="pain-points">Pain Points</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Demand Trend Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Demand</span>
                        <Badge variant="secondary">{mockAnalysisData.trendDirection}</Badge>
                      </div>
                      <Progress value={mockAnalysisData.demandIntensity} className="h-3" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">67%</p>
                          <p className="text-xs text-gray-600">Positive mentions</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">23%</p>
                          <p className="text-xs text-gray-600">Negative mentions</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-600">10%</p>
                          <p className="text-xs text-gray-600">Neutral mentions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Subreddits Analyzed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalysisData.subredditsAnalyzed.map((subreddit, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{subreddit}</span>
                          <Badge variant="outline">{Math.floor(Math.random() * 100 + 50)} posts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Most Relevant Reddit Posts
                  </CardTitle>
                  <CardDescription>
                    Top discussions related to your idea, ranked by relevance and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalysisData.topPosts.map((post, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <Badge variant="outline">{post.relevance}% relevant</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium">{post.subreddit}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.upvotes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </div>
                          <span className={getSentimentColor(post.sentiment)}>{post.sentiment} sentiment</span>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <ExternalLink className="h-4 w-4" />
                          View Post
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pain-points" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    User Pain Points Analysis
                  </CardTitle>
                  <CardDescription>Key problems and frustrations identified from user discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalysisData.painPoints.map((pain, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{pain.point}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{pain.frequency}% frequency</Badge>
                            <Badge variant={pain.sentiment < -0.5 ? "destructive" : "secondary"}>
                              {pain.sentiment > 0 ? "Positive" : "Negative"}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={pain.frequency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Competitive Landscape
                  </CardTitle>
                  <CardDescription>Existing solutions mentioned in discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalysisData.competitors.map((competitor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-lg">{competitor.name}</h3>
                          <p className="text-sm text-gray-600">{competitor.mentions} mentions</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getSentimentColor(competitor.sentiment)}`}>
                            {competitor.sentiment > 0 ? "+" : ""}
                            {competitor.sentiment.toFixed(1)}
                          </div>
                          <p className="text-sm text-gray-600">sentiment</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI-Generated Improvement Suggestions
                  </CardTitle>
                  <CardDescription>Actionable recommendations based on market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockAnalysisData.improvements.map((improvement, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{improvement.category}</Badge>
                            <Badge variant={improvement.priority === "High" ? "destructive" : "secondary"}>
                              {improvement.priority} Priority
                            </Badge>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{improvement.suggestion}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Expected Impact:</strong> {improvement.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reddit Idea Validation Assistant</h1>
          <p className="text-xl text-gray-600 mb-2">Validate your startup ideas with real-time Reddit analysis</p>
          <p className="text-gray-500">
            Get insights on demand, competition, and user pain points from authentic discussions
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Describe Your Idea
            </CardTitle>
            <CardDescription>
              Provide details about your idea and we'll analyze relevant Reddit discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="idea">Idea Description *</Label>
              <Textarea
                id="idea"
                placeholder="e.g., A simple project management tool for small teams that focuses on ease of use and quick setup..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-user">Target User (Optional)</Label>
                <Input
                  id="target-user"
                  placeholder="e.g., Small business owners, freelancers..."
                  value={targetUser}
                  onChange={(e) => setTargetUser(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="problem">Problem Being Solved (Optional)</Label>
                <Input
                  id="problem"
                  placeholder="e.g., Complex project management tools..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subreddits">Specific Subreddits (Optional)</Label>
              <div className="relative">
                <Input
                  id="subreddits"
                  placeholder="Start typing to see suggestions..."
                  value={subredditInput}
                  onChange={(e) => handleSubredditInputChange(e.target.value)}
                />
                {filteredSubreddits.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                    {filteredSubreddits.map((subreddit, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        onClick={() => {
                          setSubredditInput(subreddit)
                          setFilteredSubreddits([])
                        }}
                      >
                        {subreddit}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {subredditSuggestions.slice(0, 6).map((subreddit, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSubredditInput(subreddit)}
                  >
                    {subreddit}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                Analysis typically takes 30-60 seconds
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!idea.trim() || isAnalyzing}
                className="flex items-center gap-2"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Validate Idea
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isAnalyzing && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <h3 className="text-lg font-semibold">Analyzing Reddit Discussions</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🔍 Scanning relevant subreddits...</p>
                  <p>📊 Processing sentiment analysis...</p>
                  <p>🎯 Identifying pain points and opportunities...</p>
                  <p>🤖 Generating improvement suggestions...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-sm text-gray-600">Get up-to-date insights from the latest Reddit discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Sentiment Analysis</h3>
              <p className="text-sm text-gray-600">Understand how users really feel about your idea and competitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">AI Suggestions</h3>
              <p className="text-sm text-gray-600">Get actionable recommendations to improve your idea</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
