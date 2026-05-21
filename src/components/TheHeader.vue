<template>
  <header class="header">
    <div class="logo">
      <svg class="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,1 15.09,8.26 23,9.27 17.5,14.63 18.18,22.54 12,19.27 5.82,22.54 6.5,14.63 1,9.27 8.91,8.26" fill="#C8102E"/>
      </svg>
      <span class="logo-text">
        <span class="hk">HEINEKEN</span><span class="kr"> KOREA</span>
      </span>
    </div>
    <div class="badge">⚽ 2026 FIFA WORLD CUP</div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: rgba(12, 21, 13, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.star {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.logo-text {
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.5px;
  line-height: 1;
}

.hk  { color: var(--green); }
.kr  { color: #fff; }

.badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--gold);
  border: 1px solid rgba(244,195,0,0.4);
  border-radius: 99px;
  padding: 5px 10px;
  white-space: nowrap;
}
</style>
