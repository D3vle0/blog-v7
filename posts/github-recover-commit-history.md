---
title: "GitHub 잘못된 커밋 이메일 복구하기 (잔디 복구) 🌿"
date: 2026-04-06T13:21:52+09:00
lastmod: 2026-05-24T15:12:35+09:00
cover:
  image: images/posts/github-recover-commit-history/0.jpg
  caption: "GitHub 잘못된 커밋 이메일 복구하기 (잔디 복구) 🌿"
draft: false
categories: ["Coding"]
tags: ["github", "commit", "email"]
ShowToc: true
TocOpen: true
---

## 자동화 스크립트

```sh
brew install git-filter-repo
```

```sh
git filter-repo --commit-callback '
if commit.author_name != b"dependabot[bot]":
    commit.author_name = b"<깃허브 닉네임>"
    commit.author_email = b"<깃허브 이메일>"
if commit.committer_name != b"dependabot[bot]":
    commit.committer_name = b"<깃허브 닉네임>"
    commit.committer_email = b"<깃허브 이메일>"
'
```

내 이름과 이메일이 아닌 커밋을 내 커밋으로 변경하는 스크립트다.

## 적용 결과

![1.png](images/posts/github-recover-commit-history/1.png)
![2.png](images/posts/github-recover-commit-history/2.png)
![3.png](images/posts/github-recover-commit-history/3.png)
![4.png](images/posts/github-recover-commit-history/4.png)
![5.png](images/posts/github-recover-commit-history/5.png)
![6.png](images/posts/github-recover-commit-history/6.png)
![7.png](images/posts/github-recover-commit-history/7.png)
![8.png](images/posts/github-recover-commit-history/8.png)
![9.png](images/posts/github-recover-commit-history/9.png)
![10.png](images/posts/github-recover-commit-history/10.png)
![11.png](images/posts/github-recover-commit-history/11.png)
![12.png](images/posts/github-recover-commit-history/12.png)
![13.png](images/posts/github-recover-commit-history/13.png)
![14.png](images/posts/github-recover-commit-history/14.png)
![15.png](images/posts/github-recover-commit-history/15.png)
![16.png](images/posts/github-recover-commit-history/16.png)
