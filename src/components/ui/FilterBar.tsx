// src/components/ui/FilterBar.tsx
import React from "react";

interface FilterBarProps {
  industry: string;
  setIndustry: (value: string) => void;
  trend: string;
  setTrend: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ industry, setIndustry, trend, setTrend, search, setSearch }) => (
  <div className="flex gap-4 mb-4 flex-wrap">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 border rounded-lg flex-1 min-w-[150px]"
    />
    <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="px-4 py-2 border rounded-lg">
      <option value="">All Industries</option>
      <option value="Education">Education</option>
      <option value="Finance">Finance</option>
      <option value="Health">Health</option>
    </select>
    <select value={trend} onChange={(e) => setTrend(e.target.value)} className="px-4 py-2 border rounded-lg">
      <option value="">All Trends</option>
      <option value="hot">Hot</option>
      <option value="rising">Rising</option>
      <option value="evergreen">Evergreen</option>
    </select>
  </div>
);

export default FilterBar;
