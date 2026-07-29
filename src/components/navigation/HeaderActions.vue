<template>
  <div class="header-actions">
    <!--
    <a class="header-actions__cart" href="#cart">
      TODO: иконка корзины
      <span>Корзина (0)</span>
    </a>

    <span class="header-actions__sep" aria-hidden="true">·</span>

    <button class="header-actions__lang" type="button" aria-label="Сменить язык">
      RU
    </button>
    -->
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.header-actions__cart {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #151515;
  font-size: 14px;
  line-height: 1.2;
  text-decoration: none;
}

.header-actions__cart:hover {
  opacity: 0.6;
}

.header-actions__sep {
  color: #151515;
  font-size: 14px;
  line-height: 1;
}

.header-actions__lang {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 14px;
  line-height: 1.2;
  cursor: pointer;
}

.header-actions__lang:hover {
  opacity: 0.6;
}
</style>
