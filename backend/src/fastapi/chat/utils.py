import os
from openai import OpenAI
from typing import Dict, Optional, Tuple

# Setup OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def get_openai_response(message_list: list) -> Tuple[Optional[str], Optional[Dict]]:
    """
    Sends a conversation to OpenAI and retrieves an AI-generated response with bias analysis.
    """
    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo", messages=message_list)
        if response.choices:
            ai_response = response.choices[0].message.content
            bias_data = estimate_bias(ai_response)
            return ai_response, bias_data
        return None, None
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return None, None


def estimate_bias(text: str) -> Optional[Dict]:
    """
    Analyzes text for ethical biases and returns detailed bias information.
    """
    prompt = f"""
    Analyze the following text for potential ethical biases:
    Text: "{text}"
    - Score (0-100): [Bias Score]
    - Bias Type: [Type of bias]
    - Description: [Short explanation of the bias, max 100 characters]
    """
    try:
        response = client.chat.completions.create(messages=[{"role": "system", "content": "Bias evaluation assistant."}, {"role": "user", "content": prompt}], model="gpt-4")
        content = response.choices[0].message.content.split('\n')
        return {
            "score": content[0].split(': ')[1].strip(),
            "type": content[1].split(': ')[1].strip(),
            "description": content[2].split(': ')[1].strip()
        }
    except Exception as e:
        print(f"Error estimating bias: {str(e)}")
        return None
