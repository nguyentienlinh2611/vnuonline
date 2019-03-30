use mysql;
ALTER USER 'root' IDENTIFIED WITH 'mysql_native_password' BY 'lts18737';
FLUSH PRIVILEGES;
create database `vnuonline` character set `UTF8` collate `utf8_bin`;
