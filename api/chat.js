export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;

    // validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
        'HTTP-Referer': 'https://tolba-store.shop',
        'X-Title': 'Tolba Store AI',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'system',
            content: `أنت مساعدة Tolba Store للصندلة النسائية المغربية.
تجاوبي دائماً بالدارجة المغربية بشكل طبيعي وودود.
المنتجات: Aria, Stella, Celine, Capri, Sienna, Luna — الأثمان من 179 إلى 199 درهم.
التوصيل مجاني في كامل المغرب — الدفع كاش عند الاستلام فقط.
تبديل مجاني خلال 7 أيام.
المقاسات من 37 إلى 41.
كوني مختصرة (3-4 جمل max) وتوجهي الزبونة للشراء.`
          },
          ...messages
        ],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}