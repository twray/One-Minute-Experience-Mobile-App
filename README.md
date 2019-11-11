The One Minute Experience allows visitors to read bite-sized stories about the objects they see within the museum. Visitors can read stories by simply scanning an object with their camera. The app is a React Native project that compiles to both iOS and Android, and can be freely adopted for any museum. Stories can be written using the [One Minute Story Editor](https://github.com/twray/One-Minute-Experience-Story-Editor) tool. 

## The One Minute Project

The One Minute project consists of four parts.

- [The One Minute Experience Mobile App](https://github.com/twray/One-Minute-Experience-Mobile-App). (this project)
- [The One Minute Experience Story Editor](https://github.com/twray/One-Minute-Experience-Story-Editor)
- A web server running the [Directus Headless CMS](https://directus.io/) with the [One Minute Experience Extension](https://github.com/xmacex/OneMinuteExperienceApiV2) installed.
- A [Microsoft Azure CustomVision Account](https://www.customvision.ai/) with an active Multi-class Classification project, with active API keys for both training and prediction.

## Installation

To install the project, do the following:

- Clone the repository.
- Run `npm install`
- Run `npm start`
