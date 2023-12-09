import { type MovieStructure, type MovieWithoutId } from "../types";

export const movieMock: MovieWithoutId = {
  name: "La La Land",
  director: "Damien Chazelle",
  writer: "Damien Chazelle",
  stars: "Ryan Gosling, Emma Stone",
  releaseDate: "2016-12-09",
  genre: "Drama, Musical, Romance",
  description:
    "A jazz musician and an aspiring actress meet and fall in love while pursuing their dreams in Los Angeles.",
  imageUrl: "https://i.ibb.co/bNxz5yJ/La-la-land.webp",
  score: "4.5",
  isSeen: false,
};

export const modifiedMovieMock: MovieStructure = {
  ...movieMock,
  name: "Test",
  _id: "65637a12d4b93a3787b660f6",
};
