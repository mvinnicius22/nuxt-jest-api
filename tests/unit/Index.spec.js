import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import $axios from './helpers/api.mock'
import CountryFilter from '@/components/CountryFilter'
// .jsonOverwritesPath

Vue.use(Vuetify)
const vuetify = new Vuetify()
const localVue = createLocalVue()

$axios.jsonOverwritesPath = 'index/success/'
localVue.prototype.$axios = $axios

Vue.use(Vuetify);

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

  it('tela existe', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('quantidade de paises', () => {
    expect(wrapper.findAll('#verPaisBtn').exists()).toBe(true)
    wrapper.vm.getPaises()
    expect(wrapper.vm.paises.length).toBeGreaterThan(200)
  })

  it('verifica se o botão pesquisar só funciona se o usuário preencher os selects', async () => {
    const paises = wrapper.vm.paises.length;
    wrapper.vm.filter.selectOne = 1
    wrapper.vm.filter.option = null
    wrapper.vm.filter.regionId = 'Americas'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    expect(wrapper.vm.paises).toHaveLength(paises)
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

  it('mudar paginação', () => {
    wrapper.vm.page = 2
    expect(wrapper.vm.page).toEqual(2)
  })

  it('verifica se o click nas imagens esta funcionando', async () => {
    wrapper.vm.pais.capital = 'Brasília'
    const imagens = wrapper.findAll('#verPaisBtn')
    await imagens.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    const cardName = wrapper.find('#card-country')
    expect(cardName.exists()).toBeTruthy()
    expect(cardName.text()).toBe('Capital: Brasília')
  })

  it('verifica se o container individual do país está visível quando viewPais = true', async () => {
    const container = wrapper.find('#containerVerPais')
    expect(container.isVisible()).toBe(true)
  })

  it('verifica se os dados do país são preenchidos corretamente', async () => {
    wrapper.vm.viewPais = true;
    expect(wrapper.vm.pais).toBeInstanceOf(Object)
    expect(wrapper.vm.pais.capital).toBeDefined()
    wrapper.vm.pageVizinho = 2
    expect(wrapper.vm.pageVizinho).toEqual(2)
  })

  it('verifica se o botão voltar tá funcionando', async () => {
    const btnVoltar = wrapper.find('#btnVoltar')
    btnVoltar.trigger('click')
    expect(wrapper.vm.viewPais).toBeFalsy()
  })

})
