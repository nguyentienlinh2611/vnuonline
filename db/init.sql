use mysql;
ALTER USER 'root' IDENTIFIED WITH 'mysql_native_password' BY 'lts18737';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;;
FLUSH PRIVILEGES;
create database `vnuonline` character set `UTF8` collate `utf8_bin`;
