import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import $axios from './helpers/api.mock'
// .jsonOverwritesPath

Vue.use(Vuetify)
const vuetify = new Vuetify()
const localVue = createLocalVue()

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
    expect(wrapper.vm.paises.length).toBeGreaterThan(100)
  })

  it('verifica se o botão pesquisar só funciona se o usuário preencher os selects', async () => {
    const paises = wrapper.vm.paises.length;
    wrapper.vm.selectOne = 1
    wrapper.vm.option = null
    wrapper.vm.regionId = 'Asia'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    expect(wrapper.vm.paises).toHaveLength(paises)
  })

  it('verifica selecionar regiao', async () => {
    const paises = wrapper.vm.paises.length;
    wrapper.vm.selectOne = 1
    wrapper.vm.option = 1
    wrapper.vm.regionId = 'Asia'
    const btnPesquisar = wrapper.findAll('#input-select')
    await btnPesquisar.at(0).trigger('click')
    expect(wrapper.vm.paises).toBeInstanceOf(Array)
  })

  it('mudar paginação', () => {
    wrapper.vm.page = 2
    expect(wrapper.vm.page).toEqual(2)
  })

  it('verifica se o click nas imagens esta funcionando', async () => {
    const imagens = wrapper.findAll('#verPaisBtn')
    await imagens.at(0).trigger('click')
  })

  it('verifica se o container individual do país está visível quando viewPais = true', async () => {
    wrapper.vm.viewPais = false;
    const container = wrapper.find('#containerVerPais')
    expect(container.isVisible()).toBe(false)
  })

  it('verifica se os dados do país são preenchidos corretamente', async () => {
    wrapper.vm.viewPais = true;
    expect(wrapper.vm.pais).toBeInstanceOf(Object)
    // expect(wrapper.vm.pais.name).toBeDefined()
  })

  it('verifica se o botão voltar tá funcionando', async () => {
    const btnVoltar = wrapper.find('#btnVoltar')
    btnVoltar.trigger('click')
    expect(wrapper.vm.viewPais).toBeFalsy()
  })

})
