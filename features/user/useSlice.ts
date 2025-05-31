import { toast } from "sonner";

export const handleApprove = async (propertyId: string) => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_URL_SERVER}/api/admin/${propertyId}/properties/approve`,
    //   {
    //     method: "PUT",
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error("Failed to delete property");
    // }

    // // Update the `properties` state after deleting the property
    // setProperties((prevProperties) =>
    //   prevProperties.filter((property) => property._id !== propertyId)
    // );

    toast("The Provider was approved successfully");
  } catch (error) {
    toast("Something went wrong while approve the property");
  }
};



export async function deleteUser() {
  try {

    // { id, setProperty }


    // setProperty((prevData) =>
    //   prevData.filter((property) => property._id !== id)
    // );
    
    // const response = await fetch(`${URL_SERVER}/api/properties/${id}`, {
    //   method: "DELETE",
    // });

    // console.log(response);

    // if (!response.ok) {
    //   throw new Error("Failed to delete property");
    // }

    toast( "the user deleted succussfuly",
    );


  } catch (error) {
    console.error("Failed to delete property", error);
    toast( "An error occurred while trying to delete the property.");

  }
}
