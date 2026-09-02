alter table enquiries alter column contact_name drop not null;
alter table enquiries alter column email drop not null;
alter table enquiries alter column normalized_email drop not null;

create index idx_enquiries_phone_telegram_duplicate_lookup
    on enquiries (normalized_phone, telegram, created_at desc);
