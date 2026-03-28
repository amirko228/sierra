-- Sierra Karakol — PostgreSQL DDL (reference / manual bootstrap)
-- Prefer TypeORM synchronize in dev; in production use migrations.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  notes TEXT,
  room_type VARCHAR(100) NOT NULL DEFAULT 'standard',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings (check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);

CREATE TABLE IF NOT EXISTS coworking_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(320),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  seat_label VARCHAR(80) NOT NULL DEFAULT 'hot-desk',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coworking_start ON coworking_reservations (start_at);
CREATE INDEX IF NOT EXISTS idx_coworking_created_at ON coworking_reservations (created_at DESC);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  source VARCHAR(80) NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);

CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(80) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES menu_categories (id) ON DELETE CASCADE,
  item_key VARCHAR(80) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(100) NOT NULL,
  tags JSONB,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE (category_id, item_key)
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items (category_id);
