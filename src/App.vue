<template>
  <main class="page">
    <p class="intro">Тут скоро будет сайт художницы</p>

    <h1>Maiia Po</h1>

    <div class="progress" aria-label="Сайт в процессе создания">
      <span></span>
    </div>

    <p class="status">website loading...</p>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Oswald:wght@400;500;600;700&display=swap');

.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  padding: 24px;
  background: #d8d8d8;
  color: #111;
  text-align: center;
  font-family: "Inter", sans-serif;
}

.intro {
  margin: 0 0 28px;
  font-size: clamp(16px, 2vw, 24px);
  letter-spacing: 0.04em;
}

h1 {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(84px, 18vw, 220px);
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  font-weight: 600;
}

.progress {
  width: min(520px, 80vw);
  height: 18px;
  margin: 52px auto 0;
  border: 2px solid #111;
  background: transparent;
  padding: 3px;
}

.progress span {
  display: block;
  width: 62%;
  height: 100%;
  background: #18d6cf;
}

.status {
  margin: 18px 0 0;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.6;
}
</style>