'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type ScoreCategory = 'prestigeTokens' | 'cityPoints' | 'biggestRectangle' | 'objectives' | 'expansion' | 'openingPenalties';

interface Scores {
  prestigeTokens: number[];
  cityPoints: number[];
  biggestRectangle: number[];
  objectives: number[];
  expansion: number[];
  openingPenalties: number[];
}

export default function RailroadTilesScorer() {
  const [players, setPlayers] = useState<string[]>(['', '', '', '', '']);
  const [scores, setScores] = useState<Scores>({
    prestigeTokens: [0, 0, 0, 0, 0],
    cityPoints: [0, 0, 0, 0, 0],
    biggestRectangle: [0, 0, 0, 0, 0],
    objectives: [0, 0, 0, 0, 0],
    expansion: [0, 0, 0, 0, 0],
    openingPenalties: [0, 0, 0, 0, 0]
  });

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleScoreChange = (category: ScoreCategory, index: number, value: string) => {
    const newScores = { ...scores };
    const numValue = parseInt(value) || 0;
    // Clamp value between 0 and 999
    newScores[category][index] = Math.min(Math.max(numValue, 0), 999);
    setScores(newScores);
  };

  const calculateSubtotal = (playerIndex: number) => {
    return scores.prestigeTokens[playerIndex] + 
           scores.cityPoints[playerIndex] + 
           scores.biggestRectangle[playerIndex] + 
           scores.objectives[playerIndex] +
           scores.expansion[playerIndex];
  };

  const calculateTotal = (playerIndex: number) => {
    return calculateSubtotal(playerIndex) - scores.openingPenalties[playerIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Railroad Tiles</h1>
          <p className="text-center text-gray-600 mb-6">Score Tracker</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-300 text-white">
                  <th className="border-2 border-gray-400 p-3 text-left font-semibold">Category</th>
                  {players.map((player, idx) => (
                    <th key={idx} className="border-2 border-gray-400 p-3">
                      <input
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerNameChange(idx, e.target.value)}
                        placeholder={`Player ${idx + 1}`}
                        className="w-full text-center bg-transparent border-b-2 border-white/50 focus:border-white outline-none placeholder-white/70"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-amber-50">
                  <td className="border-2 border-gray-400 p-3 font-semibold">
                    <div>Prestige Tokens</div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.prestigeTokens[idx] || ''}
                        onChange={(e) => handleScoreChange('prestigeTokens', idx, e.target.value)}
                        className="w-full text-center p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-2 border-gray-400 p-3 font-semibold">
                    <div>City Points</div>
                    <div className="text-xs text-gray-600 font-normal mt-1">
                      5 points per group of 3 or more orthogonally adjacent Town tiles
                    </div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.cityPoints[idx] || ''}
                        onChange={(e) => handleScoreChange('cityPoints', idx, e.target.value)}
                        className="w-full text-center p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr className="bg-amber-50">
                  <td className="border-2 border-gray-400 p-3 font-semibold">
                    <div>Biggest Rectangle</div>
                    <div className="text-xs text-gray-600 font-normal mt-1">
                      1 point per tile in the biggest rectangle without holes
                    </div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.biggestRectangle[idx] || ''}
                        onChange={(e) => handleScoreChange('biggestRectangle', idx, e.target.value)}
                        className="w-full text-center p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-2 border-gray-400 p-3 font-semibold">
                    <div>Objectives</div>
                    <div className="text-xs text-gray-600 font-normal mt-1">
                      5 points per fulfilled scoring condition
                    </div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.objectives[idx] || ''}
                        onChange={(e) => handleScoreChange('objectives', idx, e.target.value)}
                        className="w-full text-center p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr className="bg-amber-50">
                  <td className="border-2 border-gray-400 p-3 font-semibold">
                    <div>Expansion</div>
                    <div className="text-xs text-gray-600 font-normal mt-1">
                      If you&apos;re playing with expansion
                    </div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.expansion[idx] || ''}
                        onChange={(e) => handleScoreChange('expansion', idx, e.target.value)}
                        className="w-full text-center p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr className="bg-blue-50">
                  <td className="border-2 border-gray-400 p-3 font-bold text-lg">Subtotal</td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-3 text-center font-bold text-lg text-blue-700">
                      {calculateSubtotal(idx)}
                    </td>
                  ))}
                </tr>

                <tr className="bg-red-50">
                  <td className="border-2 border-gray-400 p-3 font-semibold text-red-700">
                    <div>Opening Penalties</div>
                    <div className="text-xs text-gray-600 font-normal mt-1">
                      Lose 1 point for each Opening exceeding the 5th
                    </div>
                  </td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-2">
                      <input
                        type="number"
                        value={scores.openingPenalties[idx] || ''}
                        onChange={(e) => handleScoreChange('openingPenalties', idx, e.target.value)}
                        className="w-full text-center p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 outline-none"
                        min="0"
                        max="999"
                      />
                    </td>
                  ))}
                </tr>

                <tr className="bg-green-100">
                  <td className="border-2 border-gray-400 p-3 font-bold text-xl">Total</td>
                  {players.map((_, idx) => (
                    <td key={idx} className="border-2 border-gray-400 p-3 text-center font-bold text-2xl text-green-700">
                      {calculateTotal(idx)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-gray-800 mb-2">Scoring Summary:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Prestige Tokens:</strong> Points as shown on tokens</li>
              <li>• <strong>City Points:</strong> 5 points per group of 3+ adjacent Town tiles</li>
              <li>• <strong>Biggest Rectangle:</strong> 1 point per tile (no holes allowed)</li>
              <li>• <strong>Objectives:</strong> 5 points per completed objective</li>
              <li>• <strong>Expansion:</strong> Additional points from expansion content</li>
              <li>• <strong>Opening Penalties:</strong> -1 point for each Opening after the 5th</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

