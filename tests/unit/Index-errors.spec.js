import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import $axios from './helpers/api.mock'
// .jsonOverwritesPath

Vue.use(Vuetify)
const vuetify = new Vuetify();
const localVue = createLocalVue();

$axios.jsonOverwritesPath = './json/get.all.error.json'

localVue.prototype.$axios = $axios

describe('index.vue', () => {
  const wrapper = mount(index, {
    localVue,
    vuetify,
    $axios,
    data() {
      return {
        viewPais: false,
        selectOne: null,
      }
    },
  })

  it('verifica se a listagem é nula se nao houver requisições', async () => {
    expect(wrapper.findAll('#verPaisBtn').exists(false))
  })

})
