"use server";

import { createClient } from "@/supabase/server";

export const getNotifications = async () => {
  const supabase = await createClient();
  const { data: notifications, count } = await supabase
    .from("will_expire")
    .select("*", { count: "exact" });

  return { notifications, count };
};
