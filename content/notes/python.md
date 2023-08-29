---
title: "Python"
date: 2023-08-29T11:06:51-05:00
enableToc: false
draft: false
---

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
