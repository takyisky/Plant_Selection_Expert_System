export const plantRecommendations = [
  // Loamy Soil
  {
    conditions: { sunlight: "full", soil: "loamy", maintenance: "low" },
    plants: ["Carrots", "Cucumbers"],
  },
  {
    conditions: { sunlight: "full", soil: "loamy", maintenance: "medium" },
    plants: ["Strawberries"],
  },
  {
    conditions: { sunlight: "partial", soil: "loamy", maintenance: "low" },
    plants: ["Mint", "Basil"],
  },
  {
    conditions: { sunlight: "shade", soil: "loamy", maintenance: "medium" },
    plants: ["Ferns", "Delphinium"],
  },

  // Sandy Soil
  {
    conditions: { sunlight: "full", soil: "sandy", maintenance: "low" },
    plants: ["Cactus", "Lavender"],
  },
  {
    conditions: { sunlight: "full", soil: "sandy", maintenance: "medium" },
    plants: ["Rosemary"],
  },
  {
    conditions: { sunlight: "partial", soil: "sandy", maintenance: "low" },
    plants: ["Thyme"],
  },
  {
    conditions: { sunlight: "partial", soil: "sandy", maintenance: "medium" },
    plants: ["Tomatoes"],
  },
  {
    conditions: { sunlight: "shade", soil: "sandy", maintenance: "medium" },
    plants: ["Hibiscus", "Tulips"],
  },

  // Peaty Soil (High Water Retention)
  {
    conditions: { sunlight: "full", soil: "peaty", maintenance: "high" },
    plants: ["Blueberries", "Azalea"],
  },
  {
    conditions: { sunlight: "partial", soil: "peaty", maintenance: "medium" },
    plants: ["Lettuce", "Potatoes"],
  },

  // Silty Soil (High Moisture Retention)
  {
    conditions: { sunlight: "full", soil: "silty", maintenance: "medium" },
    plants: ["New Zealand Flax"],
  },
  {
    conditions: { sunlight: "full", soil: "silty", maintenance: "high" },
    plants: ["Cypress Trees"],
  },
  {
    conditions: { sunlight: "partial", soil: "silty", maintenance: "low" },
    plants: ["Onions"],
  },
  {
    conditions: { sunlight: "partial", soil: "silty", maintenance: "medium" },
    plants: ["Lettuce"],
  },

  // Chalky Soil (Alkaline, Requires Specialized Plants)
  {
    conditions: { sunlight: "full", soil: "chalky", maintenance: "medium" },
    plants: ["Cabbage", "Beets"],
  },
  {
    conditions: { sunlight: "partial", soil: "chalky", maintenance: "low" },
    plants: ["Mock Oranges"],
  },
  {
    conditions: { sunlight: "partial", soil: "chalky", maintenance: "medium" },
    plants: ["Lilac"],
  },

  // Clay Soil (High Moisture Retention, Poor Drainage)
  {
    conditions: { sunlight: "full", soil: "clay", maintenance: "high" },
    plants: ["Fruit Trees"],
  },
  {
    conditions: { sunlight: "full", soil: "clay", maintenance: "medium" },
    plants: ["Aster"],
  },
  {
    conditions: { sunlight: "partial", soil: "clay", maintenance: "medium" },
    plants: ["Flowering Quince"],
  },
  {
    conditions: { sunlight: "partial", soil: "clay", maintenance: "low" },
    plants: ["Shrubs"],
  },

  // Rocky Soil (Special Condition)
  {
    conditions: { sunlight: "full", soil: "rocky", maintenance: "high" },
    plants: ["Succulents", "Aloe Vera"],
  },
];
