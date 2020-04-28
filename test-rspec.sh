docker-compose run -e "RAILS_ENV=test" web rake db:create db:migrate
docker-compose run -e "RAILS_ENV=test" web rspec
