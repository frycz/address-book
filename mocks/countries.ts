import { Countries as CountriesConfig } from "../src/config";
import { Countries as CountriesState } from "../src/redux/book/types";
import { Countries as CountriesService } from "../src/services/userService";

export const countriesConfig: CountriesConfig = ["ch", "es", "fr"];

export const countriesStateInit: CountriesState = { ch: true, es: true, fr: true };

export const countriesState: CountriesState = { ch: true, es: true, fr: false };

export const countriesService: CountriesService = ["ch", "es"];

export default {
    countriesConfig,
    countriesStateInit,
    countriesState,
    countriesService,
}