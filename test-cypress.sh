docker-compose run -e "RAILS_ENV=test" web-test rake db:create db:migrate
docker-compose run -e "CYPRESS_BASE_URL=http://web-test:5017" web-test yarn cypress run --project ./spec
