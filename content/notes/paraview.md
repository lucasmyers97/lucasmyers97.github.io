---
title: "Paraview"
date: 2023-08-28T11:06:51-05:00
enableToc: false
draft: false
---

# Programmable filter

## Basic input/output

```python
input0 = inputs[0]

data = input0.PointData['V'] / 2.0

output.PointData.append(data, 'V_half')
```
