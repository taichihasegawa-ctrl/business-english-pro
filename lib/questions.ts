// Business English Pro - 問題データ
// ビジネスシーン特化の問題プール

export interface Question {
  id: string;
  category: 'email' | 'meeting' | 'presentation' | 'negotiation';
  level: 'basic' | 'intermediate' | 'advanced';
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  // =============================================
  // === ビジネスメール (12問) ===
  // =============================================
  
  // 基礎 (4問)
  {
    id: 'e1',
    category: 'email',
    level: 'basic',
    question: 'メールの書き出しとして最も適切なものは？',
    context: '初めて連絡する取引先への問い合わせメール',
    options: [
      'Hey, how are you?',
      'Dear Sir/Madam,',
      'Hi there!',
      'To whom it may concern,'
    ],
    correctAnswer: 1,
  },
  {
    id: 'e2',
    category: 'email',
    level: 'basic',
    question: '「添付ファイルをご確認ください」を英語で？',
    options: [
      'Please check the attached file.',
      'Please look the file attached.',
      'Please see attached file.',
      'Please watch the attachment.'
    ],
    correctAnswer: 0,
  },
  {
    id: 'e3',
    category: 'email',
    level: 'basic',
    question: '「ご返信お待ちしております」の適切な表現は？',
    options: [
      'I wait your reply.',
      'I look forward to hearing from you.',
      'Please reply me soon.',
      'I expect your answer.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'e4',
    category: 'email',
    level: 'basic',
    question: '「お忙しいところ恐れ入りますが」に近い表現は？',
    options: [
      'I know you are very busy, but...',
      'Sorry for your busy time...',
      'I appreciate your time and...',
      'Because you are busy...'
    ],
    correctAnswer: 2,
  },

  // 中級 (4問)
  {
    id: 'e5',
    category: 'email',
    level: 'intermediate',
    question: '納期の遅延を謝罪する際、最も適切な表現は？',
    options: [
      'Sorry for the delay.',
      'We apologize for the inconvenience caused by the delay.',
      'Delay is very sorry.',
      'We are late, sorry.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'e6',
    category: 'email',
    level: 'intermediate',
    question: '「ご検討いただけますと幸いです」の適切な表現は？',
    options: [
      'Please think about it.',
      'I hope you consider.',
      'We would appreciate your consideration.',
      'Please decide it.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'e7',
    category: 'email',
    level: 'intermediate',
    question: '会議の日程調整で「ご都合はいかがでしょうか」は？',
    options: [
      'Is your schedule OK?',
      'When are you free?',
      'Would any of these times work for you?',
      'What time is good?'
    ],
    correctAnswer: 2,
  },
  {
    id: 'e8',
    category: 'email',
    level: 'intermediate',
    question: '「念のため確認させてください」の適切な表現は？',
    options: [
      'Let me check just in case.',
      'I want to confirm just to be safe.',
      'Just to clarify...',
      'I check for safety.'
    ],
    correctAnswer: 2,
  },

  // 上級 (4問)
  {
    id: 'e9',
    category: 'email',
    level: 'advanced',
    question: '契約条件の変更を丁寧に断る表現として最適なのは？',
    options: [
      'We cannot accept your request.',
      'Unfortunately, we are not in a position to accommodate this request at this time.',
      'Your request is rejected.',
      'We say no to your request.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'e10',
    category: 'email',
    level: 'advanced',
    question: '「早急にご対応いただけますと助かります」の適切な表現は？',
    options: [
      'Please do it quickly.',
      'We need this urgently.',
      'Your prompt attention to this matter would be greatly appreciated.',
      'Hurry up please.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'e11',
    category: 'email',
    level: 'advanced',
    question: 'クレームへの返信で最初に述べるべきことは？',
    options: [
      '問題の原因の説明',
      '謝罪と問題認識の表明',
      '今後の対策',
      '責任の所在'
    ],
    correctAnswer: 1,
  },
  {
    id: 'e12',
    category: 'email',
    level: 'advanced',
    question: '「貴社のご提案を前向きに検討したい」の表現は？',
    options: [
      'We will think about your proposal.',
      'Your proposal is interesting.',
      'We would like to give your proposal serious consideration.',
      'We maybe accept your proposal.'
    ],
    correctAnswer: 2,
  },

  // =============================================
  // === ミーティング (12問) ===
  // =============================================

  // 基礎 (4問)
  {
    id: 'm1',
    category: 'meeting',
    level: 'basic',
    question: '会議の冒頭で「本日の議題は〜です」は？',
    options: [
      'Today we talk about...',
      'The agenda for today is...',
      'I want to discuss...',
      'Our topic is...'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm2',
    category: 'meeting',
    level: 'basic',
    question: '「もう一度おっしゃっていただけますか？」の表現は？',
    options: [
      'Say again?',
      'What?',
      'Could you repeat that, please?',
      'I don\'t understand.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'm3',
    category: 'meeting',
    level: 'basic',
    question: '「賛成です」を会議で表現すると？',
    options: [
      'OK.',
      'I agree with that.',
      'Yes.',
      'Right.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm4',
    category: 'meeting',
    level: 'basic',
    question: '自分の意見を述べる前の適切な前置きは？',
    options: [
      'I think...',
      'Listen to me...',
      'In my opinion...',
      'My idea...'
    ],
    correctAnswer: 2,
  },

  // 中級 (4問)
  {
    id: 'm5',
    category: 'meeting',
    level: 'intermediate',
    question: '他の人の発言に補足したい時の表現は？',
    options: [
      'I want to say more.',
      'To add to what John said...',
      'John is right, and...',
      'Also...'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm6',
    category: 'meeting',
    level: 'intermediate',
    question: '議論を元の話題に戻したい時の表現は？',
    options: [
      'Stop talking about that.',
      'Let\'s get back to the main topic.',
      'That\'s not important.',
      'Change the topic.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm7',
    category: 'meeting',
    level: 'intermediate',
    question: '「その点についてもう少し詳しく説明していただけますか」は？',
    options: [
      'Tell me more.',
      'Could you elaborate on that point?',
      'Explain more.',
      'I want details.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm8',
    category: 'meeting',
    level: 'intermediate',
    question: '反対意見を丁寧に述べる表現は？',
    options: [
      'I don\'t agree.',
      'You are wrong.',
      'I see your point, but I have a different perspective.',
      'No, that\'s not right.'
    ],
    correctAnswer: 2,
  },

  // 上級 (4問)
  {
    id: 'm9',
    category: 'meeting',
    level: 'advanced',
    question: '会議の結論をまとめる際の表現は？',
    options: [
      'So we decided...',
      'To summarize our discussion, we\'ve agreed to...',
      'The meeting is over.',
      'Finally...'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm10',
    category: 'meeting',
    level: 'advanced',
    question: '議論が紛糾した時、場をまとめる表現は？',
    options: [
      'Please stop fighting.',
      'Let\'s take a step back and look at this from a different angle.',
      'Calm down everyone.',
      'This is getting nowhere.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm11',
    category: 'meeting',
    level: 'advanced',
    question: 'アクションアイテムを確認する表現として最適なのは？',
    options: [
      'What should we do?',
      'Let me confirm the action items and owners before we close.',
      'Who does what?',
      'Remember your tasks.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'm12',
    category: 'meeting',
    level: 'advanced',
    question: '意思決定を促す際の適切な表現は？',
    options: [
      'Decide now.',
      'What do you think?',
      'Given the time constraints, shall we move to a decision?',
      'We need to choose.'
    ],
    correctAnswer: 2,
  },

  // =============================================
  // === プレゼンテーション (8問) ===
  // =============================================

  // 基礎 (3問)
  {
    id: 'p1',
    category: 'presentation',
    level: 'basic',
    question: 'プレゼンの冒頭で自己紹介する際の表現は？',
    options: [
      'I am Tanaka.',
      'Let me introduce myself. My name is Tanaka from the Sales Department.',
      'My name Tanaka.',
      'Hello, Tanaka here.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'p2',
    category: 'presentation',
    level: 'basic',
    question: '「次のスライドをご覧ください」は？',
    options: [
      'Next slide please.',
      'Look at this.',
      'Let me move on to the next slide.',
      'Change slide.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'p3',
    category: 'presentation',
    level: 'basic',
    question: 'グラフを説明する時の表現は？',
    options: [
      'This graph is...',
      'As you can see from this graph...',
      'Look at graph.',
      'Graph shows...'
    ],
    correctAnswer: 1,
  },

  // 中級 (3問)
  {
    id: 'p4',
    category: 'presentation',
    level: 'intermediate',
    question: '質疑応答に移る際の表現は？',
    options: [
      'Questions?',
      'Any questions?',
      'I\'d now like to open the floor for questions.',
      'Ask me.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'p5',
    category: 'presentation',
    level: 'intermediate',
    question: '質問に即答できない時の対応は？',
    options: [
      'I don\'t know.',
      'That\'s a good question. Let me get back to you on that.',
      'I can\'t answer.',
      'Ask someone else.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'p6',
    category: 'presentation',
    level: 'intermediate',
    question: '重要なポイントを強調する表現は？',
    options: [
      'This is important.',
      'Listen carefully.',
      'I\'d like to emphasize that...',
      'Remember this.'
    ],
    correctAnswer: 2,
  },

  // 上級 (2問)
  {
    id: 'p7',
    category: 'presentation',
    level: 'advanced',
    question: '聴衆の関心を引きつける冒頭の表現は？',
    options: [
      'Today I will talk about...',
      'Let me start with a question: Have you ever wondered why...?',
      'My presentation is about...',
      'I\'m going to explain...'
    ],
    correctAnswer: 1,
  },
  {
    id: 'p8',
    category: 'presentation',
    level: 'advanced',
    question: 'プレゼンの締めくくりとして最も効果的なのは？',
    options: [
      'That\'s all.',
      'Thank you for listening.',
      'In conclusion, I\'d like to leave you with this thought: [key message]. Thank you.',
      'The end.'
    ],
    correctAnswer: 2,
  },

  // =============================================
  // === 交渉・折衝 (8問) ===
  // =============================================

  // 基礎 (3問)
  {
    id: 'n1',
    category: 'negotiation',
    level: 'basic',
    question: '価格交渉で「もう少し安くなりませんか」は？',
    options: [
      'Cheaper please.',
      'Is there any room for negotiation on the price?',
      'Too expensive.',
      'Lower the price.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'n2',
    category: 'negotiation',
    level: 'basic',
    question: '「検討させてください」の表現は？',
    options: [
      'I\'ll think.',
      'Let me think about it.',
      'I need to consider.',
      'Give me time to think.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'n3',
    category: 'negotiation',
    level: 'basic',
    question: '条件を確認する表現は？',
    options: [
      'What are terms?',
      'Just to confirm, the terms are...?',
      'Tell me conditions.',
      'Conditions?'
    ],
    correctAnswer: 1,
  },

  // 中級 (3問)
  {
    id: 'n4',
    category: 'negotiation',
    level: 'intermediate',
    question: '代替案を提示する際の表現は？',
    options: [
      'How about this instead?',
      'No, do this.',
      'Change your plan.',
      'My idea is better.'
    ],
    correctAnswer: 0,
  },
  {
    id: 'n5',
    category: 'negotiation',
    level: 'intermediate',
    question: '「双方にとって良い条件を見つけたい」は？',
    options: [
      'I want good deal.',
      'We want to win.',
      'I\'d like to find a solution that works for both parties.',
      'Let\'s both be happy.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'n6',
    category: 'negotiation',
    level: 'intermediate',
    question: '相手の提案を部分的に受け入れる表現は？',
    options: [
      'OK, but...',
      'We can agree to that point, however...',
      'Half yes.',
      'Some parts OK.'
    ],
    correctAnswer: 1,
  },

  // 上級 (2問)
  {
    id: 'n7',
    category: 'negotiation',
    level: 'advanced',
    question: '交渉の行き詰まりを打開する表現は？',
    options: [
      'Give up.',
      'We can\'t agree.',
      'Perhaps we could explore some creative alternatives here.',
      'Let\'s stop.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'n8',
    category: 'negotiation',
    level: 'advanced',
    question: '最終合意を確認する際の表現は？',
    options: [
      'We agree.',
      'Deal.',
      'So, to confirm our agreement: [summary]. Shall we proceed on this basis?',
      'OK, done.'
    ],
    correctAnswer: 2,
  },
];

// ライティング問題
export const writingPrompts = [
  {
    id: 'w1',
    category: 'email',
    prompt: 'Write a brief email (2-3 sentences) requesting a meeting with a client to discuss a new project.',
  },
  {
    id: 'w2',
    category: 'email',
    prompt: 'Write a brief email (2-3 sentences) apologizing for a delayed response and providing an update.',
  },
  {
    id: 'w3',
    category: 'meeting',
    prompt: 'Write 2-3 sentences summarizing a decision made in a meeting and next steps.',
  },
];

// ランダム選出
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectRandomQuestions(): Question[] {
  const selected: Question[] = [];

  const config = [
    { category: 'email', basic: 2, intermediate: 2, advanced: 1 },
    { category: 'meeting', basic: 2, intermediate: 2, advanced: 1 },
    { category: 'presentation', basic: 1, intermediate: 2, advanced: 1 },
    { category: 'negotiation', basic: 1, intermediate: 2, advanced: 1 },
  ];

  for (const cfg of config) {
    const catQuestions = questions.filter((q) => q.category === cfg.category);
    
    const basics = shuffleArray(catQuestions.filter((q) => q.level === 'basic')).slice(0, cfg.basic);
    const intermediates = shuffleArray(catQuestions.filter((q) => q.level === 'intermediate')).slice(0, cfg.intermediate);
    const advanced = shuffleArray(catQuestions.filter((q) => q.level === 'advanced')).slice(0, cfg.advanced);

    selected.push(...basics, ...intermediates, ...advanced);
  }

  return selected;
}

export function selectRandomWritingPrompt() {
  return shuffleArray(writingPrompts)[0];
}
