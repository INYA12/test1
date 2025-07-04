'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  X, 
  Copy, 
  Download, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Code,
  FileText
} from 'lucide-react'

interface AIRecommendationModalProps {
  isOpen: boolean
  onClose: () => void
  recommendation: {
    title: string
    description: string
    priority: string
    impact: string
    action: string
  }
}

const generatedContent = {
  metaDescription: `Attio is an AI-native CRM system that helps scale and grow your business. Modern platform for customer relationship management with artificial intelligence, automation and advanced analytics.`,
  
  structuredData: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Attio CRM",
  "description": "AI-native CRM platform for modern businesses",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "847"
  }
}`,

  faqSection: `## Frequently Asked Questions

### What is Attio?
Attio is a modern CRM system with built-in artificial intelligence that helps businesses manage customer relationships, automate processes and get deep analytics.

### How does AI help in CRM work?
Our AI analyzes customer data, predicts behavior, automates routine tasks and provides personalized recommendations for sales improvement.

### Is Attio suitable for small businesses?
Yes, Attio scales from startups to large enterprises. We offer flexible pricing and customization options for any business needs.

### What integrations does Attio support?
Attio integrates with popular tools: Gmail, Slack, Zapier, Segment, and many others. Full list is available in our documentation.`
}

export default function AIRecommendationModal({ isOpen, onClose, recommendation }: AIRecommendationModalProps) {
  const [generatingContent, setGeneratingContent] = useState(false)
  const [generatedStep, setGeneratedStep] = useState(0)
  const [copiedContent, setCopiedContent] = useState<string | null>(null)

  if (!isOpen) return null

  const handleGenerateContent = async () => {
    setGeneratingContent(true)
    setGeneratedStep(1)
    
    // Симуляция генерации контента
    setTimeout(() => setGeneratedStep(2), 1000)
    setTimeout(() => setGeneratedStep(3), 2000)
    setTimeout(() => {
      setGeneratedStep(4)
      setGeneratingContent(false)
    }, 3000)
  }

  const handleCopyContent = (content: string, type: string) => {
    navigator.clipboard.writeText(content)
    setCopiedContent(type)
    setTimeout(() => setCopiedContent(null), 2000)
  }

  const renderGenerationProgress = () => {
    const steps = [
      { id: 1, title: 'Page Analysis', description: 'Studying structure and content' },
      { id: 2, title: 'AI Optimization', description: 'Generating improvements' },
      { id: 3, title: 'SEO Check', description: 'Checking standards compliance' },
      { id: 4, title: 'Ready!', description: 'Content ready for use' }
    ]

    return (
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generatedStep >= step.id ? 'bg-green-500' : generatedStep === step.id - 1 ? 'bg-blue-500' : 'bg-gray-300'
            }`}>
              {generatedStep > step.id ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white font-medium">{step.id}</span>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{step.title}</p>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
        <Progress value={(generatedStep / 4) * 100} className="h-2" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto sm:mx-4 mx-0 sm:rounded-lg rounded-none sm:max-h-[90vh] max-h-screen">
        <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{recommendation.title}</h2>
                <p className="text-xs sm:text-sm text-gray-500">{recommendation.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Badge variant={recommendation.priority === 'high' ? 'destructive' : 'secondary'}>
                {recommendation.priority === 'high' ? 'High Priority' : 'Medium Priority'}
              </Badge>
              <span className="text-sm font-medium text-green-600">{recommendation.impact}</span>
            </div>
            {!generatingContent && generatedStep === 0 && (
              <Button onClick={handleGenerateContent} className="flex items-center space-x-2 w-full sm:w-auto">
                <Sparkles className="w-4 h-4" />
                <span>Generate Content with AI</span>
              </Button>
            )}
          </div>

          {/* Generation Progress */}
          {generatingContent && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>AI is generating content...</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderGenerationProgress()}
              </CardContent>
            </Card>
          )}

          {/* Generated Content */}
          {generatedStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <strong>Content successfully generated!</strong> You can copy and apply these improvements to your website.
                </AlertDescription>
              </Alert>

              {/* Meta Description */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Optimized Meta Description</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Improved description for better visibility in AI search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <code className="text-sm text-gray-800 break-words">{generatedContent.metaDescription}</code>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
                    <span className="text-sm text-gray-500">Length: {generatedContent.metaDescription.length} characters</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyContent(generatedContent.metaDescription, 'meta')}
                      className="w-full sm:w-auto"
                    >
                      {copiedContent === 'meta' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedContent === 'meta' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Structured Data */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Code className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Structured Data (JSON-LD)</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Schema.org markup for better understanding by AI systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words">{generatedContent.structuredData}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
                    <span className="text-sm text-gray-500">Format: JSON-LD Schema.org</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyContent(generatedContent.structuredData, 'schema')}
                      className="w-full sm:w-auto"
                    >
                      {copiedContent === 'schema' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedContent === 'schema' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>AI-optimized FAQ Section</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Structured answers to popular questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg max-h-60 overflow-y-auto">
                    <pre className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words">{generatedContent.faqSection}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
                    <span className="text-sm text-gray-500">Ready for placement on website</span>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyContent(generatedContent.faqSection, 'faq')}
                        className="w-full sm:w-auto"
                      >
                        {copiedContent === 'faq' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copiedContent === 'faq' ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Copy meta description to head section of your website</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Add JSON-LD markup to main page</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Create FAQ section with generated content</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <span>Mark as Completed</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 