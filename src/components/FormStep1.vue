<template>
  <div class="step-wrap">
    <div class="card">
      <p class="section-label"><span class="num">1</span> 내 정보</p>

      <div class="fields">
        <div class="field">
          <label for="s1-name">이름 <span class="req">*</span></label>
          <input
            id="s1-name"
            v-model="name"
            type="text"
            placeholder="홍길동"
            maxlength="20"
            autocomplete="off"
            @keyup.enter="next"
          />
        </div>

        <div class="field">
          <label for="s1-dept">부서 <span class="req">*</span></label>
          <div class="select-wrap">
            <select id="s1-dept" v-model="department">
              <option value="">부서를 선택해주세요</option>
              <option>영업팀</option>
              <option>마케팅팀</option>
              <option>On Trade팀</option>
              <option>Off Trade팀</option>
              <option>재무팀</option>
              <option>HR팀</option>
              <option>물류/SCM팀</option>
              <option>기타</option>
            </select>
            <svg class="chevron" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <button class="btn-next" @click="next">
      다음 <span class="arrow">→</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['next'])

const name       = ref('')
const department = ref('')
const error      = ref('')

function next() {
  error.value = ''
  if (!name.value.trim())  { error.value = '이름을 입력해주세요.'; return }
  if (!department.value)   { error.value = '부서를 선택해주세요.'; return }
  emit('next', { name: name.value.trim(), department: department.value })
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
  margin-bottom: 20px;
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

.fields { display: flex; flex-direction: column; gap: 16px; }

.field label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.req { color: var(--green); }

.field input,
.field select {
  width: 100%;
  background: var(--bg-card-2);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  padding: 13px 16px;
  transition: border-color 0.2s, background 0.2s;
  -webkit-appearance: none;
}

.field input:focus,
.field select:focus {
  border-color: var(--green);
  background: rgba(0,166,81,0.08);
}

.field input::placeholder { color: var(--text-dim); }
.field select option       { background: #111f13; color: #fff; }

.select-wrap { position: relative; }

.chevron {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  pointer-events: none;
}

.select-wrap select { padding-right: 40px; }

.error-msg {
  font-size: 13px;
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 12px;
}

.btn-next {
  width: 100%;
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

.btn-next:hover   { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,122,51,0.55); }
.btn-next:active  { transform: translateY(0); }
.arrow { margin-left: 4px; }
</style>
