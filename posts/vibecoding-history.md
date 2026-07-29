---
title: "나의 바이브코딩 변천사 2021-2026 📖"
date: 2026-07-27T21:43:52+09:00
# lastmod: 2026-07-27T13:21:52+09:00
cover:
  image: images/posts/vibecoding-history/4.png
  caption: "나의 바이브코딩 변천사 📖"
draft: false
categories: ["Coding"]
tags: ["opencode", "go", "oh-my-opencode-slim", "gemini", "deepseek", "qwen", "kimi", "minimax", "AI", "CLI"]
ShowToc: true
TocOpen: true
---

## 2021-2022. Copilot Technical Preview

AI를 활용한 개발은 2021년 7월 어느 날 한 통의 이메일로부터 시작되었다.

![2.webp](/images/posts/vibecoding-history/2.jpg)

GitHub와 OpenAI가 협력해서 GitHub Copilot을 개발중이다라는 이야기는 알고 있었는데 갑자기 누군가에 의해 프리뷰 버전 레포에 초대된 것이 아니겠는가?  
사용해보니 신세계를 경험했다. 개인 프로젝트, 동아리 프로젝트, 과제 등 여러 코드 작성 환경에서 유용하게 사용을 했다. 예를 들어 node.js express로 간단한 웹 서버를 만들 때 express 패키지를 require로 불러오는 것 까지 작성해주면 자동으로 엔드포인트 코드를 한 두 줄씩 자동완성 해주는 형태였다. 흐릿하게 회색으로 다음 코드가 미리 제안되면 tab키를 누르는 것 만으로 간단한 기능 구현은 순식간에 이루어졌다.

## 2023. ChatGPT/Gemini Web

그리고 2023년 ChatGPT가 등장했다. 한 두 줄씩 자동완성 되던 코드 제안 방식에서 벗어나 내가 원하는 기능을 자연어로 설명하면 직접 코드를 작성해주는 혁신을 보여주었다. 그냥 이거 "해줘" 라고 말하고 IDE에 복사 붙여넣기. 끝. 그야말로 "대 딸깍의 시대"가 시작되었다.

## 2024. Cursor

2024년 초 쯤에는 Cursor 에디터가 유행하면서 뛰어난 성능이 뛰어난 LLM을 IDE에 통합하는 방식이 대세가 되기 시작했다. 이후 GPT-4o와 Gemini가 등장하며 LLM은 비약적인 발전을 이루었다. 이때부터 나는 그동안 상상만 하던 프로젝트를 LLM의 도움으로 척척 만들어나갔다.

![3.webp](/images/posts/vibecoding-history/3.webp)

## 2025-2026. VSC + Copilot Pro

발전 속도가 너무 빨랐던 탓일까. 2025년 초 LLM들의 inference 능력이 강화되며 바이브코딩이라는 새로운 용어가 등장했다. 단순히 질문에 대답하는 챗봇이 아닌 진짜 "에이전트"로서 기능을 하기 시작했다. 당연하게도 모델들의 사용 비용이 점점 높아져갔다. 그동안 거의 무제한 급으로 쓸 수 있었던 Cursor 에디터는 사용량 제한에 도달하는 경우가 많아져서 결국 2025년 GitHub Copilot으로 환경을 바꿨다. (대학생 인증 받으면 GitHub Student Developer Pack 혜택으로 GitHub Copilot Pro 요금제를 무료로 사용할 수 있다.)

![4.png](/images/posts/vibecoding-history/4.png)

Github Copilot은 n배수(Multiplier) 요청 횟수 기반(Premium requests) 사용량이라는 파격적인 요금제를 제공하여 경쟁 서비스 대비 가장 가성비가 좋았다. 하지만 GitHub Copilot도 증가하는 LLM 비용에 못이겨 2026년 6월 [가격 정책을 변경하였다.](https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/what-changed-with-billing?utm_source=chatgpt.com) 기존 요청 횟수 기반 정책에서 실제 사용량 기반으로 변경한 것이다. 

## 2026. Antigravity

2025년 9월 경 대학생이라면 Google AI Pro 요금제(월 29,000원 상당)를 1년 간 무료로 쓸 수 있는 이벤트에 가입했다. Antigravity에서 일반 계정에 비해 더 많은 사용량을 제공했기에 Gemini를 주력 사용하기로 결심하고 모든 개발 환경을 이전했다. 가끔씩 개발 작업을 할 때는 괜찮은데, 날 잡고 카페에 앉아서 제대로 작업할 때는 "5시간 제한"에 걸리는 경우가 많았다. 그리고 무엇보다 이 요금제 무료 사용 기한이 곧 다가오고 있었기에 새로운 대안이 필요했다.

## 2026. 7. OpenCode Go

가성비가 좋은 AI 서비스, 성능은 어느 정도 유지하면서도 장시간 사용할 수 있는 환경을 찾다 알게 된 것이 **OpenCode Go**이다.  

먼저 OpenCode는 터미널에서 사용할 수 있는 오픈소스 AI 코딩 에이전트(CLI)이다. 사용자는 OpenAI, Anthropic, Google, DeepSeek 등 원하는 LLM API를 직접 연결하여 사용할 수 있으며,
코드 생성, 리팩토링, 파일 수정, Git 작업, 터미널 명령 실행 등 여러가지 작업을 하나의 에이전트가 수행할 수 있다. 즉, OpenCode는 AI 코딩 에이전트를 실행하는 프로그램이다.  

반면 OpenCode Go는 같은 개발팀이 제공하는 호스팅 서비스(SaaS)이다. OpenAI API 키, Gemini API 키와 같은 여러 LLM들의 API 키를 관리할 필요 없이 OpenCode에서 OpenCode Go API만 연결하면 다양한 모델을 사용할 수 있다. 즉, API 키 관리, 모델 라우팅, 사용량 관리 등을 OpenCode Go가 대신 처리해 주는 구조다. 

![5.png](/images/posts/vibecoding-history/5.png)

월 $10의 비용으로 $60 가치의 사용량을 제공한다. 심지어 첫 달은 $5. 제공하는 LLM이 중국산이라는 것만 빼면 꽤 합리적이라고 생각했다. 글을 쓰고 있는 현 시점 나의 모든 개발 환경을 또 한번 이전 중에 있다. 이어지는 글에서는 OpenCode Go와 `oh-my-opencode-slim` 을 활용하여 저렴한 가격으로 나만의 에이전트 팀을 구축하는 방법에 대해 다루겠다.
