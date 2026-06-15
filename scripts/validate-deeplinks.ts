/**
 * Validates deep-link templates by cycling through providers.
 * Run on a physical device: npx tsx scripts/validate-deeplinks.ts
 */
import { PROVIDERS, buildDeepLink } from "../lib/providers";

const TEST_ZONE = "36417";
const TEST_LOCATION_ID = "test-001";

for (const provider of PROVIDERS) {
  const ios = buildDeepLink(provider.deeplink_ios, TEST_ZONE, TEST_LOCATION_ID);
  const android = buildDeepLink(provider.deeplink_android, TEST_ZONE, TEST_LOCATION_ID);
  const web = buildDeepLink(provider.web_fallback_url, TEST_ZONE, TEST_LOCATION_ID);

  console.log(`\n[${provider.name}]`);
  console.log(`  iOS:     ${ios}`);
  console.log(`  Android: ${android}`);
  console.log(`  Web:     ${web}`);
}

console.log("\nTest these URLs on physical iOS + Android devices with provider apps installed.");
