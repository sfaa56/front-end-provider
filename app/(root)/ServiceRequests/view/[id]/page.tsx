"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { FiEdit, FiTrash2, FiMessageCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Page() {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  commentRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  commentRef.current?.focus();

  // Mock data (replace with real data/fetch)
  const client = {
    name: "Ahmed Ali",
    registerDate: "2023-01-15",
    city: "Cairo",
    email: "ahmed.ali@email.com",
  };

  const request = {
    status: "In Progress",
    postDate: "4 days ago",
    estimateTime: "3 days",
    specialty: "Plumbing",
    title: "Fix kitchen sink leak",
    description:
      "There is a leak under the kitchen sink that needs urgent repair.",
    attachments: [
      { name: "photo1.jpg", url: "#" },
      { name: "invoice.pdf", url: "#" },
    ],
    offers: [
      {
        provider: "Provider One",
        price: "$50",
        message: "Can do it tomorrow.",
      },
      { provider: "Provider Two", price: "$45", message: "Available today." },
    ],
  };

  const offers = [
    {
      provider: "Provider One",
      avatar: "https://i.pravatar.cc/40?img=21",
      specialty: "Plumber",
      rating: 4.8,
      price: "$50",
      estimateTime: "1 day",
      message: "Can do it tomorrow.",
    },
    {
      provider: "Provider Two",
      avatar: "https://i.pravatar.cc/40?img=22",
      specialty: "Handyman",
      rating: 4.6,
      price: "$45",
      estimateTime: "2 days",
      message: `Available today 
Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe veniam ipsa nisi itaque ipsum minus alias, fugiat nobis numquam fugit eius pariatur assumenda ut qui provident, rem soluta quo eveniet?  nulla mollitia illo numquam asperiores ratione voluptate enim
              officiis nostrum? Praesentium veritatis repellendus amet
              architecto pariatur consectetur? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Blanditiis, facilis optio? Libero
              eius molestiae modi numquam recusandae accusantium non explicabo
              saepe consequuntur amet, labore officiis laudantium placeat sit.
              Voluptate, explicabo? nulla mollitia illo numquam asperiores ratione voluptate enim
              officiis nostrum? Praesentium veritatis repellendus amet
              architecto pariatur consectetur? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Blanditiis, facilis optio? Libero
              eius molestiae modi numquam recusandae accusantium non explicabo
              saepe consequuntur amet, labore officiis laudantium placeat sit.
              Voluptate, explicabo? nulla mollitia illo numquam asperiores ratione voluptate enim
              officiis nostrum? Praesentium veritatis repellendus amet
              architecto pariatur consectetur? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Blanditiis, facilis optio? Libero
              eius molestiae modi numquam recusandae accusantium non explicabo
              saepe consequuntur amet, labore officiis laudantium placeat sit.
              Voluptate, explicabo?
    `,
    },
  ];

  return (
    <div className="flex flex-col mx-[20px] mb-10">
      <nav
        className="flex items-center text-sm text-gray-500 mb-4"
        aria-label="Breadcrumb"
      >
        <Link href={"/overview"}>
          <span className="hover:underline cursor-pointer ">Home</span>
        </Link>
        <FiChevronRight className="mx-2" />

        <Link href={"/ServiceRequests"}>
          <span className="hover:underline cursor-pointer ">
            Service Requests
          </span>
        </Link>
        <FiChevronRight className="mx-2" />
        <span className=" t">View</span>
      </nav>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6  ">
        {/* Left: Request Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
          {request.title}
        </h1>
        {/* Right: Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="border flex items-center gap-1 rounded text-secondary bg-secondary bg-opacity-10 hover:bg-secondary hover:bg-opacity-20 transition"
            title="Comment"
            onClick={() => {
              commentRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              setTimeout(() => commentRef.current?.focus(), 400);
            }}
          >
            <FiMessageCircle />
            <span className="hidden sm:inline">Comment</span>
          </Button>

          <Button
            className="flex items-center gap-1 px-4 py-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            title="Update"
          >
            <FiEdit />
            <span className="hidden sm:inline">Update</span>
          </Button>

          <Button
            className=" flex items-center gap-1 px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
            title="Delete"
          >
            <FiTrash2 />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Left Column */}
        <div className="md:w-1/3 w-full space-y-5">
          {/* Service Request Info */}
          <div className="bg-white rounded-sm shadow p-4">
            <h2 className="text-base font-medium ">Request Info</h2>
            <div className="-mx-4 w-[calc(100%+2rem)] h-[1px] bg-gray-300 my-3 mb-4"></div>

            <div className="flex gap-[146px] text-sm">
              <div className="flex gap-2 flex-col">
                <span className="font-medium  mb-2">Status </span>
                <span className="font-medium ">Post Date </span>
                <span className="font-medium ">Estima</span>
                <span>Cost</span>
                <span className="font-medium ">Specialty </span>
              </div>

              <div className="flex gap-2 flex-col">
                <span
                  className={`px-2 py-1 mb-2 rounded-full text-xs font-semibold
                ${
                  request.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : request.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                >
                  {request.status}
                </span>

                <span> {request.postDate}</span>

                <span>{request.estimateTime}</span>
                <span>500$ - 250$</span>
                <span>{request.specialty}</span>
              </div>
            </div>
          </div>
          {/* Client Details */}
          <div className="bg-white rounded-sm shadow p-4">
            <h2 className="text-base font-medium  ">Client Details</h2>
            <div className="-mx-4 w-[calc(100%+2rem)] h-[1px] bg-gray-300 my-3"></div>

            <div className="space-y-3 text-sm">
              <div>
                {client.name}
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <FaBriefcase /> Doctor
                </span>
              </div>

              <div className="flex  gap-20">
                <div className="flex flex-col gap-2">
                  <span className="font-medium ">Register</span>
                  <span className="font-medium ">Email </span>

                  <span className="font-medium ">City </span>
                  <span className="font-medium ">Open Services </span>
                  <span className="font-medium ">Inprogress Services </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>{client.registerDate}</span>
                  <span> {client.email}</span>

                  <span> {client.city}</span>
                  <span>6</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comment */}

          <div className="bg-white rounded-sm shadow p-4 mt-8">
            <h2 className="text-base font-medium mb-2">Leave a Comment</h2>
            <textarea
              ref={commentRef}
              className="w-full min-h-[255px] border rounded p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Write your comment here..."
            />
            <Button className="mt-2 bg-secondary text-white">Send</Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 w-full space-y-5">
          {/* Request Details */}
          <div className="bg-white rounded-sm shadow p-4">
            <h2 className="text-base font-medium  ">Request Details</h2>
            <div className="-mx-4 w-[calc(100%+2rem)] h-[1px] bg-gray-300 my-3"></div>

            <div className="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex a
              odio culpa saepe, tempora excepturi sit nobis repellat,
              perspiciatis totam eligendi architecto dolorum minus dolor maxime
              est nihil sapiente magni! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Molestias libero, veritatis laborum consequuntur
              nulla mollitia illo numquam asperiores ratione voluptate enim
              officiis nostrum? Praesentium veritatis repellendus amet
              architecto pariatur consectetur? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Blanditiis, facilis optio? Libero
              eius molestiae modi numquam recusandae accusantium non explicabo
              saepe consequuntur amet, labore officiis laudantium placeat sit.
              Voluptate, explicabo?
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-sm shadow p-4">
            <h2 className="text-base font-medium">Attachments</h2>
            <div className="-mx-4 w-[calc(100%+2rem)] h-[1px] bg-gray-300 my-3"></div>

            <ul className="list-disc pl-5 space-y-1">
              {request.attachments.map((att, idx) => (
                <li key={idx}>
                  <a
                    href={att.url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {att.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offers */}
          <div className="bg-white rounded-sm shadow p-4">
            <h2 className="text-base font-medium"> Provider Offers</h2>
            <div className="-mx-4 w-[calc(100%+2rem)] h-[1px] bg-gray-300 my-3"></div>

            <ul className="space-y-4">
              {offers.map((offer, idx) => (
                <li
                  key={idx}
                  className="border rounded p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 bg-gray-50  "
                >
                  <div className="flex flex-col">
                    {/* Left: Provider Info */}
                    <div className="flex items-center  gap-4 min-w-[220px]">
                      <img
                        src={offer.avatar}
                        alt={offer.provider}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 flex items-center gap-2 ">
                          <span className="hover:text-secondary hover:cursor-pointer">
                            {" "}
                            {offer.provider}
                          </span>
                          <span className="flex items-center text-yellow-500 text-xs ml-2 ">
                            ★ {offer.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {offer.specialty}
                        </div>
                      </div>
                    </div>
                    {/* Right: Price & Time */}
                    <div className="flex flex-col items-end gap-1 min-w-[90px]">
                      <span className="text-lg font-bold text-secondary">
                        {offer.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {offer.estimateTime}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Offer Message */}
                  <div className="flex-1 min-w-0 text-gray-600 text-sm break-words">
                    {offer.message}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
