import StatCard from "./StatCard";

interface StatsGridProps {
  totalSessions: number;
  totalHours: number;
}

export default function StatsGrid({
  totalSessions,
  totalHours,
}: StatsGridProps) {
  return (
    <div className="px-5 py-5 grid grid-cols-2 gap-3">
      <StatCard label="Total Sesi" value={totalSessions} />
      <StatCard label="Total Jam" value={totalHours.toFixed(1)} />
    </div>
  );
}