export type Countries = string[];

/**
 * Countries from which users are fetched
 */
export const countries: Countries = ["ch", "es", "fr", "gb"];

/**
 * Max page size fetched by one api call
 */
export const batchSize = 50;

/**
 * Max catalogue size. No more users are feched after meeting this limit
 */
export const catalogueSize = 1000;

export default {
  countries,
  batchSize,
  catalogueSize,
};
