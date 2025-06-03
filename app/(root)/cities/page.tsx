"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

// Types
type PostalCode = { code: string; active: boolean };
type District = {
  name: string;
  active: boolean;
  postalCodes: PostalCode[];
  newPostalCode?: string;
};
type City = { name: string; active: boolean; districts: District[] };

// Initial Data
const initialCities: City[] = [
  {
    name: "City A",
    active: true,
    districts: [
      {
        active: true,
        name: "District 1",
        postalCodes: [
          { active: true, code: "10001" },
          { active: true, code: "10002" },
        ],
      },
      {
        active: true,
        name: "District 2",
        postalCodes: [{ active: true, code: "10003" }],
      },
    ],
  },
  {
    name: "City B",
    active: false,
    districts: [
      {
        active: true,
        name: "District 3",
        postalCodes: [{ active: true, code: "20001" }],
      },
    ],
  },
];

function Page() {
  // State
  const [cities, setCities] = useState<City[]>(initialCities);
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [selectedDistrictIdx, setSelectedDistrictIdx] = useState<number | null>(
    null
  );

  const [districtPostalCodes, setDistrictPostalCodes] = useState<string[]>([]);
  const [newDistrictPostal, setNewDistrictPostal] = useState("");

  // City form
  const [cityForm, setCityForm] = useState<{
    name: string;
    districts: District[];
    newDistrict: string;
  }>({
    name: "",
    districts: [],
    newDistrict: "",
  });
  const [editingCityIdx, setEditingCityIdx] = useState<number | null>(null);

  // District form
  const [districtForm, setDistrictForm] = useState({ name: "" });
  const [editingDistrictIdx, setEditingDistrictIdx] = useState<number | null>(
    null
  );

  // Postal code form
  const [postalForm, setPostalForm] = useState({ code: "" });
  const [editingPostalIdx, setEditingPostalIdx] = useState<number | null>(null);

  // --- City Handlers ---
  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityForm.name.trim()) return;
    if (editingCityIdx !== null) {
      setCities((prev) =>
        prev.map((c, idx) =>
          idx === editingCityIdx ? { ...c, name: cityForm.name } : c
        )
      );
      setEditingCityIdx(null);
    } else {
      setCities([
        ...cities,
        { name: cityForm.name, active: true, districts: [] },
      ]);
    }
    setCityForm({ name: "", districts: [], newDistrict: "" });
  };

const handleEditCity = (idx: number) => {
  setCityForm({
    name: cities[idx].name,
    districts: cities[idx].districts.map((d) => ({
      ...d,
      newPostalCode: "",
    })),
    newDistrict: "",
  });
  setEditingCityIdx(idx);
};

  const handleDeleteCity = (idx: number) => {
    setCities((prev) => prev.filter((_, i) => i !== idx));
    setEditingCityIdx(null);
    setCityForm({ name: "", districts: [], newDistrict: "" });
  };

  const handleToggleCityActive = (idx: number) => {
    setCities((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, active: !c.active } : c))
    );
  };

  // --- District Handlers ---
  // const handleDistrictSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (selectedCityIdx === null || !districtForm.name.trim()) return;
  //   if (editingDistrictIdx !== null) {
  //     setCities((prev) =>
  //       prev.map((city, cIdx) =>
  //         cIdx === selectedCityIdx
  //           ? {
  //               ...city,
  //               districts: city.districts.map((d, dIdx) =>
  //                 dIdx === editingDistrictIdx
  //                   ? { ...d, name: districtForm.name }
  //                   : d
  //               ),
  //             }
  //           : city
  //       )
  //     );
  //     setEditingDistrictIdx(null);
  //   } else {
  //     setCities((prev) =>
  //       prev.map((city, cIdx) =>
  //         cIdx === selectedCityIdx
  //           ? {
  //               ...city,
  //               districts: [
  //                 ...city.districts,
  //                 { name: districtForm.name, postalCodes: [] },
  //               ],
  //             }
  //           : city
  //       )
  //     );
  //   }
  //   setDistrictForm({ name: "" });
  // };

  const handleEditDistrict = (idx: number) => {
  if (selectedCityIdx === null) return;
  const district = cities[selectedCityIdx].districts[idx];
  setDistrictForm({ name: district.name });
  setDistrictPostalCodes(district.postalCodes.map((p) => p.code));
  setNewDistrictPostal("");
  setEditingDistrictIdx(idx);
};

  const handleDeleteDistrict = (idx: number) => {
    if (selectedCityIdx === null) return;
    setCities((prev) =>
      prev.map((city, cIdx) =>
        cIdx === selectedCityIdx
          ? {
              ...city,
              districts: city.districts.filter((_, dIdx) => dIdx !== idx),
            }
          : city
      )
    );
    setEditingDistrictIdx(null);
    setDistrictForm({ name: "" });
  };

  // --- Postal Code Handlers ---
  const handlePostalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      selectedCityIdx === null ||
      selectedDistrictIdx === null ||
      !postalForm.code.trim()
    )
      return;
    if (editingPostalIdx !== null) {
      setCities((prev) =>
        prev.map((city, cIdx) =>
          cIdx === selectedCityIdx
            ? {
                ...city,
                districts: city.districts.map((district, dIdx) =>
                  dIdx === selectedDistrictIdx
                    ? {
                        ...district,
                        postalCodes: district.postalCodes.map((p, pIdx) =>
                          pIdx === editingPostalIdx
                            ? { ...p, code: postalForm.code, active: p.active }
                            : p
                        ),
                      }
                    : district
                ),
              }
            : city
        )
      );
      setEditingPostalIdx(null);
    } else {
      setCities((prev) =>
        prev.map((city, cIdx) =>
          cIdx === selectedCityIdx
            ? {
                ...city,
                districts: city.districts.map((district, dIdx) =>
                  dIdx === selectedDistrictIdx
                    ? {
                        ...district,
                        postalCodes: [
                          ...district.postalCodes,
                          { code: postalForm.code, active: true },
                        ],
                      }
                    : district
                ),
              }
            : city
        )
      );
    }
    setPostalForm({ code: "" });
  };

  const handleEditPostal = (idx: number) => {
    if (selectedCityIdx === null || selectedDistrictIdx === null) return;
    setPostalForm({
      code: cities[selectedCityIdx].districts[selectedDistrictIdx].postalCodes[
        idx
      ].code,
    });
    setEditingPostalIdx(idx);
  };

  const handleDeletePostal = (idx: number) => {
    if (selectedCityIdx === null || selectedDistrictIdx === null) return;
    setCities((prev) =>
      prev.map((city, cIdx) =>
        cIdx === selectedCityIdx
          ? {
              ...city,
              districts: city.districts.map((district, dIdx) =>
                dIdx === selectedDistrictIdx
                  ? {
                      ...district,
                      postalCodes: district.postalCodes.filter(
                        (_, pIdx) => pIdx !== idx
                      ),
                    }
                  : district
              ),
            }
          : city
      )
    );
    setEditingPostalIdx(null);
    setPostalForm({ code: "" });
  };

  // --- Breadcrumb ---
  const breadcrumb = (
    <div>
      {selectedCityIdx === null && selectedDistrictIdx === null && (
        <h1 className="text-black-200 font-semibold text-xl font-sans w-80">
          Regions & Cities
        </h1>
      )}

      {(selectedCityIdx !== null || selectedDistrictIdx !== null) && (
        <span
          className={`lex w-full items-end`}
          onClick={() => {
            setSelectedCityIdx(null);
            setSelectedDistrictIdx(null);
          }}
        >
          <span className="hover:underline cursor-pointer "> Regions</span>
        </span>
      )}

      {selectedCityIdx !== null && (
        <>
          <span className="mx-2">{">"}</span>
          <span
            className={`hover:underline cursor-pointer ${
              selectedDistrictIdx === null ? "text-secondary font-semibold" : ""
            }`}
            onClick={() => setSelectedDistrictIdx(null)}
          >
            {cities[selectedCityIdx].name}
          </span>
        </>
      )}

      {selectedDistrictIdx !== null && selectedCityIdx !== null && (
        <>
          <span className="mx-2">{">"}</span>
          <span className="font-semibold text-secondary">
            {cities[selectedCityIdx].districts[selectedDistrictIdx].name}
          </span>
        </>
      )}
    </div>
  );

  // --- UI ---
  return (
    <div className="px-6">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        {breadcrumb}
      </div>

      <div className="mx-auto flex flex-col md:flex-row gap-8 justify-start">
        <div className="flex-1 ">
          {/* Cities Table */}
          {selectedCityIdx === null ? (
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b ">
                  <th className="p-3 text-left font-normal">City</th>
                  <th className="p-3 text-left font-normal">Districts</th>
                  <th className="p-3 text-left font-normal">Postal Codes</th>
                  <th className="p-3 text-left font-normal">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, idx) => (
                  <tr key={idx} className="border-b ">
                    <td className="p-3 font-semibold">{city.name}</td>

                    <td className="p-3 font-semibold">
                      {city.districts.length}
                    </td>

                    <td className="p-3 font-semibold">
                      {city.districts.reduce(
                        (sum, d) => sum + d.postalCodes.length,
                        0
                      )}
                    </td>

                    <td className="p-3">
                      <span
                        className={`inline-block text-center py-1 font-medium rounded-full text-xs w-[60px] ${
                          city.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {city.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 justify-self-end">
                      <button
                        className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs  transition"
                        onClick={() => handleEditCity(idx)}
                      >
                        Update
                      </button>
                      <button
                        className="px-2 py-0.5 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs  transition"
                        onClick={() => handleDeleteCity(idx)}
                      >
                        Delete
                      </button>
                      <button
                        className={`px- w-[76px] py-1 rounded text-xs transition ${
                          city.active
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        onClick={() => handleToggleCityActive(idx)}
                      >
                        {city.active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs transition"
                        onClick={() => {
                          setSelectedCityIdx(idx);
                          setSelectedDistrictIdx(null);
                        }}
                      >
                        View Districts
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : selectedDistrictIdx === null ? (
            // Districts Table
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3 text-left font-normal">District</th>
                  <th className="p-3 text-left font-normal ">Postal Codes</th>
                  <th className="p-3 text-left font-normal ">Status</th>
                  <th className="p-3 text-left font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {cities[selectedCityIdx].districts.map((district, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3 font-medium">{district.name}</td>
                    <td className="p-3 font-medium">
                      {district.postalCodes.length}
                    </td>
                    <td >
                      <span
                        className={`inline-block text-center w-[60px] py-1 rounded-full text-xs font-semibold ${
                          district.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {district.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 justify-end">
                      <button
                        className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
                        onClick={() => handleEditDistrict(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-0.5 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs"
                        onClick={() => handleDeleteDistrict(idx)}
                      >
                        Delete
                      </button>

                      <button
                        className={`w-[76px] py-0.5 rounded text-xs  transition ${
                          district.active
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        onClick={() => {
                          setCities((prev) =>
                            prev.map((city, cIdx) =>
                              cIdx === selectedCityIdx
                                ? {
                                    ...city,
                                    districts: city.districts.map((d, dIdx) =>
                                      dIdx === idx
                                        ? { ...d, active: !d.active }
                                        : d
                                    ),
                                  }
                                : city
                            )
                          );
                        }}
                      >
                        {district.active ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs"
                        onClick={() => setSelectedDistrictIdx(idx)}
                      >
                        View Postal Codes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Postal Codes Table
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b ">
                  <th className="font-normal p-3 text-left">Postal Code</th>
                  <th className="font-normal p-3 text-left">Status</th>
                  <th className="font-normal p-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {cities[selectedCityIdx].districts[
                  selectedDistrictIdx
                ].postalCodes.map((postal, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3 font-medium">{postal.code}</td>
                    <td>
                      <span
                        className={`inline-block w-[60px] text-center py-1 rounded-full text-xs font-semibold ${
                          postal.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {postal.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2 justify-end">
                      <button
                        className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
                        onClick={() => handleEditPostal(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-0.5 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs"
                        onClick={() => handleDeletePostal(idx)}
                      >
                        Delete
                      </button>
                      <button
                        className={`w-[72px] py-0.5 rounded text-xs  transition ${
                          postal.active
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        onClick={() => {
                          setCities((prev) =>
                            prev.map((city, cIdx) =>
                              cIdx === selectedCityIdx
                                ? {
                                    ...city,
                                    districts: city.districts.map(
                                      (district, dIdx) =>
                                        dIdx === selectedDistrictIdx
                                          ? {
                                              ...district,
                                              postalCodes:
                                                district.postalCodes.map(
                                                  (p, pIdx) =>
                                                    pIdx === idx
                                                      ? {
                                                          ...p,
                                                          active: !p.active,
                                                        }
                                                      : p
                                                ),
                                            }
                                          : district
                                    ),
                                  }
                                : city
                            )
                          );
                        }}
                      >
                        {postal.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Side Add/Update Form */}
        <div className="w-full md:w-[600px]">
          <div className="bg-white rounded-md shadow p-6">
            {/* City Form */}
            {selectedCityIdx === null && (
              <>
                <h2 className="text-lg font-semibold mb-4 ">
                  {editingCityIdx !== null ? "Update City" : "Add City"}
                </h2>
                <form onSubmit={handleCitySubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm mb-1">City Name</Label>
                    <Input
                      name="city"
                      value={cityForm.name}
                      onChange={(e) =>
                        setCityForm({ ...cityForm, name: e.target.value })
                      }
                      className="w-full  rounded px-3 py-2 "
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1">Districts</Label>
                    <div className="flex flex-wrap gap-2 ">
                      {cityForm.districts?.map((district, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex flex-col bg-gray-50 rounded p-2 mb-2 gap-3 "
                        >

                          <div className="flex items-start justify-between -mt-2">
                            <span className="font-medium">{district.name}</span>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 "
                              onClick={() => {
                                setCityForm((prev) => ({
                                  ...prev,
                                  districts: prev.districts.filter(
                                    (_, i) => i !== dIdx
                                  ),
                                }));
                              }}
                            >
                              ×
                            </button>
                          </div>
                          
                          {/* Postal Codes for this district */}
                          <div className="flex flex-wrap gap-1 ">
                            {district.postalCodes.map((pc, pIdx) => (
                              <span
                                key={pIdx}
                                className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-xs flex items-center "
                              >
                                {pc.code}
                                <button
                                  type="button"
                                  className="ml-1 text-secondary hover:text-red-500"
                                  onClick={() => {
                                    setCityForm((prev) => ({
                                      ...prev,
                                      districts: prev.districts.map((d, i) =>
                                        i === dIdx
                                          ? {
                                              ...d,
                                              postalCodes: d.postalCodes.filter(
                                                (_, j) => j !== pIdx
                                              ),
                                            }
                                          : d
                                      ),
                                    }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {/* Add postal code input */}
                            <input
                              type="text"
                              placeholder="Add postal code"
                              className="border rounded px-2 py-0.5 text-xs w-[105px] focus:outline-none   focus:border-secondary"
                              value={district.newPostalCode || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCityForm((prev) => ({
                                  ...prev,
                                  districts: prev.districts.map((d, i) =>
                                    i === dIdx
                                      ? { ...d, newPostalCode: val }
                                      : d
                                  ),
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Enter" &&
                                  district.newPostalCode?.trim()
                                ) {
                                  e.preventDefault();
                                  setCityForm((prev) => ({
                                    ...prev,
                                    districts: prev.districts.map((d, i) =>
                                      i === dIdx
                                        ? {
                                            ...d,
                                            postalCodes: [
                                              ...d.postalCodes,
                                              d.newPostalCode
                                                ? {
                                                    code: d.newPostalCode.trim(),
                                                    active: true,
                                                  }
                                                : undefined,
                                            ].filter(Boolean) as PostalCode[],
                                            newPostalCode: "",
                                          }
                                        : d
                                    ),
                                  }));
                                }
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Add district input */}
                    <div className="flex gap-2 mt-">
                      <Input
                        type="text"
                        placeholder="District name"
                        value={cityForm.newDistrict || ""}
                        onChange={(e) =>
                          setCityForm((prev) => ({
                            ...prev,
                            newDistrict: e.target.value,
                          }))
                        }
                        className="w-48 border rounded "
                      />
                      <Button
                        type="button"
                        variant={"submit"}
                        className="h-auto bg-transparent text-black border hover:bg-transparent hover:border-gray-400"
                        onClick={() => {
                          if (!cityForm.newDistrict?.trim()) return;
                          setCityForm((prev) => ({
                            ...prev,
                            districts: [
                              ...(prev.districts || []),
                              {
                                name: prev.newDistrict.trim(),
                                active: true, // <-- Add this line
                                postalCodes: [],
                                newPostalCode: "",
                              },
                            ],
                            newDistrict: "",
                          }));
                        }}
                      >
                        Add District
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" variant={"submit"} className="h-10">
                      {editingCityIdx !== null ? "Update" : "Add"}
                    </Button>
                    {editingCityIdx !== null && (
                      <Button
                        type="button"
                        variant={"cancel"}
                        className="h-10"
                        onClick={() => {
                          setEditingCityIdx(null);
                          setCityForm({
                            name: "",
                            districts: [],
                            newDistrict: "",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}

            {/* District Form */}
            {selectedCityIdx !== null && selectedDistrictIdx === null && (
              <>
                <h2 className="text-lg font-semibold mb-4 ">
                  {editingDistrictIdx !== null
                    ? "Update District"
                    : "Add District"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!districtForm.name.trim()) return;
                    
                    // Add district with postal codes
                    setCities((prev) =>
                      prev.map((city, cIdx) =>
                        cIdx === selectedCityIdx
                          ? {
                              ...city,
                              districts: [
                                ...city.districts,
                                {
                                  name: districtForm.name,
                                  active: true,
                                  postalCodes: districtPostalCodes.map(
                                    (code) => ({ code, active: true })
                                  ),
                                },
                              ],
                            }
                          : city
                      )
                    );
                    setDistrictForm({ name: "" });
                    setDistrictPostalCodes([]);
                    setNewDistrictPostal("");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label className="text-sm mb-1">District Name</Label>
                    <Input
                      name="district"
                      value={districtForm.name}
                      onChange={(e) =>
                        setDistrictForm({ name: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 focus:border-secondary"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1">Postal Codes</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {districtPostalCodes.map((code, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          {code}
                          <button
                            type="button"
                            className="ml-1 text-secondary hover:text-red-500"
                            onClick={() =>
                              setDistrictPostalCodes((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add postal code"
                        className="border rounded px-2 py-0.5 text-xs w-[105px] focus:outline-none focus:border-secondary"
                        value={newDistrictPostal}
                        onChange={(e) => setNewDistrictPostal(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newDistrictPostal.trim()) {
                            e.preventDefault();
                            setDistrictPostalCodes((prev) => [
                              ...prev,
                              newDistrictPostal.trim(),
                            ]);
                            setNewDistrictPostal("");
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" variant={"submit"} className="h-10">
                      {editingDistrictIdx !== null ? "Update" : "Add"}
                    </Button>
                    {editingDistrictIdx !== null && (
                      <Button
                        type="button"
                        variant={"cancel"}
                        className="h-10"
                        onClick={() => {
                          setEditingDistrictIdx(null);
                          setDistrictForm({ name: "" });
                          setDistrictPostalCodes([]);
                          setNewDistrictPostal("");
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}

            {/* Postal Code Form */}
            {selectedCityIdx !== null && selectedDistrictIdx !== null && (
              <>
                <h2 className="text-lg font-semibold mb-4 ">
                  {editingPostalIdx !== null
                    ? "Update Postal Code"
                    : "Add Postal Code"}
                </h2>
                <form onSubmit={handlePostalSubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm mb-1">Postal Code</Label>
                    <Input
                      name="postal"
                      value={postalForm.code}
                      onChange={(e) => setPostalForm({ code: e.target.value })}
                      className="w-full border rounded px-3 py-2 focus:border-secondary"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" variant={"submit"} className="h-10">
                      {editingPostalIdx !== null ? "Update" : "Add"}
                    </Button>
                    {editingPostalIdx !== null && (
                      <Button
                        type="button"
                        variant={"cancel"}
                        className="h-10"
                        onClick={() => {
                          setEditingPostalIdx(null);
                          setPostalForm({ code: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
