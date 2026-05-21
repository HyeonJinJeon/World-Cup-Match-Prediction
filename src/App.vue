<template>
  <div class="app">
    <TheHeader />

    <!-- Closed -->
    <div v-if="view === 'closed'" class="state-page">
      <span class="state-icon">⏳</span>
      <h2>예측 마감</h2>
      <p>경기 시작 30분 전에 예측이 마감되었습니다.</p>
      <p class="sub">대한민국 파이팅! 🇰🇷</p>
    </div>

    <!-- Duplicate -->
    <div v-else-if="view === 'duplicate'" class="state-page">
      <span class="state-icon">✅</span>
      <h2>이미 제출했습니다</h2>
      <p>승부예측은 1인 1회만 가능합니다.</p>
      <p class="sub">한국 파이팅! ⚽</p>
    </div>

    <!-- Success -->
    <SuccessView v-else-if="view === 'success'" :data="resultData" />

    <!-- Form flow -->
    <template v-else>
      <MatchHero v-if="step === 1" />

      <!-- Compact match bar on steps 2-3 -->
      <div v-else class="mini-bar">
        🇰🇷 대한민국 <span class="mvs">vs</span> 체코 🇨🇿
        <span class="mdate"> · 6.12 오전 11:00</span>
      </div>

      <StepBar :current="step" />

      <Transition :name="transitionName" mode="out-in">
        <FormStep1 v-if="step === 1" key="s1" @next="onStep1" />
        <FormStep2 v-else-if="step === 2" key="s2" @next="onStep2" @back="goBack" />
        <FormStep3 v-else-if="step === 3" key="s3"
          :score-korea="form.scoreKorea"
          :score-czech="form.scoreCzech"
          :submitting="submitting"
          @submit="onSubmit"
          @back="goBack"
        />
      </Transition>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import TheHeader   from './components/TheHeader.vue'
import MatchHero   from './components/MatchHero.vue'
import StepBar     from './components/StepBar.vue'
import FormStep1   from './components/FormStep1.vue'
import FormStep2   from './components/FormStep2.vue'
import FormStep3   from './components/FormStep3.vue'
import SuccessView from './components/SuccessView.vue'

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || ''
const DEADLINE        = new Date('2026-06-12T01:30:00Z') // KST 10:30
const STORAGE_KEY     = 'hk_wc2026_korea_czech'

const view       = ref('form')   // 'form' | 'closed' | 'duplicate' | 'success'
const step       = ref(1)
const submitting = ref(false)
const forward    = ref(true)

const form = reactive({
  name: '', department: '',
  scoreKorea: 0, scoreCzech: 0,
  lastScorer: '',
})

const transitionName = computed(() => forward.value ? 'slide-left' : 'slide-right')

// Gate checks on load
if (new Date() >= DEADLINE)                     view.value = 'closed'
else if (localStorage.getItem(STORAGE_KEY))     view.value = 'duplicate'

function onStep1(data) {
  form.name = data.name
  form.department = data.department
  forward.value = true
  step.value = 2
}

function onStep2(data) {
  form.scoreKorea = data.scoreKorea
  form.scoreCzech = data.scoreCzech
  forward.value = true
  step.value = 3
}

function goBack() {
  forward.value = false
  step.value--
}

const resultData = reactive({})

async function onSubmit(data) {
  form.lastScorer = data.lastScorer
  submitting.value = true

  const result =
    form.scoreKorea > form.scoreCzech ? '한국 승' :
    form.scoreKorea < form.scoreCzech ? '체코 승' : '무승부'

  const payload = {
    name:        form.name,
    department:  form.department,
    match:       '한국 vs 체코',
    result,
    scoreKorea:  form.scoreKorea,
    scoreCzech:  form.scoreCzech,
    lastScorer:  form.lastScorer,
    submittedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    })
  } catch (_) {}

  localStorage.setItem(STORAGE_KEY, '1')
  submitting.value = false

  Object.assign(resultData, { ...payload })
  view.value = 'success'
}
</script>

<style>
/* ── Slide transitions ── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from  { opacity: 0; transform: translateX(40px);  }
.slide-left-leave-to    { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(40px);  }

/* ── State pages (closed / duplicate) ── */
.state-page {
  max-width: 480px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  text-align: center;
}

.state-icon {
  display: block;
  font-size: 72px;
  margin-bottom: 24px;
}

.state-page h2 {
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 10px;
}

.state-page p  { font-size: 15px; color: var(--text-muted); line-height: 1.6; }
.state-page .sub { margin-top: 8px; }

/* ── Mini match bar (steps 2-3) ── */
.mini-bar {
  max-width: 480px;
  margin: 0 auto;
  padding: 14px 20px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 6px;
}

.mvs    { font-size: 11px; color: var(--text-dim); }
.mdate  { font-size: 11px; color: var(--text-dim); }
</style>
