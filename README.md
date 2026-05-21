# 하이네켄 × 2026 FIFA 월드컵 승부예측

> Vue 3 + Vite 기반 사내 이벤트 승부예측 폼 (한국 vs 체코 · 6월 12일)

---

## 로컬 개발 실행

```bash
npm install
npm run dev
```
브라우저에서 `http://localhost:5173` 접속

---

## 배포 전 3단계 설정

### 1단계 — 구글 스프레드시트 ID 확인
1. [drive.google.com](https://drive.google.com) → 새 스프레드시트 생성
2. URL에서 ID 복사:
   ```
   https://docs.google.com/spreadsheets/d/[여기가 ID]/edit
   ```

### 2단계 — Google Apps Script 배포
1. [script.google.com](https://script.google.com) → 새 프로젝트
2. `apps-script.gs` 내용 전체 붙여넣기
3. `SPREADSHEET_ID` 값 교체
4. **배포 → 새 배포 → 웹 앱**
   - 다음 사용자로 실행: **나**
   - 액세스 권한: **모든 사용자**
5. 웹 앱 URL 복사

### 3단계 — 환경변수 설정
```bash
# 프로젝트 루트에 .env 파일 생성
cp .env.example .env
```
`.env` 파일에서 URL 교체:
```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/...YOUR_ID.../exec
```

---

## Vercel 무료 배포 (권장)

```bash
npm install -g vercel
npm run build
vercel --prod
```

또는 GitHub 레포 연결 후 자동 배포:
1. [github.com](https://github.com) → 새 레포지토리 생성
2. 코드 push
3. [vercel.com](https://vercel.com) → GitHub 연동 → 레포 import
4. **Environment Variables**에서 `VITE_APPS_SCRIPT_URL` 추가
5. Deploy → 자동으로 `https://[project].vercel.app` 생성

## GitHub Pages 배포

```bash
npm run build
# dist/ 폴더 내용을 gh-pages 브랜치에 push
```

---

## 스프레드시트 결과 컬럼

| 제출 시각 | 이름 | 부서 | 경기 | 승부 예측 | 한국 스코어 | 체코 스코어 | 마지막 득점자 |
|---|---|---|---|---|---|---|---|
