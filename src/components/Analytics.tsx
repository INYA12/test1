'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Calendar, Filter } from 'lucide-react'

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

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-900">Detailed Analytics</h3>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-44 border-[#fafafc] rounded-full py-1 px-3 text-sm bg-white hover:bg-gray-50">
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
            <SelectTrigger className="w-44 border-[#fafafc] rounded-full py-1 px-3 text-sm bg-white hover:bg-gray-50">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trends */}
        <Card className="attio-card border-[#fafafc]">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span>Weekly Trends</span>
            </CardTitle>
            <CardDescription className="text-gray-500">
              Queries and coverage for the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-shadow">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#fafafc' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#fafafc' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #fafafc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="queries"
                    fill="url(#queriesGrad)"
                    name="Total Queries"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                  <Bar
                    dataKey="covered"
                    fill="url(#coveredGrad)"
                    name="Covered"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="attio-card border-[#fafafc]">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-semibold">Platform Distribution</CardTitle>
            <CardDescription className="text-gray-500">
              Share of queries on each AI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-shadow">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
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
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
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
          <CardTitle className="text-lg font-semibold">Top AI Queries</CardTitle>
          <CardDescription className="text-gray-500">
            Most popular queries related to your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-[#fafafc] rounded-lg hover:bg-gray-50 transition-colors">
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
                  <Button variant="outline" size="sm" className="border-[#fafafc] hover:bg-gray-50">
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 