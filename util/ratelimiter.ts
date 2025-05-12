import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
export async function checkAndIncrementQuota(
  userId: string,
  type: "messages" | "pdf_uploads",
  limit: number
) {
  // pick period:
  const period =
    type === "messages"
      ? new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .slice(0, 10);

  const { data, error } = await supabase
    .from("user_quotas")
    .upsert(
      { user_id: userId, period, quota_type: type },
      { onConflict: "user_id,period,quota_type" }
    )
    .select("used")
    .single();

  console.log("data", data);
  if (error) throw error;

  const used = data.used;
  if (used >= limit) {
    return { ok: false, remaining: 0 };
  }

  // increment:
  const { error: updErr } = await supabase
    .from("user_quotas")
    .update({ used: used + 1 })
    .match({ user_id: userId, period, quota_type: type });

  if (updErr) throw updErr;

  return { ok: true, remaining: limit - (used + 1) };
}
