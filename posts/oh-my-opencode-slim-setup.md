---
title: "월 10달러로 AI 개발팀을 고용하는 방법: OpenCode Go + oh-my-opencode-slim"
date: 2026-07-27T21:43:52+09:00
lastmod: 2026-07-29T17:19:33+09:00
cover:
  image: images/posts/oh-my-opencode-slim-setup/1.png
  caption: "월 10달러로 AI 개발팀을 고용하는 방법: OpenCode Go + oh-my-opencode-slim"
draft: false
categories: ["Coding"]
tags: ["opencode", "go", "oh-my-opencode-slim", "gemini", "deepseek", "qwen", "kimi", "minimax", "AI", "CLI"]
ShowToc: true
TocOpen: true
---

## 도입

AI 코딩 도구를 사용할 때 대부분은 하나의 모델에 모든 작업을 맡긴다. "이 기능 만들어줘", "버그 고쳐줘", "문서 작성해줘"까지 모두 하나의 AI가 처리하는 방식이다.  

하지만 실제 개발 팀은 다르다.  

기획자는 요구사항을 정리하고, 탐색 담당은 관련 자료를 조사하며, 시니어 개발자는 설계를 검토하고, 구현 담당은 코드를 작성한다. 각자의 역할이 분리되어 있기 때문에 더 높은 품질의 결과를 만들어낼 수 있다.  

`oh-my-opencode-slim`은 이러한 협업 방식을 AI에게 그대로 적용할 수 있도록 도와주는 설정이다. 단순히 여러 AI 모델을 번갈아 사용하는 것이 아니라, 각 모델에게 명확한 역할(Role)을 부여하여 하나의 AI 팀을 구성하는 것이 핵심이다.  

예를 들어 다음과 같은 구성을 만들 수 있다.  

- Orchestrator (GLM-5.2) : 사용자의 요청을 분석하고 어떤 작업이 필요한지 계획을 수립한다.
- Explorer (DeepSeek V4 Flash) : 관련 코드와 문서를 빠르게 탐색하고 필요한 정보를 수집한다.
- Librarian (Qwen3.7 Max) : 긴 문서나 프로젝트 구조를 분석하고 필요한 정보를 정리한다.
- Designer (Kimi K2.7 Code) : 실제 코드를 작성하고 리팩터링을 수행한다.

각 모델은 자신이 가장 잘하는 역할에 집중하고, OpenCode가 이들을 하나의 워크플로우로 연결해 준다. 이 방식의 가장 큰 장점은 하나의 AI보다 더 전문적인 결과를 얻을 수 있다는 점이다. 빠른 모델은 탐색에, 긴 컨텍스트에 강한 모델은 분석에, 코딩에 특화된 모델은 구현에 집중하도록 역할을 나누면 전체적인 생산성이 크게 향상된다.  

특히 OpenCode Go와 함께 사용하면 여러 API를 직접 관리할 필요 없이 하나의 구독만으로 다양한 모델을 활용할 수 있어, 개인도 손쉽게 '나만의 AI 개발팀' 을 구축할 수 있다. 그것도 저렴한 비용으로 말이다.

이번 글에서는 OpenCode Go를 이용해 이러한 AI 팀을 구성하고, oh-my-opencode-slim을 설치해 실제 개발 환경에서 활용하는 방법을 단계별로 소개한다.

## oh-my-opencode-slim 설치하기

이제 OpenCode Go를 사용할 준비가 끝났다면, oh-my-opencode-slim을 설치해 나만의 AI 에이전트 팀을 구성해 보자.

### 1. OpenCode 설치

먼저 OpenCode CLI를 설치한다.

```bash
curl -fsSL https://opencode.ai/install | bash
```

설치가 완료되면 버전을 확인해 정상적으로 설치되었는지 확인한다.

```bash
opencode --version
```

### 2. OpenCode Go 로그인

OpenCode Go 계정이 있다면 터미널에서 로그인한다.

```bash
opencode login
```

브라우저가 열리면 OpenCode Go 계정으로 로그인하면 된다. 로그인이 완료되면 OpenCode는 OpenCode Go에서 제공하는 다양한 모델을 사용할 수 있게 된다.

### 3. oh-my-opencode-slim 설치

이제 AI 에이전트 구성을 자동으로 설정해 주는 oh-my-opencode-slim을 설치한다.

```bash
npx oh-my-opencode-slim@latest install
```

`Install and enable the desktop companion? (y/N)` 이런 메시지가 뜨면 `y`를 입력하고 엔터를 누른다.

`Add OPENCODE_EXPERIMENTAL_BACKGROUND_SUBAGENTS=true now? (Y/n)` 이런 메시지가 뜨면 `y`를 입력하고 엔터를 누른다.

![](/images/posts/oh-my-opencode-slim-setup/2.png)

provider 선택 시 opencode를 검색한 뒤 `OpenCode Go` 를 선택하고 API 키를 입력한다.

```bash
opencode models --refresh
```

사용 가능한 모델이 OpenCode Go에서 제공하는 모델인지 확인한다.

![](/images/posts/oh-my-opencode-slim-setup/3.png)

`~/.config/opencode/oh-my-opencode-slim.json` 에서 orchestrator, oracle, explorer, librarian, designer, fixer, observer 역할에 해당하는 모델들이 잘 설정되어 있는지 확인한다. 기본 값에 OpenAI 프리셋이 포함되어 있는데, OpenCode Go만을 사용할 것이므로 OpenAI 관련 프리셋은 제거하면 된다.

```bash
vim ~/.config/opencode/oh-my-opencode-slim.json
```

```json
{
  "$schema": "https://unpkg.com/oh-my-opencode-slim@latest/oh-my-opencode-slim.schema.json",
  "preset": "opencode-go",
  "presets": {
    "opencode-go": {
      "orchestrator": {
        "model": "opencode-go/minimax-m3",
        "variant": "max",
        "skills": [
          "*"
        ],
        "mcps": [
          "*",
          "!context7"
        ]
      },
      "oracle": {
        "model": "opencode-go/qwen3.7-max",
        "variant": "max",
        "skills": [
          "simplify"
        ],
        "mcps": []
      },
      "explorer": {
        "model": "opencode-go/deepseek-v4-flash",
        "variant": "max",
        "skills": [],
        "mcps": []
      },
      "librarian": {
        "model": "opencode-go/deepseek-v4-flash",
        "variant": "high",
        "skills": [],
        "mcps": [
          "websearch",
          "context7",
          "gh_grep"
        ]
      },
      "designer": {
        "model": "opencode-go/kimi-k2.7-code",
        "variant": "medium",
        "skills": [],
        "mcps": []
      },
      "fixer": {
        "model": "opencode-go/deepseek-v4-flash",
        "variant": "high",
        "skills": [],
        "mcps": []
      },
      "observer": {
        "model": "opencode-go/mimo-v2.5",
        "variant": "max",
        "skills": [],
        "mcps": []
      }
    }
  },
  "companion": {
    "enabled": true,
    "position": "bottom-right",
    "size": "medium",
    "gifPack": "default",
    "loopStyle": "classic",
    "speed": 1,
    "debug": false
  }
}
```

```bash
source ~/.zshrc
```

터미널에 변경사항을 적용하고 OpenCode를 실행한다.

```bash
opencode
```

### oh-my-opencode-slim 사용 팁

![oh-my-opencode-slim](/images/posts/oh-my-opencode-slim-setup/4.png)

`oh-my-opencode-slim`을 설치했다고 해서 개발 방식이 크게 달라지는 것은 아니다. 평소처럼 OpenCode를 실행한 뒤 자연어로 요청하면 된다.

만약 다음과 같이 요청한다고 하면,

```txt
Next.js를 사용하여 커뮤니티 서비스를 만들어줘.
JWT 인증을 사용하고 Docker로 배포할 수 있도록 설계해줘.
```

그러면 Orchestrator가 전체 작업을 분석한 뒤 필요한 에이전트들에게 작업을 자동으로 분배한다.

- Orchestrator: 작업 계획 수립
- Explorer: 프로젝트 구조 및 관련 코드 탐색
- Librarian: 문서 및 레퍼런스 조사
- Designer: 코드 작성
- Fixer: 오류 수정 및 리팩터링
- Observer: 진행 상황 모니터링 및 피드백

사용자는 하나의 요청만 입력하지만, 내부적으로는 여러 AI가 협력하여 작업을 수행한다. 앞서 설명한대로 `~/.config/opencode/oh-my-opencode-slim.json`에서 각 역할별 모델을 자유롭게 변경할 수 있다.  

한편 OpenCode에서는 `/` 명령어를 이용해 특정 워크플로우를 빠르게 실행할 수 있다.

| 명령어                | 설명                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| `/init-deep`         | 프로젝트 전체에 `AGENTS.md`를 생성하여 AI가 디렉터리별 컨텍스트를 이해하도록 설정 |
| `/refactor`          | 프로젝트를 분석하여 구조적인 리팩터링 수행 |
| `/handoff`           | 현재 작업 내용을 요약하여 다음 세션에서 이어서 작업하기 좋게 정리 |
| `/subtask`           | 현재 작업을 별도의 Orchestrator 컨텍스트에서 수행한 후 결과만 가져옴 |
| `/interview`         | 요구사항을 단계적으로 질문하며 프로젝트를 구체화 (메인 대화의 컨텍스트가 불필요하게 커지는 것 방지) |
| `/start-work`        | 계획된 작업을 기반으로 개발 시작 |
| `/stop-continuation` | 자동 작업(루프, 이어서 작업 등)을 중지 |

개인적으로는 아래와 같은 개발 흐름을 추천한다.

1. `/init-deep`로 프로젝트 컨텍스트를 생성
2. 자연어로 기능 구현 요청
3. 구현이 끝나면 `/refactor`로 구조 개선
4. 복잡한 분석은 `/subtask`로 분리
5. 작업 종료 전 `/handoff`로 다음 세션을 위한 요약 생성

이런 흐름을 사용하면 oh-my-opencode-go의 여러 에이전트가 각자의 역할에 맞게 협력하면서, 장기 프로젝트에서도 컨텍스트를 효율적으로 유지할 수 있다.

## 마무리

불과 1~2년 전까지만 해도 AI를 활용한 개발은 하나의 LLM에게 질문하고 답을 받는 방식이 일반적이었다.

하지만 최근에는 흐름이 조금씩 바뀌고 있다. 하나의 모델에게 모든 역할을 맡기기보다는, 각각의 강점을 가진 여러 모델을 하나의 팀으로 구성해 협업시키는 에이전트 기반 개발(Agentic Development)​이 점점 주목받고 있다.

실제 개발팀에서 기획자, 개발자, QA 리뷰어 등이 서로 역할을 나누어 협업하듯이, AI 역시 역할을 분담할 때 더 효율적으로 문제를 해결할 수 있기 때문이다.

oh-my-opencode-slim은 이러한 개발 방식을 누구나 쉽게 경험할 수 있도록 도와준다. OpenCode Go와 함께 사용하면 별도의 API 키를 관리할 필요 없이 저렴한 비용으로 여러 모델을 하나의 워크플로우로 연결하여 나만의 AI 개발팀을 구축할 수 있다.

물론 앞으로 더 뛰어난 모델이 등장하면 각 역할에 배치하는 모델은 달라질 수 있다. 하지만 "하나의 AI에게 모든 일을 맡기는 것"이 아니라 "여러 AI가 각자의 역할을 맡아 협업하는 것"​이라는 개발 패러다임은 앞으로도 더욱 중요해질 가능성이 크다.

AI를 단순한 코드 자동완성 도구로 사용하는 것을 넘어, 함께 일하는 개발팀의 동료로 활용하고 싶다면 oh-my-opencode-slim은 충분히 한 번 경험해볼 만한 선택이다.