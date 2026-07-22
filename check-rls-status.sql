-- Jalankan ini dulu di SQL Editor untuk melihat kondisi RLS & policy
-- yang sudah ada di tabel articles saat ini.

select relrowsecurity as rls_enabled
from pg_class
where relname = 'articles';

select policyname, cmd, roles, qual, with_check
from pg_policies
where tablename = 'articles';
