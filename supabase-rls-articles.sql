-- ============================================================
-- RLS (Row Level Security) untuk tabel `articles` — versi aman
-- ditimpa (idempotent). Jalankan di Supabase Dashboard → SQL Editor.
--
-- Berbeda dari versi sebelumnya: setiap "create policy" didahului
-- "drop policy if exists" dengan nama yang sama, jadi script ini
-- bisa dijalankan berkali-kali tanpa error "policy already exists",
-- dan otomatis menimpa policy lama (misalnya yang sudah dibuat
-- sebelumnya lewat Supabase Dashboard UI) dengan aturan yang benar.
-- ============================================================

-- 1. Pastikan RLS aktif di tabel articles
alter table public.articles enable row level security;

-- 2. Pengunjung publik (anon key) hanya boleh membaca artikel published
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
on public.articles
for select
to anon
using (status = 'published');

-- 3. User yang sudah login (kamu, lewat /login) boleh membaca semua
--    artikel termasuk draft, karena dashboard menampilkan draft juga
drop policy if exists "Authenticated can read all articles" on public.articles;
create policy "Authenticated can read all articles"
on public.articles
for select
to authenticated
using (true);

-- 4. Hanya user yang sudah login yang boleh membuat artikel baru
drop policy if exists "Authenticated can insert articles" on public.articles;
create policy "Authenticated can insert articles"
on public.articles
for insert
to authenticated
with check (true);

-- 5. Hanya user yang sudah login yang boleh mengubah artikel
drop policy if exists "Authenticated can update articles" on public.articles;
create policy "Authenticated can update articles"
on public.articles
for update
to authenticated
using (true)
with check (true);

-- 6. Hanya user yang sudah login yang boleh menghapus artikel
drop policy if exists "Authenticated can delete articles" on public.articles;
create policy "Authenticated can delete articles"
on public.articles
for delete
to authenticated
using (true);

-- ============================================================
-- PENTING — satu langkah lagi di luar SQL ini:
-- Policy di atas mempercayai SIAPA SAJA yang berhasil login
-- ("authenticated") sebagai admin. Ini aman SELAMA pendaftaran
-- akun baru dimatikan, supaya orang lain tidak bisa membuat akun
-- sendiri lalu dapat akses tulis.
--
-- Cek di: Supabase Dashboard → Authentication → Providers → Email
-- → matikan "Allow new users to sign up" (kalau tersedia).
-- ============================================================
