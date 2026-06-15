export interface ProviderDeepLink {
  id: string;
  name: string;
  deeplink_ios: string;
  deeplink_android: string;
  web_fallback_url: string;
  app_store_url: string;
  play_store_url: string;
}

export function buildDeepLink(template: string, zoneCode: string, locationId?: string): string {
  return template
    .replace("{zone_code}", encodeURIComponent(zoneCode))
    .replace("{location_id}", locationId ?? "")
    .replace("{carpark_id}", locationId ?? "")
    .replace("{facilityId}", locationId ?? "")
    .replace("{id}", locationId ?? "");
}

export const PROVIDERS: ProviderDeepLink[] = [
  {
    id: "ringgo",
    name: "RingGo",
    deeplink_ios: "ringgo://pay?locationCode={zone_code}",
    deeplink_android: "ringgo://pay?locationCode={zone_code}",
    web_fallback_url:
      "https://www.ringgo.co.uk/ringgo/index.php?pagename=findlocation&location={zone_code}",
    app_store_url: "https://apps.apple.com/gb/app/ringgo/id337618061",
    play_store_url: "https://play.google.com/store/apps/details?id=com.parkeon.ringgo",
  },
  {
    id: "paybyphone",
    name: "PayByPhone",
    deeplink_ios: "paybyphone://parking?locationNumber={zone_code}",
    deeplink_android: "paybyphone://parking?locationNumber={zone_code}",
    web_fallback_url: "https://m.paybyphone.com/parking?locationNumber={zone_code}",
    app_store_url: "https://apps.apple.com/gb/app/paybyphone-parking/id448474183",
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.paybyphone.parkingnativeapp",
  },
  {
    id: "justpark",
    name: "JustPark",
    deeplink_ios: "justpark://location/{location_id}",
    deeplink_android: "justpark://location/{location_id}",
    web_fallback_url: "https://www.justpark.com/locations/{location_id}",
    app_store_url: "https://apps.apple.com/gb/app/justpark-parking/id617822731",
    play_store_url: "https://play.google.com/store/apps/details?id=com.justpark.justpark",
  },
  {
    id: "ncp",
    name: "NCP",
    deeplink_ios: "ncp://carpark/{carpark_id}",
    deeplink_android: "ncp://carpark/{carpark_id}",
    web_fallback_url: "https://www.ncp.co.uk/find-a-car-park/",
    app_store_url: "https://apps.apple.com/gb/app/ncp/id389988682",
    play_store_url: "https://play.google.com/store/apps/details?id=uk.co.ncp.android",
  },
  {
    id: "qpark",
    name: "Q-Park",
    deeplink_ios: "qpark://location/{location_id}",
    deeplink_android: "qpark://location/{location_id}",
    web_fallback_url: "https://www.q-park.co.uk/en-gb/",
    app_store_url: "https://apps.apple.com/gb/app/q-park/id1034427406",
    play_store_url: "https://play.google.com/store/apps/details?id=com.qpark.mobile",
  },
  {
    id: "apcoa",
    name: "APCOA Connect",
    deeplink_ios: "apcoaconnect://park?facilityId={facilityId}",
    deeplink_android: "apcoaconnect://park?facilityId={facilityId}",
    web_fallback_url: "https://www.apcoa.co.uk/",
    app_store_url: "https://apps.apple.com/gb/app/apcoa-connect/id862193536",
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.apcoa.apcoaconnect",
  },
  {
    id: "flowbird",
    name: "Flowbird",
    deeplink_ios: "flowbird://pay?zone={zone_code}",
    deeplink_android: "flowbird://pay?zone={zone_code}",
    web_fallback_url: "https://flowbird.group/",
    app_store_url: "https://apps.apple.com/gb/app/flowbird-parking-transit/id1499557936",
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.flowbird.parking",
  },
  {
    id: "parkmobile",
    name: "ParkMobile",
    deeplink_ios: "parkmobile://pay?zone={zone_code}",
    deeplink_android: "parkmobile://pay?zone={zone_code}",
    web_fallback_url: "https://parkmobile.io/",
    app_store_url: "https://apps.apple.com/gb/app/parkmobile/id358040830",
    play_store_url:
      "https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2",
  },
];
