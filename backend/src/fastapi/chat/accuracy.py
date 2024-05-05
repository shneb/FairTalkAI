import pandas as pd

from backend.src.chatapp.utils import estimate_bias





def evaluate_accuracy(dataset: pd.DataFrame) -> float:
    correct_predictions = 0
    total_predictions = len(dataset)

    for _, row in dataset.iterrows():
        estimated_bias = estimate_bias(row['text'])
        if estimated_bias:
            # Assuming 'score' and 'type' are the primary metrics for accuracy
            if int(estimated_bias['score']) == int(row['score']) and estimated_bias['type'].lower() == row['type'].lower():
                correct_predictions += 1

    accuracy = (correct_predictions / total_predictions) * 100
    return accuracy

# Load the dataset
df = pd.read_csv("path_to_your_dataset.csv")

accuracy_score = evaluate_accuracy(df)
print(f"The accuracy score of the bias estimation model is: {accuracy_score}%")