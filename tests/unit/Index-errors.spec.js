import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import $axios from './helpers/api.mock'
// .jsonOverwritesPath

Vue.use(Vuetify)
const vuetify = new Vuetify();
const localVue = createLocalVue();

$axios.jsonOverwritesPath = 'index/error/'

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

  it('verifica selecionar regiao', async () => {
    wrapper.vm.filter.selectOne = 1
    wrapper.vm.filter.option = 1
    wrapper.vm.filter.regionId = 'Americas'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paises).toBeInstanceOf(Array)
  })

  it('verifica selecionar capital', async () => {
    wrapper.vm.filter.selectOne = 1
    wrapper.vm.filter.option = 2
    wrapper.vm.filter.capitalId = 'brasilia'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paises).toBeInstanceOf(Array)
  })

  it('verifica selecionar lingua', async () => {
    wrapper.vm.filter.selectOne = 1
    wrapper.vm.filter.option = 3
    wrapper.vm.filter.linguaId = 'pt'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paises).toBeInstanceOf(Array)
  })

  it('verifica selecionar pais', async () => {
    wrapper.vm.filter.selectOne = 1
    wrapper.vm.filter.option = 4
    wrapper.vm.filter.paisId = 'BR'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paises).toBeInstanceOf(Array)
  })

})
