docker-compose build
docker-compose run web rake db:create db:migrate db:seed
