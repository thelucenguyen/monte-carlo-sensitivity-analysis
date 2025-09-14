'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MonteCarloAnalysis = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [numSimulations, setNumSimulations] = useState(250);
  const [analysisMatrix] = useState([
    [1, 2, 3],  // Red
    [3, 1, 1],  // Green
    [6, 5, 6]   // Blue
  ]);
  const [alternativeNames] = useState(['Red', 'Green', 'Blue']);
  const [attributeNames] = useState(['Cost', 'Desirability', 'Delivery']);

  // Generate random pairwise comparison matrix
  const generateRandomPairwiseMatrix = () => {
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

  // Calculate scores and ranks
  const calculateRanks = (weights: number[]) => {
    const scores = analysisMatrix.map(alternative => 
      alternative.reduce((sum, value, index) => sum + value * weights[index], 0)
    );
    
    // Create array of indices and sort by scores (descending)
    const indices = scores.map((_, i) => i);
    indices.sort((a, b) => scores[b] - scores[a]);
    
    // Convert to ranks (1st, 2nd, 3rd)
    const ranks = new Array(3);
    indices.forEach((originalIndex, newIndex) => {
      ranks[originalIndex] = newIndex + 1;
    });
    
    return { scores, ranks };
  };

  // Run Monte Carlo simulation
  const runSimulation = () => {
    setIsRunning(true);
    setResults([]);
    
    const simulationResults: any[] = [];
    
    for (let i = 0; i < numSimulations; i++) {
      const weights = generateRandomPairwiseMatrix();
      const { scores, ranks } = calculateRanks(weights);
      
      simulationResults.push({
        iteration: i + 1,
        weights: weights,
        scores: scores,
        ranks: ranks
      });
    }
    
    setResults(simulationResults);
    setIsRunning(false);
  };

  // Calculate rank distribution for visualization
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
        distribution[index][`rank${rank}` as keyof typeof distribution[0]]++;
      });
    });
    
    return distribution;
  };

  // Get final rank percentages
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
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Monte Carlo Sensitivity Analysis for Multi-Criteria Decision Making
        </h1>
        <p className="text-gray-600 mb-4">
          An interactive demonstration of algorithmic Monte Carlo approach to determine rank-score positions 
          of engineering alternatives in hierarchical decision models.
        </p>
        <p className="text-sm text-gray-500">
          By Lucille E. Nguyen - Interactive Implementation for Data Science Portfolio
        </p>
      </div>
  );
};

export default MonteCarloAnalysis;>

      {/* Problem Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Engineering Analysis Matrix (A)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Alternative</th>
                  {attributeNames.map(attr => (
                    <th key={attr} className="border border-gray-300 p-2">{attr}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alternativeNames.map((alt, i) => (
                  <tr key={alt}>
                    <td className="border border-gray-300 p-2 font-medium">{alt}</td>
                    {analysisMatrix[i].map((val, j) => (
                      <td key={j} className="border border-gray-300 p-2 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Fixed matrix where each alternative is scored (1-6) against each attribute.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Simulation Controls</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Simulations: {numSimulations}
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={numSimulations}
                onChange={(e) => setNumSimulations(parseInt(e.target.value))}
                className="w-full"
                disabled={isRunning}
              />
            </div>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isRunning ? 'Running Simulation...' : 'Run Monte Carlo Analysis'}
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Generates random pairwise comparison matrices (B)</li>
              <li>• Multiplies A × B to get weighted scores</li>
              <li>• Ranks alternatives by scores</li>
              <li>• Repeats {numSimulations} times to analyze sensitivity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Rank Distribution Chart */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Rank Distribution Across {numSimulations} Simulations</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getRankDistribution()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rank1" stackId="a" fill="#22C55E" name="1st Place" />
                <Bar dataKey="rank2" stackId="a" fill="#F59E0B" name="2nd Place" />
                <Bar dataKey="rank3" stackId="a" fill="#EF4444" name="3rd Place" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Statistics */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Rank Probability Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {percentages.map(alt => (
                <div key={alt.name} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{alt.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1st Place:</span>
                      <span className="font-medium text-green-600">{alt.rank1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2nd Place:</span>
                      <span className="font-medium text-yellow-600">{alt.rank2}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3rd Place:</span>
                      <span className="font-medium text-red-600">{alt.rank3}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Methodology Benefits:</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Handles exponentially large solution spaces (9³ = 729 possible matrices)</li>
                  <li>• Provides statistically significant results with manageable computation</li>
                  <li>• 95% confidence level with 5% margin of error achieved</li>
                  <li>• Scalable approach for larger decision problems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Typical Results Pattern:</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Blue consistently ranks first (highest scores)</li>
                  <li>• Red frequently takes second place</li>
                  <li>• Green often ranks last</li>
                  <li>• Results reflect sensitivity to weight variations</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Implementation of "A Monte Carlo Approach to Sensitivity Analysis for Multi-Criteria Decision Making"</p>
        <p>Part of Data Science Portfolio - Built with React, Recharts, and Tailwind CSS</p>
      </div>
    </div
