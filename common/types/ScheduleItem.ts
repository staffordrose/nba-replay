export type ScheduleItem = {
  id: string;
  category:
    | 'pre-season'
    | 'reg-season'
    | 'all-star'
    | 'post-season'
    | 'play-in';
  beforeText?: string;
  text: string;
  afterText?: string;
};
