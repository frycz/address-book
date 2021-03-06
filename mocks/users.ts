import { User } from '../src/redux/store'

const users: User[][] = [
  [
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
  ],
  [
    {
      "name": {
        "title": "Mr",
        "first": "Bob",
        "last": "Obrien"
      },
      "location": {
        "street": {
          "number": 2611,
          "name": "Springfield Road"
        },
        "city": "Newry",
        "state": "Tayside",
        "country": "United Kingdom",
        "postcode": "O8E 9TW",
        "coordinates": {
          "latitude": "-2.2306",
          "longitude": "-168.5522"
        },
        "timezone": {
          "offset": "+8:00",
          "description": "Beijing, Perth, Singapore, Hong Kong"
        }
      },
      "email": "bob.obrien@example.com",
      "login": {
        "uuid": "3b8ea840-a4d4-4d9d-b8bd-110afb32c1ed",
        "username": "smallostrich687",
        "password": "favorite",
        "salt": "PTDdl9IV",
        "md5": "264e7a85bc2f8dc22afb2e4c9222542d",
        "sha1": "a4cf2d1c37e68013631fea51bd891296a30ad66f",
        "sha256": "01302af5eb3aaef6d2731abf0031fe1040bef6146d7ecf8f78ace1e946a6fa0d"
      },
      "phone": "0112192 976 3544",
      "cell": "0733-620-615",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/70.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/70.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/70.jpg"
      }
    },
    {
      "name": {
        "title": "Madame",
        "first": "Annina",
        "last": "Clement"
      },
      "location": {
        "street": {
          "number": 1505,
          "name": "Rue Abel-Gance"
        },
        "city": "Rhäzüns",
        "state": "Luzern",
        "country": "Switzerland",
        "postcode": 7057,
        "coordinates": {
          "latitude": "63.3761",
          "longitude": "-135.5899"
        },
        "timezone": {
          "offset": "-5:00",
          "description": "Eastern Time (US & Canada), Bogota, Lima"
        }
      },
      "email": "annina.clement@example.com",
      "login": {
        "uuid": "2c11ad4b-9d0a-4b71-af8c-5daa5ab2cbb6",
        "username": "ticklishleopard162",
        "password": "medicine",
        "salt": "ySpkKBRA",
        "md5": "6978cce1238bbf2e0bb5c0b7730f2bff",
        "sha1": "93b76c3b185fc18ea8a1f5fd6873fd42839fa95d",
        "sha256": "f23ee8415c5b05ea0eca16d6b16c12f302ca31e7f02bb8e7ac356d6afcfb7f4f"
      },
      "phone": "079 762 80 25",
      "cell": "076 054 40 08",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/46.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/46.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/46.jpg"
      }
    }
  ],
  [
    {
      "name": {
        "title": "Mr",
        "first": "Paul",
        "last": "Duval"
      },
      "location": {
        "street": {
          "number": 3311,
          "name": "Rue Dugas-Montbel"
        },
        "city": "Aix-En-Provence",
        "state": "Bouches-du-Rhône",
        "country": "France",
        "postcode": 63051,
        "coordinates": {
          "latitude": "-18.6265",
          "longitude": "136.5332"
        },
        "timezone": {
          "offset": "+9:30",
          "description": "Adelaide, Darwin"
        }
      },
      "email": "paul.duval@example.com",
      "login": {
        "uuid": "afad0a77-6032-4f4e-b959-669d347499ef",
        "username": "redfrog115",
        "password": "5683",
        "salt": "djcuv2Gs",
        "md5": "771d6f70637b5329cb8622b999aa9810",
        "sha1": "6954f5f1437cb8e52e930dea250c921cd49dbf08",
        "sha256": "4be08b56e34c86dd8a499dceea7bcd2ce6f9808846ed739a1aa38e29448200a3"
      },
      "phone": "02-01-28-97-41",
      "cell": "06-39-48-01-41",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/76.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/76.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/76.jpg"
      }
    }
  ]
]

export default users;
