---
title: "Synology NAS에 Matrix Synapse 설치하기"
date: 2025-07-12T19:53:00+09:00
draft: false
categories: ["Server"]
tags: ["synology", "nas", "matrix", "synapse"]
cover:
  image: images/posts/synology-synapse/1.png
  caption: ""
ShowToc: true
TocOpen: true
---

## 도메인 관련 설정

![](/images/posts/synology-synapse/1.png)

채팅 서버를 운영하고 싶은 subdomain을 세팅한다.

![](/images/posts/synology-synapse/2.png)

제어판 > 로그인 포털 > 고급 > 역방향 프록시에서 위와 같이 설정한다.

## 연결성 관련 설정

![](/images/posts/synology-synapse/3.png)

사용자 지정 머리글 (커스텀 헤더) 생성 시 websocket을 선택하여 위와 같이 설정한다.

![](/images/posts/synology-synapse/4.png)

제어판 > 네트워크 > 연결성에서 HTTP/2 활성화를 체크한다.

![](/images/posts/synology-synapse/5.png)

제어판 > 보안 > 고급에서 HTTP 압축 활성화를 체크한다.

## Synapse 컨테이너 세팅

![](/images/posts/synology-synapse/6.png)

File Station에서 docker 폴더 밑에 `synapse` 폴더를 만든다.

![](/images/posts/synology-synapse/7.png)

synapse 폴더 밑에 `data`, `db` 폴더를 만든다.

```sh
sudo docker run --rm \
--user 1026:100 \
-v /volume1/docker/synapse/data:/data \
-e SYNAPSE_CONFIG_PATH=/data/homeserver.yaml \
-e SYNAPSE_SERVER_NAME=<서버 이름> \
-e SYNAPSE_REPORT_STATS=yes \
matrixdotorg/synapse:latest generate
```

서버 이름을 입력하고 위 명령을 실행한다.

![](/images/posts/synology-synapse/8.png)

data 폴더 안의 homeserver.yaml 파일을 위와 같이 수정한다. 홈서버 이름 밑에 다음 내용을 추가한다.

```yaml
enable_registration: true
enable_registration_without_verification: true
enable_group_creation: true
```

![](/images/posts/synology-synapse/9.png)

```yaml
database:
  name: sqlite3
  args:
    database: /data/homeserver.db
```

이 내용을 삭제하고, 아래의 내용으로 replace 한다.

![](/images/posts/synology-synapse/10.png)

```yaml
database:
  name: psycopg2
  args:
    user: synapseuser
    password: synapsepass
    database: synapsedb
    host: synapse-db
    cp_min: 5
    cp_max: 10
```

![](/images/posts/synology-synapse/11.png)

```yaml
services:
  synapse-db:
    image: postgres:16
    container_name: Synapse-DB
    hostname: synapse-db
    security_opt:
      - no-new-privileges:true
    healthcheck:
      test: ["CMD", "pg_isready", "-q", "-d", "synapsedb", "-U", "synapseuser"]
      timeout: 45s
      interval: 10s
      retries: 10
    volumes:
      - /volume1/docker/synapse/db:/var/lib/postgresql/data:rw
    environment:
      - POSTGRES_DB=synapsedb
      - POSTGRES_USER=synapseuser
      - POSTGRES_PASSWORD=synapsepass
      - POSTGRES_INITDB_ARGS=--encoding=UTF-8 --lc-collate=C --lc-ctype=C
    restart: on-failure:5

  synapse:
    image: matrixdotorg/synapse:latest
    container_name: Synapse
    hostname: synapse
    security_opt:
      - no-new-privileges:true
    user: 1026:100
    environment:
      - TZ=Asia/Seoul
      - SYNAPSE_CONFIG_PATH=/data/homeserver.yaml
    volumes:
      - /volume1/docker/synapse/data:/data:rw
    ports:
      - 8450:8008/tcp
    restart: on-failure:5
    depends_on:
      synapse-db:
        condition: service_started
```

Portainer에 접속해서 위와 같이 Stack을 생성한다.