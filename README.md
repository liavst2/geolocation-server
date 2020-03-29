# geolocation-server

Geolocation server implementation.

### Running the application

The application is deployed using docker-compose.
```sh
docker-compose up
```

The server listens to 8080 port on localhost.

### View the database

You can view the mongoDB data using the following command:
```sh
docker exec -it geolocator-mongo /bin/bash
```

Once you are inside the container, run the following:
```sh
mongo
use geolocation
db.distances.find().pretty() 
```

