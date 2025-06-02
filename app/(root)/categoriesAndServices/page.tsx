"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";

const initialCategories = [
  {
    id: 1,
    title: "Plumbing",
    servicesCount: 5,
    services: [
      "Leak Repair",
      "Pipe Installation",
      "Drain Cleaning",
      "Water Heater",
      "Toilet Repair",
    ],
  },
  {
    id: 2,
    title: "Electrical",
    servicesCount: 8,
    services: [
      "Wiring",
      "Lighting",
      "Circuit Breaker",
      "Outlet Repair",
      "Ceiling Fan",
      "Generator",
      "Panel Upgrade",
      "Inspection",
    ],
  },
  {
    id: 3,
    title: "Cleaning",
    servicesCount: 3,
    services: ["Home Cleaning", "Office Cleaning", "Carpet Cleaning"],
  },
];

function Page() {
  const [categories, setCategories] = useState(initialCategories);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Form state

  const [form, setForm] = useState({ title: "", services: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [serviceTags, setServiceTags] = useState<string[]>([]);
  const serviceInputRef = useRef<HTMLInputElement>(null);

  // When editing, fill tags
  React.useEffect(() => {
    if (editingId !== null) {
      setServiceTags(
        categories.find((cat) => cat.id === editingId)?.services || []
      );
    } else {
      setServiceTags([]);
    }
  }, [editingId]);

  // Handle tag input
  const handleServiceInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      serviceInputRef.current &&
      serviceInputRef.current.value.trim()
    ) {
      e.preventDefault();
      const value = serviceInputRef.current.value.trim();
      if (value && !serviceTags.includes(value)) {
        setServiceTags([...serviceTags, value]);
      }
      serviceInputRef.current.value = "";
    }
  };

  // Remove tag
  const handleRemoveTag = (idx: number) => {
    setServiceTags(serviceTags.filter((_, i) => i !== idx));
  };

  // Handle add/update submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || serviceTags.length === 0) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                title: form.title,
                services: serviceTags,
                servicesCount: serviceTags.length,
              }
            : cat
        )
      );
      setEditingId(null);
    } else {
      const newId = categories.length
        ? Math.max(...categories.map((c) => c.id)) + 1
        : 1;
      setCategories([
        ...categories,
        {
          id: newId,
          title: form.title,
          services: serviceTags,
          servicesCount: serviceTags.length,
        },
      ]);
    }
    setForm({ title: "", services: "" });
    setServiceTags([]);
  };

  // Handle update button
  const handleEdit = (cat: (typeof categories)[0]) => {
    setForm({ title: cat.title, services: "" });
    setEditingId(cat.id);
    setServiceTags(cat.services);
  };

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ title: "", services: "" });
    }
  };

  // Handle cancel update
  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", services: "" });
  };

  return (
    <div className="px-6">
      <div className="flex w-full items-end ">
        <h1 className="text-black-200 font-semibold text-xl font-sans  mb-4">
          Categories
        </h1>
      </div>

      <div className=" mx-auto  flex flex-col md:flex-row gap-8">
        {/* Categories List */}
        <div className="flex-1 space-y-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl shadow p-5 transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">{cat.title}</span>
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                    {cat.servicesCount} Service
                    {cat.servicesCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium transition"
                    onClick={() => handleEdit(cat)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium transition"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition"
                    onClick={() =>
                      setExpandedId(expandedId === cat.id ? null : cat.id)
                    }
                  >
                    {expandedId === cat.id ? "Hide Services" : "View Services"}
                  </button>
                </div>
              </div>
              {/* Animated expand/collapse */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expandedId === cat.id ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                {expandedId === cat.id && (
                  <ul className="list-disc  pl-6 text-sm text-gray-700 space-y-1  marker:text-secondary">
                    {cat.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add/Update Category Form */}
        <div className="w-full md:w-[600px]">
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-lg font-semibold mb-4 ">
              {editingId ? "Update Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className=" text-sm  mb-1">Title</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2 focus:border-secondary"
                  required
                />
              </div>

              <div>
                <Label className="text-sm ">Services</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {serviceTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-secondary "
                        onClick={() => handleRemoveTag(idx)}
                        tabIndex={-1}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <Input
                  ref={serviceInputRef}
                  type="text"
                  placeholder="Type a service and press Enter"
                  onKeyDown={handleServiceInput}
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
                      setForm({ title: "", services: "" });
                      setServiceTags([]);
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
