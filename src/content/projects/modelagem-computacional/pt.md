## Visão geral

Projeto acadêmico desenvolvido para a disciplina de Modelagem Computacional. A proposta é explorar como técnicas de aprendizado de máquina não supervisionado podem organizar regiões com comportamentos semelhantes de consumo de energia.

A base reúne **20 bairros e regiões de Salvador** com dados simulados. Ela foi criada para demonstrar o fluxo de análise e não representa medições reais da cidade.

## Problema

Sem uma classificação pronta, como separar regiões com padrões parecidos de consumo médio e perda estimada? O projeto transforma essa pergunta em um problema de agrupamento e produz uma leitura visual dos resultados.

## Abordagem

1. Geração e carregamento da base em CSV.
2. Seleção de `consumo_medio_kwh` e `perda_estimada_pct` para o agrupamento.
3. Padronização das variáveis com `StandardScaler`.
4. Aplicação de K-Means com quatro clusters, `random_state=42` e `n_init=10`.
5. Ordenação dos clusters pelo consumo médio para criar nomes mais compreensíveis.
6. Exportação das tabelas e visualizações finais.

O número de unidades consumidoras permanece no conjunto para apoiar a análise e a apresentação, mas não participa do treinamento do K-Means.

## Resultado

Os registros foram separados em quatro perfis: baixo, médio, alto e altíssimo consumo. O gráfico abaixo resume quantos bairros ficaram em cada grupo.

![Gráfico de barras com a quantidade de bairros em cada perfil de consumo.](/project-media/modelagem-computacional/distribuicao-grupos.png)

## Tecnologias

- Python
- pandas
- scikit-learn
- Matplotlib
- Jupyter Notebook

## Executar localmente

```bash
pip install -r requirements.txt
python gerar_dados.py
python main.py
```

Como os dados são simulados, o resultado demonstra o pipeline de modelagem e visualização, não um diagnóstico sobre o consumo real de Salvador.
