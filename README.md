# Backend API Documentation

## Endpoints

### GET /

- Check the server response through the pingController.
- Send the message "🏓 Pong" in the response body and status 200.

### GET / (wrong endpoint)

- Request to a wrong endpoint.
- Send the message "Endpoint not found" in the response body and status 404.

### GET /movies

- Request for a list of 10 movies.
- Send a collection of 10 movies in the response body and status 200.

### DELETE /movies/:id

- Request to delete a movie by its id.
- Sends an empty json object in the response body and status 200.

### POST /movies/create

- Request to create a new movie.
- Send a an object with a movie property with the new movie in the response body and status 201

### GET /movies/:movieId

-Request a movie(by its id)
-Send an object with a movie property with the queried movie in the response body and a status 200

### PUT /movies/:movieId

-Request to update an existing movie(by its id)
-Send an object with a movie property with the updated movie in the response body and a status 200
