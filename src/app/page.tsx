'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import Analytics from '@/components/Analytics'
import { 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Bot,
  Sparkles,
  BarChart3,
  CheckCircle
} from 'lucide-react'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<'overview' | 'analytics'>('overview')
  const [analyzingPage, setAnalyzingPage] = useState<string | null>(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [newPageUrl, setNewPageUrl] = useState('')
  const [showAddPage, setShowAddPage] = useState(false)
  const [generatingContent, setGeneratingContent] = useState<string | null>(null)
  const [generationStep, setGenerationStep] = useState(0)
  const [generatedResults, setGeneratedResults] = useState<{[key: string]: {
    type: 'improve' | 'generate',
    metaDescription: string,
    suggestions: string[],
    expectedImpact: string,
    aiScore: number
  }}>({})
  const [mainCardDisintegrating, setMainCardDisintegrating] = useState(false)
  const [showMainCard, setShowMainCard] = useState(true)

  const siteDomain = 'attio.com'

  type CoverageType = 'good' | 'medium' | 'poor' | 'analyzing'

  // Анализ конкретных страниц сайта
  const [pageAnalysis, setPageAnalysis] = useState([
    { page: '/home', title: 'Homepage', coverage: 'good' as CoverageType, percentage: 85, queries: 487 },
    { page: '/about', title: 'About page', coverage: 'poor' as CoverageType, percentage: 23, queries: 156 },
    { page: '/blog', title: 'Blog', coverage: 'medium' as CoverageType, percentage: 64, queries: 298 },
    { page: '/pricing', title: 'Pricing', coverage: 'good' as CoverageType, percentage: 78, queries: 234 }
  ])



  const onboardingSteps = [
    {
      step: 1,
      title: 'Connect site',
      description: 'Connect your domain and set up integration',
      status: 'completed'
    },
    {
      step: 2,
      title: 'Get analytics',
      description: 'Analyze visibility in AI search',
      status: 'current'
    },
    {
      step: 3,
      title: 'Apply recommendations',  
      description: 'Implement suggestions for improvement',
      status: 'pending'
    }
  ]

  const analysisSteps = [
    'Scanning page content...',
    'Analyzing AI query patterns...',
    'Checking competitor visibility...',
    'Calculating coverage score...',
    'Analysis complete!'
  ]

  const generationSteps = [
    'Analyzing current content...',
    'Researching AI query patterns...',
    'Generating optimized content...',
    'Validating improvements...',
    'Content ready!'
  ]

  const getCoverageColor = (coverage: CoverageType) => {
    switch (coverage) {
      case 'good': return 'bg-green-500'
      case 'medium': return 'bg-blue-500'
      case 'poor': return 'bg-red-500'
      case 'analyzing': return 'bg-blue-500'
      default: return 'bg-gray-400'
    }
  }

  const getCoverageBadge = (coverage: CoverageType) => {
    switch (coverage) {
      case 'good': return <Badge className="bg-green-50 text-green-700 border-green-200">Good</Badge>
      case 'medium': return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>
      case 'poor': return <Badge className="bg-red-50 text-red-700 border-red-200">Poor</Badge>
      case 'analyzing': return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Analyzing</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleAnalyzePage = async (page: string) => {
    // Запрещаем одновременную генерацию или анализ
    if (generatingContent || analyzingPage) {
      return
    }

    setAnalyzingPage(page)
    setAnalysisStep(0)

    // Имитация анализа с шагами
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i)
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    // Обновляем результат анализа
    setPageAnalysis(prev => prev.map(p => 
      p.page === page 
        ? { 
            ...p, 
            percentage: Math.floor(Math.random() * 40) + 60, // 60-100%
            coverage: (Math.random() > 0.3 ? 'good' : 'medium') as CoverageType,
            queries: Math.floor(Math.random() * 200) + 300
          }
        : p
    ))

    setAnalyzingPage(null)
    setAnalysisStep(0)
  }

  const handleAddNewPage = async () => {
    if (!newPageUrl.trim()) return

    const newPage = {
      page: newPageUrl.startsWith('/') ? newPageUrl : `/${newPageUrl}`,
      title: newPageUrl.charAt(0).toUpperCase() + newPageUrl.slice(1).replace('/', ''),
      coverage: 'analyzing' as CoverageType,
      percentage: 0,
      queries: 0
    }

    setPageAnalysis(prev => [...prev, newPage])
    setNewPageUrl('')
    setShowAddPage(false)

    // Запускаем анализ новой страницы
    await new Promise(resolve => setTimeout(resolve, 500))
    handleAnalyzePage(newPage.page)
  }

  const handleGenerateContent = async (page: string, type: 'improve' | 'generate') => {
    // Запрещаем одновременную генерацию
    if (generatingContent || analyzingPage) {
      return
    }

    setGeneratingContent(page)
    setGenerationStep(0)

    // Имитация генерации с шагами
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Генерируем результат
    const result = {
      type,
      metaDescription: `Attio is an AI-native CRM that helps businesses scale and grow. Modern platform for customer relationship management with artificial intelligence and automation.`,
      suggestions: [
        'Add "AI-native CRM" to page title',
        'Include "automation" in meta keywords',
        'Optimize for "modern CRM" queries'
      ],
      expectedImpact: '+23% query coverage',
      aiScore: 89
    }

    setGeneratedResults(prev => ({...prev, [page]: result}))
    setGeneratingContent(null)
    setGenerationStep(0)

    // Если это /about страница, запускаем анимацию исчезновения главной рекомендации
    if (page === '/about') {
      setTimeout(() => {
        setMainCardDisintegrating(true)
        setTimeout(() => {
          setShowMainCard(false)
        }, 2000) // Анимация длится 2 секунды
      }, 500) // Небольшая задержка после завершения генерации
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#fafafc] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Geo AI</h1>
                  <p className="text-xs text-gray-500">{siteDomain} connected</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('overview')}
                  className={
                    currentView === 'overview'
                      ? 'bg-gray-100 text-gray-900 font-medium border border-[#fafafc]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }
                >
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('analytics')}
                  className={
                    currentView === 'analytics'
                      ? 'bg-gray-100 text-gray-900 font-medium border border-[#fafafc]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
              <Button variant="outline" size="sm" className="border-[#fafafc] hover:border-gray-300">
                <Globe className="w-4 h-4 mr-2" />
                {siteDomain}
              </Button>
              <Button
                size="sm"
                className="bg-black hover:bg-gray-800 text-white btn-pill shadow hover:shadow-lg -translate-y-[1px] hover:-translate-y-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Improve with AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {currentView === 'analytics' ? (
          <Analytics />
        ) : (
          <>
        {/* Welcome Header */}
        <section className="py-24 bg-dot-grid mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-semibold text-gray-900 mb-6">
              Your site is successfully connected!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyzing the visibility of <strong>{siteDomain}</strong> in AI search. Get personalized recommendations for improvement.
            </p>
          </div>
        </section>

        {/* AI Platform Analysis - простая таблица как в Attio */}
        <section className="py-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">AI Platform Analysis</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">4 platforms</Badge>
            </div>
          </div>
          
          <Card className="attio-card">
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <div>Platform</div>
                <div>Queries Analyzed</div>
                <div>Coverage</div>
                <div>Visibility Score</div>
                <div>Status</div>
              </div>
              
              {/* Table Rows */}
              <div className="divide-y">
                <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">ChatGPT</span>
                  </div>
                  <div className="text-sm text-gray-600">1,247</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[68%] h-full bg-green-500"></div>
                    </div>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="text-sm text-gray-900">High</div>
                  <Badge className="w-fit bg-green-50 text-green-700 border-green-200">Good</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Perplexity</span>
                  </div>
                  <div className="text-sm text-gray-600">567</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[71%] h-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm font-medium">71%</span>
                  </div>
                  <div className="text-sm text-gray-900">High</div>
                  <Badge className="w-fit bg-green-50 text-green-700 border-green-200">Good</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Gemini</span>
                  </div>
                  <div className="text-sm text-gray-600">810</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[52%] h-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="text-sm text-gray-900">Medium</div>
                  <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200">Fair</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Claude</span>
                  </div>
                  <div className="text-sm text-gray-600">623</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[45%] h-full bg-red-500"></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="text-sm text-gray-900">Low</div>
                  <Badge className="w-fit bg-red-50 text-red-700 border-red-200">Needs work</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats - простая строка как в Attio */}
          <div className="mt-6 grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">2,847</div>
              <div className="text-sm text-gray-500">Total queries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">1,623</div>
              <div className="text-sm text-gray-500">Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-red-600">1,224</div>
              <div className="text-sm text-gray-500">Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">57%</div>
              <div className="text-sm text-gray-500">Average coverage</div>
            </div>
          </div>
        </section>

        {/* Page Analysis Breakdown - с анимацией анализа */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-display">Page Analysis</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAddPage(!showAddPage)}
              className="hover:bg-gray-50"
            >
              <span className="mr-2">+</span>
              Add Page
            </Button>
          </div>

          {/* Add New Page Input */}
          {showAddPage && (
            <Card className="attio-card mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter page URL (e.g., /features, /contact)"
                      value={newPageUrl}
                      onChange={(e) => setNewPageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddNewPage()}
                    />
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleAddNewPage}
                    disabled={!newPageUrl.trim()}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Analyze
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAddPage(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="attio-card">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y">
                {pageAnalysis.map((page,idx) => (
                  <div key={page.page} className="hover:bg-gray-50 transition-colors reveal" style={{animationDelay:`${idx*0.05+0.2}s`}}>
                    {/* Основная строка */}
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-2 h-2 rounded-full ${page.coverage === 'analyzing' ? 'bg-blue-500 animate-pulse' : getCoverageColor(page.coverage)}`} />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                              {page.page}
                            </code>
                            {page.coverage !== 'analyzing' && getCoverageBadge(page.coverage)}
                          </div>
                          <h3 className="font-medium text-gray-900">{page.title}</h3>
                          {page.coverage !== 'analyzing' && (
                            <p className="text-body">{page.queries} AI queries</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Анимация анализа справа */}
                        {analyzingPage === page.page ? (
                          <div className="w-80 p-4 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900">
                                  {analysisSteps[analysisStep]}
                                </p>
                                <div className="mt-2 w-full bg-blue-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{width: `${((analysisStep + 1) / analysisSteps.length) * 100}%`}}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-right">
                            {page.coverage !== 'analyzing' ? (
                              <>
                                <span className="text-xl font-semibold text-gray-900">{page.percentage}%</span>
                                <div className="progress-minimal w-16 mt-1">
                                  <div 
                                    className={`progress-bar h-full transition-all duration-300 ${
                                      page.coverage === 'good' ? 'bg-green-500' : 
                                      page.coverage === 'medium' ? 'bg-blue-500' : 'bg-red-500'
                                    }`}
                                    style={{width: `${page.percentage}%`}}
                                  ></div>
                                </div>
                              </>
                            ) : (
                              <div className="w-16 text-center">
                                <div className="text-sm text-gray-500">Analyzing...</div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {page.coverage === 'poor' && analyzingPage !== page.page && generatingContent !== page.page && (
                          <Button 
                            size="sm"
                            className="bg-black hover:bg-gray-800 text-white"
                            onClick={() => handleGenerateContent(page.page, 'improve')}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Improve
                          </Button>
                        )}
                        
                        {page.coverage !== 'analyzing' && analyzingPage !== page.page && generatingContent !== page.page && (
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleAnalyzePage(page.page)}
                            className="hover:bg-gray-50 border-gray-300"
                          >
                            Re-analyze
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Анимация генерации GPT */}
                    {generatingContent === page.page && (
                      <div className="px-6 pb-6">
                        <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4">
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                              {generationSteps[generationStep]}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gray-400 h-1.5 rounded-full transition-all duration-300"
                              style={{width: `${((generationStep + 1) / generationSteps.length) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Результаты генерации */}
                    {generatedResults[page.page] && (
                      <div className="px-6 pb-6">
                        <div className="p-4 bg-green-50 rounded-md border border-green-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <p className="text-sm font-medium text-green-800">Content Generated Successfully</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Optimized Meta Description</p>
                              <div className="bg-white p-3 rounded border text-sm text-gray-800">
                                {generatedResults[page.page].metaDescription}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">AI Suggestions</p>
                              <ul className="space-y-1">
                                {generatedResults[page.page].suggestions.map((suggestion, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-green-200">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <span className="text-sm font-medium text-green-800">AI Score: </span>
                                  <span className="text-lg font-bold text-green-600">{generatedResults[page.page].aiScore}/100</span>
                                </div>
                                <div>
                                  <span className="text-sm text-green-700">{generatedResults[page.page].expectedImpact}</span>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                                Copy to Clipboard
                              </Button>
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

        {/* Main Action Block */}
        {showMainCard && (
          <div className="mb-12">
            <Card className={`border-red-200 bg-red-50 attio-card ${mainCardDisintegrating ? 'disintegrate' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Main Recommendation</h3>
                      <Badge className="bg-red-500 text-white">
                        High Priority
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">
                      <strong>Page /about</strong> shows low coverage (23%). Use &quot;Improve&quot; button in Page Analysis below to generate optimized content.
                    </p>
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-medium">+23% query coverage</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border-l-4 border-red-300">
                      💡 <strong>Tip:</strong> Scroll down to Page Analysis and click &quot;Improve&quot; next to the /about page to generate AI-optimized content
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Getting Started timeline (moved to bottom) */}
        <section className="pt-16 pb-24 bg-gray-50/40">
           <div className="flex items-center justify-between mb-4 max-w-6xl mx-auto px-6">
             <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
             <Badge className="bg-[#94b9fe] text-white border-0">Step 2 of 3</Badge>
           </div>
           <div className="relative flex items-center justify-between max-w-6xl mx-auto px-6">
             {onboardingSteps.map((step, idx) => (
               <div key={step.step} className="flex-1 flex flex-col items-center text-center">
                 {idx !== 0 && (
                   <div className="absolute top-4 -left-1 w-full h-px border-dashed border-gray-300" style={{zIndex:-1}}></div>
                 )}
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step.status==='completed'?'bg-emerald-500 text-white':step.status==='current'?'bg-[#94b9fe] text-white':'bg-gray-300 text-white'}`}>{step.step}</div>
                 <p className="text-sm font-medium text-gray-900 mb-1">{step.title}</p>
                 <p className="text-xs text-gray-500 mb-1 text-center max-w-xs">{step.description}</p>
                 <Badge variant="outline" className={step.status==='completed'?'border-emerald-200 text-emerald-700':step.status==='current'?'border-[#94b9fe] text-[#94b9fe]':'border-gray-300 text-gray-500'}>
                   {step.status==='completed'?'Completed':step.status==='current'?'In Progress':'Pending'}
                 </Badge>
               </div>
             ))}
           </div>
        </section>

        {/* Connection banner removed per request */}

          </>
        )}
      </main>
    </div>
  )
}
