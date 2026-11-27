begin;
select plan(2);

select is(
  (select string_agg(angle::text, ',' order by angle)
     from unnest(enum_range(null::photo_angle)) as angle),
  'right_side,left_side,front,bottom,back,extra',
  'a machine keeps six angles: four basic ones and two optional ones'
);

select col_is_unique(
  'public', 'unit_condition_photos', array['unit_id', 'angle'],
  'there is one photo per machine and angle'
);

select * from finish();
rollback;
