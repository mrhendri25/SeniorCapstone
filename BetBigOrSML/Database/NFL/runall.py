import subprocess
import schedule
import time

scripts = [
    "SeasonRB.py",
    "SeasonTE.py",
    "SeasonWR.py",
    "SeasonQB.py",
    "Schedule.py",
    "TeamRecords.py",
    "WeeklyQB.py",
    "WeeklyRB.py",
    "WeeklyTE.py",
    "WeeklyWR.py"
]

def run_all_scripts():
    for script in scripts:
        subprocess.run(["python", script])

schedule.every().day.at("14:09").do(run_all_scripts)

while True:
    schedule.run_pending()
    time.sleep(1)
