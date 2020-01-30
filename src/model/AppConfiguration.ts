import IntroSegment from './IntroSegment';

interface AppConfiguration {
  serverRoot: string;
  serverAPIRoot: string;
  serverDBTable: string;
  customVision: {
    projectID: string;
    predictionKey: string;
    predictionEndpoint: string;
    predictionConfidenceThreshold: number;
    iteration: string;
  },
  dialog: {
    introCards: IntroSegment[],
    infoScreen: JSX.Element
  }
}

export default AppConfiguration;
