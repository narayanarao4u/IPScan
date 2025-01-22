SELECT  * FROM ipScanDb.scanTb order by Date desc limit 20 ;
SELECT count(*) FROM ipScanDb.scanTb;


ALTER USER 'bsnlvm'@'%' IDENTIFIED WITH mysql_native_password BY 'bsnl@123';
FLUSH PRIVILEGES;