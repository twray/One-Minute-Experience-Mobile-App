import * as React from 'react';
import { Text, Linking } from 'react-native';

import styles from '../screens/InfoScreen/styles';
const { Heading, BodyText, LinkText } = styles;

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
  },
  dialog: {
    introCards: [{
      text: 'One Minute a simple companion that offers short stories about objects in this museum.'
    }, {
      text: 'These stories are presented in bite-sized pieces, just like what you see here.'
    }, {
      text: 'They might tell you something interesting, or perhaps encourage you to look a little closer.'
    }, {
      text: 'Tap the button below to scan an object and read its story.',
      transparent: true
    }],
    infoScreen: (
      <>
        <Text style={Heading}>
          What is this?
        </Text>
        <Text style={BodyText}>
          One Minute is a simple companion that offers short stories about objects in this museum. To read a story, point the camera at an object and scan it by pushing the white button at the bottom of the screen.
        </Text>
        <Text style={BodyText}>
          The stories encourage observation and reflection, yet they should take less than a minute to read: hence the name.
        </Text>
        <Text style={BodyText}>
          Please note that only some objects in the museum are scannable. You'll be given additional information on which objects you can scan, and where to find them.
        </Text>
        <Text style={Heading}>
          How does it work?
        </Text>
        <Text style={BodyText}>
          One Minute uses image recognition technology to identify the objects and present you with stories based on what you see.
        </Text>
        <Text style={Heading}>
          What about my privacy?
        </Text>
        <Text style={BodyText}>
          This app collects anonymised usage data. The app tracks which objects you scan and how long you spend reading each story. We use this data to better help us understand how we can create meaningful visitor experiences for museums using digital tools. This app does not collect any personally identifiable information from you. Aside from the camera, it does not track or load any data from your phone or its sensors.
        </Text>
        <Text style={BodyText}>
          The app requires access to your phone's camera in order to work. The picture that you take with your camera is sent to Microsoft's Custom Vision service so that it can be recognised against our database of works. We do not use your picture for any other purpose.
        </Text>
        <Text style={BodyText}>
          Custom Vision is a service provided by Microsoft Azure Cognitive Services. To read more about these services and how your data is handled, please refer to the its compliance and privacy policy.
        </Text>
        <Text style={LinkText} onPress={() => Linking.openURL('https://azure.microsoft.com/en-gb/support/legal/cognitive-services-compliance-and-privacy/')}>
          Microsoft Cognitive Services - Compliance And Privacy
        </Text>
        <Text style={Heading}>
          Where can I learn more?
        </Text>
        <Text style={BodyText}>
          One Minute is a tool that is offered as part of the GIFT Box: a collection of tools and ways of working to help museums make richer digital experiences for their visitors. You can read more about it here:
        </Text>
        <Text style={LinkText} onPress={() => Linking.openURL('https://gifting.digital/one-minute-experience/')}>
          The GIFT Box - One Minute
        </Text>
        <Text style={BodyText}>
          If you have any questions about One Minute, feel free to contact us at gift@itu.dk.
        </Text>
        <Text style={LinkText} onPress={() => Linking.openURL('https://gifting.digital/the-gift-project/')}>
          About the GIFT Project
        </Text>
      </>
    )
  }
};

export default config;
