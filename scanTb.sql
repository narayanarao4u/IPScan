use ipScanDb;

-- unused IPs
with tb as (
	select distinct IP_Address from scanTb
)
select ip.IP_Address from IPRange ip left join tb on ip.IP_Address = tb.IP_Address 
where tb.IP_Address is null
order by INET_ATON(ip.IP_Address);


SELECT  * FROM ipScanDb.scanTb order by Date desc, time desc  limit 20 ;

SELECT count(*) FROM ipScanDb.scanTb;


with tb1 as (
select Physical_Address, IP_Address from  ipScanDb.scanTb 
	group by Physical_Address, IP_Address order by 1
) select Physical_Address, count(*) from  tb1 group by Physical_Address order by 2 desc;


select Date, Time, count(*) PCs from  ipScanDb.scanTb 	group by Date, Time order by  Date desc, Time desc;



select Physical_Address, count(*) from  ipScanDb.scanTb group by Physical_Address;



ALTER USER 'bsnlvm'@'%' IDENTIFIED WITH mysql_native_password BY 'bsnl@123';
FLUSH PRIVILEGES;