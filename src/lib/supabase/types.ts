// Row shapes for the tables in supabase/migrations/0001_init.sql.
// Hand-maintained: if you change a column there, change it here too.

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "assigned"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "advance_paid"
  | "paid"
  | "refunded"
  | "failed";

export type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

export type TripType = "One Way" | "Round Trip";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  rate_per_km: number;
  seats: number;
  ac: boolean;
  tag: string | null;
  blurb: string | null;
  models: string[];
  best_for: string[];
  image_url: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Driver = {
  id: string;
  name: string;
  phone: string;
  license_no: string | null;
  vehicle_no: string | null;
  vehicle_id: string | null;
  notes: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  booking_code: string;
  customer_name: string;
  phone: string;
  email: string | null;
  from_label: string;
  from_lat: number | null;
  from_lon: number | null;
  to_label: string;
  to_lat: number | null;
  to_lon: number | null;
  pickup_date: string | null;
  pickup_time: string | null;
  trip_type: TripType;
  distance_km: number | null;
  distance_is_estimate: boolean;
  vehicle_id: string | null;
  vehicle_name: string | null;
  rate_per_km: number | null;
  fare_total: number;
  amount_paid: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  source: "website" | "whatsapp" | "phone" | "admin";
  driver_id: string | null;
  admin_notes: string | null;
  customer_note: string | null;
  created_at: string;
  updated_at: string;
};

/** A booking joined with its driver, as the admin list/detail screens read it. */
export type BookingWithDriver = Booking & {
  driver: Pick<Driver, "id" | "name" | "phone" | "vehicle_no"> | null;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: EnquiryStatus;
  source: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminUser = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: "owner" | "staff";
  active: boolean;
  created_at: string;
};
