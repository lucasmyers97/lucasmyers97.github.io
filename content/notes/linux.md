---
title: "Linux"
date: 2023-08-19T9:30-05:00
enableToc: false
draft: false
---

# Sound driver

## Getting headphone mic to work

See [reddit post](https://www.reddit.com/r/ManjaroLinux/comments/pivytl/realtek_alc255_codec_35mm_mic_not_working/) and corresponding [Arch linux wiki](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack).
Also on the Reddit page:
```
Tested with Gigabyte Aero15 2017 (P65 Model), with ALC255 and set model to dell-headset-multi
```

So, It's same codec. And I did the same steps like on ArchWiki:

- cd /etc/modprobe.d/
- sudo touch alsa-base.conf
- sudo vim alsa-base.conf
- options snd_hda_intel index=0 model=dell-headset-multi
- sudo reboot now 

UPD:

- Changed filename to /etc/modprobe.d/snd-hda-intel.conf

and it's content:

- options snd-hda-intel model=auto,dell-headset-multi 

## Figuring out soundcard

[This post](https://net2.com/how-to-view-your-sound-card-information-using-the-terminal-in-ubuntu-18-04/) has some helpful commands (even though it's the wrong Ubuntu version).
This gives soundcards:
```
cat /proc/asound/cards
```
This gives manufacturer details:
```
lspci -v | grep -i audio
```
This gives a nice little interface:
```
alsamixer
```

## Modules and configuring ALSA

The resources I've seen typically modify the `/etc/modprobe.d/alsa-base.conf` file. 
It seems that the `modprobe.d` folder [passes modules to `udev` which loads them with modprobe on boot](https://wiki.archlinux.org/title/Kernel_module#Using_files_in_/etc/modprobe.d/).
They can have any name, and options are set via:
```
options module_name parameter_name=parameter_value
```
In mine they (additionally) have a different set of syntax of:
```
install sound-slot-0 /sbin/modprobe snd-card-0
```
I guess this is a nice way to use the `modprobe` utility automatically at boot.
The `modprobe` utility loads and configures [kernel modules](https://sysprog21.github.io/lkmpg/) (see link for more details).
Somehow loading and configuring the appropriate modules is the thing that will solve my soundcard problem.