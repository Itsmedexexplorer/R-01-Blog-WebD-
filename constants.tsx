import { Article } from './types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Architecture of Patience',
    subtitle: 'Why modern systems fail to account for the generational velocity of Bharat.',
    category: 'Systems',
    date: 'OCT 12, 2023',
    readingTime: '8 MIN READ',
    complexity: 'Mid',
    imageUrl: 'https://picsum.photos/800/400',
    imageCaption: 'Fig 1.1: The chaotic yet resilient structure of older marketplaces.',
    content: `We often mistake speed for efficiency. In the grand tapestry of {{Bharat|A civilizational entity, distinct from the geopolitical borders of India, rooted in continuity and dharma.|Bharat}}'s historical record, rapid transformations have rarely sustained themselves without a deep, underlying anchor. The modern digital ecosystem pushes for instant gratification, but our cultural memory operates on a different clock cycle—one measured in yugas, not fiscal quarters.

When we build digital infrastructure today, we are often building for the "user" defined by Silicon Valley metrics: impulsive, disconnected, and transactional. However, a true {{Systems Thinking|A holistic approach to analysis that focuses on the way that a system's constituent parts interrelate and how systems work over time.|systems thinking}} approach for our context requires us to view the user as a custodian of heritage.

> "To build for the future is not to discard the past, but to create a container where the past can breathe."

Consider the Unified Payments Interface (UPI). It succeeded not just because it was fast, but because it mimicked the {{Trust Topology|The network of interpersonal trust that facilitates informal transactions in close-knit communities.|trust topology}} of cash—peer-to-peer, immediate, and final. It was a digital layer over a very physical habit.

As we move forward, we must ask: Are we building cathedrals of thought or mere tents of information? The former requires the stone of patience; the latter only needs the canvas of attention.`
  },
  {
    id: '2',
    title: 'Digital Dharma: The Responsibility of Code',
    subtitle: 'Algorithms are not neutral; they carry the bias of their creators and the weight of their consequences.',
    category: 'Responsibility',
    date: 'OCT 05, 2023',
    readingTime: '12 MIN READ',
    complexity: 'High',
    content: `Every line of code is a decision tree that eventually impacts a human life. In the ancient texts, the concept of {{Dharma|Duty, law, conduct, and the underlying order of the cosmos.|Dharma}} governed the actions of kings and commoners alike. Today, software engineers are the architects of the new invisible kingdom.

When an algorithm decides creditworthiness based on postal codes, it is effectively enforcing a caste system of data. Is this responsible? Is this long-term thinking?

We need a new oath for the digital age. One that prioritizes human agency over engagement metrics. One that values silence over noise.`
  },
  {
    id: '3',
    title: 'Seed Banking for the Future',
    subtitle: 'Preserving intellectual biodiversity in an age of monoculture AI models.',
    category: 'Long-term Decisions',
    date: 'SEP 28, 2023',
    readingTime: '6 MIN READ',
    complexity: 'Low',
    imageUrl: 'https://picsum.photos/800/401',
    imageCaption: 'Fig 2.0: Traditional grain storage methods in rural Rajasthan.',
    content: `Just as industrial farming reduced the genetic diversity of our crops, making them susceptible to a single blight, the centralization of AI models threatens our intellectual biodiversity.

We are feeding our collective knowledge into a few massive "brains." If these brains hallucinate, we all share the delusion. {{Decentralized Knowledge|The practice of distributing information storage and processing across many nodes to prevent single points of failure.|Decentralized knowledge}} is the only hedge against this risk.

> "Diversity is not a metric to be optimized; it is the immune system of civilization."

We must become seed bankers of thought. Writing, printing, and storing ideas offline or in federated networks ensures that even if the main server goes down, the wisdom remains.`
  }
];