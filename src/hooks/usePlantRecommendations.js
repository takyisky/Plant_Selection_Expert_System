import { useState } from "react";
import { plantRecommendations } from "../data/plantRules";

// Define similar soil types for fallback logic - beace the mosly have similar properties.
const soilAlternatives = {
  loamy: ["silty", "peaty"],
  sandy: ["chalky"],
  peaty: ["silty", "loamy"],
  silty: ["loamy", "peaty"],
  chalky: ["sandy"],
  clay: [],
};

export function usePlantRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  function getRecommendations({ sunlight, soil, maintenance }) {
    let matchedPlants = [];

    // 1. Try to find an exact match first
    for (const rec of plantRecommendations) {
      const matchesAll = Object.entries(rec.conditions).every(
        ([key, value]) => {
          return (
            (key === "sunlight" && value === sunlight) ||
            (key === "soil" && value === soil) ||
            (key === "maintenance" && (!maintenance || value === maintenance))
          );
        }
      );

      if (matchesAll) {
        matchedPlants = rec.plants;
        break;
      }
    }

    // 2. If no exact match, try fallback based on soil type
    if (matchedPlants.length === 0 && soilAlternatives[soil]) {
      for (const altSoil of soilAlternatives[soil]) {
        for (const rec of plantRecommendations) {
          if (rec.conditions.soil === altSoil) {
            matchedPlants.push(...rec.plants);
          }
        }
      }
    }

    // 3. If still no match, return general plants for the given soil type
    if (matchedPlants.length === 0) {
      matchedPlants = plantRecommendations
        .filter((rec) => rec.conditions.soil === soil)
        .flatMap((rec) => rec.plants);
    }

    // 4. Update state
    setRecommendations(
      matchedPlants.length > 0 ? matchedPlants : ["No suitable plants found"]
    );
  }

  return { recommendations, getRecommendations };
}
