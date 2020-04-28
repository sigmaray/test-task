# Hot to launch application using RVM

```
vim config/database.yml # edit DB credentials
rvm install ruby-2.7.1
bundle install
rake db:migrate
./bin/webpack-dev-server 
rails server
```
# Linting

## Rubocop
```
rubocop
```
## ESLint
```
yarn run eslint .
```

# Hot to launch application with Docker
```
./setup.sh
./start.sh
```

# How to launch Cypress UI
```
yarn cypress open --project ./spec
```

# How to run tests with Docker
## RSpec:
```
./test-rspec.sh
```

## Cypress
```
./start.sh
./test-cypress.sh
```

# What was not done

* Separate pages (https://reacttraining.com/react-router/web/guides/quick-start). I know how to implement them but didn't want to spend time.
* Client-side validation using YUP (https://medium.com/fotontech/react-native-formik-yup-%EF%B8%8F-18465e020ea0). I'm familiar with YUP, but didn't want to use it in such simple test task
* From UX perspective It would be better not to prevent Enter keypress (I do it to avoid double submit). Didn't want to spend time
* Better UI (Bootrstrap, Semantic UI, Material Design). It's bad to use <br /> for spacing, but I didn't want to bother with CSS. Using <center> tag is also bad, this tag is deprecated.

# Notes

* This is first time I'm using Docker. I'm not sure I used it in the best way possible 
* This is first time I'm using Redux Toolkit. In the past I used oldschool Redux, redux-toolkit is new thing to me
* I don't like rspec best practices (http://www.betterspecs.org/). I write tests in a straight forward way without using overcomplicated DSLs (http://www.rubyinside.com/dhh-offended-by-rspec-debate-4610.html)
* I know about shoulda-matchers (https://makandracards.com/makandra/38645-testing-activerecord-validations-with-rspec). I don't like them
