---
title: "Projects"
date: 2023-08-05T18:54:51-05:00
enableToc: false
draft: false
---

# [Hydrodynamics of anisotropically elastic nematic liquid crystals](https://github.com/lucasmyers97/maier-saupe-lc-hydrodynamics)

<img align="right" src="/notes/images/projects/liquid_crystal_topological_defects.png" width=200em alt="nematic liquid crystal topological defects">

Nematic liquid crystals are materials with rod-like particles which tend to align on macroscopic scales.
However, spatially these particles are randomly distributed letting the material flow like a liquid, hence the name.
When quickly frozen, they spontaneously create *topological defects* (see right) which attract or repel in the course of the material relaxing to thermodynamic equilibrium.
We study how these defects interact when including that the material can flow, and also in materials which prefer different ways of distorting over others.
[Image source](http://dx.doi.org/10.1080/21680396.2013.878672)

# [Phase-field crystals with elasticity](https://github.com/lucasmyers97/phase-field-crystals)

<img align="left" src="/notes/images/projects/crystalline_defects.jpg" width=200em alt="crystalline topological defects">

Crystalline materials consist of atoms arranged in a lattice.
The interatomic forces behave somewhat like springs linking them, and so any compressive forces on the material as a whole result in elastic (spring-like) responses.
However, there are often *topological defects* (left) which shift in position when external forces act on the material.
This causes the material to exhibit *plasticity*, whereby it can be permanently deformed.
We seek to create a model which combines these two characteristics by representing the lattice as a phase field, and imposing elasticity by simultaneously solving elastic equations from continuum mechanics.
[Image source](https://saylordotorg.github.io/text_general-chemistry-principles-patterns-and-applications-v1.0/section_16/d91b436089f90f5e6df5964f29c9e04b.jpg)


# [Lebedev quadrature in C++](https://github.com/lucasmyers97/lebedev-quadrature)

<img align="right" src="/notes/images/projects/lebedev_grid.png" width=200em alt="crystalline topological defects">

In several scientific applications, including quantum electronic structure calculations in chemistry and (in our case) calculating potentials associated with orientation-describing order parameters, one must integrate along the surface of a sphere.
Lebedev quadrature is a way to do this numerically which exactly integrates polynomials up to a given order on the sphere, and does so by assigning weights to sets of points that are invariant under the octahedral symmetry group.
I needed this to calculate the [Ball-Majumdar singular potential](doi.org/11.1080/15421401003795555) and existing implementations had manual memory management (not ideal).
I wrote this to try to make a cleaner, more readable implementation which also includes more documentation and is easier to include in other projects via conventional methods.
[Image source](http://dx.doi.org/10.1016/j.jcp.2018.06.013)
