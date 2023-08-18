---
title: "C++"
date: 2023-08-18T15:36-05:00
enableToc: false
draft: false
---

# Passing Lambda functions by reference

[See here](https://stackoverflow.com/a/15984649/7736506) for a clear explanation of what's going on with the `auto` keyword.
Apparently C++ Lambda functions are just syntactic sugar for callable objects (classes which implement the `operator()` function).
The captures are just the member variables of the class, and the method body is just implementing the `operator()` method.
The issue that I was running into was trying to write a function with signature:
```cpp
void calls_lambda(std::function<void()> &lambda_func)
```
For this, I tried to create a Lambda function in the following way:
```cpp
auto lambda_func = []() { /* do some stuff */ };
```
However, as explained in [the stack overflow post](https://stackoverflow.com/a/15984649/7736506), this is not of type `std::function`, and so the compiler does an implicit conversion which, in turn, returns a *temporary*. 
I guess a temporary is [always an rvalue](https://stackoverflow.com/a/15131683/7736506) which means you cannot create a non-const lvalue reference to it.
You can pass it by value or by const lvalue reference.

I wanted to give users of `calls_lambda` the ability to pass in a big `std::function` object, and also be able to change it within `calls_lambda`.
The solution is just to create the lambda as a `std::function` explicitly:
```cpp
std::function<void()> lambda_func = []() { /* do some stuff */ };
```
