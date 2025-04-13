
import React from 'react';

export default function Explanation() {
  return (
    
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">How the Algorithm Works</h2>
      <p className="mb-2">
        This visualizer is based on a simple optimization technique inspired by <strong>gradient search</strong> for permutations.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Initialization:</strong> We start with a random permutation of numbers (blocks).</li>
        <li><strong>Sampling:</strong> At each step, we create a new random permutation and calculate its <strong>cost</strong>.</li>
        <li><strong>Cost Function:</strong> The cost measures how "far" the current permutation is from being sorted. Lower cost is better.</li>
        <li><strong>Updating Best:</strong> If the new permutation is better than the previous best, we remember it!</li>
      </ul>
      <p className="mb-2">
        The blocks move in the animation, and the best arrangement is found step by step.
        This mimics how AI learns to improve a solution gradually.
      </p>
      <p className="italic">Try adjusting the number of blocks or steps to see how learning changes!</p>
    </div>
  );
}
