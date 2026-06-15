/**
 * Seeds the providers table from the PROVIDERS constant.
 * Run: npx tsx scripts/seed-providers.ts
 */
import { createClient } from "@supabase/supabase-js";
import { PROVIDERS } from "../lib/providers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function main() {
  const { error } = await supabase.from("providers").upsert(
    PROVIDERS.map((p) => ({
      id: p.id,
      name: p.name,
      deeplink_ios: p.deeplink_ios,
      deeplink_android: p.deeplink_android,
      web_fallback_url: p.web_fallback_url,
      app_store_url: p.app_store_url,
      play_store_url: p.play_store_url,
    })),
    { onConflict: "id" },
  );

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${PROVIDERS.length} providers.`);
}

main();
