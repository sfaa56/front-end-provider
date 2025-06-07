"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type transaction = {
  id: string;
  customer: string;
  provider: string;
  amount: string;
  commission: string;
  date: string;
  status: string;
};

const columns: ColumnDef<transaction>[] = [
  { accessorKey: "id", header: "Transaction ID" },
  { accessorKey: "customer", header: "Customer Name" },
  { accessorKey: "provider", header: "Provider Name" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "commission", header: "Commission" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "status", header: "Status" },
];

export default columns;