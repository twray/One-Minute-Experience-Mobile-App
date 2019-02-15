import { Constants } from 'expo';

const APIEndpoints = {
  dev: 'http://localhost:5000/api',
  prod: 'NOT_YET_SET',
};

export function getAPIEndpoint() {
  const rc = Constants.manifest.releaseChannel;
  if (rc === undefined) return APIEndpoints.dev;
  if (rc === 'prod') return APIEndpoints.prod;
  throw new Error('This should not happen');
}
