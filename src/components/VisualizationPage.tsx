import React from "react";
import { useData } from "../contexts/DataContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../styles/VisualizationPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisualizationPage: React.FC = () => {
  const { data } = useData();

  // Create an object to store the number of posts per userId
  const userPostCounts: { [key: number]: number } = data.reduce((acc, item) => {
    // If the userId already exists in the accumulator, increment its count by 1
    // Otherwise, initialize it with 1 (since this is the first post for this user)
    acc[item.userId] = (acc[item.userId] || 0) + 1;
    return acc; // Return the updated accumulator for the next iteration
  }, {} as { [key: number]: number }); // Initialize the accumulator as an empty object

  // Prepare the chart data
  const chartData: ChartData<"bar"> = {
    labels: Object.keys(userPostCounts).map((userId) => `User ${userId}`),
    datasets: [
      {
        label: "Number of Posts",
        data: Object.values(userPostCounts),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Posts per User</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default VisualizationPage;
