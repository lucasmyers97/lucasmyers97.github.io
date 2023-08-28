---
title: "Paraview"
date: 2023-08-28T11:06:51-05:00
enableToc: false
draft: false
---

# Programmable filter

## Basic input/output

```python
vector_data = inputs[0].PointData['vector_data']
scalar_data = inputs[0].PointData['scalar_data']

print(vector_data.shape)
print(scalar_data.shape)

output.PointData.append(scalar_data / 2.0, 'scalar_data_half')
```
Output would give:
```console
(269472, 3)
(269472,)
```
