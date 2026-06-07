---
title: "iterm2에서 sudo 사용 시 비밀번호 대신 Touch ID 사용하기 🔐"
date: 2026-06-07T22:00:00+09:00
cover:
  image: images/posts/enable-touch-id-in-iterm/1.jpg
  caption: "iterm2에서 sudo 사용 시 비밀번호 대신 Touch ID 사용하기 🔐"
draft: false
categories: ["macOS"]
tags: ["iterm2", "touch-id", "sudo"]
ShowToc: true
TocOpen: true
---

지금까지 인터넷에 공개되어 있는 방법은 /etc/pam.d/sudo 파일을 수정하는 방법이었는데, 훨씬 간단한 방법을 발견하여 소개한다.  

iterm2 베타 버전 다운로드 후, 다음 명령을 입력한다.

```sh
sudo "/Applications/iTerm.app/Contents/Resources/install-touchid-sudo.sh
```

iterm2를 완전히 껐다 켠 후, 

```sh
sudo -k && sudo -v
```

를 입력해서 제대로 작동하는 지 테스트 한다.

![2.png](images/posts/enable-touch-id-in-iterm/2.png)