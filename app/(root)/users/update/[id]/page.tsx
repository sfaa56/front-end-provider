"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FiChevronRight, FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  address: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value && value.length < 5) {
          return false;
        }
        return true;
      },
      {
        message: "Address must be at least 5 characters long",
      }
    ),

  specialty: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value && value.length < 2) {
          return false;
        }
        return true;
      },
      { message: "Job specialty must be at least 2 characters long" }
    ),

  username: z.string().min(2, {
    message: "First Name must be at least 2 characters long",
  }),

  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phoneNumber: z.string().regex(/^\d{10,15}$/, {
    message: "Please enter a valid phone number (10-15 digits)",
  }),
  image: z.any().optional(),
  file: z.string().optional(),
  city: z.string().optional(),
});

function Page() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty: "engineer",
      address: "",
      username: "karem",
      email: "ka@gmail.com",
      phoneNumber: "+551515869",
      image: "",
      city: "Cairo",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // setError(""); // Reset the error
    // setLoadingButton(true);
    console.log("Form Values:", values);

    // if (imageBuffers) {
    //   values.file = imageBuffers;
    // }

    console.log("vvvvvvv", values.file);

    // values.city = citySend;

    // console.log("lllllllllllllllllllllllllll", values);
    try {
      //   const response = await fetch(`${URL_SERVER}/api/users/${id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     if (errorData.message) {
      //       throw new Error(errorData.message);
      //     }
      //     throw new Error("Failed to send data to the server");
      //   }

      // Parse the response if needed
      //   const result = await response.json();
      //   console.log("Response from API:", result);

      toast("Your request was added successfully.");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast("Your request was not received.");
      //   setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      {loading ? (
        <span>loading</span>
      ) : (
        <div className="mx-[20px]">
          {/* Breadcrumb */}
          <nav
            className="flex items-center text-sm text-gray-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href={"/users"}>
            <span className="hover:underline cursor-pointer text-secondary">
              Users List
            </span>
            </Link>
            <FiChevronRight className="mx-2" />
            <span className="font-semibold text-gray-700">Update</span>
          </nav>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-8  grid grid-cols-2 gap-x-6  rounded-md"
          >
            <div className="col-span-2 w-40">
              {" "}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="  ">
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                        />

                        <label
                          htmlFor="imageUpload"
                          className="flex items-center justify-start border-2 border-dashed border-gray-400 rounded-2xl p-5 w-full hover:shadow-md cursor-pointer text-center"
                        >
                          <div className="flex text-md flex-col items-center px-[25%] justify-center space-y-2">
                            <FiUpload className="text-gray-600 text-xl" />
                            <p className="text-gray-600 font-medium">
                              Upload Image
                            </p>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 grid gap-6 lg:grid-cols-2">
              {/*  Name Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder={"EnterName"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={"Enter PhoneNumber"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <FormControl>
                      <Input placeholder={"specialty"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Address"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"address"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"email"}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-50"
                        readOnly
                        placeholder={"email"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City{" "}
                      <span className="text-xs text-gray-400">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {errorr && <p style={{ color: "red" }}>{errorr}</p>} */}
            <Button
              size="sm"
              className="flex w-full col-span-2 bg-secondary text-white hover:bg-secondary/80 justify-center"
              type="submit"
              // disabled={loadingButton} // Disable the button while loading
            >
              {/* {loadingButton ? "saving" : "save"} */}
              Save
              {/* Change text while loading */}
            </Button>
          </form>
        </div>
      )}
    </Form>
  );
}

export default Page;
