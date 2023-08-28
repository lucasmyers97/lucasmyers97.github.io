---
title: "JackTrip"
date: 2023-08-13T22:10:38-05:00
enableToc: true
draft: false
---

# Introduction

Part of the issue with getting Jacktrip set up is that there are lots of resources floating around, many of which are extremely outdated.
Additionally, there are several pieces of software which are built upon one another and go by similar names (see <a href="#jack-vs-jacktrip">JACK vs. JackTrip</a>).
To try to grok this I'll lay out some available resources, then try to explain the relevant info about how these pieces of software interact, and also get JackTrip set up so that I can play music with my friends.

# JACK vs. JackTrip

Several pieces of software invovled in this have similar names.
Below I'll try to sort out what each of them do:

- [JACK Audio Connection Kit](https://www.wikiwand.com/en/JACK_Audio_Connection_Kit) (a recursive acronym) is a [sound server API](https://www.wikiwand.com/en/Sound_server), and pair of [daemon](https://www.wikiwand.com/en/Daemon_(computing)) implementations to provide low-latency connections for audio.
As I understand it, it is the interface between applications (e.g. Firefox, Reaper), and the program which provides the sound hardware driver ([AlSA](https://www.wikiwand.com/en/ALSA_(Linux)) in the case of Linux).
It is in charge of scheduling so that latency is extremely low -- apparently the default audio daemon, [Pulse Audio](https://www.wikiwand.com/en/PulseAudio) has too high a latency (although it serves a somewhat different purpose as a program).
Note that this is old software, originally being released in 2002.
It has been pretty regularly updated, with the newest release being in 2022.

- [JackTrip](https://github.com/jacktrip/jacktrip) is an opensource software that builds on JACK to network music peformance over the internet. 
This is also somewhat old software -- one of the documentation sites that I found is dated 2009.
I think they are now calling this *JackTrip Core*.

- [JackTrip App](https://www.jacktrip.com/jacktrip-app) is (I think) a sleek GUI app which lets you use the JackTrip program. I'm not actually sure if they're different, but the [fancy website](https://www.jacktrip.com/) seems to specifically call it that to make a distinction.

- [JackTrip Virtual Studio](https://www.jacktrip.com/product) is (I think) the foundation's attempt to monetize the whole thing.
It's a cloud server which host's the connection between performers.
I assume people using the JackTrip App must use the Virtual Studio to connect, but somehow it makes it easier for folks to get set up.
Presumably this is due in some part to not having to host a session (where you have to set up port forwarding and all that), but also because it just makes it easier to connect.

I am interested in using JACK and JackTrip, but not the app or the virtual studio -- I suspect those only work really well if you use the cloud service, and I don't want to pay money.

# JACK1 vs. JACK2

- In short, JACK2 is a rewrite in C++ which also offers multi-processor support.
- [See here](https://github.com/jackaudio/jackaudio.github.com/wiki/Differences-between-jack1-and-jack2) on the JACK GitHub for more info.

# Learning resources

- The first thing that comes up on a search is the [JackTrip website](https://www.jacktrip.com/). 
We don't want this.
If you scroll to the bottom, you find the JackTrip core.

- [JackTrip core](https://jacktrip.github.io/jacktrip/) has an extremely brief documentation website on [GitHub Pages](https://pages.github.com/).
It appears to only be screenshots of the GUI corresponding to certain settings.
If you go to `About -> Resources -> CCRMA`, you find more detailed instructions, which I think are older.

- The [CCRMA documentation](https://ccrma.stanford.edu/docs/common/IETF.html) is (I think) academic documentation from the center at Stanford.
It seems reasonably complete if you already sort of know what it's already talking about.

- The [JACK Audio Connection Kit](https://jackaudio.org/) website gives more info on the underlying driver.
This has some important information for making it work with ALSA and getting it to play nice with PulseAudio.

- Robert Edgar has an [extremely detailed guide](https://www.robertedgar.com/themencode-pdf-viewer-sc/?tnc_pvfw=ZmlsZT1odHRwczovL3d3dy5yb2JlcnRlZGdhci5jb20vQXJ0aWNsZXMvSkFDS1RSSVBfTUFDX0RPXzgtNC0yMDIwLXMucGRmJnNldHRpbmdzPTExMTExMDExMTExMTExMTExMDAmbGFuZz1lbi1VUw==#page=&zoom=auto&pagemode=none) on setting up JackTrip.

# Installation on Linux

### 1. Install JACK2:

For Debian-based distros, the following commands do this:
```
sudo apt update
sudo apt install jackd2
```
You can check that it works with:
```
jackd --version
```
Mine outputs:
```
jackdmp version 1.9.12 tmpdir /dev/shm protocol 8
```

### 2. Test JACK2

Note that you may have to suspend PulseAudio, as detailed [here](https://jackaudio.org/faq/pulseaudio_and_jack.html).
For me, that command looks like:
```
pasuspender -- jackd -d alsa
```
To test the audio:
- Start `qjackctl`.
- If it's not already started, start running JACK with the "Start" button. 
- Turn the volume all the way down
- Click "Connect" and make a connection between a `capture` (microphone) and a `playback` (speaker) instance.
- Snap gently into the microphone while slowly increasing the volume to see whether the snap comes through.
- If it does, JACK is working properly.

### 3. Install JackTrip

There's a [guide on the GitHub pages](https://jacktrip.github.io/jacktrip/Install/) which shows how to install:
```
sudo add-apt-repository ppa:umlaeute/jacktrip
sudo apt update
sudo apt install jacktrip
```
However, this version does not have GUI support, and so must be run from the commandline.

Instead, one may download the binaries from the [GitHub Releases page](https://github.com/jacktrip/jacktrip/releases).
The Linux one comes with a README.md which gives simple terminal instructions for installation.
After this, you should be able to run `jacktrip --version` from the commandline, or open the GUI with your application selector.

# Notes from when I did this

- The JACK website [recommends you suspend PulseAudio](https://jackaudio.org/faq/pulseaudio_and_jack.html), but the only difference is that PulseAudio syncs and sources show up in the JACK connection panel.
    - To suspend PulseAudio I had to: `pasuspender -- jackd -d alsa`
- I could not get my USB or wireless headphones to work for this.
I had to switch to the standard aux headphones (which, I actually thought the input was broken on my computer, but apparently not).
    - In both cases, they only showed `system` input and output ports with `capture_1`, `capture_2`, and `playback_1`, `playback_2` respectively.
    - When I would connect a `capture` to a `playback`, in the case of USB or wireless headphones it would just record and play out on my laptop's inbuilt microphone and speaker.
    - From the Ubuntu sound settings I could change which volume I was changing (e.g. built-in speaker or USB/bluetooth headphones). 
    Only built-in speaker volume changed how loud my snaps were.
    - Connecting `capture` to `playback` with aux headphones plays through the headphones no matter what you do -- could not get it to switch between speaker and headphones when they were plugged into the aux jack.

- The JackTrip executable from apt does not include GUI support, which is sort of annoying.
    - To deal with this, I just downloaded the zip from GitHub and then followed the README.md to install. 
    - Works well, I can launch the GUI from the gnome app selector.

# Port forwarding

The Xfinity app was not letting me view my port forwarding (it would just say "an unexpected error has occured").
I found a fix [here](https://forums.xfinity.com/conversations/xfinity-app/unable-to-set-port-forwarding/645027d3b9339b2013e96c07) which reads as follows
```
Open up the xfinity app and it should bring you to the overview page. On the top right, there is a chat icon, click it. It will bring you to the chat AI assist. In the chat window, type port forward. The AI will respond the a number of prompts, select network. Then another list of prompts will load, select open advanced options. Finally, the last set of prompts will appear, where here you can select port forwarding.
```
I guess the AI can bypass whatever the menu fails to do.
