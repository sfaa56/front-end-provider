"use client";
import React, { useEffect } from "react";
import { getColumns } from "./columns";
// import { PropertyFormModal } from './city-form'
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { useSharedState } from '@/app/context/state-provider'

export default function Page() {
  //   const {cities, setCities} = useSharedState()

  //   useEffect(() => {
  //     const fetchCities = async () => {
  //       try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/cities`)
  //         const data = await response.json()
  //         setCities(data)
  //       } catch (error) {
  //         console.error('Error fetching cities:', error)
  //       }
  //     }

  //     fetchCities()
  //   }, [])
const users = [
  {
    _id: '1',
    img: { url: 'https://i.pravatar.cc/150?img=1' },
    username: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1-202-555-0123',
    role: 'Client',
    status: 'Active',
    
  },
  {
    _id: '2',
    img: { url: 'https://i.pravatar.cc/150?img=2' },
    username: 'Sara Ahmed',
    email: 'sara@example.com',
    phoneNumber: '+20-100-123-4567',
    role: 'Provider',
    status: 'Inactive',
    specialty: 'Cardiology',
      isVerified:false
  },
  {
    _id: '3',
    img: { url: 'https://i.pravatar.cc/150?img=3' },
    username: 'Ali Hassan',
    email: 'ali@example.com',
    phoneNumber: '+971-50-987-6543',
    role: 'Client',
    status: 'Active',
  },
  {
    _id: '4',
    img: { url: 'https://i.pravatar.cc/150?img=4' },
    username: 'Mona Youssef',
    email: 'mona@example.com',
    phoneNumber: '+966-55-123-7890',
    role: 'Provider',
    status: 'Active',
    specialty: 'Dermatology',
    isVerified:true,
  },
  {
    _id: '5',
    img: { url: 'https://i.pravatar.cc/150?img=5' },
    username: 'Karim Nabil',
    email: 'karim@example.com',
    phoneNumber: '+20-122-456-7890',
    role: 'Client',
    status: 'Inactive',
  },
];


  return (
    <div className="px-6 ">
      <div className="flex w-full items-center justify-between mb-1">
        <h1 className="text-black-200 font-semibold text-xl font-sans  mb-4">Users Management</h1>
      <Link href={"/users/add"} > <Button className="rounded-sm text-white " variant={"secondary"}>+ User</Button></Link>
      </div>

      <DataTable   data={users} />
    </div>
  );
}
