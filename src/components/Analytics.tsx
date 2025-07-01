'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { 
  TrendingUp, 
  Calendar, 
  Filter, 
  Brain, 
  Target, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown,
  Copy,
  ExternalLink
} from 'lucide-react'

const weeklyData = [
  { week: 'Week 1', queries: 245, covered: 143, conversion: 58 },
  { week: 'Week 2', queries: 298, covered: 187, conversion: 63 },
  { week: 'Week 3', queries: 412, covered: 267, conversion: 65 },
  { week: 'Week 4', queries: 384, covered: 251, conversion: 65 }
]

const platformData = [
  { name: 'ChatGPT', value: 987, color: '#94b9fe' },
  { name: 'Perplexity', value: 654, color: '#7ca8fc' },
  { name: 'Claude', value: 432, color: '#6497fa' },
  { name: 'Gemini', value: 774, color: '#4c86f8' }
]

const topQueries = [
  { query: 'AI marketing automation tools', volume: 1234, rank: 1, change: '+12%' },
  { query: 'customer relationship management AI', volume: 987, rank: 3, change: '+8%' },
  { query: 'CRM software with AI features', volume: 865, rank: 2, change: '+15%' },
  { query: 'automated customer data analysis', volume: 743, rank: 4, change: '+5%' },
  { query: 'AI powered sales insights', volume: 654, rank: 5, change: '-2%' }
]

const analysisSteps = [
  'Searching for similar queries...',
  'Analyzing competitor content...',
  'Evaluating content gaps...',
  'Scoring relevance factors...',
  'Generating recommendations...',
  'Analysis complete!'
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [analyzingQuery, setAnalyzingQuery] = useState<string | null>(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<{[key: string]: {
    currentRanking: number;
    visibility: number;
    competitors: Array<{name: string; rank: number; coverage: number}>;
    opportunities: string[];
    platforms: {[key: string]: {rank: number; mentions: number}};
    searchVolume: {monthly: number; trend: string; trendPercentage: number};
  }}>({})

  const handleAnalyzeQuery = async (query: string) => {
    if (analyzingQuery) return // Предотвращаем одновременные анализы
    
    setAnalyzingQuery(query)
    setAnalysisStep(0)
    
    // Имитация процесса анализа
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i)
      await new Promise(resolve => setTimeout(resolve, 1200))
    }
    
    // Генерируем результаты анализа
    const mockResults = {
      currentRanking: Math.floor(Math.random() * 5) + 1,
      visibility: Math.floor(Math.random() * 30) + 40, // 40-70%
      competitors: [
        { name: 'HubSpot', rank: 1, coverage: 89 },
        { name: 'Salesforce', rank: 2, coverage: 76 },
        { name: 'Pipedrive', rank: 3, coverage: 68 }
      ],
      opportunities: [
        'Add AI automation to meta description',
        'Include case studies in content',
        'Optimize for long-tail keywords'
      ],
      platforms: {
        'ChatGPT': { rank: Math.floor(Math.random() * 3) + 1, mentions: Math.floor(Math.random() * 50) + 20 },
        'Perplexity': { rank: Math.floor(Math.random() * 3) + 2, mentions: Math.floor(Math.random() * 30) + 15 },
        'Claude': { rank: Math.floor(Math.random() * 4) + 1, mentions: Math.floor(Math.random() * 25) + 10 },
        'Gemini': { rank: Math.floor(Math.random() * 3) + 2, mentions: Math.floor(Math.random() * 35) + 18 }
      },
      searchVolume: {
        monthly: Math.floor(Math.random() * 2000) + 1000,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        trendPercentage: Math.floor(Math.random() * 20) + 5
      }
    }
    
    setAnalysisResults(prev => ({...prev, [query]: mockResults}))
    setAnalyzingQuery(null)
    setAnalysisStep(0)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Detailed Analytics</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-44 border-[#fafafc] rounded-full py-1 px-3 text-sm bg-white hover:bg-gray-50">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-full sm:w-44 border-[#fafafc] rounded-full py-1 px-3 text-sm bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="perplexity">Perplexity</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Weekly Trends */}
        <Card className="attio-card border-[#fafafc]">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg font-semibold">
              <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              <span>Weekly Trends</span>
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Queries and coverage for the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-shadow">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="queriesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a7c4ff" />
                      <stop offset="100%" stopColor="#94b9fe" />
                    </linearGradient>
                    <linearGradient id="coveredGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b5c9ff" />
                      <stop offset="100%" stopColor="#7ca8fc" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fafafc" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={{ stroke: '#fafafc' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={{ stroke: '#fafafc' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #fafafc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar
                    dataKey="queries"
                    fill="url(#queriesGrad)"
                    name="Total Queries"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="covered"
                    fill="url(#coveredGrad)"
                    name="Covered"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="attio-card border-[#fafafc]">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Platform Distribution</CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Share of queries on each AI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-shadow">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #fafafc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Queries Table */}
      <Card className="attio-card border-[#fafafc]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold">Top AI Queries</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Most popular queries related to your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topQueries.map((query, index) => (
              <div key={index} className="border border-[#fafafc] rounded-lg hover:bg-gray-50 transition-colors">
                {/* Desktop Query Row */}
                <div className="hidden sm:flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center border-[#fafafc] text-gray-600">
                        {query.rank}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{query.query}</p>
                      <p className="text-xs text-gray-500">{query.volume.toLocaleString()} queries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={query.change.startsWith('+') ? 'default' : 'destructive'}
                      className={query.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50' : 'bg-red-50 text-red-700 border-red-200'}
                    >
                      {query.change}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#fafafc] hover:bg-gray-50"
                      onClick={() => handleAnalyzeQuery(query.query)}
                      disabled={!!analyzingQuery}
                    >
                      {analyzingQuery === query.query ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing</span>
                        </div>
                      ) : (
                        'Analyze'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mobile Query Card */}
                <div className="sm:hidden p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center border-[#fafafc] text-gray-600 flex-shrink-0">
                      {query.rank}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm leading-5">{query.query}</p>
                      <p className="text-xs text-gray-500 mt-1">{query.volume.toLocaleString()} queries</p>
                    </div>
                    <Badge 
                      variant={query.change.startsWith('+') ? 'default' : 'destructive'}
                      className={`text-xs ${query.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                    >
                      {query.change}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#fafafc] hover:bg-gray-50 w-full"
                    onClick={() => handleAnalyzeQuery(query.query)}
                    disabled={!!analyzingQuery}
                  >
                    {analyzingQuery === query.query ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing</span>
                      </div>
                    ) : (
                      'Analyze'
                    )}
                  </Button>
                </div>

                {/* Analysis Progress */}
                {analyzingQuery === query.query && (
                  <div className="px-4 pb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Brain className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-900">AI Analysis in Progress</p>
                          <p className="text-xs text-blue-700 mt-1">{analysisSteps[analysisStep]}</p>
                        </div>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{width: `${((analysisStep + 1) / analysisSteps.length) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analysis Results */}
                {analysisResults[query.query] && (
                  <div className="px-4 pb-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                          <h4 className="font-medium text-green-900">Analysis Complete</h4>
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <Copy className="w-3 h-3 mr-2" />
                          Export
                        </Button>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-center p-2 sm:p-3 bg-white rounded border">
                          <div className="text-sm sm:text-lg font-semibold text-gray-900">#{analysisResults[query.query].currentRanking}</div>
                          <div className="text-xs text-gray-500">Current Rank</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white rounded border">
                          <div className="text-sm sm:text-lg font-semibold text-gray-900">{analysisResults[query.query].visibility}%</div>
                          <div className="text-xs text-gray-500">Visibility</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white rounded border">
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm sm:text-lg font-semibold text-gray-900">{analysisResults[query.query].searchVolume.monthly}</span>
                            {analysisResults[query.query].searchVolume.trend === 'up' ? (
                              <ArrowUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">Monthly Volume</div>
                        </div>
                      </div>

                      {/* Platform Breakdown */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Platform Performance</h5>
                        <div className="space-y-1 sm:space-y-2">
                          {Object.entries(analysisResults[query.query].platforms).map(([platform, data]) => (
                            <div key={platform} className="flex items-center justify-between bg-white p-2 rounded border text-xs">
                              <span className="font-medium">{platform}</span>
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <span>Rank #{data.rank}</span>
                                <span className="text-gray-500">{data.mentions} mentions</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Competitors */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Top Competitors</h5>
                        <div className="space-y-1">
                          {analysisResults[query.query].competitors.map((comp, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border text-xs">
                              <span className="font-medium">{comp.name}</span>
                              <div className="flex items-center space-x-2">
                                <span>#{comp.rank}</span>
                                <span className="text-gray-500">{comp.coverage}% coverage</span>
                                <ExternalLink className="w-3 h-3 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Opportunities */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Key Opportunities</h5>
                        <div className="space-y-1">
                          {analysisResults[query.query].opportunities.map((opp, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                              <Target className="w-3 h-3 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span>{opp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 