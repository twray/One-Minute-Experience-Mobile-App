import * as React from 'react';

import AppConfiguration from '../model/AppConfiguration';

const config: AppConfiguration = {
  serverRoot: "[SERVER_ROOT]",
  serverAPIRoot: "[SERVER_API_ROOT]",
  serverDBTable: "artwork",
  customVision: {
    projectID: "[PROJECT_ID]",
    predictionKey: "[PREDICTION_KEY]",
    predictionEndpoint: "[PREDICTION_ENDPOINT]",
    predictionConfidenceThreshold: 0.9,
    iteration: "production"
  }
};

export default config;
