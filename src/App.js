import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const generateLocations = (n) =>
  Array.from({ length: n }, () => ({
    x: Math.floor(Math.random() * 400 + 50),
    y: Math.floor(Math.random() * 300 + 50)
  }));

const distance = (a, b) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const totalDistance = (perm, locations, store) => {
  let dist = distance(store, locations[perm[0]]);
  for (let i = 0; i < perm.length - 1; i++) {
    dist += distance(locations[perm[i]], locations[perm[i + 1]]);
  }
  dist += distance(locations[perm[perm.length - 1]], store); // return to store
  return dist;
};

const generateRandomPerm = (n) => {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function PizzaDeliveryVisualizer() {
  const canvasRef = useRef(null);
  const [store] = useState({ x: 250, y: 200 });
  const [locations, setLocations] = useState(generateLocations(6));
  const [dragIndex, setDragIndex] = useState(null);
  const [iterationLimit, setIterationLimit] = useState(100);
  const [bestPath, setBestPath] = useState([]);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);

  const runOptimization = (locs) => {
    let best = generateRandomPerm(locs.length);
    let bestScore = totalDistance(best, locs, store);
    const hist = [{ path: [...best], score: bestScore }];

    for (let i = 0; i < iterationLimit; i++) {
      const candidate = generateRandomPerm(locs.length);
      const candidateScore = totalDistance(candidate, locs, store);

      if (candidateScore < bestScore) {
        best = candidate;
        bestScore = candidateScore;
      }
      hist.push({ path: [...best], score: bestScore });
    }

    setBestPath(best);
    setHistory(hist);
    setStep(0);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 400);

    // Store
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(store.x, store.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = '12px sans-serif';
    ctx.fillText('🍕 Store', store.x + 10, store.y);

    // Houses
    ctx.fillStyle = 'red';
    locations.forEach((loc, i) => {
      ctx.beginPath();
      ctx.arc(loc.x, loc.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText(`🏠${i + 1}`, loc.x + 8, loc.y);
    });

    // Path
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(store.x, store.y);
    const path = history[step]?.path;
    path?.forEach(i => ctx.lineTo(locations[i].x, locations[i].y));
    ctx.lineTo(store.x, store.y);
    ctx.stroke();
  };

  useEffect(() => {
    drawCanvas();
  }, [step, locations, history]);

  // Drag & Drop functionality
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];
      if (Math.hypot(loc.x - x, loc.y - y) < 10) {
        setDragIndex(i);
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (dragIndex !== null) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newLocs = [...locations];
      newLocs[dragIndex] = { x, y };
      setLocations(newLocs);
    }
  };

  const handleMouseUp = () => {
    setDragIndex(null);
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <header className="mb-6 text-center bg-white shadow-md rounded p-4">
        <h1 className="text-2xl font-bold text-blue-800">AI Project - Model Based Gradient Search for Permutation Problem</h1>
        <p className="text-sm mt-2 text-gray-700">Made by Group G72 Members</p>
        <ul className="text-gray-600 text-xs mt-1">
          <li>• Yash Deepak Malve – S20230010141</li>
          <li>• Purval Madhukar Bhude – S20230010193</li>
          <li>• Piyush Kumar – S20230010186</li>
        </ul>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="border rounded shadow bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />

        <div className="space-y-4 w-full max-w-sm">
          <label className="block">
            <span className="text-sm font-medium">🔁 Iterations: {iterationLimit}</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={iterationLimit}
              onChange={(e) => setIterationLimit(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <button
            onClick={() => runOptimization(locations)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🚀 Run Optimization
          </button>
          <div className="flex justify-between items-center">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-4 py-2 bg-blue-300 rounded">◀ Prev</button>
            <span className="text-sm">Step {step} / {history.length - 1}</span>
            <button onClick={() => setStep(s => Math.min(history.length - 1, s + 1))} disabled={step === history.length - 1} className="px-4 py-2 bg-blue-300 rounded">Next ▶</button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2 text-center">📉 Distance Over Iterations</h2>
        <Line
          data={{
            labels: history.map((_, i) => i),
            datasets: [{
              label: 'Best Distance',
              data: history.map(h => h.score),
              borderColor: 'orange',
              fill: false
            }]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: false } }
          }}
        />
      </div>

      <div className="bg-yellow-100 mt-10 p-4 rounded text-sm text-gray-800">
        <h3 className="font-bold mb-2">🧠 How the Algorithm Works</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Start with a random permutation (pizza delivery order).</li>
          <li>Evaluate total distance for that order (objective function).</li>
          <li>Sample other permutations (like taking small random steps).</li>
          <li>Keep better solutions (lower distance) like gradient descent keeps lower loss.</li>
          <li>Continue this loop for many iterations (you control it via the slider).</li>
          <li>This simulates a model-based gradient search in permutation space.</li>
        </ul>
      </div>
    </div>
  );
}
