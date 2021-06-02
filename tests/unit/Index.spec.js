import { shallowMount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios'

const vuetify = new Vuetify(
  axios
);

Vue.use(Vuetify);

describe('index.vue', () => {
    it('renders props.msg when passed', async () => {
      const msg = 'new message'
      const wrapper = shallowMount(index, {
        mocks: {
          $vuetify: { breakpoint: {} },
          $axios: axios
        },
        vuetify,
        propsData: { msg },
        data() {
          return {
              viewPais: false,
          }
        },
      })
      // expect(Array.isArray(['value'])).toBe(true);
      expect(wrapper.text()).toMatch(msg)

    })
  })
