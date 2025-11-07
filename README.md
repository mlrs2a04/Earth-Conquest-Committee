# NanoSilicon Homepage (Static Template)

간단한 회사용 정적 홈페이지 템플릿입니다. **HTML/CSS/JS 분리**, 반응형, 다크모드, 모바일 메뉴, 문의 폼(데모), 로컬스토리지 기반 뉴스 추가(데모) 등 간단 시연용 기능을 포함합니다.

## 파일 구성
- `index.html` — 메인 페이지
- `styles.css` — 스타일
- `script.js` — 상호작용(모바일 메뉴, 다크모드, 폼 검증, 뉴스 로컬스토리지)
- `assets/logo.svg` — 심플 로고 (SVG)

## 사용 방법
1. 폴더를 임의의 웹서버 혹은 로컬(더블클릭)로 열면 됩니다.
2. `뉴스 추가` 폼은 **브라우저 LocalStorage**만 사용합니다. 새로고침 후에도 유지됩니다(같은 브라우저/PC).
3. `문의` 폼은 데모 메시지로만 응답합니다. 실제 전송은 백엔드 연동이 필요합니다.

## GitHub Pages 배포 (요약)
1. GitHub에서 새 Repo 생성 (예: `nanosilicon-homepage`).
2. 이 폴더의 파일을 그대로 업로드 (또는 `git` 사용).
3. **Settings → Pages → Deploy from a branch → main / root** 선택.
4. 배포 URL이 생성되면 공유할 수 있습니다.

---

Made for a quick in-class demo.
