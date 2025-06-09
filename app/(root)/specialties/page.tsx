"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";

type Specialty = {
  id: number;
  specialty: string;
  subSpecialties: string[];
};

const initialSpecialties: Specialty[] = [
  {
    id: 1,
    specialty: "Electrician",
    subSpecialties: [
      "Wiring",
      "Circuit Breakers",
      "Lighting Installation",
      "Power Outage Repair",
    ],
  },
  {
    id: 2,
    specialty: "Plumber",
    subSpecialties: [
      "Pipe Fixing",
      "Water Heater Repair",
      "Leak Detection",
      "Toilet Installation",
    ],
  },
  {
    id: 3,
    specialty: "Mechanic",
    subSpecialties: [
      "Engine Repair",
      "Brake Check",
      "Suspension Fix",
      "Battery Replacement",
    ],
  },
  {
    id: 4,
    specialty: "IT Technician",
    subSpecialties: [
      "Network Setup",
      "Hardware Troubleshooting",
      "Virus Removal",
      "System Backup",
    ],
  },
  {
    id: 5,
    specialty: "Legal Consultant",
    subSpecialties: [
      "Corporate Law",
      "Real Estate Law",
      "Contract Review",
      "Labor Law",
    ],
  },
];

function Page() {
  const [specialties, setSpecialties] = useState<Specialty[]>(initialSpecialties);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({ specialty: "", subSpecialty: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [subSpecialtyTags, setSubSpecialtyTags] = useState<string[]>([]);
  const subSpecialtyInputRef = useRef<HTMLInputElement>(null);

  // When editing, fill tags
  React.useEffect(() => {
    if (editingId !== null) {
      setSubSpecialtyTags(
        specialties.find((sp) => sp.id === editingId)?.subSpecialties || []
      );
      setForm({
        specialty: specialties.find((sp) => sp.id === editingId)?.specialty || "",
        subSpecialty: "",
      });
    } else {
      setSubSpecialtyTags([]);
      setForm({ specialty: "", subSpecialty: "" });
    }
  }, [editingId, specialties]);

  // Handle tag input
  const handleSubSpecialtyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      subSpecialtyInputRef.current &&
      subSpecialtyInputRef.current.value.trim()
    ) {
      e.preventDefault();
      const value = subSpecialtyInputRef.current.value.trim();
      if (value && !subSpecialtyTags.includes(value)) {
        setSubSpecialtyTags([...subSpecialtyTags, value]);
      }
      subSpecialtyInputRef.current.value = "";
    }
  };

  // Remove tag
  const handleRemoveTag = (idx: number) => {
    setSubSpecialtyTags(subSpecialtyTags.filter((_, i) => i !== idx));
  };

  // Handle add/update submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.specialty.trim() || subSpecialtyTags.length === 0) return;

    if (editingId) {
      setSpecialties((prev) =>
        prev.map((sp) =>
          sp.id === editingId
            ? {
                ...sp,
                specialty: form.specialty,
                subSpecialties: subSpecialtyTags,
              }
            : sp
        )
      );
      setEditingId(null);
    } else {
      const newId = specialties.length
        ? Math.max(...specialties.map((s) => s.id)) + 1
        : 1;
      setSpecialties([
        ...specialties,
        {
          id: newId,
          specialty: form.specialty,
          subSpecialties: subSpecialtyTags,
        },
      ]);
    }
    setForm({ specialty: "", subSpecialty: "" });
    setSubSpecialtyTags([]);
  };

  // Handle update button
  const handleEdit = (sp: Specialty) => {
    setForm({ specialty: sp.specialty, subSpecialty: "" });
    setEditingId(sp.id);
    setSubSpecialtyTags(sp.subSpecialties);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setSpecialties((prev) => prev.filter((sp) => sp.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ specialty: "", subSpecialty: "" });
      setSubSpecialtyTags([]);
    }
  };

  return (
    <div className="px-6">
      <div className="flex w-full items-end ">
        <h1 className="text-black-200 font-semibold text-xl font-sans mb-4">
          Specialties
        </h1>
      </div>

      <div className="mx-auto flex flex-col md:flex-row gap-8">
        {/* Specialties List */}
        <div className="flex-1 space-y-5">
          {specialties.map((sp) => (
            <div
              key={sp.id}
              className="bg-white rounded-xl shadow p-5 transition hover:shadow-lg hover:cursor-pointer"
              onClick={() => setExpandedId(expandedId === sp.id ? null : sp.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">{sp.specialty}</span>
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                    {sp.subSpecialties.length} Sub-specialt{sp.subSpecialties.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 text-xs font-medium transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(sp);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 text-xs font-medium transition"
                    onClick={() =>
                      setExpandedId(expandedId === sp.id ? null : sp.id)
                    }
                  >
                    {expandedId === sp.id ? "Hide Sub-specialties" : "View Sub-specialties"}
                  </button>
                  <button
                    className="px-3 py-1 rounded border-red-400 border text-red-700 hover:bg-red-50 text-xs font-medium transition"
                    onClick={() => handleDelete(sp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* Animated expand/collapse */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expandedId === sp.id ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                {expandedId === sp.id && (
                  <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 marker:text-secondary">
                    {sp.subSpecialties.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add/Update Specialty Form */}
        <div className="w-full md:w-[600px]">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 ">
              {editingId ? "Update Specialty" : "Add Specialty"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm mb-1">Specialty</Label>
                <Input
                  name="specialty"
                  value={form.specialty}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, specialty: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2 focus:border-secondary"
                  required
                />
              </div>
<div>
  <Label className="text-sm mb-1">Sub-specialties</Label>
  <div className="flex flex-col gap-2 mb-2">
    {subSpecialtyTags.map((tag, idx) => (
      <div key={idx} className="flex items-center gap-2">
<Input
  type="text"
  value={tag}
  onChange={e => {
    const updated = [...subSpecialtyTags];
    updated[idx] = e.target.value;
    setSubSpecialtyTags(updated);
  }}
  className={`flex-1 border rounded px-2 py-1 text-xs transition ${
    tag.trim() ? "bg-secondary/10" : ""
  }`}
/>
        <button
          type="button"
          className="text-red-500 text-lg px-2"
          onClick={() => handleRemoveTag(idx)}
          tabIndex={-1}
        >
          ×
        </button>
      </div>
    ))}
  </div>
  <Input
    ref={subSpecialtyInputRef}
    type="text"
    placeholder="Type a sub-specialty and press Enter"
    onKeyDown={handleSubSpecialtyInput}
    className="w-full border rounded px-3 py-2"
  />
</div>

              <div className="flex gap-2">
                <Button type="submit" variant={"submit"} className="h-10">
                  {editingId ? "Update" : "Add"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant={"cancel"}
                    className="h-10"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ specialty: "", subSpecialty: "" });
                      setSubSpecialtyTags([]);
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