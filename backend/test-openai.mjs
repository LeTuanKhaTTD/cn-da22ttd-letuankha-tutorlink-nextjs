import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'csk-mkpf6cc5efr345jktt4dd4t8jx2hynenhjh95hdk96e9wxy2',
  baseURL: 'https://api.chatanywhere.tech/v1',
  timeout: 30000
});

console.log('🧪 Testing OpenAI API connection...\n');

async function testAPI() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Ban la tro ly AI' },
        { role: 'user', content: 'Xin chao' }
      ],
      max_tokens: 50
    });

    console.log('✅ SUCCESS! API is working!');
    console.log('\nAI Response:', completion.choices[0].message.content);
    console.log('\nTokens used:', completion.usage.total_tokens);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('\nError details:', {
      status: error.status,
      type: error.type,
      code: error.code
    });
    
    if (error.response) {
      console.error('\nResponse data:', error.response.data);
    }
  }
}

testAPI();
