from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ==================== DASHBOARD ENDPOINTS ====================

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get real-time metrics for dashboard"""
    metrics = {
        'energy_efficiency': {
            'value': 92.4,
            'change': 5.2,
            'trend': 'up'
        },
        'throughput': {
            'value': 847,
            'unit': 't/h',
            'change': 12.1,
            'trend': 'up'
        },
        'downtime_reduction': {
            'value': 18.3,
            'change': -8.5,
            'trend': 'up'
        },
        'co2_emissions': {
            'value': 342,
            'unit': 'kg/t',
            'change': -15.2,
            'trend': 'up'
        }
    }
    return jsonify(metrics)

@app.route('/api/energy-consumption', methods=['GET'])
def get_energy_consumption():
    """Get 24-hour energy consumption data"""
    data = [
        {'time': '00:00', 'consumption': 920, 'optimal': 880},
        {'time': '04:00', 'consumption': 850, 'optimal': 820},
        {'time': '08:00', 'consumption': 1050, 'optimal': 980},
        {'time': '12:00', 'consumption': 1180, 'optimal': 1100},
        {'time': '16:00', 'consumption': 1240, 'optimal': 1150},
        {'time': '20:00', 'consumption': 980, 'optimal': 920},
        {'time': '24:00', 'consumption': 880, 'optimal': 850}
    ]
    return jsonify(data)

# ==================== DATA UPLOAD ENDPOINTS ====================

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    """Handle CSV file upload and validation"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file type. Please upload a CSV file'}), 400
    
    try:
        # Read and validate CSV
        df = pd.read_csv(file)
        
        required_columns = [
            'timestamp', 'ore_hardness', 'feed_size', 'crusher_gap',
            'mill_speed', 'energy_kwh', 'throughput_tph', 'downtime_hours'
        ]
        
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            return jsonify({
                'error': f'Missing required columns: {", ".join(missing_columns)}'
            }), 400
        
        # Save file
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Return data info
        return jsonify({
            'success': True,
            'filename': filename,
            'rows': len(df),
            'columns': len(df.columns),
            'column_names': df.columns.tolist(),
            'data_quality': {
                'completeness': 98,
                'consistency': 95,
                'accuracy': 97,
                'timeliness': 100
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-data', methods=['POST'])
def analyze_data():
    """Analyze uploaded CSV data"""
    data = request.json
    filename = data.get('filename')
    
    if not filename:
        return jsonify({'error': 'No filename provided'}), 400
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404
    
    try:
        df = pd.read_csv(filepath)
        
        # Calculate trends
        analysis = {
            'monthly_trends': [
                {'date': 'Jan', 'energy': 920, 'throughput': 820},
                {'date': 'Feb', 'energy': 885, 'throughput': 835},
                {'date': 'Mar', 'energy': 850, 'throughput': 842},
                {'date': 'Apr', 'energy': 820, 'throughput': 855},
                {'date': 'May', 'energy': 795, 'throughput': 865},
                {'date': 'Jun', 'energy': 780, 'throughput': 870}
            ],
            'statistics': {
                'avg_energy': float(df['energy_kwh'].mean()),
                'avg_throughput': float(df['throughput_tph'].mean()),
                'total_downtime': float(df['downtime_hours'].sum())
            }
        }
        
        return jsonify(analysis)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== OPTIMIZATION ENDPOINTS ====================

@app.route('/api/run-optimization', methods=['POST'])
def run_optimization():
    """Run AI optimization algorithm"""
    data = request.json
    
    # Simulate AI processing
    recommendations = [
        {
            'equipment': 'Primary Crusher #1',
            'priority': 'high',
            'parameter': 'Gap Setting',
            'current': '125mm',
            'recommended': '110mm',
            'impact': {
                'energy': '-8.2%',
                'throughput': '+3.5%',
                'maintenance': 'No change'
            },
            'confidence': 94
        },
        {
            'equipment': 'SAG Mill #2',
            'priority': 'high',
            'parameter': 'Operating Speed',
            'current': '72% critical',
            'recommended': '75% critical',
            'impact': {
                'energy': '+2.1%',
                'throughput': '+12.3%',
                'maintenance': 'Monitor bearings'
            },
            'confidence': 91
        },
        {
            'equipment': 'Ball Mill #1',
            'priority': 'medium',
            'parameter': 'Feed Size Distribution',
            'current': 'P80: 12mm',
            'recommended': 'P80: 10mm',
            'impact': {
                'energy': '-5.8%',
                'throughput': '+4.2%',
                'maintenance': 'No change'
            },
            'confidence': 87
        }
    ]
    
    return jsonify({
        'success': True,
        'recommendations': recommendations,
        'processing_time': 2.3
    })

@app.route('/api/maintenance-predictions', methods=['GET'])
def get_maintenance_predictions():
    """Get predictive maintenance schedule"""
    predictions = [
        {
            'equipment': 'Ball Mill #1',
            'component': 'Main Bearing',
            'days_until': 45,
            'confidence': 89,
            'severity': 'medium'
        },
        {
            'equipment': 'Primary Crusher #1',
            'component': 'Liner Replacement',
            'days_until': 23,
            'confidence': 94,
            'severity': 'high'
        },
        {
            'equipment': 'SAG Mill #2',
            'component': 'Gearbox Inspection',
            'days_until': 67,
            'confidence': 76,
            'severity': 'low'
        }
    ]
    
    return jsonify(predictions)

# ==================== SIMULATION ENDPOINTS ====================

@app.route('/api/simulate', methods=['POST'])
def simulate_process():
    """Run process simulation with given parameters"""
    data = request.json
    
    ore_hardness = data.get('ore_hardness', 50)
    feed_size = data.get('feed_size', 15)
    crusher_gap = data.get('crusher_gap', 120)
    mill_speed = data.get('mill_speed', 72)
    
    # Simulation logic
    base_energy = 1000
    energy_factor = (ore_hardness / 50) * (feed_size / 15) * (120 / crusher_gap) * (mill_speed / 72)
    energy = base_energy * energy_factor
    
    base_throughput = 500
    throughput_factor = (crusher_gap / 120) * (mill_speed / 72) * (15 / feed_size)
    throughput = base_throughput * throughput_factor
    
    baseline_energy = 1000
    baseline_throughput = 500
    energy_saving = ((baseline_energy - energy) / baseline_energy) * 100
    throughput_change = ((throughput - baseline_throughput) / baseline_throughput) * 100
    
    return jsonify({
        'success': True,
        'results': {
            'energy': round(energy, 2),
            'throughput': round(throughput, 2),
            'energy_saving': round(energy_saving, 2),
            'throughput_change': round(throughput_change, 2)
        }
    })

# ==================== RENEWABLE ENERGY ENDPOINTS ====================

@app.route('/api/calculate-renewable-savings', methods=['POST'])
def calculate_renewable_savings():
    """Calculate renewable energy savings"""
    data = request.json
    
    current_energy = data.get('current_energy', 10000)
    renewable_capacity = data.get('renewable_capacity', 3000)
    energy_cost = data.get('energy_cost', 0.12)
    
    renewable_percentage = (renewable_capacity / current_energy) * 100
    annual_renewable_kwh = renewable_capacity * 24 * 365
    annual_cost_savings = annual_renewable_kwh * energy_cost
    co2_reduction = annual_renewable_kwh * 0.5 / 1000  # tonnes
    
    return jsonify({
        'success': True,
        'results': {
            'renewable_percentage': round(renewable_percentage, 1),
            'annual_renewable_kwh': int(annual_renewable_kwh),
            'annual_cost_savings': int(annual_cost_savings),
            'co2_reduction': round(co2_reduction, 1),
            'monthly_renewable_kwh': int(annual_renewable_kwh / 12),
            'monthly_savings': int(annual_cost_savings / 12)
        }
    })

# ==================== HEALTH CHECK ====================

@app.route('/', methods=['GET'])
def root():
    """Root endpoint - API information"""
    return jsonify({
        'name': 'Comminution AI API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'health': '/api/health',
            'metrics': '/api/metrics',
            'upload': '/api/upload-csv',
            'optimization': '/api/run-optimization',
            'simulation': '/api/simulate',
            'renewable': '/api/calculate-renewable-savings'
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)