begin;
select plan(1);

select has_extension('pgtap', 'pgTAP esta instalado');

select * from finish();
rollback;
