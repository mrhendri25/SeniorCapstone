from pycaret.regression import *
import pandas as pd

def points_regression(training_df):
    clf = setup(data=training_df, target='score', session_id=123, ignore_features=['game_id', 'season', 'week', 'posteam', 'posteam_type', 'win'])
    compare_models()
    gbr = create_model('gbr')
    tuned_gbr = tune_model(gbr, optimize='R2')
    final_gbr = finalize_model(tuned_gbr)
    return final_gbr