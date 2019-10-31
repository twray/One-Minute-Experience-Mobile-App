import ENV from './env';

// If you are deploying One Minute for your museum, you would need to create
// an env.ts file that exports these values

const APIEndpoints = {
  root: ENV.prod.root,
  db: ENV.prod.db
};

const ProductionKeys = {
  endpoint: ENV.prod.endpoint,
  projectKey: ENV.prod.projectKey,
  predictionKey: ENV.prod.predictionKey,
  iteration: ENV.prod.iteration,
  collection: ENV.prod.collection
};

const DevelopmentKeys = {
  endpoint: ENV.dev.endpoint,
  projectKey: ENV.dev.projectKey,
  predictionKey: ENV.dev.predictionKey,
  iteration: ENV.dev.iteration,
  collection: ENV.dev.collection
}

export function getAPIEndpoint() {
  return APIEndpoints;
}

export function getKeys() {
  return ProductionKeys;
}
