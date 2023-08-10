---
title: "Posts"
date: 2023-08-09T21:24:28-05:00
draft: false
---

# [Fourier series widget](notes/fourier_series_widget.md)

I wrote a widget which allows one to interactively watch a partial Fourier sum converge.
In undergrad I was always sort of dubious that all functions (in $L_2$ space) could be represented by Fourier series, so I'm hoping this makes it a little bit more palatable. 
I still need to publish the widget (or one I rewrote in Rust) to Github pages, so the link is currently defunct.

# [Introduction to liquid crystals](notes/introduction_to_liquid_crystals.md)

This was an attempt to write a talk out as a post to try to curb some procrastination (really had some writer's block making the slides).
It was pretty silly, and I still need to put in the figures (right now it's all placeholders), so the link is currently defunct.

# [Bachmann-Landau notation widget](https://lucasmyers97.github.io/bachmann-landau/)

I started reading [Calculus and Analysis in Euclidean Space](https://link.springer.com/book/10.1007/978-3-319-49314-5), one of the really great [Undergraduate Texts in Mathematics](https://www.springer.com/series/666) to try to skirt around reading [Calculus on Manifolds](https://www.wikiwand.com/en/Calculus_on_Manifolds_(book)) -- it was just pretty terse and didn't lay out a lot of the intuition.
However, C&A in E starts off with [Bachmann-Landau notation](https://www.wikiwand.com/en/Big_O_notation) to simplify the presentation.
I've thought some about trying to make more visual proofs of some of the theorems in the book (e.g. inverse function theorem, implicit function theorem), but I'm a little technically limited. 
As a first step, I started writing a widget in Typescript which allows the user to enter in an expression in $x$ and $y$, and then plots the image of a circle of radius $r$ as well as another circle.
The user can then zoom in and also change the input circle radius.
The idea is that one can graphically investigate the convergence properties of $2D$ functions to get a better intuition for the different asymptotic behaviors.
