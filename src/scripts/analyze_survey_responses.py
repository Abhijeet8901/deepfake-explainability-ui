import pandas as pd
import statistics
from collections import Counter
import numpy as np
from scipy import stats
dt = pd.read_excel("Deepfake Survey.xlsx", sheet_name="Image Responses")
# dt.columns
# Index(['Timestamp', 'Participant ID', 'Image Index', 'Q1', 'Q2', 'Q3', 'Q4',
#        'Q5'],
#       dtype='object')
dt1=pd.read_excel("Deepfake Survey.xlsx", sheet_name="Tool Responses")
# dt1.columns
# Index(['Timestamp', 'Participant ID', 'Q1', 'Q2', 'Q3'], dtype='object')
full_part = dt1["Participant ID"].tolist()
# len(full_part)
# 15
dt2 = dt[dt["Participant ID"].isin(full_part)]
# dt2.shape
# (150, 8)
# dt.shape
# (154, 8)
q1_ans = dt2["Q1"].tolist()
q1_ans_0 = [int(i.split(",")[0]) for i in q1_ans]
q1_ans_1 = [int(i.split(",")[1]) for i in q1_ans]
q1_ans_2 = [int(i.split(",")[2]) for i in q1_ans]
# sum(q1_ans_0)/len(q1_ans_0), statistics.stdev(q1_ans_0)
# EASE OF UNDERSTANDING
# (7.433333333333334, 2.0995898182553896)
# sum(q1_ans_1)/len(q1_ans_1), statistics.stdev(q1_ans_1)
# CLARITY
# (7.62, 2.015610221188211)
# sum(q1_ans_2)/len(q1_ans_2), statistics.stdev(q1_ans_2)
# ACCURACY
# (7.526666666666666, 2.178900241861041)

q2_ans = dt2["Q2"].tolist()
q2_ans_0 = [int(i.split(",")[0]) for i in q2_ans]
q2_ans_1 = [int(i.split(",")[1]) for i in q2_ans]
q2_ans_2 = [int(i.split(",")[2]) for i in q2_ans]
# sum(q2_ans_0)/len(q2_ans_0), statistics.stdev(q2_ans_0)
# EASE OF UNDERSTANDING
# (8.513333333333334, 1.4504647099189825)
# sum(q2_ans_1)/len(q2_ans_1), statistics.stdev(q2_ans_1)
# CLARITY
# (8.313333333333333, 1.5332409270862064)
# sum(q2_ans_2)/len(q2_ans_2), statistics.stdev(q2_ans_2)
# ACCURACY
# (7.866666666666666, 2.048625883110078)

stats.wilcoxon(q1_ans_0, q2_ans_0, alternative="less")
# EASE OF UNDERSTANDING
# WilcoxonResult(statistic=1546.5, pvalue=3.254027946041967e-06)
stats.wilcoxon(q1_ans_1, q2_ans_1)
# CLARITY
# WilcoxonResult(statistic=2590.5, pvalue=0.012368293576248766)
stats.wilcoxon(q1_ans_2, q2_ans_2)
# ACCURACY
# WilcoxonResult(statistic=2458.0, pvalue=0.2956066688834831)

preference_list = dt2["Q3"].tolist()
len([i for i in preference_list if i == "Complex Explanation"])
# 52
len([i for i in preference_list if i == "Simplified Explanation"])
# 98

# 98/150 = 0.6533333333333333

what_could = dt2["Q4"].tolist()
item_counts = Counter(what_could)
# item_counts
# Counter({'Agree': 58, 'Strongly Agree': 46, 'Neutral': 34, 'Disagree': 7, 'Strongly Disagree': 5})
cognitive_load = dt2["Q5"].tolist()
item_counts2 = Counter(cognitive_load)
# item_counts2
# Counter({'Strongly Agree': 63, 'Agree': 59, 'Neutral': 24, 'Disagree': 4})

tool_confidence_boost = dt1["Q1"].tolist()
item_count3 = Counter(tool_confidence_boost)
# item_count3
# Counter({'Agree': 9, 'Strongly Agree': 3, 'Neutral': 2, 'Disagree': 1})
tool_usage_likeliness = dt1["Q2"].tolist()
item_count4 = Counter(tool_usage_likeliness)
# item_count4
# Counter({'Agree': 8, 'Strongly Agree': 6, 'Neutral': 1})

dt4 = pd.read_excel("Deepfake Survey.xlsx", sheet_name="PreSurvey Responses")
dt4 = dt4[dt4["Participant ID"].isin(full_part)]
df_familiarity = dt4["Q1"].tolist()
item_count5 = Counter(df_familiarity)
# item_count5
# Counter({'Not Familiar': 1, 'Somewhat Familiar': 3, 'Familiar': 4, 'Very Familiar': 6, 'Extremely Familiar': 1})

df_tool_familiarity = dt4["Q2"].tolist()
item_count6 = Counter(df_tool_familiarity)
# item_count6
# Counter({'Not Familiar': 7, 'Somewhat Familiar': 5, 'Familiar': 1, 'Very Familiar': 2})

less_familiar_ids = dt4[dt4["Q1"].isin(["Not Familiar", "Somewhat Familiar"])]
less_familiar_ids = less_familiar_ids["Participant ID"].tolist()
more_familiar_ids = dt4[dt4["Q1"].isin(["Familiar", "Very Familiar", "Extremely Familiar"])]
more_familiar_ids = more_familiar_ids["Participant ID"].tolist()
dt3 = dt[dt["Participant ID"].isin(less_familiar_ids)]
dt5 = dt[dt["Participant ID"].isin(more_familiar_ids)]
dt3.shape, dt5.shape

g1_ans = dt3["Q1"].tolist()
g1_ans_0 = np.array([int(i.split(",")[0]) for i in g1_ans])
g1_ans_1 = np.array([int(i.split(",")[1]) for i in g1_ans])
g1_ans_2 = np.array([int(i.split(",")[2]) for i in g1_ans])

g2_ans = dt5["Q1"].tolist()
g2_ans_0 = np.array([int(i.split(",")[0]) for i in g2_ans])
g2_ans_1 = np.array([int(i.split(",")[1]) for i in g2_ans])
g2_ans_2 = np.array([int(i.split(",")[2]) for i in g2_ans])

statistic, p_value = stats.mannwhitneyu(g1_ans_0, g2_ans_0, alternative='two-sided')
print(f"Ease of Understanding, complex explanations: statistic = {statistic}, p-value: {p_value}")

statistic, p_value = stats.mannwhitneyu(g1_ans_1, g2_ans_1, alternative='two-sided')
print(f"Clarity, complex explanations: statistic = {statistic}, p-value: {p_value}")

statistic, p_value = stats.mannwhitneyu(g1_ans_2, g2_ans_2, alternative='two-sided')
print(f"Accuracy, complex explanations: statistic = {statistic}, p-value: {p_value}")


g1_ans = dt3["Q2"].tolist()
g1_ans_0 = np.array([int(i.split(",")[0]) for i in g1_ans])
g1_ans_1 = np.array([int(i.split(",")[1]) for i in g1_ans])
g1_ans_2 = np.array([int(i.split(",")[2]) for i in g1_ans])

g2_ans = dt5["Q2"].tolist()
g2_ans_0 = np.array([int(i.split(",")[0]) for i in g2_ans])
g2_ans_1 = np.array([int(i.split(",")[1]) for i in g2_ans])
g2_ans_2 = np.array([int(i.split(",")[2]) for i in g2_ans])

statistic, p_value = stats.mannwhitneyu(g1_ans_0, g2_ans_0, alternative='two-sided')
print(f"Ease of Understanding, simplified explanations: statistic = {statistic}, p-value: {p_value}")

statistic, p_value = stats.mannwhitneyu(g1_ans_1, g2_ans_1, alternative='two-sided')
print(f"Clarity, simplified explanations: statistic = {statistic}, p-value: {p_value}")

statistic, p_value = stats.mannwhitneyu(g1_ans_2, g2_ans_2, alternative='two-sided')
print(f"Accuracy, simplified explanations: statistic = {statistic}, p-value: {p_value}")


# libraries
import os
import pandas as pd
import altair as alt

# define the response options (or column names)
col_vals = [
    'Strongly Disagree', 
    'Disagree', 
    'Neutral', 
    'Agree', 
    'Strongly Agree'
]

item_counts = dict(item_counts)
sum_ = sum(list(item_counts.values()))
item_counts = {k: 100*(v/sum_) for k, v in item_counts.items()}

item_counts2 = dict(item_counts2)
sum_ = sum(list(item_counts2.values()))
item_counts2 = {k: 100*(v/sum_) for k, v in item_counts2.items()}

item_count3 = dict(item_count3)
sum_ = sum(list(item_count3.values()))
item_count3 = {k: 100*(v/sum_) for k, v in item_count3.items()}

item_count4 = dict(item_count4)
sum_ = sum(list(item_count4.values()))
item_count4 = {k: 100*(v/sum_) for k, v in item_count4.items()}

x = ["Not Familiar", "Somewhat Familiar", "Familiar", "Very Familiar", "Extremely Familiar"]

item_count5 = dict(item_count5)
for p in range(len(x)):
    if x[p] in item_count5:
        item_count5[col_vals[p]] = item_count5[x[p]]
        del item_count5[x[p]]
sum_ = sum(list(item_count5.values()))
item_count5 = {k: 100*(v/sum_) for k, v in item_count5.items()}

item_count6 = dict(item_count6)
for p in range(len(x)):
    if x[p] in item_count6:
        item_count6[col_vals[p]] = item_count6[x[p]]
        del item_count6[x[p]]
sum_ = sum(list(item_count6.values()))
item_count6 = {k: 100*(v/sum_) for k, v in item_count6.items()}

# load the data
pc = [item_count5, item_count6, item_counts, item_counts2, item_count3, item_count4]
pc = pd.DataFrame(pc, columns=col_vals)
from textwrap import wrap
pc["question"] = ["1. I am familiar with the concept of deepfakes", "2. I have prior experience with deepfake detection tools", "4. AI-Reconstructed Image is helpful", "3. Simplified Explanations reduce the cognitive load", "5. This tool improves my ability to detect deepfakes in the future", "6. I would like to use this tool in the future"]
# df['label'] = df['label'].apply(wrap, args=[30])
pc = pc.fillna(0)
# enabling altair rendering in notebook (needs to be explicitly set)
# alt.renderers.enable('notebook')

# define an extra 'start' column, the 'start' of every column
pc['start'] = -pc[col_vals[0:len(col_vals)//2]].sum(axis=1) -pc[col_vals[len(col_vals)//2]]/2

# properly 'melt' the dataframe for easier processing
df = pc.melt(
    id_vars=[
        'question',
        'start'
    ], 
    value_vars=col_vals,
    var_name='variable'
)

# define the offset, i.e. the start of the first column
offset = df[df['variable']==col_vals[0]]['start']

# calculate start values for the other response options
for i in range(len(col_vals)-1):
    offset = offset + df.loc[df['variable'] == col_vals[i], 'value'].values
    df.loc[df['variable']==col_vals[i+1], 'start'] = offset.values 

# add end of every column 
df['end'] = df['start'] + df['value']

# define the colors, the default colors do not make sense here
color_scale = alt.Scale(
    domain=col_vals,
    range=["#c30d24", "#f3a583", "#cccccc", "#94c6da", "#1770ab"]
)

# define the Y-axis
y_axis = alt.Axis(
    title='Questions',
    offset=5,
    ticks=False,
    minExtent=300,
    domain=False,
    labelLimit=400
)

# create the Altair chart
alt.Chart(df).mark_bar().encode(
    x=alt.X('start:Q', title='Percentage Responses'),
    x2='end:Q',
    y=alt.Y('question:N', axis=y_axis),
    color=alt.Color(
        'variable:N',
        legend=alt.Legend( title='Response'),
        scale=color_scale,
    )
).show()
