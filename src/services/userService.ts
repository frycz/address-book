import axios from "axios";

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface UserApiResponse {
  results: User[];
  info?: Info;
}

export type Countries = string[];

const host = "https://randomuser.me/api/";

const getUserApiUrl = (countries: Countries) =>
  `${host}?page=1&results=50&seed=sherpany&nat=${countries.join(
    ","
  )}&inc=picture,name,email,login,location,phone,cell`;

export async function getUsers(countries: Countries): Promise<UserApiResponse | []> {
  if (countries.length === 0) {
    return [];
  }

  return axios
    .get(getUserApiUrl(countries))
    .then(response => {
      return response.data.results;
    })
    .catch(e => e);
}

export default {
  getUsers
};
