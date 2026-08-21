-- ============================================================
--  Requested round-trip rates and separate premium vehicle options
-- ============================================================

update public.vehicles set
  rate_one_way = 10,
  rate_round_trip = 10,
  sort_order = 1,
  active = true
where slug = 'hatchback';

update public.vehicles set
  rate_one_way = 11,
  rate_round_trip = 11,
  sort_order = 2,
  active = true
where slug = 'sedan';

update public.vehicles set
  rate_one_way = 14,
  rate_round_trip = 14,
  sort_order = 3,
  active = true
where slug = 'ertiga';

-- Retire the old combined Premium SUV option so customers can choose the
-- requested Kia Carens and Innova Crysta rates independently.
update public.vehicles
set active = false, sort_order = 99
where slug = 'premium-suv';

insert into public.vehicles
  (slug, name, rate_one_way, rate_round_trip, seats, tag, blurb, models, best_for, image_url, sort_order)
values
  ('kia-carens', 'Kia Carens', 35, 16, 7, 'Powerful & Spacious',
   'The choice for hills, long hauls and travelling in comfort.',
   array['Kia Carens'], array['Hill Stations','Char Dham Yatra'],
   'https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519736/ChatGPT_Image_Aug_12_2026_12_58_34_PM_qnlqat.png', 4),
  ('innova-crysta', 'Innova Crysta', 35, 20, 7, 'Powerful & Spacious',
   'Extra comfort and space for long-distance journeys.',
   array['Toyota Innova Crysta'], array['Hill Stations','Char Dham Yatra'],
   'https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519736/ChatGPT_Image_Aug_12_2026_12_58_34_PM_qnlqat.png', 5)
on conflict (slug) do update set
  name = excluded.name,
  rate_one_way = excluded.rate_one_way,
  rate_round_trip = excluded.rate_round_trip,
  seats = excluded.seats,
  tag = excluded.tag,
  blurb = excluded.blurb,
  models = excluded.models,
  best_for = excluded.best_for,
  sort_order = excluded.sort_order,
  active = true;

update public.vehicles set
  rate_one_way = 25,
  rate_round_trip = 25,
  sort_order = 6,
  active = true
where slug = 'tempo';