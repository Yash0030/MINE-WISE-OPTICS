// Replace your frontend/src/pages/Dashboard.tsx with this updated version

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Wind,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [energyData, setEnergyData] = useState<any[]>([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch metrics
        const metricsResponse = await fetch(`${API_URL}/metrics`);
        if (!metricsResponse.ok) throw new Error('Failed to fetch metrics');
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData);

        // Fetch energy consumption data
        const energyResponse = await fetch(`${API_URL}/energy-consumption`);
        if (!energyResponse.ok) throw new Error('Failed to fetch energy data');
        const energyChartData = await energyResponse.json();
        setEnergyData(energyChartData);

        console.log('✅ Dashboard data loaded from backend');
      } catch (error: any) {
        console.error('❌ Error fetching dashboard data:', error);
        toast({
          title: "Error loading data",
          description: "Using mock data. Check if backend is running.",
          variant: "destructive",
        });
        
        // Fallback to mock data if backend fails
        loadMockData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fallback mock data
  const loadMockData = () => {
    setMetrics({
      energy_efficiency: { value: 92.4, change: 5.2, trend: 'up' },
      throughput: { value: 847, unit: 't/h', change: 12.1, trend: 'up' },
      downtime_reduction: { value: 18.3, change: -8.5, trend: 'up' },
      co2_emissions: { value: 342, unit: 'kg/t', change: -15.2, trend: 'up' }
    });

    setEnergyData([
      { time: "00:00", consumption: 920, optimal: 880 },
      { time: "04:00", consumption: 850, optimal: 820 },
      { time: "08:00", consumption: 1050, optimal: 980 },
      { time: "12:00", consumption: 1180, optimal: 1100 },
      { time: "16:00", consumption: 1240, optimal: 1150 },
      { time: "20:00", consumption: 980, optimal: 920 },
      { time: "24:00", consumption: 880, optimal: 850 },
    ]);
  };

  // Convert backend data to display format
  const displayMetrics = metrics ? [
    {
      title: "Energy Efficiency",
      value: `${metrics.energy_efficiency.value}%`,
      change: `${metrics.energy_efficiency.change > 0 ? '+' : ''}${metrics.energy_efficiency.change}%`,
      trend: metrics.energy_efficiency.trend,
      icon: Zap,
      description: "Optimized power consumption",
      progress: metrics.energy_efficiency.value,
      color: "success",
    },
    {
      title: "Throughput",
      value: `${metrics.throughput.value} ${metrics.throughput.unit}`,
      change: `${metrics.throughput.change > 0 ? '+' : ''}${metrics.throughput.change}%`,
      trend: metrics.throughput.trend,
      icon: Activity,
      description: "Current processing rate",
      progress: 84.7,
      color: "primary",
    },
    {
      title: "Downtime Reduction",
      value: `${metrics.downtime_reduction.value}%`,
      change: `${metrics.downtime_reduction.change}%`,
      trend: metrics.downtime_reduction.trend,
      icon: TrendingDown,
      description: "Improved uptime",
      progress: 81.7,
      color: "accent",
    },
    {
      title: "CO₂ Emissions",
      value: `${metrics.co2_emissions.value} ${metrics.co2_emissions.unit}`,
      change: `${metrics.co2_emissions.change}%`,
      trend: metrics.co2_emissions.trend,
      icon: Wind,
      description: "Reduced carbon footprint",
      progress: 68,
      color: "success",
    },
  ] : [];

  // Throughput by circuit data (using mock data for now)
  const throughputData = [
    { circuit: "Primary", current: 320, target: 350 },
    { circuit: "SAG Mill", current: 285, target: 300 },
    { circuit: "Ball Mill", current: 242, target: 250 },
    { circuit: "Cyclones", current: 238, target: 240 },
  ];

  // Equipment efficiency distribution
  const equipmentData = [
    { name: "Primary Crusher", value: 94, color: "hsl(var(--chart-1))" },
    { name: "SAG Mill", value: 89, color: "hsl(var(--chart-2))" },
    { name: "Ball Mill", value: 91, color: "hsl(var(--chart-3))" },
    { name: "Cyclones", value: 96, color: "hsl(var(--chart-4))" },
  ];

  // Performance trends over the week
  const weeklyData = [
    { day: "Mon", efficiency: 88, throughput: 820, downtime: 45 },
    { day: "Tue", efficiency: 90, throughput: 835, downtime: 38 },
    { day: "Wed", efficiency: 89, throughput: 828, downtime: 42 },
    { day: "Thu", efficiency: 91, throughput: 842, downtime: 35 },
    { day: "Fri", efficiency: 92, throughput: 847, downtime: 28 },
    { day: "Sat", efficiency: 93, throughput: 855, downtime: 22 },
    { day: "Sun", efficiency: 92, throughput: 847, downtime: 25 },
  ];

  const recentOptimizations = [
    {
      equipment: "SAG Mill #2",
      parameter: "Operating Speed",
      oldValue: "72% critical",
      newValue: "75% critical",
      impact: "+12.3% throughput",
      timestamp: "2 hours ago",
    },
    {
      equipment: "Primary Crusher #1",
      parameter: "Gap Setting",
      oldValue: "125mm",
      newValue: "110mm",
      impact: "-8.2% energy",
      timestamp: "5 hours ago",
    },
    {
      equipment: "Ball Mill #1",
      parameter: "Feed Distribution",
      oldValue: "P80: 12mm",
      newValue: "P80: 10mm",
      impact: "+4.2% throughput",
      timestamp: "8 hours ago",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      success: "text-success",
      primary: "text-primary",
      accent: "text-accent",
      warning: "text-warning",
    };
    return colorMap[color] || "text-primary";
  };

  const getBgColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      success: "bg-success/10 border-success/20",
      primary: "bg-primary/10 border-primary/20",
      accent: "bg-accent/10 border-accent/20",
      warning: "bg-warning/10 border-warning/20",
    };
    return colorMap[color] || "bg-primary/10 border-primary/20";
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time comminution process monitoring and AI insights
            </p>
          </div>
          {!isLoading && (
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live Data
            </Badge>
          )}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        {displayMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;
          
          return isLoading ? (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-2 w-full" />
              </CardContent>
            </Card>
          ) : (
            <Card 
              key={index} 
              className={`overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getBgColorClass(metric.color)}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{metric.title}</CardDescription>
                  <Icon className={`w-4 h-4 ${getColorClass(metric.color)}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <CardTitle className="text-2xl">{metric.value}</CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={`gap-1 ${getColorClass(metric.color)}`}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">{metric.description}</p>
                <Progress value={metric.progress} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
        {/* Energy Consumption Trend */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Energy Consumption Trend</CardTitle>
            <CardDescription>24-hour consumption vs optimal targets</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={energyData}>
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOptimal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorConsumption)" 
                    name="Current"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="optimal" 
                    stroke="hsl(var(--success))" 
                    fillOpacity={1} 
                    fill="url(#colorOptimal)" 
                    name="Optimal"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Throughput by Circuit */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Throughput by Circuit</CardTitle>
            <CardDescription>Current vs target processing rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="circuit" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="current" fill="hsl(var(--chart-1))" name="Current (t/h)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-3))" name="Target (t/h)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Equipment Efficiency */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Equipment Efficiency Distribution</CardTitle>
            <CardDescription>Overall equipment effectiveness (OEE)</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={equipmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {equipmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Performance Trends */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Weekly Performance Trends</CardTitle>
            <CardDescription>Efficiency and throughput over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Efficiency (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Throughput (t/h)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Optimizations */}
      <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Recent AI Optimizations</CardTitle>
          <CardDescription>
            Latest parameter adjustments recommended by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOptimizations.map((opt, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-1 mb-2 md:mb-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{opt.equipment}</p>
                    <Badge variant="outline" className="text-xs">{opt.timestamp}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opt.parameter}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{opt.oldValue}</span>
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="font-medium">{opt.newValue}</span>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20 w-fit">
                  {opt.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Real-time circuit operational status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Primary Circuit", status: 98, color: "success" },
              { name: "Secondary Circuit", status: 94, color: "success" },
              { name: "Grinding Circuit", status: 91, color: "primary" },
            ].map((circuit, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{circuit.name}</span>
                  <span className="text-sm text-muted-foreground">{circuit.status}%</span>
                </div>
                <Progress value={circuit.status} className="h-2" />
              </div>
            ))}
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent">
                ⚡ All systems operational - Scheduled maintenance in 14 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;