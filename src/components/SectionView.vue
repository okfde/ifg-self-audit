<template>
  <div>
    <h2 class="mb-4">{{ sectionTitle }}</h2>

    <MessageView
      v-for="question in section"
      :key="question.id"
      :id="question.id"
      :title="question.title"
      :body="question.body"
      :options="question.options"
      :isSection="true"
      class="mb-4"
    />
  </div>
</template>

<script>
import MessageView from './MessageView';
import { sections } from '../data/questionnaire.json';
import { mapGetters } from 'vuex';

export default {
  components: { MessageView },
  computed: {
    ...mapGetters(['section']),
    sectionTitle() {
      return sections[this.section[0].section];
    }
  }
};
</script>
