import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, RotateCcw, Loader2, TrendingDown, TrendingUp } from "lucide-react";

const Simulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [oreHardness, setOreHardness] = useState([50]);
  const [feedSize, setFeedSize] = useState([15]);
  const [crusherGap, setCrusherGap] = useState([120]);
  const [millSpeed, setMillSpeed] = useState([72]);
  const [simulated, setSimulated] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate processing time
    setTimeout(() => {
      setSimulated(true);
      setIsSimulating(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setOreHardness([50]);
    setFeedSize([15]);
    setCrusherGap([120]);
    setMillSpeed([72]);
    setSimulated(false);
    setIsSimulating(false);
  };

  // Simplified calculation for demonstration
  const calculateResults = () => {
    const baseEnergy = 1000;
    const energyFactor =
      (oreHardness[0] / 50) * (feedSize[0] / 15) * (120 / crusherGap[0]) * (millSpeed[0] / 72);
    const energy = baseEnergy * energyFactor;

    const baseThroughput = 500;
    const throughputFactor = (crusherGap[0] / 120) * (millSpeed[0] / 72) * (15 / feedSize[0]);
    const throughput = baseThroughput * throughputFactor;

    const baselineEnergy = 1000;
    const baselineThroughput = 500;
    const energySaving = ((baselineEnergy - energy) / baselineEnergy) * 100;
    const throughputChange = ((throughput - baselineThroughput) / baselineThroughput) * 100;

    return {
      energy: energy.toFixed(0),
      throughput: throughput.toFixed(0),
      energySaving: energySaving.toFixed(1),
      throughputChange: throughputChange.toFixed(1),
    };
  };

  const results = simulated ? calculateResults() : null;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-warning to-destructive bg-clip-text text-transparent">
          Process Simulation Lab
        </h1>
        <p className="text-muted-foreground text-lg">
          Advanced what-if analysis with real-time circuit visualization
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Simulation Parameters
            </CardTitle>
            <CardDescription>
              Adjust parameters to simulate different operating conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-semibold">Ore Hardness (MPa)</Label>
                  <Badge variant="outline" className="text-base px-3">{oreHardness[0]} MPa</Badge>
                </div>
                <Slider
                  value={oreHardness}
                  onValueChange={setOreHardness}
                  min={20}
                  max={100}
                  step={5}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  📊 Typical range: 20-100 MPa
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-success/5 to-accent/5 border border-success/20">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-semibold">Feed Size (mm)</Label>
                  <Badge variant="outline" className="text-base px-3">{feedSize[0]} mm</Badge>
                </div>
                <Slider
                  value={feedSize}
                  onValueChange={setFeedSize}
                  min={5}
                  max={30}
                  step={1}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  📏 Typical range: 5-30 mm
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-warning/5 to-orange-500/5 border border-warning/20">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-semibold">Crusher Gap Setting (mm)</Label>
                  <Badge variant="outline" className="text-base px-3">{crusherGap[0]} mm</Badge>
                </div>
                <Slider
                  value={crusherGap}
                  onValueChange={setCrusherGap}
                  min={80}
                  max={150}
                  step={5}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  🔧 Typical range: 80-150 mm
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/5 to-rose-500/5 border border-destructive/20">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-semibold">Mill Speed (% Critical)</Label>
                  <Badge variant="outline" className="text-base px-3">{millSpeed[0]}%</Badge>
                </div>
                <Slider
                  value={millSpeed}
                  onValueChange={setMillSpeed}
                  min={60}
                  max={85}
                  step={1}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  ⚙️ Typical range: 60-85% of critical speed
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button onClick={runSimulation} className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all" disabled={isSimulating}>
                {isSimulating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button onClick={resetSimulation} variant="outline" className="h-12 px-6 border-2 hover:border-primary transition-all" disabled={isSimulating}>
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="text-xs px-2">Live</Badge>
              Simulation Results
            </CardTitle>
            <CardDescription>
              Predicted performance based on selected parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSimulating ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center py-8 mb-4">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="p-5 bg-gradient-to-br from-muted/50 to-background border-2 rounded-xl animate-pulse">
                      <Skeleton className="h-5 w-32 mb-3 rounded-lg" />
                      <Skeleton className="h-10 w-24 mb-2 rounded-lg" />
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
              </div>
            ) : results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-gradient-to-br from-warning/10 to-warning/5 border-2 border-warning/30 rounded-xl hover:shadow-lg transition-all animate-scale-in">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      ⚡ Energy Consumption
                    </p>
                    <p className="text-3xl font-bold text-warning">{results.energy}</p>
                    <p className="text-xs text-muted-foreground mt-1">kWh/hour</p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-xl hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      📈 Throughput
                    </p>
                    <p className="text-3xl font-bold text-success">{results.throughput}</p>
                    <p className="text-xs text-muted-foreground mt-1">tonnes/hour</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 border-l-4 border-success bg-gradient-to-r from-success/10 to-success/5 rounded-xl hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-base font-semibold flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-success" />
                        Energy Savings
                      </p>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        Baseline Comparison
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold text-success mb-2">
                      {parseFloat(results.energySaving) >= 0 ? "-" : "+"}
                      {Math.abs(parseFloat(results.energySaving))}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {parseFloat(results.energySaving) >= 0 
                        ? '✓ Reduced energy consumption vs. baseline operation'
                        : '⚠️ Increased energy consumption vs. baseline operation'}
                    </p>
                  </div>

                  <div className="p-5 border-l-4 border-primary bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-base font-semibold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Throughput Change
                      </p>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        Performance
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {parseFloat(results.throughputChange) >= 0 ? "+" : ""}
                      {results.throughputChange}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {parseFloat(results.throughputChange) >= 0 
                        ? '✓ Improved throughput vs. baseline operation'
                        : '⚠️ Reduced throughput vs. baseline operation'}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-muted/50 to-background border-2 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <p className="text-base font-semibold mb-3 flex items-center gap-2">
                    💡 AI Recommendations
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    {parseFloat(results.energySaving) > 5 && (
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Significant energy savings achievable with these settings</span>
                      </li>
                    )}
                    {parseFloat(results.throughputChange) > 5 && (
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Throughput increase of {results.throughputChange}% possible</span>
                      </li>
                    )}
                    {crusherGap[0] < 100 && (
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">⚠️</span>
                        <span>Monitor crusher liner wear at this gap setting</span>
                      </li>
                    )}
                    {millSpeed[0] > 78 && (
                      <li className="flex items-start gap-2">
                        <span className="text-warning mt-0.5">⚠️</span>
                        <span>High mill speed - ensure bearing temperature monitoring</span>
                      </li>
                    )}
                    {!parseFloat(results.energySaving) && !parseFloat(results.throughputChange) && (
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-0.5">ℹ️</span>
                        <span>Current settings are close to baseline operation</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 animate-pulse-slow">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Ready to Simulate</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Adjust parameters on the left and click "Run Simulation" to see predicted performance
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Process Circuit Diagram</CardTitle>
          <CardDescription>
            Interactive comminution circuit schematic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-muted/50 via-background to-muted/30 rounded-lg p-8 min-h-[400px] overflow-x-auto">
            {/* Circuit Flow */}
            <div className="flex items-center justify-between min-w-[800px] relative">
              {/* Feed */}
              <div className="flex flex-col items-center space-y-2 animate-fade-in">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent to-accent-glow shadow-lg flex items-center justify-center animate-pulse-slow">
                  <span className="text-2xl">📥</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">Feed</p>
                  <p className="text-[10px] text-muted-foreground">{feedSize[0]}mm</p>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-accent via-primary to-primary relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-primary"></div>
                </div>
              </div>

              {/* Primary Crusher */}
              <div className="flex flex-col items-center space-y-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  <span className="text-3xl relative z-10">🔨</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">Crusher</p>
                  <p className="text-[10px] text-muted-foreground">Gap: {crusherGap[0]}mm</p>
                </div>
                <Badge variant="outline" className="text-[10px] px-2 py-0">
                  Active
                </Badge>
              </div>

              {/* Arrow 2 */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-primary to-success relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-success"></div>
                </div>
              </div>

              {/* SAG Mill */}
              <div className="flex flex-col items-center space-y-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-success to-success-glow shadow-xl flex items-center justify-center relative overflow-hidden animate-glow">
                  <div className="absolute inset-0 bg-white/10 animate-spin-slow" />
                  <span className="text-3xl relative z-10">⚙️</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">SAG Mill</p>
                  <p className="text-[10px] text-muted-foreground">Speed: {millSpeed[0]}%</p>
                </div>
                <Badge variant="outline" className="text-[10px] px-2 py-0">
                  {millSpeed[0] > 75 ? 'High' : 'Normal'}
                </Badge>
              </div>

              {/* Arrow 3 */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-success to-warning relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-warning"></div>
                </div>
              </div>

              {/* Ball Mill */}
              <div className="flex flex-col items-center space-y-2 animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-warning to-orange-500 shadow-xl flex items-center justify-center relative overflow-hidden animate-glow" style={{ animationDelay: '1s' }}>
                  <div className="absolute inset-0 bg-white/10 animate-spin-slow" style={{ animationDuration: '12s' }} />
                  <span className="text-3xl relative z-10">⚫</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">Ball Mill</p>
                  <p className="text-[10px] text-muted-foreground">Grinding</p>
                </div>
                <Badge variant="outline" className="text-[10px] px-2 py-0">
                  Active
                </Badge>
              </div>

              {/* Arrow 4 */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-warning to-destructive relative animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-destructive"></div>
                </div>
              </div>

              {/* Cyclones */}
              <div className="flex flex-col items-center space-y-2 animate-scale-in" style={{ animationDelay: '0.8s' }}>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-destructive to-rose-600 shadow-lg flex items-center justify-center">
                  <span className="text-2xl">🌀</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">Cyclones</p>
                  <p className="text-[10px] text-muted-foreground">Classifier</p>
                </div>
              </div>
            </div>

            {/* Parameter Indicators */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-border/50">
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <p className="text-xs text-muted-foreground mb-1">Ore Hardness</p>
                <p className="text-lg font-bold text-primary">{oreHardness[0]} MPa</p>
              </div>
              <div className="p-3 rounded-lg bg-success/5 border border-success/20 animate-fade-in" style={{ animationDelay: '1s' }}>
                <p className="text-xs text-muted-foreground mb-1">Feed Rate</p>
                <p className="text-lg font-bold text-success">{results?.throughput || '500'} t/h</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 animate-fade-in" style={{ animationDelay: '1.1s' }}>
                <p className="text-xs text-muted-foreground mb-1">Energy</p>
                <p className="text-lg font-bold text-warning">{results?.energy || '1000'} kWh</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                <p className="text-lg font-bold text-accent">{simulated ? '92%' : '85%'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;
