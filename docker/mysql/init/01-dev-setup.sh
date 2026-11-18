#!/bin/bash
# LOCAL DEVELOPMENT ONLY - runs once when the MySQL Docker volume is first created.
#
# 1. Creates the test database used by the API integration tests (<db>_test).
# 2. Lets the app user create/drop databases, which `prisma migrate dev` needs for its
#    temporary "shadow" database.
#
# Never give the application user these rights in production.
set -euo pipefail

mysql -uroot -p"${MYSQL_ROOT_PASSWORD}" <<SQL
CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}_test\`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;
SQL
