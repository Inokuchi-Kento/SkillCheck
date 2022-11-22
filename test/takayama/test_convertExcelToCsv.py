import pandas as pd

df = pd.read_excel("form.xlsx")
df.to_csv("convertedCsv.csv")
