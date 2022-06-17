interface EventDetail {
  detail: any;
}

export interface Listener {
  key: string;
  eventQueue: EventDetail[];
}
