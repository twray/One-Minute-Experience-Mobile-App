import Constants from 'expo-constants';

const APIEndpoints = {
  dev: {
    db: 'https://modgift.itu.dk/1mev2/_'
  },
  dev: {
    db: 'https://modgift.itu.dk/1mev2/_'
  }
};

const CustomVisionKeys = {
  endpoint: 'https://northeurope.api.cognitive.microsoft.com',
  apiKey: '6a61c57a-8da9-469a-a5a1-de1055543a42',
  predictionKey: 'a267e2c8185241e4808534c70f96157f',
  iteration: 'production'
};

export function getAPIEndpoint() {
  const rc = Constants.manifest.releaseChannel;
  if (rc === undefined) return APIEndpoints.dev;
  if (rc === 'prod') return APIEndpoints.prod;
  throw new Error('Error retrieving API endpoint');
}

export function getCustomVisionKeys() {
  return CustomVisionKeys;
}
