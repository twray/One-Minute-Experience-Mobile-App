import Constants from 'expo-constants';

const APIEndpoints = {
  dev: {
    root: 'https://modgift.itu.dk/1mev2',
    db: 'https://modgift.itu.dk/1mev2/_'
  },
  prod: {
    root: 'https://modgift.itu.dk/1mev2',
    db: 'https://modgift.itu.dk/1mev2/_'
  }
};

const ProductionKeys = {
  endpoint: 'https://northeurope.api.cognitive.microsoft.com',
  projectKey: '6a61c57a-8da9-469a-a5a1-de1055543a42',
  predictionKey: 'a267e2c8185241e4808534c70f96157f',
  iteration: 'production',
  collection: 'artwork'
};

const DevelopmentKeys = {
  endpoint: 'https://northeurope.api.cognitive.microsoft.com',
  projectKey: '99201fdf-3975-4922-af0d-a97f3e60158e',
  predictionKey: 'a267e2c8185241e4808534c70f96157f',
  iteration: 'testing',
  collection: 'artwork_test'
}

export function getAPIEndpoint() {
  const rc = Constants.manifest.releaseChannel;
  if (rc === undefined) return APIEndpoints.dev;
  if (rc === 'prod') return APIEndpoints.prod;
  throw new Error('Error retrieving API endpoint');
}

export function getKeys() {
  return ProductionKeys;
}
