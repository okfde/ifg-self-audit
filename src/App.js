/* import { ResizeObserver } from '@juggle/resize-observer'; */

import SiteHeader from './components/SiteHeader';
import QuestionnaireView from './components/QuestionnaireView';

export default {
  name: 'App',
  components: { SiteHeader, QuestionnaireView },
  mounted() {
    /* this.resize();

    const ro = new ResizeObserver(this.resize);
    ro.observe(document.body);
    document.addEventListener('resize', this.resize); */
  },
  methods: {
    resize() {
      const { offsetHeight } = document.body;
      console.log(offsetHeight);
      window.parent.postMessage(
        ['setIframeHeight', 'fds-shop-iframe', offsetHeight],
        '*'
      );
    }
  }
};
