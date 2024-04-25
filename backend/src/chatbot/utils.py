import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


def estimate_bias(text):
    prompt = f"""
    Analyze the following text for any potential ethical biases and provide a detailed bias report:
    Text: "{text}"
    Please respond in the following format:
    - Score (0%-100%): [Bias Score]
    - Bias Type: [Type of bias, e.g., gender, age, racial]
    - Description: [Short explanation of the bias, max 100 characters]
    """
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a ethical bias evaluation assistant."},
                {"role": "user", "content": prompt}
            ],
            model="gpt-4"
        )
        # Assuming the model follows the format, extract the data
        content = response.choices[0].message.content
        # Example of parsing the response:
        lines = content.strip().split('\n')
        score = lines[0].split(': ')[1].strip()
        bias_type = lines[1].split(': ')[1].strip()
        description = lines[2].split(': ')[1].strip()

        return {
            "score": score,
            "type": bias_type,
            "description": description
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return None
    
def get_openai_response(message_list):
    try:
        response = client.chat.completions.create(messages=message_list, model="gpt-3.5-turbo")
        return response.choices[0].message.content
    except Exception as e:
        print("Error with OpenAI API:", e)
        return None