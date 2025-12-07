# SW Starter
A Laravel star wars BFF 


## System Requirements
- php 8.4.1
- composer 2.8.12

## Clone & Run
```bash
git clone https://github.com/1pedro/sw-starter

cd sw-starter

cp .env.example .env

composer install

php artisan key:generate

touch database/database.sqlite

./vendor/bin/sail up -d

./vendor/bin/sail artisan migrate

./vendor/bin/sail npm install

./vendor/bin/sail npm run build
```

# Docs
- Sequence Diagrams
