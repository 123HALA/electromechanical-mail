import { Email } from '../lib/types';

export const inbox: Email[] = [
  {
    id: '1',
    sender: 'support@sankofasolar.com',
    recipient: 'employee@umemeflow.com',
    subject: 'System Maintenance Notification',
    body: 'Dear Team,\n\nPlease be advised that we will be conducting scheduled system maintenance on our main servers this Friday, December 5th, 2025, from 10:00 PM to 2:00 AM EAT. During this period, access to internal resources might be intermittent. We apologize for any inconvenience caused.\n\nRegards,\nIT Support',
    timestamp: '2025-11-29T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    sender: 'hr@umemeflow.com',
    recipient: 'employee@umemeflow.com',
    subject: 'End of Year Party Invitation!',
    body: 'Hello Everyone,\n\nYou are cordially invited to our annual End of Year celebration! Join us for a night of fun, food, and music as we celebrate a successful year. The event will be held at the Bomas of Kenya on December 19th, 2025, starting at 6:00 PM. Please RSVP by December 10th.\n\nBest,\nHuman Resources',
    timestamp: '2025-11-28T14:30:00Z',
    read: true,
  },
];

export const sent: Email[] = [
  {
    id: '3',
    sender: 'employee@umemeflow.com',
    recipient: 'project-manager@umemeflow.com',
    subject: 'RE: Project Phoenix Update',
    body: 'Hi Jane,\n\nI have completed the initial draft of the project proposal. Please find it attached. I look forward to your feedback.\n\nThanks,\nJohn Doe',
    timestamp: '2025-11-27T11:00:00Z',
    read: true,
  },
];

export const drafts: Email[] = [
  {
    id: '4',
    sender: 'employee@umemeflow.com',
    recipient: 'team@umemeflow.com',
    subject: 'Weekly Report Brainstorm',
    body: 'Team, let\'s schedule a quick meeting to brainstorm ideas for the weekly report format. I\'m available tomorrow afternoon. Let me know your availability.',
    timestamp: '2025-11-29T12:00:00Z',
    read: true,
  },
];

export const allEmails = {
  inbox,
  sent,
  drafts,
};