# node_a_la_carte
serving node module details à la carte

## tech stack
* React
* Webpack
* Axios
* Express
* Postgres

The project is live on Heroku: (https://node-a-la-carte.herokuapp.com)
The private github repo link: (https://github.com/jgyaniv/node_a_la_carte)

## features:
* Search npm modules and find out their size.

* Bundles and minifies using webpack, then gzips the modules and returns file sizes.

* Simple CRUD API stores previous queries to reduce load time.

* Autocomplete search bar

## known issues:
* Need to figure out the webpack config settings to bundle most of the modules out there.

* Webpack sometimes bundles for development, even though the bash script and config file specify prodiction, so the measurements that do work are often innacurate.

* There are currently no tests in place and this backend was pieced together in a day, hopefully it will work for demonstration purposes.

* Some module names that have special characters like '@' or '/' cause problems for sending as a query param. Will need to find a workaround.