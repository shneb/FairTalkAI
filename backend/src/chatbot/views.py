# from django.shortcuts import render
# from django.http import JsonResponse
# from openai import OpenAI

# client = OpenAI(
#     api_key="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"
# )

# def as_openai(message):
#     chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": message,
#         }
#     ],
#     model="gpt-3.5-turbo",
# )
#     # print(chat_completion.choices[0].message.content)
#     return chat_completion.choices[0].message.content

# # Create your views here.
# def chatbot(request):
#     if request.method == 'POST':
#         message= request.POST.get('message')
#         response = as_openai(message)
#         return JsonResponse({'message': message, 'response': response})

#     return render(request, 'chatbot.html')


