---
title: "Licensing"
date: 2023-09-22T12:02-05:00
enableToc: true
draft: false
---

## Introduction

I am getting to a point where I will be releasing software so I should give my repos licenses, otherwise they [cannot be used](https://choosealicense.com/no-permission/) by other people. 
However, I am not a copyright lawyer and so I do not know anything about licenses.
The following are notes and resources about licenses, but also should not be taken as legal advice -- I am not responsible for anything you do with this information.

## Resources

- [A very quick introduction to licensing](https://choosealicense.com/)
- [GNU licensing info](https://www.gnu.org/licenses/licenses.html)
- [What is Copyleft?](https://www.gnu.org/licenses/copyleft.html)
- [GNU how to choose a license](https://www.gnu.org/licenses/license-recommendations.en.html)
- [Why upgrade to GPLv3?](https://www.gnu.org/licenses/rms-why-gplv3.en.html)

## Some considerations when choosing a license

- If you use something using GPL, you also need to release your work under GPL.
- If you use something using LGPL then you only need to release modifications to the source. Otherwise you can close source it (and presumably release under a different license).

## Questions I still have

- How much do you have to change in order to use a different license?
    - It appears that you need to have something called a [clean room implementation](https://www.wikiwand.com/en/Clean_room_design), at least for the GPL.
    - I think for LGPL anything other than a clean room implementation is still a modification and must be released as open source. Not sure whether it is okay to relicense.
