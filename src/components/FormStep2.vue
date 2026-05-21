<template>
  <div class="step-wrap">
    <div class="card">
      <p class="section-label"><span class="num">2</span> 최종 스코어 예측</p>

      <div class="score-area">
        <div class="score-col">
          <span class="team-flag">🇰🇷</span>
          <span class="team-name">대한민국</span>
          <div class="stepper">
            <button class="step-btn" @click="change('kr', -1)" :disabled="scoreKr === 0">−</button>
            <span class="score-val">{{ scoreKr }}</span>
            <button class="step-btn" @click="change('kr', +1)" :disabled="scoreKr === 20">+</button>
          </div>
        </div>

        <div class="colon">:</div>

        <div class="score-col">
          <span class="team-flag">🇨🇿</span>
          <span class="team-name">체코</span>
          <div class="stepper">
            <button class="step-btn" @click="change('cz', -1)" :disabled="scoreCz === 0">−</button>
            <span class="score-val">{{ scoreCz }}</span>
            <button class="step-btn" @click="change('cz', +1)" :disabled="scoreCz === 20">+</button>
          </div>
        </div>
      </div>

      <!-- Result inferred -->
      <div class="result-chip" :class="resultClass">
        {{ resultLabel }}
      </div>
    </div>

    <div class="nav">
      <button class="btn-back" @click="$emit('back')">← 이전</button>
      <button class="btn-next" @click="next">다음 →</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['next', 'back'])

const scoreKr = ref(0)
const scoreCz = ref(0)

function change(team, delta) {
  if (team === 'kr') scoreKr.value = Math.max(0, Math.min(20, scoreKr.value + delta))
  else               scoreCz.value = Math.max(0, Math.min(20, scoreCz.value + delta))
}

const resultLabel = computed(() => {
  if (scoreKr.value > scoreCz.value) return '🇰🇷 대한민국 승'
  if (scoreKr.value < scoreCz.value) return '🇨🇿 체코 승'
  return '🤝 무승부'
})

const resultClass = computed(() => {
  if (scoreKr.value > scoreCz.value) return 'win-kr'
  if (scoreKr.value < scoreCz.value) return 'win-cz'
  return 'draw'
})

function next() {
  emit('next', { scoreKorea: scoreKr.value, scoreCzech: scoreCz.value })
}
</script>

<style scoped>
.step-wrap {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 20px 48px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 20px 20px;
  margin-bottom: 16px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 28px;
}

.num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
}

.score-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.score-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.team-flag { font-size: 32px; line-height: 1; }

.team-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.stepper {
  display: flex;
  align-items: center;
  background: var(--bg-card-2);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 140px;
}

.step-btn {
  background: transparent;
  color: var(--text-muted);
  font-size: 24px;
  font-weight: 300;
  width: 44px;
  height: 68px;
  flex-shrink: 0;
  transition: color 0.15s, background 0.15s;
  line-height: 1;
}

.step-btn:hover:not(:disabled) {
  color: #fff;
  background: rgba(255,255,255,0.06);
}

.step-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.score-val {
  flex: 1;
  text-align: center;
  font-family: var(--font-display);
  font-size: 48px;
  color: #fff;
  line-height: 1;
  user-select: none;
}

.colon {
  font-family: var(--font-display);
  font-size: 36px;
  color: rgba(255,255,255,0.25);
  flex-shrink: 0;
  padding-top: 48px;
}

.result-chip {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 99px;
  transition: all 0.3s;
}

.win-kr { background: rgba(0,52,120,0.25); border: 1px solid rgba(0,52,120,0.5); color: #6ba3ff; }
.win-cz { background: rgba(215,20,26,0.15); border: 1px solid rgba(215,20,26,0.4); color: #ff8080; }
.draw   { background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: var(--text-muted); }

/* Nav */
.nav {
  display: flex;
  gap: 10px;
}

.btn-back {
  background: transparent;
  border: 1.5px solid var(--border);
  border-radius: 14px;
  color: var(--text-muted);
  font-size: 15px;
  font-weight: 700;
  padding: 16px 20px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-back:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

.btn-next {
  flex: 1;
  padding: 17px;
  background: linear-gradient(135deg, var(--green-deeper), var(--green-dark), var(--green));
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(0,122,51,0.4);
}

.btn-next:hover  { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,122,51,0.55); }
.btn-next:active { transform: translateY(0); }
</style>
