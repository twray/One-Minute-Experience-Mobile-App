import Constants from 'expo-constants';

const APIEndpoints = {
  dev: 'https://modgift.itu.dk/1mev2/_/',
  prod: 'https://modgift.itu.dk/1mev2/_/',
};

export function getAPIEndpoint() {
  const rc = Constants.manifest.releaseChannel;
  if (rc === undefined) return APIEndpoints.dev;
  if (rc === 'prod') return APIEndpoints.prod;
  throw new Error('Error retrieving API endpoint');
}
