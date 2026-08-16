/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectAbstract {
  id: string;
  title: string;
  category: 'School' | 'Private';
  role: string;
  technologies: string[];
  problem: string;
  solution: string;
  outcome: string;
  demoUrl?: string;
  githubUrl?: string;
  mediaType?: 'audio' | 'video' | 'interactive' | 'photo';
  mediaUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Programming' | 'Web' | 'DevOps/Tools';
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  type: 'education' | 'experience' | 'volunteer';
}

export interface FeedbackMessage {
  id: string;
  author: string;
  role: string;
  company?: string;
  text: string;
  rating: number;
  date: string;
}
