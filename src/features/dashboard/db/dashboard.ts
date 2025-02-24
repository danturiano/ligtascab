"use server";

import { createClient } from "@/supabase/server";

export const getNotifications = async () => {
  const supabase = await createClient();
  const { data: notifications, count } = await supabase
    .from("will_expire")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  return { notifications: notifications || [], count };
};

export const markAsRead = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("will_expire")
    .update({ mark_as_read: true })
    .eq("id", id)
    .select();
  if (error) {
    return error;
  }

  return data;
};
