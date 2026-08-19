## Overview

An academic project developed for a Computational Modeling course. It explores how unsupervised machine learning can organize regions with similar energy-consumption behavior.

The dataset contains **20 neighborhoods and regions of Salvador** with simulated data. It was created to demonstrate the analysis workflow and does not represent real measurements from the city.

## Goal

One of the main goals of this work is to monitor Salvador neighborhoods through their consumption classifications. This perspective helps distinguish, for example, industrial, commercial, peripheral and affluent areas.

## Problem

In addition to organizing regions with similar average consumption and estimated loss patterns, the project seeks to identify signs of:

- energy waste;
- energy leakage, such as electricity loss in wiring due to poorly made connections;
- possible fraud or measurement errors.

## Approach

1. Generate and load the CSV dataset.
2. Select `consumo_medio_kwh` and `perda_estimada_pct` for clustering.
3. Standardize the variables with `StandardScaler`.
4. Apply K-Means with four clusters, `random_state=42` and `n_init=10`.
5. Sort clusters by average consumption to create clearer names.
6. Export the final tables and visualizations.

The number of consumer units remains in the dataset for analysis and presentation, but it is not used to train K-Means.

## Result

The records were divided into four profiles: low, medium, high and very high consumption. The chart below summarizes how many neighborhoods belong to each group.

![Bar chart showing the number of neighborhoods in each consumption profile.](/project-media/modelagem-computacional/distribuicao-grupos.png)

## Relevance

The project has social, environmental and economic impact. The analysis helps raise awareness of consumption patterns and shows how reducing waste can decrease environmental impact and contribute to greater long-term tariff stability.

## Technologies

- Python
- pandas
- scikit-learn
- Matplotlib
- Jupyter Notebook

## Run locally

```bash
pip install -r requirements.txt
python gerar_dados.py
python main.py
```

Because the data is simulated, the result demonstrates the modeling and visualization pipeline rather than a diagnosis of Salvador's actual energy consumption.
