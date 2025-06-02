"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";

type City = { name: string; active: boolean };
type Region = {
  id: number;
  name: string;
  active: boolean;
  cities: City[];
};

const initialRegions: Region[] = [
  {
    id: 1,
    name: "North Region",
    active: true,
    cities: [
      { name: "City A", active: true },
      { name: "City B", active: false },
    ],
  },
  {
    id: 2,
    name: "South Region",
    active: false,
    cities: [
      { name: "City C", active: true },
      { name: "City D", active: true },
    ],
  },
];

function Page() {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Region form state
  const [regionForm, setRegionForm] = useState({ name: "" });
  const [editingRegionId, setEditingRegionId] = useState<number | null>(null);

  // City form state
  const [cityForm, setCityForm] = useState({ name: "" });
  const [editingCity, setEditingCity] = useState<{ regionId: number; cityIdx: number } | null>(null);

  // --- Region Handlers ---
  const handleRegionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regionForm.name.trim()) return;
    if (editingRegionId !== null) {
      setRegions((prev) =>
        prev.map((r) =>
          r.id === editingRegionId ? { ...r, name: regionForm.name } : r
        )
      );
      setEditingRegionId(null);
    } else {
      const newId = regions.length ? Math.max(...regions.map((r) => r.id)) + 1 : 1;
      setRegions([
        ...regions,
        { id: newId, name: regionForm.name, active: true, cities: [] },
      ]);
    }
    setRegionForm({ name: "" });
  };

  const handleEditRegion = (region: Region) => {
    setRegionForm({ name: region.name });
    setEditingRegionId(region.id);
  };

  const handleDeleteRegion = (id: number) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
    if (editingRegionId === id) {
      setEditingRegionId(null);
      setRegionForm({ name: "" });
    }
  };

  const handleToggleRegionActive = (id: number) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  };

  // --- City Handlers ---
  const handleCitySubmit = (e: React.FormEvent, regionId: number) => {
    e.preventDefault();
    if (!cityForm.name.trim()) return;
    setRegions((prev) =>
      prev.map((r) => {
        if (r.id !== regionId) return r;
        if (editingCity && editingCity.regionId === regionId) {
          // Update city
          return {
            ...r,
            cities: r.cities.map((c, idx) =>
              idx === editingCity.cityIdx ? { ...c, name: cityForm.name } : c
            ),
          };
        } else {
          // Add city
          return {
            ...r,
            cities: [...r.cities, { name: cityForm.name, active: true }],
          };
        }
      })
    );
    setCityForm({ name: "" });
    setEditingCity(null);
  };

  const handleEditCity = (regionId: number, cityIdx: number) => {
    const city = regions.find((r) => r.id === regionId)?.cities[cityIdx];
    if (city) {
      setCityForm({ name: city.name });
      setEditingCity({ regionId, cityIdx });
    }
  };

  const handleDeleteCity = (regionId: number, cityIdx: number) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.id === regionId
          ? { ...r, cities: r.cities.filter((_, idx) => idx !== cityIdx) }
          : r
      )
    );
    setEditingCity(null);
    setCityForm({ name: "" });
  };

  const handleToggleCityActive = (regionId: number, cityIdx: number) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.id === regionId
          ? {
              ...r,
              cities: r.cities.map((c, idx) =>
                idx === cityIdx ? { ...c, active: !c.active } : c
              ),
            }
          : r
      )
    );
  };

  // --- UI ---
  return (
    <div className="px-6">
      <div className="flex w-full items-end">
        <h1 className="text-black-200 font-semibold text-xl font-sans mb-4">
          Regions & Cities
        </h1>
      </div>
      <div className="mx-auto flex flex-col md:flex-row gap-8">
        {/* Regions List */}
<div className="flex-1">
  <table className="w-full bg-white rounded-xl shadow overflow-hidden">
    <thead>
      <tr className="bg-gray-50 border-b">
        <th className="p-3 text-left">Region</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {regions.map((region) => (
        <React.Fragment key={region.id}>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3 font-semibold">
              {region.name}
            </td>
            <td className="p-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                region.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {region.active ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="p-3 flex gap-2">
              <button
                className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium transition"
                onClick={() => handleEditRegion(region)}
              >
                Update
              </button>
              <button
                className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium transition"
                onClick={() => handleDeleteRegion(region.id)}
              >
                Delete
              </button>
              <button
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  region.active
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => handleToggleRegionActive(region.id)}
              >
                {region.active ? "Deactivate" : "Activate"}
              </button>
              <button
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition"
                onClick={() =>
                  setExpandedId(expandedId === region.id ? null : region.id)
                }
              >
                {expandedId === region.id ? "Hide Cities" : "View Cities"}
              </button>
            </td>
          </tr>
          {expandedId === region.id && (
            <tr>
              <td colSpan={3} className="bg-gray-50 p-0">
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2">City</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {region.cities.map((city, idx) => (
                        <tr key={idx}>
                          <td className="p-2">{city.name}</td>
                          <td className="p-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                              city.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {city.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-2 flex gap-2">
                            <button
                              className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
                              onClick={() => handleEditCity(region.id, idx)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-2 py-0.5 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs"
                              onClick={() => handleDeleteCity(region.id, idx)}
                            >
                              Delete
                            </button>
                            <button
                              className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                                city.active
                                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                              onClick={() => handleToggleCityActive(region.id, idx)}
                            >
                              {city.active ? "Deactivate" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* Add/Update City Form */}
                      <tr>
                        <td colSpan={3}>
                          <form
                            onSubmit={(e) => handleCitySubmit(e, region.id)}
                            className="flex gap-2 items-end mt-2"
                          >
                            <Input
                              name="city"
                              value={
                                editingCity && editingCity.regionId === region.id
                                  ? cityForm.name
                                  : ""
                              }
                              onChange={(e) =>
                                setCityForm({ name: e.target.value })
                              }
                              placeholder="City name"
                              className="w-48 border rounded px-3 py-2"
                              required
                            />
                            <Button type="submit" variant={"submit"} className="h-10">
                              {editingCity && editingCity.regionId === region.id
                                ? "Update"
                                : "Add"}
                            </Button>
                            {editingCity && editingCity.regionId === region.id && (
                              <Button
                                type="button"
                                variant={"cancel"}
                                className="h-10"
                                onClick={() => {
                                  setEditingCity(null);
                                  setCityForm({ name: "" });
                                }}
                              >
                                Cancel
                              </Button>
                            )}
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>
        {/* Add/Update Region Form */}
        <div className="w-full md:w-[400px]">
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-lg font-semibold mb-4 ">
              {editingRegionId ? "Update Region" : "Add Region"}
            </h2>
            <form onSubmit={handleRegionSubmit} className="space-y-4">
              <div>
                <Label className="text-sm mb-1">Region Name</Label>
                <Input
                  name="region"
                  value={regionForm.name}
                  onChange={(e) =>
                    setRegionForm({ name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:border-secondary"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant={"submit"} className="h-10">
                  {editingRegionId ? "Update" : "Add"}
                </Button>
                {editingRegionId && (
                  <Button
                    type="button"
                    variant={"cancel"}
                    className="h-10"
                    onClick={() => {
                      setEditingRegionId(null);
                      setRegionForm({ name: "" });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;