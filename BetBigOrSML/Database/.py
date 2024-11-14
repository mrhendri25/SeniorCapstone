import subprocess

scripts = [
    "SeasonRB.py",
    "SeasonTE.py",
    "SeasonWR.py",
    "SeasonQB.py"  # Add more scripts as needed
]

for script in scripts:
    subprocess.run(["python", script])
