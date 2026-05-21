<template>
  <div class="step-wrap">
    <div class="card">
      <p class="section-label"><span class="num">3</span> 마지막 득점자 예측</p>
      <p class="hint">경기에서 마지막으로 골을 넣은 선수를 선택하세요.</p>

      <!-- No-goal notice -->
      <div v-if="isScoreless" class="no-goal-notice">
        0 : 0 예측 시 득점 없음이 자동 선택됩니다.
      </div>

      <!-- Korea players -->
      <template v-if="!isScoreless">
        <p class="team-divider">🇰🇷 대한민국</p>
        <div class="player-grid">
          <button
            v-for="p in krPlayers"
            :key="p.id"
            class="player-chip"
            :class="{ selected: selected === p.id }"
            @click="selected = p.id"
          >
            <span class="p-no">{{ p.no }}</span>
            <span class="p-name">{{ p.name }}</span>
          </button>
        </div>

        <!-- Czech players -->
        <p class="team-divider cz">🇨🇿 체코</p>
        <div class="player-grid">
          <button
            v-for="p in czPlayers"
            :key="p.id"
            class="player-chip"
            :class="{ selected: selected === p.id }"
            @click="selected = p.id"
          >
            <span class="p-no cz">{{ p.no }}</span>
            <span class="p-name">{{ p.name }}</span>
          </button>
        </div>

        <!-- No scorer -->
        <button
          class="player-chip full"
          :class="{ selected: selected === 'none' }"
          @click="selected = 'none'"
        >
          <span class="p-no">—</span>
          <span class="p-name">득점 없음 (무득점)</span>
        </button>
      </template>

      <!-- Auto-select no goal chip -->
      <template v-else>
        <button class="player-chip full selected">
          <span class="p-no">—</span>
          <span class="p-name">득점 없음 (무득점)</span>
        </button>
      </template>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <!-- Nav -->
    <div class="nav">
      <button class="btn-back" @click="$emit('back')">← 이전</button>
      <button class="btn-submit" :disabled="submitting" @click="submit">
        <span v-if="submitting">제출 중...</span>
        <span v-else">⚽ 예측 제출하기</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  scoreKorea: { type: Number, default: 0 },
  scoreCzech: { type: Number, default: 0 },
  submitting:  { type: Boolean, default: false },
})
const emit = defineEmits(['submit', 'back'])

const KR_PLAYERS = [
  { id: 'son',      name: '손흥민',   no: 7  },
  { id: 'lee-ki',   name: '이강인',   no: 10 },
  { id: 'hwang-hc', name: '황희찬',   no: 11 },
  { id: 'cho',      name: '조규성',   no: 9  },
  { id: 'hwang-ib', name: '황인범',   no: 8  },
  { id: 'lee-js',   name: '이재성',   no: 17 },
  { id: 'oh',       name: '오현규',   no: 18 },
  { id: 'seol',     name: '설영우',   no: 2  },
]

const CZ_PLAYERS = [
  { id: 'schick',  name: 'P. Schick',  no: 10 },
  { id: 'hlozek',  name: 'A. Hložek',  no: 11 },
  { id: 'soucek',  name: 'T. Souček',  no: 8  },
  { id: 'lingr',   name: 'O. Lingr',   no: 9  },
  { id: 'provod',  name: 'L. Provod',  no: 14 },
  { id: 'coufal',  name: 'V. Coufal',  no: 5  },
]

const ALL_PLAYERS = [...KR_PLAYERS, ...CZ_PLAYERS, { id: 'none', name: '득점 없음', no: null }]

const isScoreless = computed(() => props.scoreKorea === 0 && props.scoreCzech === 0)
const selected    = ref(isScoreless.value ? 'none' : '')
const error       = ref('')

const krPlayers = KR_PLAYERS
const czPlayers = CZ_PLAYERS

function submit() {
  error.value = ''
  const id = isScoreless.value ? 'none' : selected.value
  if (!id) { error.value = '마지막 득점자를 선택해주세요.'; return }
  const player = ALL_PLAYERS.find(p => p.id === id)
  emit('submit', { lastScorer: player?.name || '득점 없음' })
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
  padding: 24px 20px;
  margin-bottom: 16px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
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

.hint {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.no-goal-notice {
  background: rgba(244,195,0,0.08);
  border: 1px solid rgba(244,195,0,0.25);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 12px;
  color: var(--gold);
  margin-bottom: 16px;
}

.team-divider {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  margin: 16px 0 10px;
}

.team-divider.cz { margin-top: 20px; }

.player-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.player-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-card-2);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
  transition: all 0.2s;
  cursor: pointer;
}

.player-chip.full {
  width: 100%;
  margin-top: 12px;
  grid-column: 1 / -1;
}

.player-chip:hover:not(.selected) {
  border-color: rgba(0,166,81,0.4);
  background: rgba(0,166,81,0.06);
}

.player-chip.selected {
  border-color: var(--green);
  background: rgba(0,166,81,0.18);
  box-shadow: 0 0 0 2px rgba(0,166,81,0.15);
}

.p-no {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-dim);
  min-width: 24px;
  line-height: 1;
}

.p-no.cz { color: rgba(215,20,26,0.6); }

.player-chip.selected .p-no { color: var(--green); }

.p-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  line-height: 1.2;
}

.player-chip.selected .p-name { color: #fff; }

/* Nav */
.error-msg {
  font-size: 13px;
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 12px;
}

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

.btn-submit {
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

.btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,122,51,0.55); }
.btn-submit:active:not(:disabled) { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }
</style>
