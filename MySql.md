### Alter primary key
```sql
ALTER TABLE `ipScanDb`.`pcinfos`
CHANGE COLUMN `_id` `_id` TEXT NOT NULL, -- Keep it as TEXT if absolutely necessary
ADD PRIMARY KEY (`_id`(255)); -- Specify a prefix length, e.g., 255
-- Optionally, if you still want a separate unique index (though primary key implies unique)
-- ADD UNIQUE INDEX `_id_UNIQUE` (`_id`(255) ASC) VISIBLE;
```