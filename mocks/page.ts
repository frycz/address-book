import { User } from '../src/redux/store'

const page: User[] = [
  {
    "name": {
      "title": "Monsieur",
      "first": "Andres",
      "last": "Marchand"
    },
    "location": {
      "street": {
        "number": 4527,
        "name": "Rue de L'Abbé-De-L'Épée"
      },
      "city": "Erlach",
      "state": "Obwalden",
      "country": "Switzerland",
      "postcode": 7389,
      "coordinates": {
        "latitude": "-69.2781",
        "longitude": "-26.2907"
      },
      "timezone": {
        "offset": "+7:00",
        "description": "Bangkok, Hanoi, Jakarta"
      }
    },
    "email": "andres.marchand@example.com",
    "login": {
      "uuid": "19d7848d-fcdc-4cdb-ada2-23feb77ce3dc",
      "username": "reddog219",
      "password": "state",
      "salt": "8XZWU2RA",
      "md5": "b3ad9e8d4bee0340986e797ff9c29721",
      "sha1": "05d360e27349d7eebc96c44f29430986eef2e1de",
      "sha256": "bc730c23c6421e00df7f8dee62eb83304a6fbd0b44e96034ba69329404634750"
    },
    "phone": "077 479 28 79",
    "cell": "079 628 99 42",
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/92.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/92.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/92.jpg"
    }
  },
  {
    "name": {
      "title": "Mr",
      "first": "Jaime",
      "last": "Ramirez"
    },
    "location": {
      "street": {
        "number": 1348,
        "name": "Avenida de La Albufera"
      },
      "city": "Talavera de la Reina",
      "state": "País Vasco",
      "country": "Spain",
      "postcode": 21318,
      "coordinates": {
        "latitude": "76.1589",
        "longitude": "127.9349"
      },
      "timezone": {
        "offset": "0:00",
        "description": "Western Europe Time, London, Lisbon, Casablanca"
      }
    },
    "email": "jaime.ramirez@example.com",
    "login": {
      "uuid": "a3def732-ee17-4bfd-bc40-8b722de22d29",
      "username": "whitemouse568",
      "password": "kristian",
      "salt": "j1lJEbnT",
      "md5": "737265034d51839c097c86568ca1348e",
      "sha1": "a653edf9a909ce143c36ffd90a37bfe1ef344334",
      "sha256": "fe259d9c1a5c553c471d41f3e1dea36e75fa26adca0d3887c1c18876dc1552ae"
    },
    "phone": "938-286-825",
    "cell": "678-010-697",
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/65.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/65.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
    }
  }
]

export default page;
