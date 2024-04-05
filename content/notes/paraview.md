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

# Python Algorithms

There is a way to write something akin to a programmable filter (i.e. in Python), but which allows one to take inputs instead of hardcoding in values.
This is helpful because you don't have to go back and find the script every time you want to use the filter -- instead you can just search the filter in Paraview.
They give an example in the Paraview documentation [here](https://docs.paraview.org/en/latest/ReferenceManual/pythonProgrammableFilter.html#python-algorithm).
However, it only sort of works, and it's hard to combine ideas from the two filters.
Hence, I give an example that I wrote up which calculates the distance of each point from a double helix of a certain distance from the origin, and twist wavenumber:
``` python
import numpy as np

# same imports as earlier.
from vtkmodules.vtkCommonDataModel import vtkDataSet
from vtkmodules.util.vtkAlgorithm import VTKPythonAlgorithmBase
from vtkmodules.numpy_interface import dataset_adapter as dsa

# new module for ParaView-specific decorators.
from paraview.util.vtkAlgorithm import smproxy, smproperty, smdomain

@smproxy.filter(label="Double Helix Filter")
@smproperty.input(name="Input")
class HalfVFilter(VTKPythonAlgorithmBase):
    # the rest of the code here is unchanged.
    def __init__(self):
        VTKPythonAlgorithmBase.__init__(self, outputType='vtkUnstructuredGrid')
        self.distance = 1.0
        self.twist_wavenumber = 0.0

    def RequestData(self, request, inInfo, outInfo):
        # get the first input.
        input0 = dsa.WrapDataObject(vtkDataSet.GetData(inInfo[0]))

        d = self.distance
        alpha = self.twist_wavenumber
        
        p = input0.GetPoints()

        dist = np.minimum( np.sqrt( (p[:, 1] - d * np.cos(alpha * p[:, 0]))**2
                               + (p[:, 2] - d * np.sin(alpha * p[:, 0]))**2 ),
                       np.sqrt( (p[:, 1] + d * np.cos(alpha * p[:, 0]))**2
                               + (p[:, 2] + d * np.sin(alpha * p[:, 0]))**2 )
                         )

        # add to output
        output = dsa.WrapDataObject(vtkDataSet.GetData(outInfo))
        output.ShallowCopy(input0.VTKObject)
        output.PointData.append(dist, "dist");
        return 1

    @smproperty.doublevector(name="distance", default_values=1.0)
    def SetDistance(self, x):
        self.distance = x
        self.Modified()

    @smproperty.doublevector(name="twist_wavenumber", default_values=0.0)
    def SetTwistWavenumber(self, x):
        self.twist_wavenumber = x
        self.Modified()
```

Basically you create a Python object which acts as the filter.
The `__init__` function lets you indicate the number of functions, and the output type (which in this case is an unstructured grid, what I typically use).
To actually do the job of the filter, you define a function `RequestData`.
There's boilerplate on how to input and output in the same way as the programmable filter, which should be self-explanatory.
You define input parameters to the filter by defining functions which set a particular object member.
Presumably you may use those members in the actual calculation of the filter.
To see other available options for input parameters (including custom xml ones), see the documentation linked above.

You actually use these in Paraview by loading in the `Tools > Manage Plugins` window.
Note that you can check a box which will load the plugins at startup.

# Custom filters

There are often times when one wants to apply a series of filters to many sets of data.
Setting up those filters for each bit of data is often tedious and tortuous, especially when there are settings that can remain the same for every single dataset.
This is doubly true when having to type out (or copy-paste) a script for a programmable filter.
The Paraview utility that handles this is the Custom filter utility.
To use this, select some number of filters (`CTRL-<left click>` on a few), then right click and select `Create Custom Filter`. 
Via this one may specify inputs, outputs, and also which settings to set and which to allow a user to set.
After they are created, custom filters are available just like any other filter.

[See here for documentation](https://www.paraview.org/Wiki/ParaView/Custom_Filters)
