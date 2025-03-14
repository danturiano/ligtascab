"use server";

import { createClient } from "@/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { updateUser } from "../db/setup";
import { AddressSchema, ProfileSchema } from "../schemas/setup";

type UploadProps = {
  file: File;
  bucket: string;
  documentId: string;
};

export async function updateUserInformation(User: unknown) {
  const result = ProfileSchema.safeParse(User);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const userInformation = {
    first_name: result.data.first_name,
    last_name: result.data.last_name,
    email: result.data.email,
    subscribe_to_newsletter: result.data.subscribe,
  };

  await updateUser(userInformation);

  if (result.success) {
    return { message: "Success!" };
  }
}

export async function updateUserAddress(User: unknown) {
  const result = AddressSchema.safeParse(User);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const userAddress = {
    street: result.data.street,
    barangay: result.data.barangay,
    city: result.data.city,
    postal_code: result.data.postal_code,
  };

  await updateUser(userAddress);

  if (result.success) {
    return { message: "Success!" };
  }
}

export const uploadImage = async ({
  file,
  bucket,
  documentId,
}: UploadProps) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);

  const uniqueFilename = `${documentId}_${uuidv4()}.${fileExtension}`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = `${user?.id}/${uniqueFilename}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    console.error("Upload error:", error);
    return { imageUrl: "", error: `Upload failed: ${error.message}` };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;
  return { imageUrl, error: "", filename: uniqueFilename };
};
