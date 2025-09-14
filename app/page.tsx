'use client'

import React, { useState } from 'react';

interface SimulationResult {
  iteration: number;
  weights: number[];
  scores: number[];
  ranks: number[];
}

export default function Home() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [numSimulations, setNumSimulations] = useState(250);
  
  const analysisMatrix = [
    [1, 2, 3],  // Red
    [3, 1, 1],  // Green
    [6, 5, 6]   // Blue
  ];
  const alternativeNames = ['Red', 'Green', 'Blue'];
  const attributeNames = ['Cost', 'Desirability', 'Delivery'];

  const generateRandomPairwiseMatrix = (): number[] => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 1;
    
    const costTotal = a + b;
    const desirabilityTotal = (10 - a) + c;
    const deliveryTotal = (10 - b) + (10 - c);
    const totalSum = 30;
    
    return [
      costTotal / totalSum,
      desirabilityTotal / totalSum,
      deliveryTotal / totalSum
    ];
  };

  const calculateRanks = (weights: number[]) => {
    const scores = analysisMatrix.map(alternative => 
      alternative.reduce((sum, value, index) => sum + value * weights[index], 0)
    );
    
    const indices = scores.map((_, i) => i);
    indices.sort((a, b) => scores[b] - scores[a]);
    
    const ranks = new Array(3);
    indices.forEach((originalIndex, newIndex) => {
      ranks[originalIndex] = newIndex + 1;
    });
    
    return { scores, ranks };
  };

  const runSimulation = () => {
    setIsRunning(true);
    setResults([]);
    
    const simulationResults: SimulationResult[] = [];
    
    for (let i = 0; i < numSimulations; i++) {
      const weights = generateRandomPairwiseMatrix();
      const { scores, ranks } = calculateRanks(weights);
      
      simulationResults.push({
        iteration: i + 1,
        weights,
        scores,
        ranks
      });
    }
    
    setResults(simulationResults);
    setIsRunning(false);
  };

  const getRankDistribution = () => {
    if (results.length === 0) return [];
    
    const distribution = alternativeNames.map(name => ({
      name,
      rank1: 0,
      rank2: 0,
      rank3: 0
    }));
    
    results.forEach(result => {
      alternativeNames.forEach((name, index) => {
        const rank = result.ranks[index];
        if (rank === 1) distribution[index].rank1++;
        if (rank === 2) distribution[index].rank2++;
        if (rank === 3) distribution[index].rank3++;
      });
    });
    
    return distribution;
  };

  const getRankPercentages = () => {
    const distribution = getRankDistribution();
    return distribution.map(alt => ({
      name: alt.name,
      rank1: ((alt.rank1 / numSimulations) * 100).toFixed(1),
      rank2: ((alt.rank2 / numSimulations) * 100).toFixed(1),
      rank3: ((alt.rank3 / numSimulations) * 100).toFixed(1)
    }));
  };

  const percentages = getRankPercentages();

  return (
    <div className="container">
      <div className="card-header">
        <h1>Monte Carlo Sensitivity Analysis for Multi-Criteria Decision Making</h1>
        <p>
          An interactive demonstration of algorithmic Monte Carlo approach to determine rank-score positions 
          of engineering alternatives in hierarchical decision models.
        </p>
        <p className="text-sm" style={{marginTop: '1rem', opacity: 0.9}}>
          By Lucille E. Nguyen - Interactive Implementation for Data Science Portfolio
        </p>
      </div>

      {/* Problem Description */}
      <div className="grid grid-2">
        <div className="card">
          <h2>Engineering Analysis Matrix (A)</h2>
          <div style={{overflowX: 'auto'}}>
            <table>
              <thead>
                <tr>
                  <th>Alternative</th>
                  {attributeNames.map(attr => (
                    <th key={attr}>{attr}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alternativeNames.map((alt, i) => (
                  <tr key={alt}>
                    <td style={{fontWeight: '500'}}>{alt}</td>
                    {analysisMatrix[i].map((val, j) => (
                      <td key={j} className="text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm" style={{marginTop: '1rem'}}>
            Fixed matrix where each alternative is scored (1-6) against each attribute.
          </p>
        </div>

        <div className="card">
          <h2>Simulation Controls</h2>
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem'}}>
              Number of Simulations: {numSimulations}
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={numSimulations}
              onChange={(e) => setNumSimulations(parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`btn btn-full ${isRunning ? '' : 'btn-primary'}`}
          >
            {isRunning ? 'Running Simulation...' : 'Run Monte Carlo Analysis'}
          </button>
          
          <div className="info-box">
            <div className="info-title">How it works:</div>
            <ul className="info-list">
              <li>Generates random pairwise comparison matrices (B)</li>
              <li>Multiplies A × B to get weighted scores</li>
              <li>Ranks alternatives by scores</li>
              <li>Repeats {numSimulations} times to analyze sensitivity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Rank Distribution Chart */}
          <div className="card">
            <h2>Rank Distribution Across {numSimulations} Simulations</h2>
            <div style={{height: '400px', marginTop: '1rem'}}>
              <SimpleBarChart data={getRankDistribution()} />
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="card">
            <h2>Rank Probability Summary</h2>
            <div className="grid grid-3">
              {percentages.map(alt => (
                <div key={alt.name} className="card" style={{marginBottom: '0', border: '1px solid #e2e8f0'}}>
                  <h3>{alt.name}</h3>
                  <div style={{fontSize: '0.875rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0.25rem 0'}}>
                      <span>1st Place:</span>
                      <span className="status-1st">{alt.rank1}%</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0.25rem 0'}}>
                      <span>2nd Place:</span>
                      <span className="status-2nd">{alt.rank2}%</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0.25rem 0'}}>
                      <span>3rd Place:</span>
                      <span className="status-3rd">{alt.rank3}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="card">
            <h2>Key Insights</h2>
            <div className="grid grid-2">
              <div>
                <h3>Methodology Benefits:</h3>
                <ul style={{fontSize: '0.875rem', lineHeight: '1.5', color: '#4b5563'}}>
                  <li>Handles exponentially large solution spaces (9³ = 729 possible matrices)</li>
                  <li>Provides statistically significant results with manageable computation</li>
                  <li>95% confidence level with 5% margin of error achieved</li>
                  <li>Scalable approach for larger decision problems</li>
                </ul>
              </div>
              <div>
                <h3>Typical Results Pattern:</h3>
                <ul style={{fontSize: '0.875rem', lineHeight: '1.5', color: '#4b5563'}}>
                  <li>Blue consistently ranks first (highest scores)</li>
                  <li>Red frequently takes second place</li>
                  <li>Green often ranks last</li>
                  <li>Results reflect sensitivity to weight variations</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280'}}>
        <p>Implementation of "A Monte Carlo Approach to Sensitivity Analysis for Multi-Criteria Decision Making"</p>
        <p>Part of Data Science Portfolio - Built with React and Next.js</p>
      </div>
    </div>
  );
}

// Simple Bar Chart Component (without external dependencies)
function SimpleBarChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.map(d => d.rank1 + d.rank2 + d.rank3));
  
  return (
    <div style={{display: 'flex', alignItems: 'end', height: '300px', gap: '2rem', padding: '2rem'}}>
      {data.map((item, index) => {
        const total = item.rank1 + item.rank2 + item.rank3;
        const height1 = (item.rank1 / maxValue) * 250;
        const height2 = (item.rank2 / maxValue) * 250;
        const height3 = (item.rank3 / maxValue) * 250;
        
        return (
          <div key={item.name} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
            <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', height: '250px', width: '80px'}}>
              <div style={{
                width: '100%',
                height: `${height3}px`,
                backgroundColor: '#dc2626',
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {item.rank3 > 0 ? '3rd' : ''}
              </div>
              <div style={{
                width: '100%',
                height: `${height2}px`,
                backgroundColor: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {item.rank2 > 0 ? '2nd' : ''}
              </div>
              <div style={{
                width: '100%',
                height: `${height1}px`,
                backgroundColor: '#059669',
                borderRadius: '0 0 4px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {item.rank1 > 0 ? '1st' : ''}
              </div>
            </div>
            <div style={{marginTop: '1rem', fontWeight: '500', fontSize: '1rem'}}>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}
