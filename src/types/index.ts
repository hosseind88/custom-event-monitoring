interface EventDetail {
  detail: any;
}

export interface Listener {
  key: string;
  eventQueue: EventDetail[];
}

export type IconName = 'chevron-up' | 'chevron-down';
