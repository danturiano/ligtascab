import { Driver } from "@/features/logs/schemas/logs";
import supabase from "@/lib/supabase";

// export const getAllDrivers = cache(async (): Promise<Driver[]> => {
//   const { data: drivers, error } = await supabase
//     .from("drivers")
//     .select("*")
//     .order("status", { ascending: true });

//   if (error) {
//     console.error("Error fetching drivers:", error);
//     return []; // Ensure the function never returns null
//   }

//   return drivers ?? []; // Return drivers if not null, otherwise return an empty array
// });

interface PaginationParams {
  from: number;
  to: number;
}

interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export const getPaginatedDrivers = async ({
  from,
  to,
}: PaginationParams): Promise<PaginatedResponse<Driver>> => {
  const { data, error, count } = await supabase
    .from("drivers")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("status", { ascending: true });

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
  };
};
