<template>
  <div class="home">
    <div class="home_left">
      <field-container
        :fields="FIELDS_4"
        :advantages="ADVANTAGES_34"
        :openModal="openModal"
        :currentSelectedAdvantage="currentSelectedAdvantage"
      ></field-container>
    </div>
    <div class="home_right">
      <description-container
        v-if="hasDescription"
        :advantage="currentSelectedAdvantage"
        @closeModal="closeModal"
      >
      </description-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { FIELDS_4, ADVANTAGES_34 } from '@/utils/strengths';
import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';
import Field from '@/components/Field.vue';
import Description from '@/components/Description.vue';

export default {
  name: 'HomeView',
  components: {
    [Field.name]: Field,
    [Description.name]: Description,
  },
  data() {
    return {
      FIELDS_4,
      ADVANTAGES_34,
      // currentSelectedAdvantage: {},
      currentSelectedAdvantage: {
        ...ADVANTAGES_34[0],
        color: '#9A38D7',
      },
    };
  },
  computed: {
    hasDescription() {
      return Object.keys(this.currentSelectedAdvantage || {}).length > 0;
    },
  },
  methods: {
    closeModal() {
      this.currentSelectedAdvantage = {};
    },
    openModal(advantage) {
      this.currentSelectedAdvantage = advantage;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  .home_left {
    width: 50%;
  }

  .home_right {
    width: 50%;
  }
}
</style>
