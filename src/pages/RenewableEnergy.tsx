import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Leaf, DollarSign, Zap, TrendingDown, Loader2, Sun, Wind, Battery } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

const RenewableEnergy = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentEnergy, setCurrentEnergy] = useState(10000);
  const [renewableCapacity, setRenewableCapacity] = useState(3000);
  const [energyCost, setEnergyCost] = useState(0.12);
  const [calculated, setCalculated] = useState(false);

  const calculateSavings = () => {
    setIsCalculating(true);
    
    // Simulate calculation time
    setTimeout(() => {
      setCalculated(true);
      setIsCalculating(false);
    }, 1200);
  };

  const getResults = () => {
    const renewablePercentage = (renewableCapacity / currentEnergy) * 100;
    const annualRenewableKwh = renewableCapacity * 24 * 365;
    const annualCostSavings = annualRenewableKwh * energyCost;
    const co2Reduction = annualRenewableKwh * 0.5; // 0.5 kg CO2 per kWh

    return {
      renewablePercentage: renewablePercentage.toFixed(1),
      annualRenewableKwh: annualRenewableKwh.toFixed(0),
      annualCostSavings: annualCostSavings.toFixed(0),
      co2Reduction: (co2Reduction / 1000).toFixed(1), // Convert to tonnes
      monthlyRenewableKwh: (annualRenewableKwh / 12).toFixed(0),
      monthlySavings: (annualCostSavings / 12).toFixed(0),
    };
  };

  const results = calculated ? getResults() : null;

  const energyMixData = calculated ? [
    { name: 'Renewable', value: renewableCapacity, color: 'hsl(var(--success))' },
    { name: 'Grid', value: currentEnergy - renewableCapacity, color: 'hsl(var(--muted-foreground))' },
  ] : [];

  const monthlyData = [
    { month: 'Jan', renewable: 250, grid: 750, savings: 3000 },
    { month: 'Feb', renewable: 260, grid: 740, savings: 3120 },
    { month: 'Mar', renewable: 280, grid: 720, savings: 3360 },
    { month: 'Apr', renewable: 290, grid: 710, savings: 3480 },
    { month: 'May', renewable: 310, grid: 690, savings: 3720 },
    { month: 'Jun', renewable: 320, grid: 680, savings: 3840 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-success via-accent to-success bg-clip-text text-transparent">
          Renewable Energy Integration
        </h1>
        <p className="text-muted-foreground text-lg">
          Sustainable power solutions with real-time impact analysis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Energy Configuration
            </CardTitle>
            <CardDescription>
              Enter your current energy usage and renewable capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-energy">
                Current Energy Consumption (kW)
              </Label>
              <Input
                id="current-energy"
                type="number"
                value={currentEnergy}
                onChange={(e) => setCurrentEnergy(parseFloat(e.target.value))}
                placeholder="10000"
              />
              <p className="text-xs text-muted-foreground">
                Average power consumption of your operation
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewable-capacity">
                Renewable Energy Capacity (kW)
              </Label>
              <Input
                id="renewable-capacity"
                type="number"
                value={renewableCapacity}
                onChange={(e) => setRenewableCapacity(parseFloat(e.target.value))}
                placeholder="3000"
              />
              <p className="text-xs text-muted-foreground">
                Solar, wind, or other renewable capacity available
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="energy-cost">
                Energy Cost ($ per kWh)
              </Label>
              <Input
                id="energy-cost"
                type="number"
                step="0.01"
                value={energyCost}
                onChange={(e) => setEnergyCost(parseFloat(e.target.value))}
                placeholder="0.12"
              />
              <p className="text-xs text-muted-foreground">
                Current electricity rate per kilowatt-hour
              </p>
            </div>

            <Button
              onClick={calculateSavings}
              className="w-full h-12 text-base bg-gradient-to-r from-success to-accent hover:shadow-lg transition-all"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Calculating Impact...
                </>
              ) : (
                <>
                  <Leaf className="w-5 h-5 mr-2" />
                  Calculate Savings
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Savings Summary
            </CardTitle>
            <CardDescription>
              Estimated financial and environmental benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isCalculating ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8 mb-4">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-success" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-success/20 animate-ping" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="p-5 border-2 rounded-xl animate-pulse bg-gradient-to-br from-muted/50 to-background">
                      <Skeleton className="h-6 w-28 mb-3 rounded-lg" />
                      <Skeleton className="h-10 w-24 mb-2 rounded-lg" />
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-40 rounded-xl" />
              </div>
            ) : results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-xl hover:shadow-lg transition-all animate-scale-in">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-sm font-semibold">Renewable Mix</p>
                    </div>
                    <p className="text-3xl font-bold text-accent">{results.renewablePercentage}%</p>
                    <p className="text-xs text-muted-foreground mt-1">of total energy</p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-xl hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-success" />
                      </div>
                      <p className="text-sm font-semibold">CO₂ Reduction</p>
                    </div>
                    <p className="text-3xl font-bold text-success">{results.co2Reduction}</p>
                    <p className="text-xs text-muted-foreground mt-1">tonnes/year</p>
                  </div>
                </div>

                {/* Energy Mix Pie Chart */}
                <Card className="border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle className="text-base">Energy Mix Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={energyMixData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {energyMixData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="p-6 border-l-4 border-primary bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-base font-semibold">Annual Cost Savings</p>
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">
                    ${parseInt(results.annualCostSavings).toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-sm">
                    ${parseInt(results.monthlySavings).toLocaleString()} per month
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-4 h-4 text-success" />
                    <p className="text-sm font-medium">Annual Renewable Energy</p>
                  </div>
                  <p className="text-2xl font-bold mb-1">
                    {parseInt(results.annualRenewableKwh).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    kWh/year ({parseInt(results.monthlyRenewableKwh).toLocaleString()} kWh/month)
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <p className="text-sm font-medium">Environmental Impact</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Equivalent to taking{" "}
                      <span className="font-medium text-foreground">
                        {Math.round(parseFloat(results.co2Reduction) / 4.6)}
                      </span>{" "}
                      cars off the road
                    </li>
                    <li>
                      • Equivalent to planting{" "}
                      <span className="font-medium text-foreground">
                        {Math.round(parseFloat(results.co2Reduction) * 45)}
                      </span>{" "}
                      trees
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-success/10 to-accent/10 mb-4 animate-pulse-slow">
                    <Leaf className="w-12 h-12 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold">Calculate Your Impact</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Enter your energy configuration to see potential cost savings and environmental benefits
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-success" />
              Monthly Savings Projection
            </CardTitle>
            <CardDescription>
              6-month forecast of renewable energy usage and cost savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="renewable" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="grid" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Renewable Energy Sources</CardTitle>
            <CardDescription>
              Available renewable energy options for mining operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-5 border-2 rounded-xl hover:border-primary/50 transition-all bg-gradient-to-br from-background to-muted/20 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sun className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Solar PV</h4>
                    <p className="text-sm text-muted-foreground">
                      Photovoltaic systems ideal for high solar irradiance sites. Capacity: 1-5 MW per installation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 rounded-xl hover:border-primary/50 transition-all bg-gradient-to-br from-background to-muted/20 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wind className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Wind Power</h4>
                    <p className="text-sm text-muted-foreground">
                      Wind turbines for open pit mines with consistent patterns. Capacity: 2-3 MW per turbine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 rounded-xl hover:border-primary/50 transition-all bg-gradient-to-br from-background to-muted/20 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Battery className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Hybrid Systems</h4>
                    <p className="text-sm text-muted-foreground">
                      Combined solar-wind-battery systems with 24/7 renewable power and grid backup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RenewableEnergy;
