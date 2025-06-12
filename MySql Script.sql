use ipScanDb;

--- describe  pcinfos;

ALTER TABLE `pcinfos`
add COLUMN `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
add COLUMN `updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

select MAX(PCid) as ID from pcinfos  ;

select PCid from pcinfos order by created desc;

select `createdAt`, `updatedAt` , created, updated from pcinfos;

SET SQL_SAFE_UPDATES = 0;
update pcinfos set updated = STR_TO_DATE(updatedAt, '%Y-%m-%dT%H:%i:%s.%fZ');
SET SQL_SAFE_UPDATES = 1;

CREATE TABLE `pcinfos` (
  `_id` text NOT NULL,
  `empname` text,
  `hrmsno` text,
  `phone` text,
  `locationtxt` text,
  `prnMake` text,
  `prnModel` text,
  `prnSerialNo` text,
  `MACAddress` text,
  `IPv4Address` text,
  `Hostname` text,
  `SystemName` text,
  `SystemManufacturer` text,
  `SystemModel` text,
  `SystemUserName` text,
  `ProcessorName` text,
  `RAM_GB` text,
  `SerialNumber` text,
  `Manufacturer` text,
  `OS_Name` text,
  `OS_Version` text,
  `PCid` text,
  `createdAt` text,
  `updatedAt` text,
  `__v` text,
  `desgn` text,
  `type` text,
  PRIMARY KEY (`_id`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
