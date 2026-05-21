<template>
  <div class="success">
    <div class="trophy">🏆</div>
    <h2 class="title">예측 완료!</h2>
    <p class="subtitle">
      승부예측이 성공적으로 제출되었습니다.<br />
      대한민국 파이팅! 🇰🇷⚽
    </p>

    <div class="summary-card">
      <p class="summary-title">나의 예측 요약</p>
      <div class="row">
        <span class="key">이름</span>
        <span class="val">{{ data.name }}</span>
      </div>
      <div class="row">
        <span class="key">부서</span>
        <span class="val">{{ data.department }}</span>
      </div>
      <div class="row">
        <span class="key">경기 결과</span>
        <span class="val" :class="resultClass">{{ data.result }}</span>
      </div>
      <div class="row">
        <span class="key">스코어 예측</span>
        <span class="val">🇰🇷 {{ data.scoreKorea }} : {{ data.scoreCzech }} 🇨🇿</span>
      </div>
      <div class="row last">
        <span class="key">마지막 득점자</span>
        <span class="val">{{ data.lastScorer }}</span>
      </div>
    </div>

    <div class="prize-remind">
      <span class="prize-icon">🏆</span>
      완벽 정답자에게 <strong>배민 상품권 10만원</strong>을 드립니다!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, required: true },
})

const resultClass = computed(() => {
  if (props.data.result === '한국 승') return 'win-kr'
  if (props.data.result === '체코 승') return 'win-cz'
  return ''
})
</script>

<style scoped>
.success {
  max-width: 480px;
  margin: 0 auto;
  padding: 48px 20px 60px;
  text-align: center;
}

.trophy {
  font-size: 80px;
  margin-bottom: 20px;
  display: block;
  animation: pop 0.5s cubic-bezier(0.34,1.56,0.64,1);
}

@keyframes pop {
  from { transform: scale(0.4); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

.title {
  font-size: 30px;
  font-weight: 900;
  color: var(--green);
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 32px;
}

.summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-green);
  border-radius: var(--radius);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
}

.summary-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 14px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  font-size: 14px;
  border-bottom: 1px solid var(--border);
}

.row.last { border-bottom: none; }

.key  { color: var(--text-muted); }
.val  { font-weight: 700; color: #fff; }

.win-kr { color: #6ba3ff; }
.win-cz { color: #ff8080; }

.prize-remind {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244,195,0,0.08);
  border: 1px solid rgba(244,195,0,0.3);
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 13px;
  color: var(--gold);
  line-height: 1.5;
}

.prize-remind strong { font-weight: 800; }
</style>
