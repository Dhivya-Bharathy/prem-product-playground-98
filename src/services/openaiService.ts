import OpenAI from 'openai';

// OpenAI service for generating user stories
class OpenAIService {
  private openai: OpenAI | null = null;
  private apiKey: string | null = null;

  initialize(apiKey: string) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // For client-side usage (consider using a backend in production)
    });
  }

  isInitialized(): boolean {
    return this.openai !== null && this.apiKey !== null;
  }

  private cleanJsonResponse(response: string): string {
    // Remove markdown code blocks if present
    let cleaned = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Find the JSON object bounds
    const startIndex = cleaned.indexOf('{');
    const lastIndex = cleaned.lastIndexOf('}');
    
    if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
      cleaned = cleaned.substring(startIndex, lastIndex + 1);
    }
    
    return cleaned.trim();
  }

  async generateUserStory(prompt: string): Promise<{
    userType: string;
    action: string;
    benefit: string;
    acceptanceCriteria: string[];
    priority: 'low' | 'medium' | 'high';
    complexity: 'simple' | 'moderate' | 'complex';
    notes: string;
  }> {
    if (!this.openai) {
      throw new Error('OpenAI not initialized. Please provide an API key.');
    }

    const systemPrompt = `You are an expert product manager and user story writer. Generate a comprehensive user story based on the provided prompt.

IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or explanations.

{
  "userType": "specific user role (e.g., 'marketing manager', 'mobile app user')",
  "action": "what the user wants to do (without 'I want to')",
  "benefit": "the value/benefit the user gets (without 'so that')",
  "acceptanceCriteria": ["criterion 1", "criterion 2", "criterion 3"],
  "priority": "low|medium|high",
  "complexity": "simple|moderate|complex",
  "notes": "additional context, assumptions, or implementation notes"
}

Make sure the user story follows the format: "As a [userType], I want [action] so that [benefit]."
Provide 3-5 realistic and testable acceptance criteria.
Assess priority based on business value and user impact.
Assess complexity based on technical implementation difficulty.

Return ONLY the JSON object, no other text.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      // Clean and parse the JSON response
      const cleanedResponse = this.cleanJsonResponse(response);
      
      try {
        const parsedResponse = JSON.parse(cleanedResponse);
        
        // Validate the response structure
        if (!parsedResponse.userType || !parsedResponse.action || !parsedResponse.benefit) {
          throw new Error('Invalid response structure from OpenAI');
        }

        // Ensure arrays are properly formatted
        if (!Array.isArray(parsedResponse.acceptanceCriteria)) {
          parsedResponse.acceptanceCriteria = [];
        }

        return parsedResponse;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Raw Response:', response);
        console.error('Cleaned Response:', cleanedResponse);
        
        // Fallback: try to extract basic information manually
        const userTypeMatch = response.match(/"userType":\s*"([^"]+)"/);
        const actionMatch = response.match(/"action":\s*"([^"]+)"/);
        const benefitMatch = response.match(/"benefit":\s*"([^"]+)"/);
        
        if (userTypeMatch && actionMatch && benefitMatch) {
          return {
            userType: userTypeMatch[1],
            action: actionMatch[1],
            benefit: benefitMatch[1],
            acceptanceCriteria: [
              "User can access the feature",
              "Feature functions as expected",
              "User receives appropriate feedback"
            ],
            priority: 'medium',
            complexity: 'moderate',
            notes: 'Generated with fallback parsing due to JSON format issues'
          };
        }
        
        throw new Error(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`);
      }
    } catch (error) {
      console.error('Error generating user story:', error);
      throw new Error(`Failed to generate user story: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateMultipleUserStories(prompt: string, count: number = 3): Promise<Array<{
    userType: string;
    action: string;
    benefit: string;
    acceptanceCriteria: string[];
    priority: 'low' | 'medium' | 'high';
    complexity: 'simple' | 'moderate' | 'complex';
    notes: string;
  }>> {
    if (!this.openai) {
      throw new Error('OpenAI not initialized. Please provide an API key.');
    }

    const systemPrompt = `You are an expert product manager and user story writer. Generate ${count} different user stories based on the provided prompt.

IMPORTANT: Return ONLY a valid JSON array with NO additional text, markdown, or explanations.

[
  {
    "userType": "specific user role",
    "action": "what the user wants to do",
    "benefit": "the value/benefit the user gets",
    "acceptanceCriteria": ["criterion 1", "criterion 2", "criterion 3"],
    "priority": "low|medium|high",
    "complexity": "simple|moderate|complex",
    "notes": "additional context or implementation notes"
  }
]

Make sure each story is unique and covers different aspects of the feature/requirement.
Return ONLY the JSON array, no other text.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const cleanedResponse = this.cleanJsonResponse(response);
      const parsedResponse = JSON.parse(cleanedResponse);
      
      if (!Array.isArray(parsedResponse)) {
        throw new Error('Expected array response from OpenAI');
      }

      return parsedResponse;
    } catch (error) {
      console.error('Error generating multiple user stories:', error);
      throw new Error(`Failed to generate user stories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async improveUserStory(existingStory: string): Promise<{
    improvedStory: string;
    suggestions: string[];
    acceptanceCriteria: string[];
  }> {
    if (!this.openai) {
      throw new Error('OpenAI not initialized. Please provide an API key.');
    }

    const systemPrompt = `You are an expert product manager. Analyze and improve the given user story.

IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or explanations.

{
  "improvedStory": "improved version of the user story following As a..., I want..., so that... format",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "acceptanceCriteria": ["criterion 1", "criterion 2", "criterion 3"]
}

Focus on clarity, specificity, and value proposition.
Return ONLY the JSON object, no other text.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please improve this user story: ${existingStory}` }
        ],
        temperature: 0.6,
        max_tokens: 800,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const cleanedResponse = this.cleanJsonResponse(response);
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Error improving user story:', error);
      throw new Error(`Failed to improve user story: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const openaiService = new OpenAIService(); 