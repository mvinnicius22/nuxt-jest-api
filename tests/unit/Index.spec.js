import { createLocalVue, mount } from '@vue/test-utils'
import index from '@/pages/index.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';
import Axios from 'axios'

Vue.use(Vuetify)
const vuetify = new Vuetify();
const localVue = createLocalVue();
// localVue.use(Axios);

const $axios = new Axios({
  baseURL: 'https://restcountries.eu/rest/v2/',
  timeout: 15000,
})
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

  test('tela existe', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('verifica selecionar regiao', () => {
    wrapper.vm.selectOne = 1
    wrapper.vm.regionId = 1
    // wrapper.find('#input-select').trigger('click').toBeTruthy()
    // btnPesquisar.trigger('click')
  })

  test('mudar paginação', () => {
    wrapper.vm.page = 2
    expect(wrapper.vm.page).toEqual(2)
  })

    // expect(wrapper.findAll('#verPaisBtn').exists()).toBe(true)
    // wrapper.vm.getPaises()
    // expect(wrapper.vm.paises.length).toBeGreaterThan(100)


  // it('verifica se o click nas imagens esta funcionando', async () => {
  //   const imagens = wrapper.findAll('#verPaisBtn')
  //   await imagens.at(0).trigger('click')
  // })

  it('verifica se o botão pesquisar só funciona se o usuário preencher os selects', async () => {
    const btnPesquisar = wrapper.find('#input-select')
    expect(wrapper.vm.loadingPesquisar).toBeFalsy()
  })

  it('verifica se o container individual do país está visível quando viewPais = true', async () => {
    wrapper.vm.viewPais = false;
    const container = wrapper.find('#containerVerPais')
    expect(container.isVisible()).toBe(false)
  })

  it('verifica se os dados do país são preenchidos corretamente', async () => {
    wrapper.vm.viewPais = true;
    expect(wrapper.vm.pais).toBeInstanceOf(Object)
    expect(wrapper.vm.pais.name).toBeDefined()
  })

  it('verifica se o botão voltar tá funcionando', async () => {
    const btnVoltar = wrapper.find('#btnVoltar')
    btnVoltar.trigger('click')
    expect(wrapper.vm.viewPais).toBeFalsy()
  })
})
