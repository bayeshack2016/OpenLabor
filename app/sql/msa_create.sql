create table msa(
state varchar(2),
city varchar(256),
area integer,
area_name varchar(256),
occ_code varchar(16),
occ_title varchar(256),
occ_group varchar(32),
tot_emp double precision,
emp_prse double precision,
jobs_1000 double precision,
loc_quotient double precision, 
h_mean double precision, 
a_mean double precision,       
mean_prse double precision, 
h_pct10 double precision, 
h_pct25 double precision, 
h_median double precision, 
h_pct75 double precision, 
h_pct90 double precision,
a_pct10 double precision, 
a_pct25 double precision, 
a_median double precision, 
a_pct75 double precision, 
a_pct90 double precision, 
annual BOOLEAN,
hourly BOOLEAN, 

primary key(state, city, occ_code));

