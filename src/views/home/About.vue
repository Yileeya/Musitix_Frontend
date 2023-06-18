<template>
  <section class="about-area">
    <div class="container">
      <div class="about-content">
        <h2>關於 Musitix</h2>
        <div v-html="aboutContent"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const aboutContentDemo = `<h5 style="margin-bottom: 1em">歡迎來到 Musitix！</h5>
                        <p style="margin-bottom: 0">
                            我們是一家致力於辦理各種音樂活動的新公司。<br>
                            我們的目標是為音樂愛好者提供最好的音樂體驗，讓他們享受到各種不同類型的音樂表演。<br>
                            我們邀請了來自不同地區和不同風格的音樂人前來演出，從流行樂、搖滾樂、嘻哈樂到古典音樂，所有的音樂類型都能在
                            Musitix 找到。<br>
                            除了各種音樂表演，我們還提供了最好的場地和設施，以確保您享受到最好的音樂體驗。<br>
                            我們的票價合理，讓您能夠輕鬆負擔。<br>
                            如果您對音樂有熱情，並且想要在一個充滿熱情和音樂的環境中享受美好的時光，那麼 Musitix 歡迎您的到來！
                        </p>`

const aboutContent: Ref<string> = ref(aboutContentDemo)
</script>

<style scoped lang="scss">
.about-area {
  min-height: 470px;
  display: flex;
  align-items: center;
  justify-content: center;

  .about-content {
    background: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 3em;
    padding: 2.5em 6.875em;

    h2 {
      color: var(--primary-color);
      font-weight: bold;
      margin-bottom: 1.25em;
    }
  }

  @media (max-width: 992px) {
    padding: 4em 0;
    .about-content {
      padding: 2.5em;
    }
  }
}
</style>
