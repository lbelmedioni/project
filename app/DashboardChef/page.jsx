"use client";

import Card from "@/components/Card";
import Chart from "@/components/Chart";
import Transactions from "@/components/Transactions";
import { useEffect, useState } from "react";

export default function DashboardChef() {
  const [stats, setStats] = useState({
    enseignants: 0,
    enAttente: 0,
    nonValides: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats"); // à adapter
        const data = await res.json();
        setStats({
          enseignants: data.enseignants,
          enAttente: data.enAttente,
          nonValides: data.nonValides,
        });
      } catch (error) {
        console.error("Erreur lors du fetch des stats :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-5 mt-5 w-full">
      <div className="flex gap-5 justify-between w-full">
        <Card title="Enseignants inscrits" count={stats.enseignants} />
        <Card title="Enseignants en attente" count={stats.enAttente} />
        <Card title="Heures non validées" count={stats.nonValides} />
      </div>
      <Transactions />
      <Chart />
    </div>
  );
}
