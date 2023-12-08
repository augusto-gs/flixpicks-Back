import { type MovieStructure } from "../types";

export const moviesMock: MovieStructure[] = [
  {
    _id: "65637a12d4b93a3787b660f6",
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
  },
  {
    _id: "65637a12d4b93a3787b660f7",
    name: "Arrival",
    director: "Denis Villeneuve",
    writer: "Eric Heisserer",
    stars: "Amy Adams, Jeremy Renner",
    releaseDate: "2016-11-11",
    genre: "Drama, Mystery, Sci-Fi",
    description:
      "A linguist is recruited to help communicate with extraterrestrial beings that have landed on Earth, leading to a global crisis.",
    imageUrl: "https://i.ibb.co/hmPbPy9/arrival.webp",
    score: "3.5",
    isSeen: false,
  },
  {
    _id: "65637a12d4b93a3787b660fd",
    name: "El Secreto de Sus Ojos",
    director: "Juan José Campanella",
    writer: "Eduardo Sacheri, Juan José Campanella",
    stars: "Ricardo Darín, Soledad Villamil",
    releaseDate: "2009-08-13",
    genre: "Drama, Mystery, Romance",
    description:
      "A retired legal counselor revisits a cold case involving a brutal rape and murder.",
    imageUrl: "https://i.ibb.co/m9jcvz4/El-secreto-de-sus-ojos.webp",
    score: "2.9",
    isSeen: false,
  },
];
