"use client";
import React, { useState } from "react";
import Table from "../table";
import PaymentsNav from "@/components/payments/PaymentsNav";
import FinancialKPIs from "../FinancialKPIs";

// Dummy data
const invoices = [
  {
    id: "INV001",
    provider: "Plumber Pro",
    amount: "$120",
    date: "2024-06-01",
    status: "Paid",
  },
  {
    id: "INV002",
    provider: "Electrician Hub",
    amount: "$80",
    date: "2024-06-02",
    status: "Unpaid",
  },
  // ...more
];

const columns = [
  { key: "id", label: "Invoice ID" },
  { key: "provider", label: "Provider Name" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Creation Date" },
  { key: "status", label: "Payment Status" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-yellow-100 text-yellow-700",
};

const InvoicesPage = () => {
  const [filter, setFilter] = useState({ provider: "", date: "" });

  // Filter logic
  const filtered = invoices.filter(
    (inv) =>
      (!filter.provider || inv.provider === filter.provider) &&
      (!filter.date || inv.date === filter.date)
  );

  // Unique providers for filter dropdown
  const providers = Array.from(new Set(invoices.map((i) => i.provider)));





  return (
    <div className="px-6 ">

 

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={filter.provider}
          onChange={(e) =>
            setFilter((f) => ({ ...f, provider: e.target.value }))
          }
        >
          <option value="">All Providers</option>
          {providers.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={filter.date}
          onChange={(e) => setFilter((f) => ({ ...f, date: e.target.value }))}
        />
      </div>
      {/* Table */}
      <Table
        columns={columns}
        data={filtered.map((row) => ({
          ...row,
          status: (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                statusColors[row.status]
              }`}
            >
              {row.status}
            </span>
          ),
        }))}
      />
    </div>
  );
};

export default InvoicesPage;
