import pandas as pd

df = pd.read_excel("./test_form.xlsx")
#df.drop(index=[0, 1], axis=1)
print(df.head())
df.to_csv("cp932.csv", encoding="cp932")
df.to_csv("utf8.csv", encoding="utf-8")
