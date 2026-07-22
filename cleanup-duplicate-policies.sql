-- ============================================================
-- Bersihkan policy lama yang sekarang dobel fungsinya dengan
-- policy baru (Authenticated can insert/update/delete articles).
-- Aman dijalankan berkali-kali karena pakai "if exists".
-- ============================================================

drop policy if exists "Authenticated users can insert articles" on public.articles;
drop policy if exists "Authenticated users can update articles" on public.articles;
drop policy if exists "Authenticated users can delete articles" on public.articles;

-- Setelah ini, tabel articles seharusnya tinggal 5 policy:
-- 1. Public can read published articles      (SELECT, anon)
-- 2. Authenticated can read all articles      (SELECT, authenticated)
-- 3. Authenticated can insert articles        (INSERT, authenticated)
-- 4. Authenticated can update articles         (UPDATE, authenticated)
-- 5. Authenticated can delete articles         (DELETE, authenticated)
--
-- Cek ulang dengan query ini kalau mau memastikan:
-- select policyname, cmd, roles from pg_policies where tablename = 'articles';
-- ============================================================
