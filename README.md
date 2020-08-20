# node_a_la_carte
serving node module details à la carte

## tech stack
*Frontend:*
* React
* Webpack

*Backend:*
* Express
* Axios
* PostGres

The project is live on Heroku: (https://node-a-la-carte.herokuapp.com)
The private github repo link: (https://github.com/jgyaniv/node_a_la_carte)

## known issues:
* Long load times on the backend is due to nothing being saved to the database or cached, this is an easy fix and will greatly improve performance. However I was explicitly instructed that backend speed/performance is not a factor, so I will leave it on the wishlist!

* Certain modules will not work, such as react-redux, since it requires first installing react. There might be a fix here by switching from NPM to Yarn, either way this requires further research. Thanks NPM!
```
'npm WARN react-redux@7.1.3 requires a peer of react@^16.8.3 but none is installed. You must install peer dependencies yourself.\n' +
'npm WARN react-redux@7.1.3 requires a peer of redux@^2.0.0 || ^3.0.0 || ^4.0.0-0 but none is installed. You must install peer dependencies yourself.\n'
```

* Some modules have do not have a 1.0.0 release, in which case there is no 'last stable build', which leads to the 5th result not being given a name. This can be fixed pretty easily.

* There are currently no tests in place and this backend was pieced together in a few hours, so I am sure there are other problems! Hopefully it will work for demonstration purposes.