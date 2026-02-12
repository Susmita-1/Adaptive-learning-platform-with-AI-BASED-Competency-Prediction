def predict_competency(score, accuracy, time_taken):

    if score >= 80 and accuracy >= 80 and time_taken <= 10:
        return "Advanced"
    elif score >= 50:
        return "Intermediate"
    else:
        return "Beginner"
