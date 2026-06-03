<template>
  <main class="page">
    <section class="card">
      <p class="eyebrow">[ скоро ]</p>

      <p class="subtitle">Тут будет сайт художницы</p>

      <h1>Maiia Po</h1>

      <div class="progress">
        <span></span>
      </div>

      <p class="status">website loading...</p>
    </section>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Oswald:wght@500;600&display=swap");

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(circle, #fafafa 0%, #f3f3f3 60%, #e9e9e9 100%);
  color: #151515;
  font-family: "Inter", sans-serif;
}

.card {
  width: min(760px, 100%);
  text-align: center;
}

.eyebrow {
  margin: 0 0 26px;
  font-size: 14px;
  letter-spacing: 0.12em;
}

.eyebrow::after {
  content: "";
  display: block;
  width: 52px;
  height: 4px;
  margin: 18px auto 0;
  background: #d51d78;
}

.subtitle {
  margin: 0 0 24px;
  font-size: clamp(18px, 2.2vw, 26px);
  line-height: 1.35;
}

h1 {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(72px, 13vw, 150px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  font-weight: 600;
}

.progress {
  width: min(460px, 100%);
  height: 18px;
  margin: 44px auto 0;
  border: 1.5px solid #151515;
  padding: 4px;
}

.progress span {
  display: block;
  width: 62%;
  height: 100%;
  background: #18d6cf;
}

.status {
  margin: 16px 0 0;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #777;
}
</style>