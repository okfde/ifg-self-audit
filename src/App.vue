<template>
  <div class="self-audit">
    <SiteHeader />
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

<style lang="postcss">
@tailwind base;
@tailwind components;

.self-audit {
  h2 {
    font-size: 1.75rem !important;
  }

  h3 {
    font-size: 1.25rem !important;
  }

  .btn .fa {
    @apply mr-1;
  }
}

@tailwind utilities;
</style>
