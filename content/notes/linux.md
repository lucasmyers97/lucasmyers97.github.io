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

# SSH key generation

[SSH (Secure Shell Protocol)](https://www.wikiwand.com/en/Secure_Shell) is a protocol by which one may communicate securely with another computer.
Typically one connects through the terminal and may then operate the remote machine as if it were directly interfacing with the machine's terminal.
GUI support may also be enabled so that one may interact with GUI programs on the remote machine.
Users may also transfer files to and from the remote machine via the `scp` command.

This works via a [public key cryptography scheme](https://www.wikiwand.com/en/Public-key_cryptography) whereby the user creates a public-private key pair, and distributes the public key to the remote machine.
The remote machine then uses the public key to encrypt data, and the local machine may then decrypt the data with the private key.
A symmetrical process happens with sending data to the remote server.
Typically a password is used to authenticate a user.

To avoid having to use a password, one must manually create a public-private key pair, and then upload the public key to the remote server.
Here are the explicit steps:

1. Create a public-private key pair:
    ```{linenos=false} bash
    ssh-keygen -t ed25519
    ```
    It will first prompt you to save it in some location.
    On Linux, the default location is `~/.ssh/id_ed25519`. 
    If you already have a key there (likely) still save in the `~/.ssh/` directory, but give it a different name like `~/.ssh/some_key_name`.
    It will also ask for a passphrase -- enter whatever secure passphrase you want here.

2. Add the private key to your ssh-agent.
    First start the ssh-agent.
    ```{linenos=false} bash
    $ eval "$(ssh-agent -s)"
    > Agent pid 59566
    ```
    Then add the private key:
    ```{linenos=false}
    ssh-add ~/.ssh/some_key_name
    ```

3. Upload the public key to the remote machine:
    ```{linenos=false} bash
    ssh-copy-id -i ~/.ssh/some_key_name.pub remote-user@remote-host
    ```
See [this Stack Exchange answer](https://superuser.com/a/8110/1375974), and [this GitHub guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) were very helpful.

# Keys for downloads

## Checksums

To do a standard checksum where they give you a code, do the following:
``` bash
echo 'bfd4d3b8eac4216c235d7a5c3bf02d5c file_to_check.tgz' | md5sum --check
```
``` console
file_to_check.tgz: OK
```
where the first string is the code.
This also works for `sha256sum`, `sha512sum`, etc.

## GPG Keys

For this, you need a public key, and a `.asc` file corresponding to the binary.
When you know the key id, enter:
``` bash
gpg --recv-keys [key id]
```
and then do
``` bash
gpg --verify file_to_be_verified.tgz.asc
```
It should say that there is a good signature.

# Unzip tarballs

The command is:
``` bash
tar -xzvf file_to_unzip.tgz -C /place/to/unzip
```
