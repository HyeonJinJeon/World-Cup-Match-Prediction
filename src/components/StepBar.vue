<template>
  <div class="step-bar">
    <div
      v-for="(label, i) in steps"
      :key="i"
      class="step-item"
    >
      <div class="step-circle" :class="{ active: current === i + 1, done: current > i + 1 }">
        <svg v-if="current > i + 1" viewBox="0 0 12 12" class="check">
          <polyline points="2,6 5,9 10,3" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span class="step-label" :class="{ active: current === i + 1 }">{{ label }}</span>
      <div v-if="i < steps.length - 1" class="step-line" :class="{ done: current > i + 1 }" />
    </div>
  </div>
</template>

<script setup>
defineProps({ current: { type: Number, required: true } })
const steps = ['정보 입력', '스코어', '득점자']
</script>

<style scoped>
.step-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 20px 4px;
  max-width: 480px;
  margin: 0 auto;
  gap: 0;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.step-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all 0.3s;
}

.step-circle.active {
  border-color: var(--green);
  background: var(--green);
  color: #fff;
  box-shadow: 0 0 12px rgba(0,166,81,0.45);
}

.step-circle.done {
  border-color: var(--green);
  background: var(--green-deeper);
}

.check { width: 12px; height: 12px; }

.step-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-dim);
  white-space: nowrap;
  transition: color 0.3s;
}

.step-label.active { color: var(--text); }

.step-line {
  width: 32px;
  height: 1px;
  background: var(--border);
  margin: 0 4px;
  flex-shrink: 0;
  transition: background 0.3s;
}

.step-line.done { background: var(--green-deeper); }
</style>
