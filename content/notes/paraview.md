---
title: "Paraview"
date: 2023-08-28T11:06:51-05:00
enableToc: false
draft: false
---

# Programmable filter

[See here for documentation](https://docs.paraview.org/en/latest/ReferenceManual/pythonProgrammableFilter.html)

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
Additionally, we may get the actual points themselves as follows:
```python
points = inputs[0].GetPoints()

print(points.shape)
```
for which the output would give:
```console
(269472, 3)
```

## Using numpy

There's a canonical way to transform between numpy arrays and vtk data.
Additionally, there is an algorithms package which allows one to make use of the extra structure in the vtk data (as opposed to just numpy arrays).
This is helpful for things like taking gradients of data.

[See here for documentation](https://docs.paraview.org/en/latest/ReferenceManual/vtkNumPyIntegration.html)

# Custom filters

There are often times when one wants to apply a series of filters to many sets of data.
Setting up those filters for each bit of data is often tedious and tortuous, especially when there are settings that can remain the same for every single dataset.
This is doubly true when having to type out (or copy-paste) a script for a programmable filter.
The Paraview utility that handles this is the Custom filter utility.
To use this, select some number of filters (`CTRL-<left click>` on a few), then right click and select `Create Custom Filter`. 
Via this one may specify inputs, outputs, and also which settings to set and which to allow a user to set.
After they are created, custom filters are available just like any other filter.

[See here for documentation](https://www.paraview.org/Wiki/ParaView/Custom_Filters)
