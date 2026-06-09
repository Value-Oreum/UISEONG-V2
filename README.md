# The Brilliant Star of UISEONG

의성군 **통합 공공 미디어 플랫폼 구축 제안** — 인터랙티브 HTML 제안서

> 지나쳐가는 도시를 넘어, 머무는 체류형 관광도시로.
> 두 거점을 하나의 미디어 아트로 연결하는 듀얼 랜드마크 동시 조성 마스터플랜.

## 개요

| 항목 | 내용 |
| --- | --- |
| 컨셉 | 듀얼 랜드마크 동시 조성 (조문국의 별 · 시민의 별) |
| 거점 1 | 조문국의 별 — 조문국박물관 앞마당 (직경 3m / 높이 약 4m) |
| 거점 2 | 시민의 별 — 복원사거리 중앙 로터리 (직경 6m / 높이 약 12m) |
| 공통 사양 | P6 · 5,000nit |
| 총 사업비 | 약 15억 ~ 20억 규모 (거점 2곳 동시 조성 기준, 기획 단계 개략 추정) |
| 제안 | OREUM · DK Global |

## 구성

```
uiseong-media-platform/
├── index.html      # 제안서 본문
├── style.css       # 스타일
├── main.js         # 인터랙션 (스크롤 리빌, 예산 카운터, 비교 슬라이더, 콘텐츠 시퀀스 플레이어)
├── assets/         # 시안 이미지 · 콘텐츠 시퀀스
└── .nojekyll       # GitHub Pages 빌드 우회
```

## 로컬 미리보기

별도 빌드가 필요 없는 순수 정적 사이트입니다.

```bash
python -m http.server 8011
# http://localhost:8011 접속
```

## 배포 (GitHub Pages)

1. 본 폴더를 새 GitHub 저장소에 업로드
2. **Settings → Pages → Source: `main` branch / `/ (root)`** 선택
3. 발급된 `https://<user>.github.io/<repo>/` 주소로 접속

---

© 2026 OREUM Inc. All Rights Reserved.
