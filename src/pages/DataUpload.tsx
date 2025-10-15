import { dataUploadAPI } from "@/services/api";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, TrendingUp, Database } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DataUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [dataInfo, setDataInfo] = useState<{ columns: number; rows: number } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setUploadStatus("idle");
      setUploadProgress(0);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };



const handleUpload = async () => {
  if (!file) return;

  setUploadStatus("uploading");
  setUploadProgress(0);

  try {
    // Upload to Flask backend
    const response = await dataUploadAPI.uploadCSV(file);
    
    setUploadStatus("success");
    setDataInfo({
      columns: response.columns,
      rows: response.rows,
    });
    
    // If you want to analyze immediately:
    const analysis = await dataUploadAPI.analyzeData(response.filename);
    console.log('Analysis:', analysis);
    
    toast({
      title: "Upload successful",
      description: `Processed ${response.rows} rows with ${response.columns} columns`,
    });
  } catch (error: any) {
    setUploadStatus("error");
    toast({
      title: "Upload failed",
      description: error.message,
      variant: "destructive",
    });
  }
};

  const sampleDataStructure = [
    { column: "timestamp", type: "datetime", description: "Recording time" },
    { column: "ore_hardness", type: "float", description: "Ore hardness (MPa)" },
    { column: "feed_size", type: "float", description: "Feed size (mm)" },
    { column: "crusher_gap", type: "float", description: "Crusher gap setting (mm)" },
    { column: "mill_speed", type: "float", description: "Mill speed (% critical)" },
    { column: "energy_kwh", type: "float", description: "Energy consumption (kWh)" },
    { column: "throughput_tph", type: "float", description: "Throughput (tonnes/hour)" },
    { column: "downtime_hours", type: "float", description: "Equipment downtime (hours)" },
  ];

  // Sample data visualization after upload
  const sampleAnalysis = [
    { date: "Jan", energy: 920, throughput: 820 },
    { date: "Feb", energy: 885, throughput: 835 },
    { date: "Mar", energy: 850, throughput: 842 },
    { date: "Apr", energy: 820, throughput: 855 },
    { date: "May", energy: 795, throughput: 865 },
    { date: "Jun", energy: 780, throughput: 870 },
  ];

  const dataQuality = [
    { metric: "Completeness", score: 98 },
    { metric: "Consistency", score: 95 },
    { metric: "Accuracy", score: 97 },
    { metric: "Timeliness", score: 100 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Data Upload</h1>
        <p className="text-muted-foreground">
          Upload your comminution process data for AI analysis
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 animate-slide-up">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Upload CSV Data</CardTitle>
            <CardDescription>
              Select a CSV file containing your process data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
              {uploadStatus === "success" ? (
                <div className="space-y-4 animate-scale-in">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto animate-pulse-slow" />
                  <div>
                    <p className="font-medium">Upload Complete</p>
                    <p className="text-sm text-muted-foreground">
                      {file?.name}
                    </p>
                  </div>
                  {dataInfo && (
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">{dataInfo.columns}</span> columns detected
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">{dataInfo.rows}</span> rows processed
                      </p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setUploadStatus("idle");
                      setDataInfo(null);
                      setUploadProgress(0);
                    }}
                  >
                    Upload Another File
                  </Button>
                </div>
              ) : (
                <>
                  <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto animate-float" />
                  <div>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Select CSV File
                        </span>
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  {file && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {file && uploadStatus === "idle" && (
              <Button onClick={handleUpload} className="w-full">
                Process Data
              </Button>
            )}

            {uploadStatus === "uploading" && (
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground">Processing data...</p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Expected Data Format</CardTitle>
            <CardDescription>
              Your CSV should contain the following columns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleDataStructure.map((field, index) => (
                <div 
                  key={field.column} 
                  className="border-l-2 border-primary pl-3 py-1 hover:bg-muted/50 transition-colors rounded-r"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-mono text-sm font-medium">{field.column}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">{field.type}</span> - {field.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg flex gap-3 hover:bg-muted/80 transition-colors">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium">Data Requirements</p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Minimum 1 month of historical data</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Timestamps should be in ISO format</li>
                  <li>• No missing required columns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Analysis Preview - Only shown after successful upload */}
      {uploadStatus === "success" && (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <CardTitle>Performance Trends</CardTitle>
              </div>
              <CardDescription>Energy efficiency improvements over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sampleAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Energy (kWh)"
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

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <CardTitle>Data Quality Assessment</CardTitle>
              </div>
              <CardDescription>Automated validation results</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataQuality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} name="Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Sample Dataset</CardTitle>
          <CardDescription>
            Download a sample dataset to understand the format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Upload className="w-4 h-4 mr-2" />
            Download Sample CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;
