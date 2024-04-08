---
title: "Python"
date: 2023-08-29T11:06:51-05:00
enableToc: false
draft: false
---

# Installing vanilla python

To use `ipython` and `jupyter` I needed to install the appropriate packages:
``` bash
sudo apt-get install build-essential gdb lcov pkg-config \
      libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev \
      libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev \
      lzma lzma-dev tk-dev uuid-dev zlib1g-dev
```
A list can also be found [here](https://devguide.python.org/getting-started/setup-building/index.html#install-dependencies) in the python dev guides.
Then we configure with the appropriate options:
``` bash
./configure --enable-loadable-sqlite-extensions --enable-optimizations
```

# Other issues

Ran into issue with Matplotlib, error was:
``` console
[xcb] Extra reply data still left in queue
[xcb] This is most likely caused by a broken X extension library
[xcb] Aborting, sorry about that.
python3: ../../src/xcb_io.c:673: _XReply: Assertion `!xcb_xlib_extra_reply_data_left' failed.
Aborted (core dumped)
```
Had to install Qt5:
``` bash
pip install pyqt5
```
After that it worked.

# List of arguments with `argparse`

Use [`nargs`](https://docs.python.org/3/library/argparse.html#nargs) option. 
Set to `'+'` for more than one, or `'*'` for more than zero.
Then it might look like:
```python
parser.add_argument('-t', dest='table', help='', nargs='+')
```
and the commandline might look like
```bash
python myscript.py -t [0.1, 3.2, 8.1]
```
From [answer here](https://stackoverflow.com/a/23490179/7736506).

# Formatting strings

Quick and dirty is that the strings should take the following form:
```
replacement_field ::=  "{" [field_name] ["!" conversion] [":" format_spec] "}"
field_name        ::=  arg_name ("." attribute_name | "[" element_index "]")*
arg_name          ::=  [identifier | digit+]
attribute_name    ::=  identifier
element_index     ::=  digit+ | index_string
index_string      ::=  <any source character except "]"> +
conversion        ::=  "r" | "s" | "a"
format_spec       ::=  <described in the next section>
```
The format spec describes how something ought to be printed, is preceded by a `:`, the options are given as follows:
```
format_spec     ::=  [[fill]align][sign]["z"]["#"]["0"][width][grouping_option]["." precision][type]
fill            ::=  <any character>
align           ::=  "<" | ">" | "=" | "^"
sign            ::=  "+" | "-" | " "
width           ::=  digit+
grouping_option ::=  "_" | ","
precision       ::=  digit+
type            ::=  "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" | "n" | "o" | "s" | "x" | "X" | "%"
```
The precision follows the `.`, and the way that it manifests depends on the particular float or decimal `type` chosen.
For example, for a precision `p`, the `f` type prints `p` digits following the decimal point, so that `{:.3f}` would print 3 decimal points.
[Python docs here](https://docs.python.org/3/library/string.html#format-specification-mini-language).

# Pretty plotting

[See this repo](https://github.com/garrettj403/SciencePlots)
To import:
```
import matplotlib as mpl
import matplotlib.pyplot as plt

plt.style.use('science')
mpl.rcParams['figure.dpi'] = 300
```
