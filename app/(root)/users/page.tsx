"use client";
import React, { useEffect } from "react";
import { getColumns } from "./columns";

import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUsers } from "@/features/user/useSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "sonner";

export default function Page() {
  const { users, loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // This is where you would fetch the users from your API
    const getUsers = async () => {
      try {
        const resultAction = await dispatch(fetchUsers({ page: 1, limit: 10 }));

        if (fetchUsers.fulfilled.match(resultAction)) {
          console.log("Users fetched successfully:", resultAction.payload);
        } else {
          console.error("Failed to fetch users:", resultAction.error.message);
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="px-6 ">
      <div className="flex w-full items-center justify-between mb-1">
        <h1 className="text-black-200 font-semibold text-xl font-sans  mb-4">
          Users Management
        </h1>
        <Link href={"/users/add"}>
          {" "}
          <Button className="rounded-sm text-white " variant={"secondary"}>
            + User
          </Button>
        </Link>
      </div>

      <DataTable data={users} />
    </div>
  );
}
