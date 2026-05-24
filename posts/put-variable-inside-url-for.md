---
title: "Python Flask에서 url_for 안에 변수 넣기"
date: 2022-07-01T09:03:32+09:00
lastmod: 2026-05-24T14:46:13+09:00
cover:
  image: images/posts/put-variable-inside-url-for/1.png
draft: false
categories: ["Coding"]
tags: ["python", "flask"]
ShowToc: true
TocOpen: true
---

잘못된 예시

```html {linenos=true}
<img src="{{ url_for('static', filename='test/{{ variable[i] }}.png') }}" width="300px">`
```

올바른 예시

```html {linenos=true}
<img src="{{ url_for('static', filename='test/') }}{{ variable[i] }}.png" width="300px">`
```
