create table enquiries (
    id uuid primary key,
    contact_name varchar(100) not null,
    label_name varchar(150) not null,
    email varchar(254) not null,
    normalized_email varchar(254) not null,
    phone varchar(40) not null,
    normalized_phone varchar(40) not null,
    telegram varchar(100) not null,
    comment varchar(2000),
    status varchar(30) not null,
    consented_at timestamp with time zone not null,
    created_at timestamp with time zone not null
);

create index idx_enquiries_created_at on enquiries (created_at desc);
create index idx_enquiries_duplicate_lookup on enquiries (normalized_email, normalized_phone, created_at desc);
