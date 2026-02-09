import { NextRequest, NextResponse } from 'next/server';

interface JobMatchRequest {
  jobDescription: string;
  userProfile: {
    businessLevel: string;
    overallScore: number;
    skillScores: {
      email: number;
      meeting: number;
      presentation: number;
      negotiation: number;
    };
    strengths: string[];
    weaknesses: string[];
    interviewReadiness: {
      level: string;
      description: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: JobMatchRequest = await request.json();

    const prompt = `
あなたは転職エージェントの英語力アドバイザーです。
ユーザーの英語診断結果と、求人情報を照らし合わせて、応募可能性を判定してください。

【ユーザーの診断結果】
- ビジネス英語レベル: ${data.userProfile.businessLevel}
- 総合スコア: ${data.userProfile.overallScore}/100
- スキル別スコア:
  - ビジネスメール: ${data.userProfile.skillScores.email}/100
  - ミーティング: ${data.userProfile.skillScores.meeting}/100
  - プレゼンテーション: ${data.userProfile.skillScores.presentation}/100
  - 交渉・折衝: ${data.userProfile.skillScores.negotiation}/100
- 強み: ${data.userProfile.strengths.join(', ')}
- 弱み: ${data.userProfile.weaknesses.join(', ')}
- 面接準備度: ${data.userProfile.interviewReadiness.level} (${data.userProfile.interviewReadiness.description})

【求人情報】
${data.jobDescription}

以下のJSON形式のみで出力してください（説明文は不要）：

{
  "matchLevel": "high" | "medium" | "low" | "not_ready",
  "matchDescription": "判定結果の説明（1-2文）",
  "matchingPoints": ["求人要件を満たしている点（2-3個）"],
  "gapPoints": ["補強が必要な点（2-3個）"],
  "advice": "この求人に応募するためのアドバイス（2-3文）",
  "estimatedToeicRange": "推定TOEICスコア範囲（例：650-750点相当）",
  "requiredToeicEstimate": "求人が求めていると推定されるTOEICスコア（例：800点以上）"
}
`;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      // モックレスポンス
      const mockResponse = generateMockResponse(data);
      return NextResponse.json({ success: true, result: mockResponse });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();
    const analysisText = result.content[0].text;
    
    // JSONを抽出
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse API response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, result: analysis });
  } catch (error) {
    console.error('Job match error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze job match' },
      { status: 500 }
    );
  }
}

// モックレスポンス生成
function generateMockResponse(data: JobMatchRequest) {
  const score = data.userProfile.overallScore;
  
  let matchLevel: 'high' | 'medium' | 'low' | 'not_ready';
  let matchDescription: string;
  
  if (score >= 75) {
    matchLevel = 'high';
    matchDescription = '求人の英語要件を十分に満たしていると判断されます。';
  } else if (score >= 55) {
    matchLevel = 'medium';
    matchDescription = '基本的な要件は満たしていますが、一部補強が必要です。';
  } else if (score >= 40) {
    matchLevel = 'low';
    matchDescription = '現時点では要件を満たすのが難しい可能性があります。';
  } else {
    matchLevel = 'not_ready';
    matchDescription = '英語力の基礎固めが必要です。';
  }

  return {
    matchLevel,
    matchDescription,
    matchingPoints: data.userProfile.strengths.slice(0, 3),
    gapPoints: data.userProfile.weaknesses.slice(0, 3),
    advice: `${data.userProfile.weaknesses[0] || 'ビジネス英語'}の強化に取り組みながら、並行して応募を検討することをお勧めします。面接では${data.userProfile.strengths[0] || 'あなたの強み'}をアピールしましょう。`,
    estimatedToeicRange: score >= 75 ? '750-850点相当' : score >= 55 ? '600-700点相当' : '500-600点相当',
    requiredToeicEstimate: '700点以上（推定）',
  };
}
