docker-compose run -e "RAILS_ENV=test" web rake db:drop db:create db:migrate
docker-compose run -e "RAILS_ENV=test" web rspec
