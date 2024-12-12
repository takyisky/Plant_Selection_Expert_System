import { useState } from 'react';
import { plantRecommendations } from '../data/plantRules';

export function usePlantRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  function getRecommendations({ sunlight, soil, maintenance }) {
    // Try to find a matching rule
    for (const rec of plantRecommendations) {
      // Check each condition in rec.conditions
      const condMatches = Object.entries(rec.conditions).every(([key, value]) => {
        const inputValue = key === 'sunlight' ? sunlight
                        : key === 'soil' ? soil
                        : maintenance;
        return value === inputValue;
      });

      if (condMatches) {
        setRecommendations(rec.plants);
        return;
      }
    }

    // No match found
    setRecommendations([]);
  }

  return { recommendations, getRecommendations };
}
