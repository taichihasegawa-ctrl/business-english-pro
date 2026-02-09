// Business English Pro - 問題データ（正確性重視版）
// 全問英語・実践的なビジネスシナリオ
// Vocabulary 12問 + Reading 10問 + Situation Judgment 10問 + Writing 3問 = 35問

export interface Question {
  id: string;
  category: 'vocabulary' | 'reading' | 'situation' | 'writing';
  level: 'basic' | 'intermediate' | 'advanced';
  context?: string;  // シナリオや文書
  question: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

export const questions: Question[] = [
  // =============================================
  // === VOCABULARY (12問) ===
  // =============================================

  // --- Basic Vocabulary (4問) ---
  {
    id: 'v1',
    category: 'vocabulary',
    level: 'basic',
    question: 'What does "ASAP" stand for?',
    options: [
      'As soon as possible',
      'Always send a proposal',
      'After sales and pricing',
      'Assigned staff and personnel'
    ],
    correctAnswer: 0,
  },
  {
    id: 'v2',
    category: 'vocabulary',
    level: 'basic',
    question: '"Please keep me in the loop." What does this mean?',
    options: [
      'Please wait for my response',
      'Please keep me informed',
      'Please repeat your message',
      'Please send me the document'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v3',
    category: 'vocabulary',
    level: 'basic',
    question: 'What does "FYI" mean in an email?',
    options: [
      'Fix your information',
      'For your information',
      'Find your invoice',
      'Forward your ideas'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v4',
    category: 'vocabulary',
    level: 'basic',
    question: '"Let\'s touch base next week." What does "touch base" mean?',
    options: [
      'Have a brief meeting or conversation',
      'Visit the office',
      'Send a formal report',
      'Complete the project'
    ],
    correctAnswer: 0,
  },

  // --- Intermediate Vocabulary (5問) ---
  {
    id: 'v5',
    category: 'vocabulary',
    level: 'intermediate',
    question: '"We need to streamline our processes." What does "streamline" mean?',
    options: [
      'Make more complex',
      'Make more efficient',
      'Make more visible',
      'Make more expensive'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v6',
    category: 'vocabulary',
    level: 'intermediate',
    question: '"This solution is scalable." What does "scalable" mean?',
    options: [
      'Easy to measure',
      'Able to grow or expand easily',
      'Difficult to implement',
      'Cost-effective'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v7',
    category: 'vocabulary',
    level: 'intermediate',
    question: '"We should leverage our existing network." What does "leverage" mean?',
    options: [
      'Abandon or give up',
      'Use effectively to achieve a goal',
      'Carefully analyze',
      'Gradually reduce'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v8',
    category: 'vocabulary',
    level: 'intermediate',
    question: 'What does "COB" mean in "Please submit by COB Friday"?',
    options: [
      'Confirmation of budget',
      'Close of business',
      'Copy of bill',
      'Change of basis'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v9',
    category: 'vocabulary',
    level: 'intermediate',
    question: '"The project has a tight bandwidth." What does "bandwidth" mean here?',
    options: [
      'Internet speed',
      'Available time or resources',
      'Budget limit',
      'Technical specifications'
    ],
    correctAnswer: 1,
  },

  // --- Advanced Vocabulary (3問) ---
  {
    id: 'v10',
    category: 'vocabulary',
    level: 'advanced',
    question: '"We must conduct due diligence before the acquisition." What is "due diligence"?',
    options: [
      'A marketing campaign',
      'A thorough investigation or audit',
      'A team meeting',
      'A legal contract'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v11',
    category: 'vocabulary',
    level: 'advanced',
    question: '"The company is experiencing high attrition." What does "attrition" mean?',
    options: [
      'Rapid growth',
      'Employee turnover or loss',
      'Increased profits',
      'Market expansion'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v12',
    category: 'vocabulary',
    level: 'advanced',
    question: '"We\'re looking for synergies between the two departments." What are "synergies"?',
    options: [
      'Conflicts or disagreements',
      'Combined benefits greater than individual parts',
      'Budget reductions',
      'New employees'
    ],
    correctAnswer: 1,
  },

  // =============================================
  // === READING (10問) ===
  // =============================================

  // --- Basic Reading (3問) ---
  {
    id: 'r1',
    category: 'reading',
    level: 'basic',
    context: `From: HR Department
To: All Staff
Subject: Office Closure

Please note that the office will be closed on Monday, March 15th for maintenance. 
Remote work is expected for all employees. Regular operations will resume on Tuesday.`,
    question: 'What should employees do on March 15th?',
    options: [
      'Come to the office as usual',
      'Take a day off',
      'Work from home',
      'Attend maintenance training'
    ],
    correctAnswer: 2,
  },
  {
    id: 'r2',
    category: 'reading',
    level: 'basic',
    context: `From: John Smith
To: Project Team
Subject: Meeting Reschedule

The project review meeting originally scheduled for 2 PM Thursday has been 
moved to 10 AM Friday. Please update your calendars. The location remains 
Conference Room B.`,
    question: 'When is the new meeting time?',
    options: [
      'Thursday at 2 PM',
      'Friday at 2 PM',
      'Thursday at 10 AM',
      'Friday at 10 AM'
    ],
    correctAnswer: 3,
  },
  {
    id: 'r3',
    category: 'reading',
    level: 'basic',
    context: `Team,

Quick reminder: All expense reports for Q1 must be submitted by March 31st. 
Late submissions will be processed in the next quarter. Please attach all 
receipts to your report.

Thanks,
Finance Team`,
    question: 'What happens if you submit after March 31st?',
    options: [
      'Your report will be rejected',
      'You will receive a penalty',
      'It will be processed next quarter',
      'You need manager approval'
    ],
    correctAnswer: 2,
  },

  // --- Intermediate Reading (4問) ---
  {
    id: 'r4',
    category: 'reading',
    level: 'intermediate',
    context: `Dear Mr. Tanaka,

Thank you for your inquiry about our enterprise solution. Based on your 
requirements, I recommend our Professional tier, which includes 24/7 support 
and unlimited user licenses.

However, if data compliance is a priority, you may want to consider our 
Enterprise tier, which offers dedicated servers and SOC 2 certification.

I'd be happy to arrange a demo at your convenience.

Best regards,
Sarah Johnson`,
    question: 'What is the main advantage of the Enterprise tier mentioned?',
    options: [
      'Lower cost',
      'More user licenses',
      'Better data compliance features',
      '24/7 customer support'
    ],
    correctAnswer: 2,
  },
  {
    id: 'r5',
    category: 'reading',
    level: 'intermediate',
    context: `MEETING MINUTES - Product Launch Review
Date: March 10
Attendees: Marketing, Sales, Product teams

Key Decisions:
- Launch date confirmed: April 15
- Marketing campaign to begin April 1
- Sales training to be completed by April 10

Action Items:
- Marketing: Finalize press release by March 20
- Product: Complete beta testing by March 25
- Sales: Prepare demo environment by April 5

Next meeting: March 17 at 3 PM`,
    question: 'By when must the sales demo environment be ready?',
    options: [
      'March 20',
      'March 25',
      'April 5',
      'April 10'
    ],
    correctAnswer: 2,
  },
  {
    id: 'r6',
    category: 'reading',
    level: 'intermediate',
    context: `Subject: Re: Contract Renewal

Hi David,

After reviewing the proposed terms, we're happy to proceed with the renewal. 
However, we'd like to request a modification to Section 4.2 regarding the 
payment schedule. Instead of quarterly payments, we'd prefer monthly 
installments to better align with our cash flow.

All other terms are acceptable. Please let me know if this adjustment is feasible.

Regards,
Michelle`,
    question: 'What change is Michelle requesting?',
    options: [
      'A discount on the total price',
      'An extension of the contract period',
      'A change from quarterly to monthly payments',
      'Removal of Section 4.2'
    ],
    correctAnswer: 2,
  },
  {
    id: 'r7',
    category: 'reading',
    level: 'intermediate',
    context: `QUARTERLY PERFORMANCE SUMMARY

Revenue: $4.2M (↑12% vs. last quarter)
Operating Costs: $3.1M (↑18% vs. last quarter)
Net Profit: $1.1M (↓5% vs. last quarter)

Key Insight: While revenue growth exceeded targets, rising operational 
costs—particularly in logistics and raw materials—have impacted profitability. 
Cost optimization measures are being implemented for Q2.`,
    question: 'Why did net profit decrease despite revenue growth?',
    options: [
      'Revenue targets were not met',
      'Operating costs increased faster than revenue',
      'The company hired too many employees',
      'Sales declined in key markets'
    ],
    correctAnswer: 1,
  },

  // --- Advanced Reading (3問) ---
  {
    id: 'r8',
    category: 'reading',
    level: 'advanced',
    context: `CONFIDENTIAL - For Internal Distribution Only

Re: Proposed Merger with TechCorp Industries

Following preliminary discussions, both parties have agreed to enter 
exclusive negotiations for a potential merger. Key considerations include:

1. Valuation: TechCorp's current market cap of $2.3B, with a proposed 
   premium of 15-20% for shareholders.
   
2. Regulatory: Antitrust review expected; recommend engaging external 
   counsel immediately.
   
3. Integration: Significant overlap in APAC operations; workforce 
   rationalization likely required.

The Board will convene on March 20 to review the due diligence findings 
and determine whether to proceed to a Letter of Intent.`,
    question: 'What does "workforce rationalization" most likely refer to?',
    options: [
      'Hiring more employees',
      'Employee training programs',
      'Potential job cuts or restructuring',
      'Salary increases'
    ],
    correctAnswer: 2,
  },
  {
    id: 'r9',
    category: 'reading',
    level: 'advanced',
    context: `AMENDMENT TO SERVICE AGREEMENT

This Amendment ("Amendment") is entered into as of March 1, 2025, by and 
between Client Corp ("Client") and Service Provider Inc. ("Provider").

WHEREAS, the parties entered into a Service Agreement dated January 1, 2024 
("Original Agreement"); and

WHEREAS, the parties wish to modify certain terms of the Original Agreement;

NOW, THEREFORE, the parties agree as follows:

1. Section 3.1 (Service Fees) is hereby amended to reflect a 5% increase, 
   effective April 1, 2025.
   
2. Section 7.2 (Term) is extended by twelve (12) months, with the new 
   termination date being December 31, 2026.

All other terms and conditions of the Original Agreement remain in full 
force and effect.`,
    question: 'What is NOT being changed by this amendment?',
    options: [
      'The service fees',
      'The contract duration',
      'The effective date of fee changes',
      'The basic terms and conditions of the Original Agreement'
    ],
    correctAnswer: 3,
  },
  {
    id: 'r10',
    category: 'reading',
    level: 'advanced',
    context: `From: CEO Office
To: Executive Team
Subject: Strategic Pivot - Confidential

After extensive market analysis, the leadership team has concluded that 
our current B2C strategy is unsustainable given increasing customer 
acquisition costs (CAC up 40% YoY) and declining lifetime value (LTV down 15%).

Effective Q2, we will transition to a B2B-focused model, targeting 
enterprise clients in the healthcare and financial services sectors. 
This pivot will require:

- Restructuring of the sales organization
- Development of enterprise-grade security features
- Revision of pricing strategy (shift to annual contracts)

I recognize this represents a significant change. Individual meetings will 
be scheduled to discuss implications for each department.`,
    question: 'What is the primary reason for the strategic change?',
    options: [
      'Increased competition in B2B markets',
      'Customer acquisition becoming too expensive relative to returns',
      'Request from enterprise clients',
      'Regulatory requirements in healthcare'
    ],
    correctAnswer: 1,
  },

  // =============================================
  // === SITUATION JUDGMENT (10問) ===
  // =============================================

  // --- Basic Situation (3問) ---
  {
    id: 's1',
    category: 'situation',
    level: 'basic',
    context: 'You receive an email from a client asking for information, but you need more time to gather the data.',
    question: 'What is the best response?',
    options: [
      'Wait until you have all the information before responding',
      'Acknowledge the email and provide a timeline for your response',
      'Forward the email to your manager without responding',
      'Send whatever partial information you have immediately'
    ],
    correctAnswer: 1,
  },
  {
    id: 's2',
    category: 'situation',
    level: 'basic',
    context: 'You\'re in a video meeting and your internet connection becomes unstable.',
    question: 'What should you do?',
    options: [
      'Continue as if nothing is wrong',
      'Leave the meeting immediately',
      'Briefly inform others and turn off your video to improve connection',
      'Start speaking louder'
    ],
    correctAnswer: 2,
  },
  {
    id: 's3',
    category: 'situation',
    level: 'basic',
    context: 'A colleague sends you a meeting invite that conflicts with another commitment.',
    question: 'What is the most professional response?',
    options: [
      'Ignore the invite',
      'Decline with a brief explanation and suggest alternative times',
      'Accept and skip your other commitment',
      'Have someone else attend on your behalf without informing anyone'
    ],
    correctAnswer: 1,
  },

  // --- Intermediate Situation (4問) ---
  {
    id: 's4',
    category: 'situation',
    level: 'intermediate',
    context: 'During a client meeting, the client makes a request that you know is outside your company\'s standard offering.',
    question: 'What is the best response?',
    options: [
      '"No, we can\'t do that."',
      '"Yes, we can definitely do that" (even though you\'re unsure)',
      '"That\'s an interesting request. Let me check with our team and get back to you by tomorrow."',
      '"You should ask another vendor for that."'
    ],
    correctAnswer: 2,
  },
  {
    id: 's5',
    category: 'situation',
    level: 'intermediate',
    context: 'A client is upset about a delayed delivery and sends an angry email. The delay was caused by a supplier issue, not your team.',
    question: 'What is the best approach for your response?',
    options: [
      'Explain that it\'s the supplier\'s fault, not yours',
      'Apologize for the inconvenience, explain the situation, and provide a new timeline',
      'Ignore the email until you have good news',
      'Forward the email to your supplier to handle'
    ],
    correctAnswer: 1,
  },
  {
    id: 's6',
    category: 'situation',
    level: 'intermediate',
    context: 'In a meeting, your manager presents a plan that you believe has a significant flaw.',
    question: 'What is the most appropriate action?',
    options: [
      'Stay silent to avoid embarrassing your manager',
      'Send an email to other attendees pointing out the flaw after the meeting',
      'Raise your concern professionally during the meeting, focusing on the issue not the person',
      'Wait until the plan fails, then point out you knew about the flaw'
    ],
    correctAnswer: 2,
  },
  {
    id: 's7',
    category: 'situation',
    level: 'intermediate',
    context: 'You\'re leading a conference call and one participant keeps interrupting others.',
    question: 'How should you handle this?',
    options: [
      'Let it continue to avoid confrontation',
      'Mute the person without explanation',
      'Politely remind everyone to let others finish their thoughts before speaking',
      'End the meeting early'
    ],
    correctAnswer: 2,
  },

  // --- Advanced Situation (3問) ---
  {
    id: 's8',
    category: 'situation',
    level: 'advanced',
    context: 'You discover a significant error in a report that has already been sent to a major client. The error could affect their business decision.',
    question: 'What is the best course of action?',
    options: [
      'Hope the client doesn\'t notice the error',
      'Immediately inform your manager and contact the client with a correction',
      'Quietly fix it and send an "updated version" without mentioning the error',
      'Wait to see if the client asks questions about it'
    ],
    correctAnswer: 1,
  },
  {
    id: 's9',
    category: 'situation',
    level: 'advanced',
    context: 'You\'re negotiating a contract with a potential partner. They\'ve made a final offer that is below your target but above your walk-away point.',
    question: 'What is the best negotiation approach?',
    options: [
      'Accept immediately before they change their mind',
      'Reject and demand your original target',
      'Explore if there are non-monetary terms that could add value, then make a decision',
      'Tell them you\'ll think about it and never respond'
    ],
    correctAnswer: 2,
  },
  {
    id: 's10',
    category: 'situation',
    level: 'advanced',
    context: 'You\'re presenting quarterly results to senior leadership. Midway through, the CFO challenges one of your key data points, suggesting it\'s incorrect.',
    question: 'What is the best response?',
    options: [
      'Insist that your data is correct and continue',
      'Apologize profusely and end your presentation early',
      'Acknowledge the concern, offer to verify the data point, and continue with your presentation',
      'Argue with the CFO to defend your analysis'
    ],
    correctAnswer: 2,
  },
];

// =============================================
// === WRITING PROMPTS (3問) ===
// =============================================

export const writingPrompts = [
  {
    id: 'w1',
    category: 'writing',
    level: 'intermediate',
    scenario: 'Meeting Request Email',
    instruction: `You want to schedule a 30-minute meeting with a client (Mr. Johnson) to discuss their upcoming project requirements. You are available next Tuesday afternoon or Wednesday morning.

Write a professional email (4-6 sentences) requesting the meeting.`,
    evaluationCriteria: ['Professional tone', 'Clear purpose', 'Specific availability', 'Appropriate greeting/closing'],
  },
  {
    id: 'w2',
    category: 'writing',
    level: 'intermediate',
    scenario: 'Delivering Difficult News',
    instruction: `Your team cannot meet the original deadline for a project. The new estimated completion date is two weeks later than originally promised. The client is expecting an update.

Write an email (4-6 sentences) informing the client of this delay. Be professional, take responsibility, and maintain the relationship.`,
    evaluationCriteria: ['Appropriate apology', 'Clear explanation', 'New timeline provided', 'Maintains professional relationship'],
  },
  {
    id: 'w3',
    category: 'writing',
    level: 'advanced',
    scenario: 'Proposal/Persuasion Email',
    instruction: `You want to propose a new process improvement to your manager that would require an initial investment of time (team training) but would improve efficiency by an estimated 20% within 6 months.

Write a brief email (5-7 sentences) making this proposal. Include the key benefit, the required investment, and a call to action.`,
    evaluationCriteria: ['Persuasive structure', 'Clear benefit statement', 'Acknowledges costs', 'Specific call to action'],
  },
];

// =============================================
// ランダム選出ユーティリティ
// =============================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectQuestions(): Question[] {
  const selected: Question[] = [];

  // Vocabulary: 4 basic + 5 intermediate + 3 advanced = 12
  const vocabQuestions = questions.filter(q => q.category === 'vocabulary');
  const vocabBasic = shuffleArray(vocabQuestions.filter(q => q.level === 'basic'));
  const vocabIntermediate = shuffleArray(vocabQuestions.filter(q => q.level === 'intermediate'));
  const vocabAdvanced = shuffleArray(vocabQuestions.filter(q => q.level === 'advanced'));
  selected.push(...vocabBasic, ...vocabIntermediate, ...vocabAdvanced);

  // Reading: 3 basic + 4 intermediate + 3 advanced = 10
  const readingQuestions = questions.filter(q => q.category === 'reading');
  const readingBasic = shuffleArray(readingQuestions.filter(q => q.level === 'basic'));
  const readingIntermediate = shuffleArray(readingQuestions.filter(q => q.level === 'intermediate'));
  const readingAdvanced = shuffleArray(readingQuestions.filter(q => q.level === 'advanced'));
  selected.push(...readingBasic, ...readingIntermediate, ...readingAdvanced);

  // Situation: 3 basic + 4 intermediate + 3 advanced = 10
  const situationQuestions = questions.filter(q => q.category === 'situation');
  const situationBasic = shuffleArray(situationQuestions.filter(q => q.level === 'basic'));
  const situationIntermediate = shuffleArray(situationQuestions.filter(q => q.level === 'intermediate'));
  const situationAdvanced = shuffleArray(situationQuestions.filter(q => q.level === 'advanced'));
  selected.push(...situationBasic, ...situationIntermediate, ...situationAdvanced);

  return selected;
}

export function getWritingPrompts() {
  return writingPrompts;
}
