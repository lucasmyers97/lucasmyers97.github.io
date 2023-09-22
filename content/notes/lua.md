---
title: "Lua"
date: 2023-09-20T20:19-05:00
enableToc: true
draft: false
---

## Installing Lua 5.1 (Neovim's version)

Here is [a list of source versions](http://www.lua.org/ftp/).
Download and do the checksum.
Just as a reminder, the checksum is done with:
```bash
echo "7f5bb9061eb3b9ba1e406a5aa68001a66cb82bac95748839dc02dd10048472c1 lua-5.1.tar.gz" | sha256sum --check
```
Should output `Ok`.
Can build this with:
```bash
tar -zxf lua-5.1.tar.gz
cd lua-5.1/
make linux
sudo checkinstall
```
This will make an installation which may be uninstalled easily with:
```bash
dpkg -r lua
```

## Installing Luarocks for Lua 5.1

[Source is available here](https://github.com/luarocks/luarocks/wiki/Installation-instructions-for-Unix).
Can build with:
```bash
tar -zxf luarocks-3.9.2.tar.gz
cd luarocks-3.9.2/
./configure --lua-version=5.1
make
sudo checkinstall
```
May be easily uninstalled with:
```bash
dpkg -r luarocks
```

## Installing `magick`

To use image processing in Neovim, you need to install the `magick` Luarocks image manipulation package.
Vhyrro has some words about that [here](https://github.com/vhyrro/hologram.nvim).
In short, to install with luarocks:
```bash
luarocks --local --lua-version=5.1 install magick
```
And then to make available to Neovim, you must put the following in your init file:
```lua
package.path = package.path .. ";~/.luarocks.share/lua/5.1/?/init.lua;"
```
Note that you also need the development library of ImageMagick.
This can be installed with:
```bash
sudo apt install libmagickwand-dev
```
