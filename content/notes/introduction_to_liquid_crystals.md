---
title: An introduction to liquid crystals
subtitle: 

# Summary for listings and search engines
summary: This post gives an introduction to nematic liquid crystal systems, including an explanation of the Q-tensor order parameter, the Landau-de Gennes free energy, elasticity, as well as the improved Maier-Saupe field theory.

# Link this post with a project
projects: [https://github.com/lucasmyers98/maier-saupe-lc-hydrodynamics]

# Date published
date: "2021-10-10T00:00:00Z"

# Date updated
lastmod: "2021-10-10T00:00:00Z"

# Is this an unpublished draft?
draft: true

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: Widget being used to approximate $f(x) = x$
  focal_point: ""
  placement: 2
  preview_only: true

authors:
- admin

tags:
- liquid-crystals
- thermodynamics
- field-theory

categories:
- talks

math: true
---

## What are liquid crystals?
When we start to think about thermodynamic and statistical systems, we tend to treat the constituents as very simple objects: particles in the case of the ideal gas, up-down arrows in the case of the Ising model, atoms in a lattice in the case of the Einstein solid.
In all of these cases, there isn't that much that we need to keep track of about each of the individual consituents: position for the ideal gas particles, direction for the Ising model, number of discrete energy packets for the Einstein solid.

<mark>Include diagrams of simple systems, with degrees of freedom marked</mark>

Once we've learned all that we can about these simple models, a natural question to ask then is _what happens when these individual constituents get more complicated?_
An example of such a system -- and the subject of this post -- is called a liquid crystal system.
Here, instead of our constituents being particles whose position we must keep track of, they are rod-like objects which have both a position and a direction associated with them.
Examples of these include

<mark>Include some examples with pictures -- maybe mark with arrows</mark>

Given our examples, it is clear that some of the liquid crystal particles have a preferred direction.
Indeed, at cold enough temperatures some systems tend to point in the same direction along a preferred axis -- this is called the polar phase. <mark>Include picture</mark>
However, much more often the particles will align along the same axis, but have no preference between being parallel and anti-parallel. <mark>Include picture</mark>
This phase, called the nematic phase, is the one that we will be trying to describe and distinguish from the completely disordered (isotropic) phase.

## How do we describe equilibrium nematic systems?

As stated, we would like some way to keep track of the different states of an equilibrium liquid crystal system.
In principle, we may assign a unit vector $\mathbf{n}$ to each of the particles in our system.

<mark>Include cholesterol benzoate and just rods -- label with arrows to assign vector</mark>

If the particles already are asymmetric just pick a preferred side, otherwise just paint one side blue and the other red -- this is a classical system, we don't care about indistinguishability.
However, noting the directions of all of the particles doesn't do much for us in terms of understanding.
Rather, what we would like to do is have some relatively simple object which characterizes our entire equilibrium system.
In the Ising model we had the magnetization $M$, a scalar quantity which distinguished between the isotropic and magnetized states.
Indeed, we may define a similar quantity which is just the average over all of the direction-vectors:
$$
M_\alpha = \left< n_\alpha \right>
$$

<mark>Refer back to pictures of polar/nematic/isotropic phase</mark>

For the polar phase, all of the particles point along some preferred direction (say the $+z$-axis) so that $M_\alpha$ will be along the $+z$-axis with some magnitude less than 1.

For the isotropic phase for any particular $\mathbf{n}$ we will get another $-\mathbf{n}$ which will cancel in the average so that $M\_{\alpha}$.

<mark>Highlight one, and then show what it cancels with -- do the same for nematic</mark>

However, this is also true with the nematic phase -- since they align parallel and antiparallel, you get just as many $+z$-directed vectors as $-z$-directed vectors so that $M\_\alpha$ cannot distinguish between the nematic and isotropic phase.
We need to build another object from $\mathbf{n}$ then which can distinguish between these two states.
Dotting $\mathbf{n}$ with itself just gives 1 everywhere, because it is a unit vector.
Thus, we might consider taking an *outer* product in order to encode the appropriate information. 
Define the following tensor then:
$$
T_{\alpha\beta} = \left< n_\alpha n_\beta \right>
$$
For this object, we know that the diagonal components for the isotropic phase give:
$$
\left< n_x^2 \right> = \left< n_y^2 \right> = \left< n_z^2 \right>
$$
This is true essentially by the definition of the isotropic phase.
But then we also have by virtue of $\mathbf{n}$ being a unit vector:
$$
\left< n_x^2 + n_y^2 + n_z^2 \right> = \left< \mathbf{n} \cdot \mathbf{n} \right> = 1
$$
so that $T^\text{iso}_{\alpha \alpha} = \frac13$ along the diagonal.
For the off-diagonal -- say $T_{xy}$ -- the contribution to the average from any molecule with $\mathbf{n} = (n_x, n_y, n_z)$ will be cancelled out by a molecule with componentes $(n_x, -n_y, n_z)$.
There was nothing special about the $xy$ component, so this is generally true for the off-diagonal:
$$
T^\text{iso}_{\alpha \beta} = \begin{bmatrix}
\tfrac13 &0 &0 \\\\\\
0 &\tfrac13 &0 \\\\\\
0 &0 &\tfrac13
\end{bmatrix}
$$

Let's take a look at the nematic phase now, and let's specialize to $\mathbf{n}$ pointing along the $\pm z$-axis.
In this case, all components of $T_{\alpha\beta}$ are 0 except for the $zz$ component for which $\left<n_z n_z\right> = 1$:
$$
T^\text{nem}_{\alpha \beta} = \begin{bmatrix}
0 &0 &0 \\\\\\
0 &0 &0 \\\\\\
0 &0 &1
\end{bmatrix}
$$
This looks promising!
We have something which takes on easily distinguishable forms for the perfectly nematic and perfectly isotropic states, at least in this special instance of everything pointing along the $\pm z$-axis.
To make this just a little bit more slick, we define the actual $Q$-tensor in the following way:
$$
Q\_{\alpha \beta}
= T\_{\alpha \beta} - \tfrac13 \delta\_{\alpha \beta}
= \left< n\_{\alpha} n\_{\beta} - \tfrac13 \delta\_{\alpha \beta} \right>
$$
This has the benefit of making the $T$-tensor tracless as well as keeping it symmetric.
These two properties make the $Q$-tensor very nice to work with.

## Extending to more complicated configurations

To extend this to more complicated nematic configurations, we invoke a little bit more mathematical maturity with the probability distribution function denoted $p(\boldsymbol{\xi})$.
Here, instead of thinking about summing over the individual particle directions in order to average , we ask *what is the relative probability of finding a particle with direction vector $\boldsymbol{\xi}$?*
Note that, since $\boldsymbol{\xi}$ is a unit vector we may think of it as living on the two-dimensional sphere $S^2$.
Further, since we are restricting ourselves to nematic configurations we know that the probability of finding a particle with direction $\boldsymbol{\xi}$ is the exact same as finding a particle with direction $-\boldsymbol{\xi}$ -- that is, $p(\boldsymbol{\xi}) = p(-\boldsymbol\xi)$.

<mark>can still have nematic configuration with individual arrows, point to them</mark>
<mark>also want to include colored half-sphere to demonstrate probability distribution function</mark>

With all this, the explicit definition of the $Q$-tensor looks like:
$$
Q\_{\alpha \beta} = \int_{S^2} p(\xi) \left( \xi_\alpha \xi_\beta - \delta_{\alpha \beta} \right) \\: d\xi
$$

With this generalization, we can firstly revisit our prior nematic configurations.
For the totally isotropic case, we have that $p(\boldsymbol\xi) = 1 / 4\pi$ -- this is just because it ought to be constant (all directions are equally probable), and normalized so the integral around the unit sphere is 1.

<mark>have uniformly-colored sphere</mark>

One can check that this probability distribution gives zero for every component of $Q$:
$$
Q^\text{iso}\_{\alpha \beta} =
\begin{bmatrix}
0 &0 &0 \\\\\\
0 &0 &0 \\\\\\
0 &0 &0
\end{bmatrix}
$$

<mark>have $\delta$-function sphere</mark>

For the perfectly-ordered nematic case, our probability distribution function is a two-sided delta function centered at some specific $\mathbf{n}$ and $-\mathbf{n}$:
$$
p(\boldsymbol\xi) =
\tfrac12 \left( 
\delta(\boldsymbol\xi - \mathbf{n}) + \delta(\boldsymbol\xi + \mathbf{n})
\right)
$$
In this case, the integral just gives:
$$
Q^\text{nem}\_{\alpha \beta} = n\_{\alpha} n\_{\beta} - \tfrac13 \delta\_{\alpha \beta}
$$
If we plug in $\mathbf{n} = \hat{z}$, then we get back exactly what we got before by symmetry arguments.

Before we go on to talk about how the system chooses a configuration, we consider a more general class of distributions corresponding to *uniaxial* configurations.
These correspond to configurations which are azimuthally symmetric about some preferred axis.
As above, we will take this axis to be the $z$-axis so that $p(\boldsymbol\xi) = p(\theta)$ though it works equally well for any axis.
Plugging this in and noting that $\boldsymbol\xi = (\cos\phi \sin\theta, \sin\phi \sin\theta, \cos\theta)$ we end up with the following form for the $Q$-tensor:
$$
Q\_{\alpha \beta} = \begin{bmatrix}
-\frac{S}{3} &0 &0 \\\\\\
0 &-\frac{S}{3} &0 \\\\\\
0 &0 &\frac{2S}{3}
\end{bmatrix}
= S \left( z\_\alpha z\_\beta - \tfrac13 \delta\_{\alpha \beta} \right)
$$
where we have made the definition:
$$
S = \left< P_2 (\cos\theta) \right>
$$
with $P_2$ the second Legendre polynomial.
To reiterate, this form falls out when you calculate $Q\_{\alpha \beta}$ from a probability distribution that is azimuthally symmetric.

As a demonstration of what $S$ measures, we can look at a particular distribution and see how $S$ changes as the liquid crystal particles become less and less focussed along the main axis:

<mark>Put animation of probability distribution function on sphere here -- should give corresponding $S$-value to show how focussing nematic configuration increases $S$</mark>

Now that we actually have the tools to keep track of the state of our system, we need to figure out what state our system chooses in equilibrium.

## Landau-de Gennes free energy
In general at equilibrium, our system will choose the state which minimizes the free energy.
Hence, to get a handle on how our system will behave we just need some way to write down an expression for the free energy as a function of the $Q$-tensor.
For the Landau-de Gennes scheme, we seek an expression using as little information about the internal structure as possible.
Indeed, the only stipulation we have is that the expression for the free energy of the system is smooth near the transition from the nematic to the isotropic state.
The allows us to write the free energy as a Taylor series expansion in the $Q$-tensor.
In Tensor-land, each of our terms just looks like some way to contract the $Q$-tensor into a scalar quantity.
Going up to fourth order in $Q$ this gives the following:
$$
f(Q) =
A Q\_{\alpha \beta} Q\_{\beta \alpha}
\+ B Q\_{\alpha \beta} Q\_{\beta \gamma} Q\_{\gamma \alpha}
\+ C (Q\_{\alpha \beta} Q\_{\beta \alpha})^2
$$
where we have gotten rid of a constant (it doesn't really matter for our purposes), and we have noted that $Q\_{\alpha \alpha} = 0$ by our definition of it being traceless.

In Landau theory, it is typically assumed that $A$ is linearly dependent on temperature, while the other constants are only weakly dependent on temperature.
Hence, to see how the state of our system depends on temperature we can just plot the free energy as a function of $Q$ (say, in a uniaxial state) for various temperatures.

<mark>show the plots here -- make an animation if possible</mark>

We see that we get a first order phase transion at some particular value of $A = A_0$.
That is, there is a jump in the $S$-value from something nonzero -- indicating the particles are directed along some axis -- to flat zero -- indicating the particles are completely randomly oriented.
Indeed, this is the behavior that we see in experiments <mark>need citation</mark>.
However, we have three phenomenological contants, at least one of which has some dependence on temperature.
Ideally we would like to reduce this to one or two.
Additionally, this free energy does not constrain the values of $Q$ -- $Q$ can keep increading in magnitude past what is physically meaningful (that is, $S = 1$) without anything going wrong with the free energy.
Hence, we would like to try to come up with a different free energy which will address these issues.

## Maier-Saupe free energy

To construct a better model for our system, we need to consider interactions at the particle level.
Since our particles tend to align but do not have positional order, our effective interaction should only be based on the relative angle of the particles.
Further, the interaction should be symmetric about relative angle given by $\gamma = n\pi$ for $n$ an integer.

<mark>Need figure showing $\gamma$ and $\gamma + \pi$ are the same</mark>

If we do an expansion in Legendre polynomials, the equation for a particle pair interaction is then just:
$$
V_\text{int} (\gamma)
= -J P_2 (\cos\gamma)
$$
where $J$ is just a positive constant which gives the strength of the interactions.
Note that we've gotten rid of $P_0$ because a constant interaction energy is not physically relevant, and we've gotten rid of $P_1$ because it treats $\gamma = \pi$ differently than $\gamma = 0$.
Note also that, based on the characteristics of $P_2$, $V_\text{int}$ has minima at $\gamma = 0$ and $\gamma = \pi$, and maxima at $\gamma = \pm \pi / 2$ -- this is on track for making sure that the particles line up.

Now, supposing we have $N$ total particles which each interact with $q$ of their neighbors, the total energy of the system is given by:
$$
\left< E \right> = -\tfrac12 JNq \left< P_2 (\cos\theta) \right>
$$
As you might be able to guess from the fact that $P_2$ came up in our calculation of a uniaxial $Q$, one can calculate this quantity in terms of $Q$ as:
$$
\left< E \right> = -\tfrac13 JNq \\: Q\_{\alpha \beta} Q\_{\alpha \beta}
= -\alpha Q\_{\alpha \beta} Q\_{\alpha \beta}
$$
Note that, because we have a factor of $\cos^2\theta$ in the average, we actually need to invoke a mean-field approximation:
$$
\left< l\_\alpha l\_\beta m\_\alpha m\_\beta \right>
\approx \left< l\_\alpha l\_\beta \right> \left< m\_\alpha m\_\beta \right>
$$
where $\mathbf{l}$ and $\mathbf{m}$ are orientation vectors corresponding to distinct particles.

Okay, we have the interaction energy and now we need to write down the free energy.
This is given in the usual way:
$$
f = \left< E \right> - TS
$$
where this time $S$ is entropy.
This, as well, is given in the usual way:
$$
S = -n k\_B \int\_{S^2} p(\xi) \log \left( 4\pi p(\xi) \right) d\xi
$$
where $n$ is the number densit of molecules (which we take to be constant), and $k\_B$ is Boltzmann's constant.
Now, we return to a problem that you may have considered when we first introduced the probability distribution scheme: *could there be several $p(\xi)$ functions corresponding to a single $Q$*?
The answer is a resounding *yes*, as one could have guessed from the fact that $p$ contains an infinite number of values while $Q$ only contains $5$ (count the degrees of freedom).
So then, since $f$ should only be a function of $Q$, how does one determine the $p$ that should be used in the calculation of the entropy?
The answer is that, given a fixed $Q$ one must find the $p$ which maximizes the entropy.
This is a constrained calculus of variations problem, and can be solved by taking the minimum of the following quantity:
$$
\mathcal{L}[p] = S[p]
\+ \Lambda\_{\alpha \beta} \left[
  \int_{S^2} (\xi\_\alpha \xi\_\beta - \tfrac13 \delta\_{\alpha \beta}) p(\xi) d\xi
  \- Q\_{\alpha \beta}
\right]
$$
This is just finding the minimum of $S$ while using a Lagrange multiplier $\Lambda\_{\alpha \beta}$ to maintain the condition on $p$ to correspond to a fixed $Q\_{\alpha \beta}$.

If you actually carry out this calculation, you'll get the following expression for $p$:
\begin{align*}
  p(\xi) &= \frac{\exp[\Lambda\_{\alpha \beta} \xi\_\alpha \xi\_\beta]}{Z[\Lambda]} \\\\\\
  Z[\Lambda] &= \int_{S^2} \exp[\Lambda\_{\alpha \beta} \xi\_\alpha \xi\_\beta] d\xi
\end{align*}
where we interpret $Z$ as the partition function.
Given all this, we can plug $p$ back into the expression for $Q$ to find an implicit relationship between $Q$ and $\Lambda$:
$$
Q\_{\alpha \beta} = \frac{\partial \log Z}{\partial \Lambda\_{\alpha \beta}} - \tfrac13 \delta\_{\alpha \beta}
$$
This is transcendental, and can thus not be solved analytically.
However, it can be solved numerically and that's all we need for computational physics.

Finally, we may plug $p$ back into our expression for $S$, to get a bona fide expression for the free energy.
Again, if we assume a uniaxial $Q$ we can plot this as a function of $S$ for various parameter values.
In the case of the Maier-Saupe free energy, the only free parameter that we have is $\kappa = \alpha / n k_B T$:

<mark>Here put animation showing $f$ vs. $S$ for different $\kappa$ values</mark>

Again, we see that there is a first-order phase transition that happens: as temperature increases, we end up melting the nematic phase into an isotropic phase.
But this just gives the same result as the Laundau-de Gennes theory -- what was the point of doing all this work to create a mean-field theory?
As we hinted at before, the LdG theory does not put a bound on which $Q$-tensors are physically admissible.
By contrast, the Maier-Saupe theory keeps $Q$ so that $S < 1$ always.
If there is a case where $S$ approaches 1, the Lagrange multiplier $\Lambda$ grows infinitely large so that the free energy does also.
While this is just convenient in the equilibrium case, this turns out to be essential when we introduce non-equilibrium configurations and the corresponding contributions to the free energy from elasticity.

## Non-equilibrium solutions and field theory

Now that we know how to describe equilibrium configurations, we can take a short excursion into non-equilibrium configurations.
The idea here is that, given some non-equilibrium solution, we may take small chunks to be essentially in an equilibrium state:

<mark>Here need to have a non-equilibrium solution with a zoomed in image that looks like it's in equilibrium</mark>

Then, instead of the $Q$-tensor being some single matrix which describes the whole system, we take it as a tensor *field* which is a function of position.
That is, for every point in the domain there is a particular $Q$-tensor assigned to it which characterizes the main axis of alignment, as well as the degree of alignment of the particles in the neighborhood of that point.
We can (loosely) visualize this as follows:

<mark>Just include some non-equilibrium configuration</mark>

where the color corresponds to $S$ -- again, the degree of alignment -- and the lines correspond to the particle direction.

Here, the expression corresponding to bulk free energy is essentially the same, except instead of a free energy for the whole system we have a free energy *density* which must be evaluated at every single point of the domain.
Additionally, since our liquid crystal configuration is no longer uniform, we need to penalize deviations from the uniform configuration in our total expression of free energy.
This is called *elastic* free energy, and can be written down in much the same way as the Landau-de Gennes free energy: we look at all of the different ways that we can contract gradients of $Q$ up to a certain order.
Going up to third order gives:
\begin{align*}
f\_e (\partial Q) = &L\_1 (\partial\_\gamma Q\_{\alpha \beta}) (\partial\_\gamma Q\_{\alpha \beta}) \\\\\\
&+ L_2 (\partial\_\beta Q\_{\alpha \beta}) (\partial\_\gamma Q\_{\alpha \gamma}) \\\\\\
&+ L_3 Q\_{\gamma \delta} (\partial\_\gamma Q\_{\alpha \beta}) (\partial\_\delta Q\_{\alpha \beta})
\end{align*}
These gradient terms can, in principle, be related to different deformations of the liquid crystal system that we can visualize.
However, suffice it to say that these work to describe deviations of the system from uniform, and now we have a free energy that we can use to find the dynamics of the system.
What's left to do now is find configurations which have interesting dynamical behavior, and to try to find simple and clever ways to describe those dynamics.
Defects in liquid crystals are the subject of another post, but for the time being consider that we can set up interesting configurations which give rise to emergent behavior:

<mark>Video of defects annihilating</mark>
