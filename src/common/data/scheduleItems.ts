import { ScheduleItem } from '../types';

export const scheduleItems: ScheduleItem[] = [
  {
    id: 'pre-season',
    category: 'pre-season',
    text: 'Pre-Season',
  },
  ...[...Array(18)].map(
    (_, i) =>
      ({
        id: `week-${i + 1}`,
        category: 'reg-season',
        beforeText: 'Reg. Season',
        text: `Week ${i + 1}`,
      } as ScheduleItem)
  ),
  {
    id: 'all-star',
    category: 'all-star',
    text: 'All-Star',
    afterText: 'Weekend',
  },
  ...[...Array(7)].map(
    (_, i) =>
      ({
        id: `week-${18 + i + 1}`,
        category: 'reg-season',
        beforeText: 'Reg. Season',
        text: `Week ${18 + i + 1}`,
      } as ScheduleItem)
  ),
  {
    id: 'play-in',
    category: 'play-in',
    beforeText: 'Playoffs',
    text: 'Play-In',
    afterText: 'Tournament',
  },
  ...[...Array(4)].map(
    (_, i) =>
      ({
        id: `round-${i + 1}`,
        category: 'post-season',
        beforeText: 'Playoffs',
        text:
          i === 3
            ? 'NBA Finals'
            : i === 2
            ? 'Conf. Finals'
            : i === 1
            ? 'Conf. Semis'
            : '1st Round',
      } as ScheduleItem)
  ),
];
