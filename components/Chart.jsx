
'use client'

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const Chart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("jour");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/HeuresSaisies");
        const json = await res.json();
        setData(json); // Format: [{ name: 'Lundi', heures: 4 }, ...]
      } catch (error) {
        console.error("Erreur lors du fetch des données du chart :", error);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div className="h-[450px] bg-[#cedcc3] p-5 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600">Statistiques des heures ({period})</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="p-2 rounded bg-white text-black"
        >
          <option value="jour">Par Jour</option>
          <option value="semaine">Par Semaine</option>
          <option value="mois">Par Mois</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="heures"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
