// "use server";

// export async function getUser(phone_number: string) {
//   const query = supabase
//     .from("users")
//     .select("*")
//     .eq("phone_number", phone_number);

//   const { data, error } = await query.single();

//   if (error) {
//     console.log(error);
//   }

//   return data;
// }
