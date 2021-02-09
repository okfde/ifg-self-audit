<template>
  <div>
    <h2 class="mb-6">{{ sectionTitle }}</h2>

    <MessageView
      v-for="question in section"
      :key="question.id"
      :id="question.id"
      :title="question.title"
      :body="question.body"
      :options="question.options"
      :isSection="true"
    />

    <MessageNavigation />
  </div>
</template>

<script>
import MessageView from './MessageView';
import MessageNavigation from './MessageNavigation';
import { sections } from '../data/questionnaire.json';
import { mapGetters } from 'vuex';

export default {
  components: { MessageView, MessageNavigation },
  computed: {
    ...mapGetters(['section']),
    sectionTitle() {
      return sections[this.section[0].section];
    }
  }
};
</script>
