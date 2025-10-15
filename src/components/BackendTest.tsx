// Create this file: frontend/src/components/BackendTest.tsx
// Add this component to any page to test backend connection

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2, Wifi } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BackendTest = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    setStatus('testing');
    setError('');
    setResult(null);

    try {
      console.log('Testing connection to:', `${API_URL}/health`);
      
      const response = await fetch(`${API_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(data);
      setStatus('success');
      console.log('✅ Backend connected successfully:', data);
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
      console.error('❌ Backend connection failed:', err);
    }
  };

  const testAllEndpoints = async () => {
    setStatus('testing');
    const endpoints = [
      { name: 'Health Check', url: `${API_URL}/health` },
      { name: 'Metrics', url: `${API_URL}/metrics` },
      { name: 'Energy Data', url: `${API_URL}/energy-consumption` },
    ];

    const results: any[] = [];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url);
        const data = await response.json();
        results.push({
          name: endpoint.name,
          status: 'success',
          data: data
        });
      } catch (err: any) {
        results.push({
          name: endpoint.name,
          status: 'error',
          error: err.message
        });
      }
    }

    setResult(results);
    setStatus('success');
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Backend Connection Test
        </CardTitle>
        <CardDescription>
          Test the connection between React frontend and Flask backend
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testConnection} disabled={status === 'testing'}>
            {status === 'testing' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Health Endpoint'
            )}
          </Button>
          <Button onClick={testAllEndpoints} variant="outline" disabled={status === 'testing'}>
            Test All Endpoints
          </Button>
        </div>

        {/* Status Badge */}
        {status !== 'idle' && (
          <div className="flex items-center gap-2">
            {status === 'success' && (
              <>
                <CheckCircle2 className="w-5 h-5 text-success" />
                <Badge className="bg-success/10 text-success border-success/20">
                  Connected
                </Badge>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-5 h-5 text-destructive" />
                <Badge variant="destructive">Connection Failed</Badge>
              </>
            )}
            {status === 'testing' && (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <Badge variant="outline">Testing...</Badge>
              </>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive mb-1">Error</p>
            <p className="text-xs text-muted-foreground">{error}</p>
            <div className="mt-3 text-xs space-y-1">
              <p className="font-medium">Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Is Flask backend running? (python app.py)</li>
                <li>Check backend URL: {API_URL}</li>
                <li>CORS enabled in Flask? (flask-cors installed)</li>
                <li>Check browser console for details (F12)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && status === 'success' && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm font-medium text-success mb-2">Response Data</p>
            <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* Configuration Info */}
        <div className="p-4 bg-muted rounded-lg text-xs space-y-2">
          <p className="font-medium">Current Configuration:</p>
          <div className="space-y-1 text-muted-foreground">
            <p>Frontend: {window.location.origin}</p>
            <p>Backend API: {API_URL}</p>
            <p>Environment: {import.meta.env.MODE}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackendTest;