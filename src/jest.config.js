module.exports = {
  // ... other configurations ...
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|@babel|@mui|@emotion|react-chartjs-2|recharts)/",
  ],
};
