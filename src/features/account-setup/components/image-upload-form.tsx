// "use client";

// import SpinnerMini from "@/components/spinner-mini";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ChangeEvent, useRef, useState, useTransition } from "react";

// export default function ImageUploadForm() {
//   const [isPending, startTransition] = useTransition();
//   const [image, setImage] = useState<string | undefined>(undefined);
//   const imageInputRef = useRef<HTMLInputElement>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       startTransition(() => {
//         // Revoke the previous URL to prevent memory leaks
//         if (image) {
//           URL.revokeObjectURL(image);
//         }
//         if (e.target.files) {
//           const newImage = URL.createObjectURL(e.target.files[0]);
//           setImage(newImage);
//         }
//       });
//     }
//   };

//   const handleClickUploadImagesButton = () => {
//     startTransition(async () => {
//       if (!image) return;

//       const imageFile = await convertBlobUrlToFile(image);

//       const { imageUrl, error } = await uploadImage({
//         file: imageFile,
//         bucket: "image_profile",
//       });

//       if (error) {
//         console.error(error);
//         return;
//       }

//       console.log(imageUrl);

//       await updateUser({ image: imageUrl });
//     });
//   };

//   const removeImage = () => {
//     if (image) {
//       URL.revokeObjectURL(image);
//       setImage(undefined);
//     }
//     if (imageInputRef.current) {
//       imageInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <Avatar className="size-24">
//         <AvatarImage src={image} />
//         <AvatarFallback className="bg-primary"></AvatarFallback>
//       </Avatar>
//       <div className="flex flex-col gap-1">
//         <p className="font-semibold text-lg">Profile Picture</p>
//         <div className="flex gap-2">
//           <Input
//             type="file"
//             className="hidden"
//             ref={imageInputRef}
//             onChange={handleImageChange}
//           />
//           <Button
//             variant={"outline"}
//             onClick={() => imageInputRef.current?.click()}
//             disabled={isPending}
//           >
//             {isPending ? <SpinnerMini /> : "Choose Image"}
//           </Button>
//           <Button variant={"outline"} disabled={false}>
//             Upload
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
