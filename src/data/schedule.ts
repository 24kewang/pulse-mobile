export type Session = {
  id: string;
  title: string;
  track: string;
  room: string;
  start: string;
  end: string;
  day: string;
  speakers: string[];
  description: string;
};

export const sessions: Session[] = [
  {
    id: 's1',
    title: 'Opening Keynote: Pulse of the Future',
    track: 'Speaker',
    room: 'Hall A',
    start: '09:00',
    end: '10:00',
    day: 'Jan 19',
    speakers: ['A. Rivera'],
    description: 'Kick off the event with a fast tour of what to expect and a look ahead.'
  },
  {
    id: 's2',
    title: 'Mobile Ops: Shipping Faster with Expo',
    track: 'Software',
    room: 'Room 204',
    start: '10:30',
    end: '11:15',
    day: 'Jan 19',
    speakers: ['K. Singh'],
    description: 'Practical tips to cut build times and keep releases stable.'
  },
  {
    id: 's3',
    title: 'Designing for Onsite Momentum',
    track: 'Hardware',
    room: 'Room 110',
    start: '11:30',
    end: '12:15',
    day: 'Jan 19',
    speakers: ['M. Chen'],
    description: 'Create interfaces that keep attendees moving and informed.'
  },
  {
    id: 's4',
    title: 'Live Check-in Demo',
    track: 'Networking',
    room: 'Hall B',
    start: '13:00',
    end: '13:30',
    day: 'Jan 20',
    speakers: ['Y. Jagtap'],
    description: 'A walkthrough of the QR flow and onsite check-in playbook.'
  },
  {
    id: 's5',
    title: 'Scaling Event APIs',
    track: 'Software',
    room: 'Room 204',
    start: '14:00',
    end: '14:45',
    day: 'Jan 20',
    speakers: ['K. Patel'],
    description: 'Keep data fresh and reliable when thousands of users show up at once.'
  }
];
