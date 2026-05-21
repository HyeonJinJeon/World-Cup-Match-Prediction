<template>
  <section class="hero">
    <!-- Title -->
    <p class="eyebrow"><span class="line" />승부예측 챌린지<span class="line" /></p>
    <h1 class="display">
      <span class="white">SCORE</span><br />
      <span class="green">PREDICT</span>
    </h1>
    <p class="subtitle">
      최종 스코어와 마지막 득점자를 맞혀보세요.<br />
      정확히 맞추면 당신이 오늘의 주인공!
    </p>

    <!-- Prize badge -->
    <div class="prize">
      <span class="prize-icon">🏆</span>
      <span>완벽 정답자 배민 상품권 <strong>10만원</strong></span>
    </div>

    <!-- Match card -->
    <div class="match-card">
      <div class="flag-bar">
        <div class="flag-bar-kr" />
        <div class="flag-bar-cz" />
      </div>
      <div class="teams">
        <div class="team">
          <span class="code">KR</span>
          <span class="flag-emoji">🇰🇷</span>
          <span class="name">대한민국</span>
        </div>
        <span class="vs">VS</span>
        <div class="team right">
          <span class="code">CZ</span>
          <span class="flag-emoji">🇨🇿</span>
          <span class="name">체코</span>
        </div>
      </div>
      <p class="match-info">
        📅 2026년 6월 12일 (금) · 오전 11:00 · FIFA WORLD CUP A조
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 32px 20px 8px;
  max-width: 480px;
  margin: 0 auto;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.line {
  flex: 1;
  height: 1px;
  background: var(--border);
  display: block;
}

.display {
  font-family: var(--font-display);
  line-height: 0.9;
  margin-bottom: 16px;
}

.display .white { font-size: clamp(72px, 22vw, 96px); color: #fff; }
.display .green { font-size: clamp(72px, 22vw, 96px); color: var(--green); }

.subtitle {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 20px;
}

/* Prize */
.prize {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244,195,0,0.08);
  border: 1px solid rgba(244,195,0,0.35);
  border-radius: 99px;
  padding: 9px 18px;
  font-size: 13px;
  color: var(--gold);
  margin-bottom: 24px;
}

.prize strong { font-weight: 800; }

/* Match card */
.match-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 8px;
}

.flag-bar {
  display: flex;
  height: 4px;
}

.flag-bar-kr { flex: 1; background: linear-gradient(to right, #003478, #C60C30); }
.flag-bar-cz { flex: 1; background: linear-gradient(to right, #D7141A, #ffffff30); }

.teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 12px;
  gap: 12px;
}

.team {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.team.right { align-items: flex-end; }

.code {
  font-family: var(--font-display);
  font-size: 36px;
  color: #fff;
  line-height: 1;
  letter-spacing: 1px;
}

.flag-emoji { font-size: 22px; line-height: 1; }

.name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.vs {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-dim);
  flex-shrink: 0;
}

.match-info {
  padding: 10px 24px 16px;
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: 0.3px;
  border-top: 1px solid var(--border);
}
</style>
