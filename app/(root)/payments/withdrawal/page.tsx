"use client"
import React, { useState } from "react";
import Table from "../table";
import PaymentsNav from "@/components/payments/PaymentsNav";

// Dummy data
const withdrawals = [
  {
    id: 1,
    provider: "Plumber Pro",
    amount: "$200",
    date: "2024-06-03",
    status: "Pending",
    details: "Bank: ABC, IBAN: 123456789",
  },
  {
    id: 2,
    provider: "Electrician Hub",
    amount: "$150",
    date: "2024-06-04",
    status: "Approved",
    details: "Bank: XYZ, IBAN: 987654321",
  },
  // ...more
];

const columns = [
  { key: "provider", label: "Provider Name" },
  { key: "amount", label: "Requested Amount" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const WithdrawalsPage = () => {
  const [modal, setModal] = useState<{ open: boolean; details?: string }>({ open: false });

  // Approve/Reject handlers (dummy)
  const handleApprove = (id: number) => alert(`Approved request #${id}`);
  const handleReject = (id: number) => alert(`Rejected request #${id}`);

  return (
    <div className="">
  
   
      
      <Table
        columns={columns}
        data={withdrawals.map((row) => ({
          ...row,
          status: (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[row.status]}`}>
              {row.status}
            </span>
          ),
        }))}
        actions={(row) => (
          <div className="flex gap-2">
            {row.status.props.children === "Pending" && (
              <>
                <button
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                  onClick={() => handleApprove(row.id)}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                  onClick={() => handleReject(row.id)}
                >
                  Reject
                </button>
              </>
            )}
            <button
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              onClick={() => setModal({ open: true, details: row.details })}
            >
              View Details
            </button>
          </div>
        )}
      />
      {/* Modal for details */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 min-w-[300px]">
            <h2 className="font-bold mb-2">Request Details</h2>
            <div className="mb-4 text-sm">{modal.details}</div>
            <button
              className="px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setModal({ open: false })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalsPage;