import config from './config/config';

const APIEndpoints = {
  root: config.serverRoot,
  db: config.serverAPIRoot
};

const ProductionKeys = {
  endpoint: config.customVision.predictionEndpoint,
  projectKey: config.customVision.projectID,
  predictionKey: config.customVision.predictionKey,
  iteration: config.customVision.iteration,
  collection: config.serverDBTable
};

export function getAPIEndpoint() {
  return APIEndpoints;
}

export function getKeys() {
  return ProductionKeys;
}
