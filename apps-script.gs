// ================================================================
//  하이네켄 × 2026 FIFA 월드컵 승부예측 — Google Apps Script
//  사용법: script.google.com 에서 새 프로젝트 생성 후 이 코드 전체 붙여넣기
// ================================================================

// ▼ 구글 스프레드시트 URL의 /d/[이 부분]/edit 을 복사해 넣으세요
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

const SHEET_NAME     = '승부예측';
const HEADERS        = ['제출 시각', '이름', '부서', '경기', '승부 예측', '한국 스코어', '체코 스코어', '마지막 득점자'];

// ──────────────────────────────────────────────
//  POST 요청 처리 (폼 제출)
// ──────────────────────────────────────────────
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      data.name        || '',
      data.department  || '',
      data.match       || '한국 vs 체코',
      data.result      || '',
      data.scoreKorea  ?? '',
      data.scoreCzech  ?? '',
      data.lastScorer  || '',
    ]);

    return jsonResponse({ status: 'success' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

// GET 요청 — 배포 URL 동작 확인용
function doGet() {
  return jsonResponse({ status: 'ok', message: 'Heineken WC2026 API is running' });
}

// ──────────────────────────────────────────────
//  헬퍼 함수
// ──────────────────────────────────────────────
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    // 헤더 스타일 적용
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange
      .setFontWeight('bold')
      .setBackground('#007A33')
      .setFontColor('#FFFFFF')
      .setHorizontalAlignment('center');

    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160); // 제출 시각
    sheet.setColumnWidth(2, 100); // 이름
    sheet.setColumnWidth(3, 120); // 부서
    sheet.setColumnWidth(4, 120); // 경기
    sheet.setColumnWidth(5, 90);  // 승부 예측
    sheet.setColumnWidth(6, 90);  // 한국 스코어
    sheet.setColumnWidth(7, 90);  // 체코 스코어
    sheet.setColumnWidth(8, 140); // 첫 번째 득점자
  }

  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
