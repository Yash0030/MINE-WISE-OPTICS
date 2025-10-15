import { optimizationAPI } from "@/services/api";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, TrendingUp, Clock, Zap, Settings2, Settings, Loader2, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Optimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);



const handleRunOptimization = async () => {
  setIsOptimizing(true);
  setShowResults(false);
  
  try {
    // Call Flask AI optimization
    const result = await optimizationAPI.runOptimization();
    
    setShowResults(true);
    // Update recommendations state with result.recommendations
    
    toast({
      title: "Optimization Complete",
      description: `${result.recommendations.length} recommendations generated`,
    });
  } catch (error: any) {
    toast({
      title: "Optimization failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsOptimizing(false);
  }
};



  const recommendations = [
    {
      equipment: "Primary Crusher #1",
      priority: "high",
      parameter: "Gap Setting",
      current: "125mm",
      recommended: "110mm",
      impact: {
        energy: "-8.2%",
        throughput: "+3.5%",
        maintenance: "No change",
      },
      confidence: 94,
    },
    {
      equipment: "SAG Mill #2",
      priority: "high",
      parameter: "Operating Speed",
      current: "72% critical",
      recommended: "75% critical",
      impact: {
        energy: "+2.1%",
        throughput: "+12.3%",
        maintenance: "Monitor bearings",
      },
      confidence: 91,
    },
    {
      equipment: "Ball Mill #1",
      priority: "medium",
      parameter: "Feed Size Distribution",
      current: "P80: 12mm",
      recommended: "P80: 10mm",
      impact: {
        energy: "-5.8%",
        throughput: "+4.2%",
        maintenance: "No change",
      },
      confidence: 87,
    },
    {
      equipment: "Hydrocyclone Cluster",
      priority: "low",
      parameter: "Inlet Pressure",
      current: "180 kPa",
      recommended: "165 kPa",
      impact: {
        energy: "-3.2%",
        throughput: "+1.8%",
        maintenance: "Reduced wear",
      },
      confidence: 82,
    },
  ];

  const maintenancePredictions = [
    {
      equipment: "Ball Mill #1",
      component: "Main Bearing",
      daysUntil: 45,
      confidence: 89,
      severity: "medium",
    },
    {
      equipment: "Primary Crusher #1",
      component: "Liner Replacement",
      daysUntil: 23,
      confidence: 94,
      severity: "high",
    },
    {
      equipment: "SAG Mill #2",
      component: "Gearbox Inspection",
      daysUntil: 67,
      confidence: 76,
      severity: "low",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      default:
        return "text-success";
    }
  };

  const performanceData = [
    { metric: 'Throughput', current: 85, optimized: 95 },
    { metric: 'Energy Eff.', current: 72, optimized: 88 },
    { metric: 'Availability', current: 88, optimized: 94 },
    { metric: 'Product Quality', current: 90, optimized: 96 },
    { metric: 'Cost Efficiency', current: 78, optimized: 91 },
  ];

  const comparisonData = [
    { name: 'Jan', baseline: 450, optimized: 520 },
    { name: 'Feb', baseline: 470, optimized: 545 },
    { name: 'Mar', baseline: 465, optimized: 540 },
    { name: 'Apr', baseline: 480, optimized: 565 },
    { name: 'May', baseline: 475, optimized: 558 },
    { name: 'Jun', baseline: 490, optimized: 580 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          AI Optimization Engine
        </h1>
        <p className="text-muted-foreground text-lg">
          Machine learning-powered recommendations for peak performance
        </p>
      </div>

      <div className="grid gap-6">
        {/* Performance Comparison Charts */}
        <div className="grid lg:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Performance Metrics Comparison
              </CardTitle>
              <CardDescription>Current vs. AI-optimized performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar name="Current" dataKey="current" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" fillOpacity={0.6} />
                  <Radar name="Optimized" dataKey="optimized" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Throughput Forecast
              </CardTitle>
              <CardDescription>6-month baseline vs. optimized projection</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Line type="monotone" dataKey="optimized" stroke="hsl(var(--success))" strokeWidth={3} dot={{ fill: 'hsl(var(--success))', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Parameter Optimization Recommendations
              </CardTitle>
              <CardDescription>
                AI-generated recommendations based on historical data patterns
              </CardDescription>
            </div>
            <Button 
              onClick={handleRunOptimization} 
              disabled={isOptimizing}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Run Optimization
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {isOptimizing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8 mb-4">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
                  </div>
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border rounded-xl p-5 bg-gradient-to-br from-muted/50 to-background animate-pulse">
                    <div className="flex items-start justify-between mb-3">
                      <Skeleton className="h-6 w-40 rounded-lg" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-3 rounded" />
                    <Skeleton className="h-4 w-3/4 mb-3 rounded" />
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <Skeleton className="h-16 rounded-lg" />
                      <Skeleton className="h-16 rounded-lg" />
                      <Skeleton className="h-16 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !showResults ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6 animate-pulse-slow">
                  <Settings className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to Optimize</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click "Run Optimization" to analyze your process data and receive AI-powered recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <Card key={idx} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <CardContent className="pt-6 bg-gradient-to-br from-background via-background to-muted/20">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{rec.equipment}</h3>
                            <Badge variant={getPriorityColor(rec.priority)}>
                              {rec.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.parameter}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                          <p className="text-lg font-bold">{rec.confidence}%</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Current Setting</p>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="font-mono">{rec.current}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recommended Setting</p>
                          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                            <p className="font-mono font-semibold">{rec.recommended}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-success" />
                          <div>
                            <p className="text-xs text-muted-foreground">Energy</p>
                            <p className="font-semibold text-sm">{rec.impact.energy}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Throughput</p>
                            <p className="font-semibold text-sm">{rec.impact.throughput}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Settings2 className="w-4 h-4 text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">Maintenance</p>
                            <p className="font-semibold text-sm">{rec.impact.maintenance}</p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all">
                        <Target className="w-4 h-4 mr-2" />
                        Apply Recommendation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Predictive Maintenance Schedule
            </CardTitle>
            <CardDescription>
              AI-predicted maintenance requirements based on sensor data and wear patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenancePredictions.map((pred, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-5 border-2 rounded-xl hover:border-primary/50 hover:bg-gradient-to-r hover:from-muted/50 hover:to-background transition-all group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                      pred.severity === 'high' ? 'from-destructive/20 to-destructive/10' :
                      pred.severity === 'medium' ? 'from-warning/20 to-warning/10' :
                      'from-success/20 to-success/10'
                    } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Clock className={`w-6 h-6 ${getSeverityColor(pred.severity)}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{pred.equipment}</p>
                      <p className="text-sm text-muted-foreground">{pred.component}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={pred.severity === 'high' ? 'destructive' : pred.severity === 'medium' ? 'default' : 'secondary'}>
                        {pred.daysUntil} days
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {pred.confidence}% confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Optimization;
