export type ParkingLocationType = "on-street" | "car-park" | "private";

export interface Provider {
  id: string;
  name: string;
  logo_url: string;
  deeplink_ios: string;
  deeplink_android: string;
  web_fallback_url: string;
  app_store_url: string;
  play_store_url: string;
  payment_methods: string[];
}

export interface Tariff {
  id: string;
  location_id: string;
  rate_type: "hourly" | "daily" | "flat";
  price_per_hour_pence: number;
  daily_max_pence: number | null;
  free_minutes: number;
  valid_from: string | null;
  valid_to: string | null;
  day_restrictions: string | null;
  verified_at: string;
}

export interface ParkingLocation {
  id: string;
  name: string;
  type: ParkingLocationType;
  lat: number;
  lng: number;
  provider_id: string;
  zone_code: string;
  opening_hours: string;
  accessibility_flags: string[];
  confidence_score: number;
}

export interface IdentifyResult {
  location: ParkingLocation;
  provider: Provider;
  tariff: Tariff;
  confidence_score: number;
}

export interface UserCorrection {
  location_id: string;
  correction_type: "wrong_provider" | "wrong_zone_code" | "wrong_price" | "space_gone";
  reported_value: string;
  expected_value: string;
  notes: string;
}

export interface SearchResult extends ParkingLocation {
  provider: Provider;
  tariff: Tariff;
  distance_metres: number;
}

// Flat rows returned by Supabase RPCs (identify_parking_location, search_parking_locations)
export interface RpcIdentifyRow {
  location_id: string;
  name: string;
  type: string;
  zone_code: string;
  provider_id: string;
  provider_name: string;
  confidence_score: number;
  price_per_hour_pence: number;
  daily_max_pence: number | null;
  deeplink_ios: string;
  deeplink_android: string;
  web_fallback_url: string;
}

export interface RpcSearchRow {
  location_id: string;
  name: string;
  type: string;
  zone_code: string;
  distance_metres: number;
  provider_id: string;
  provider_name: string;
  confidence_score: number;
  price_per_hour_pence: number;
  daily_max_pence: number | null;
}
