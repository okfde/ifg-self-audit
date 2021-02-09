<template>
  <div class="self-audit">
    <SiteHeader ref="header" />
    <QuestionnaireView />
  </div>
</template>

<script>
import { ResizeObserver } from '@juggle/resize-observer';

import SiteHeader from './components/SiteHeader';
import QuestionnaireView from './components/QuestionnaireView';

export default {
  name: 'App',
  components: { SiteHeader, QuestionnaireView },
  mounted() {
    this.resize();

    const ro = new ResizeObserver(this.resize);
    ro.observe(document.body);
    document.addEventListener('resize', this.resize);

    this.$store.subscribe(({ type }) => {
      if (type.includes('currentQuestion')) {
        this.$refs.header.scrollIntoView();
      }
    });
  },
  methods: {
    resize() {
      const { offsetHeight } = document.body;
      window.parent.postMessage(
        ['setIframeHeight', 'self-audit-iframe', offsetHeight],
        '*'
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
.slide-enter-active,
.slide-back-enter-active {
  transition: opacity 0.2s, transform 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.slide-leave-active,
.slide-back-leave-active {
  transition: opacity 0.2s, transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-leave-to,
.slide-enter,
.slide-back-leave-to,
.slide-back-enter {
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-10%);
}

.slide-enter {
  transform: translateX(10%);
}

.slide-back-leave-to {
  transform: translateX(10%);
}

.slide-back-enter {
  transform: translateX(-10%);
}
</style>
