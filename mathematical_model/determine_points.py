import numpy as np
import pandas as pd
from pycaret.regression import *

def determine_points(offense_df, defense_df, final_regress):
    predicted_offense = predict_model(final_regress, data=offense_df)
    predicted_defense = predict_model(final_regress, data=defense_df)
    return predicted_offense, predicted_defense