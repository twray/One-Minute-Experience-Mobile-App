import { getAPIEndpoint } from '../environment';

interface AnalyticsEvent {
  name: string;
  duration: number;
  timestamp: Date;
  sessionCode: string;
  metadata?: string;
}

enum AnalyticsEventType {
  ArtworkScanSuccess = 'artwork_scan_success',
  ArtworkScanFail = 'artwork_scan_fail',
  ViewStory = 'view_story',
  ReadStory = 'read_story'
}

export default class AnalyticsService {

  static instance: AnalyticsService = new AnalyticsService();

  sessionCode: string = new Date().getTime().toString();
  currentEvent: AnalyticsEvent|null = null;

  private async log(event: AnalyticsEvent) {

    try {

      const endpointDB = getAPIEndpoint().db;
      await fetch(`${endpointDB}/items/event_log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: event.name,
          duration: event.duration,
          session_code: event.sessionCode,
          metadata: event.metadata || ''
        })
      });

    } catch (e) {
      console.log('Unable to save analytics event');
      console.log(e);
    }
  }

  public async artworkScanSuccess() {
    const event: AnalyticsEvent = {
      name: AnalyticsEventType.ArtworkScanSuccess,
      duration: 0,
      timestamp: new Date(),
      sessionCode: this.sessionCode
    };
    this.log(event);
  }

  public async artworkScanFail() {
    const event: AnalyticsEvent = {
      name: AnalyticsEventType.ArtworkScanFail,
      duration: 0,
      timestamp: new Date(),
      sessionCode: this.sessionCode
    };
    this.log(event);
  }

  public async viewStory(artworkMetadata: string) {
    const event: AnalyticsEvent = {
      name: AnalyticsEventType.ViewStory,
      duration: 0,
      timestamp: new Date(),
      sessionCode: this.sessionCode,
      metadata: artworkMetadata
    };
    this.currentEvent = event;
    this.log(event);
  }

  public async readStory(artworkMetadata: string) {
    if (this.currentEvent) {
      const duration = Math.ceil((new Date().getTime() - this.currentEvent.timestamp.getTime()) / 1000);
      const event: AnalyticsEvent = {
        name: AnalyticsEventType.ReadStory,
        duration: duration,
        timestamp: new Date(),
        sessionCode: this.sessionCode,
        metadata: artworkMetadata
      };
      this.log(event);
      this.currentEvent = null;
    }
  }

}
