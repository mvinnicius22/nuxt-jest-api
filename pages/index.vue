<template>
  <div id="page">
  <toolbar-system @clicked="onBackChild"/>
  <v-container v-show="!viewPais" class="col-xl-9">
    <CountryFilter @option="onOptionSelect"> </CountryFilter>
    <!-- <p v-if="$fetchState.pending">Carregando países...</p>
    <p v-else-if="$fetchState.error">Erro enquanto</p> -->
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md4 sm4 class="pl-6 pr-6 pa-4" v-for="item in paisesPaginated" :key="item.id">
          <v-hover v-slot="{ hover }">
            <v-card class="card-container pointer">
              <v-img :class="{ 'on-hover': hover }"
                    :src="item.flag"
                    height="180px"
                    @click="[getDataPais(item.alpha2Code)]"
                    id="verPaisBtn"
              >
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-pagination
          v-model="page"
          :length="Math.ceil(paises.length/perPage)"
          @input="visiblePages($event)"
          class="pt-4"
          color="purple"
      >
    </v-pagination>
  </v-container>
  <v-container id="containerVerPais" v-show="viewPais" grid-list-xl class="mt-md-12 col-xl-9">
      <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md5>
            <v-card elevation="0">
              <v-img :src="pais.flag" height="100%" id="imagem"> </v-img>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md7>
              <v-flex d-flex>
                <v-layout row wrap>
                    <v-card elevation="0">
                      <v-card-subtitle>
                        Nome: {{pais.name}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Capital: {{pais.capital}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Região: <span class="linkClickable" @click="[selectOne = 1, option = 1, regionId = pais.region, onBackChild(false), goFilter()]"> {{pais.region}} </span>
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Sub-região: {{pais.subregion}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        População: {{pais.population}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Línguas:
                        <span v-for="language in pais.languages" :key="language.index">{{language.nativeName}}, </span>
                      </v-card-subtitle>
                    </v-card>
                </v-layout>
              </v-flex>
          </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card elevation="0" class="mt-md-12">
          <v-card-text v-if="paisesVizinhos.length>0">
            Países vizinhos:
          </v-card-text>
          <v-card-text v-else>
            Não há países vizinhos
          </v-card-text>
        </v-card>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex md4 sm4 v-for="item in paisesVizinhosPaginated.slice(0,3)" :key="item.id">
              <v-hover v-slot="{ hover }">
                <v-card class="card-container">
                  <v-img
                        :class="{ 'on-hover': hover }"
                        :src="item.flag"
                        height="200px"
                        @click="[getDataPais(item.alpha2Code)]"
                        id="verPaisBtnVizinho"
                  >
                  </v-img>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap
          class="d-flex
                justify-center
                align-center"
      >
        <v-pagination v-if="paisesVizinhos.length>0"
              v-model="pageVizinho"
              :length="Math.ceil(paisesVizinhos.length/perPageVizinho)"
              @input="visiblePagesVizinhos($event)"
              class="pt-4"
              color="purple"
        >
        </v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import numeral from 'numeral'
  import ToolbarSystem from '../components/ToolbarSystem'
  import CountryFilter from '../components/CountryFilter'
  export default {
    name: 'Home',
    components: {
      ToolbarSystem,
    },
    props: {
      msg: String
    },
    data: () => ({
      viewPais: false,
      paises: [],
      paisesPaginated: [],
      paisesVizinhos: [],
      paisesVizinhosPaginated: [],
      page: 1,
      pageVizinho: 1,
      perPage: 12,
      perPageVizinho: 3,
      optionsOne: [
        {
          id: 1,
          nome: 'Região'
        },
        {
          id: 2,
          nome: 'Capital'
        },
        {
          id: 3,
          nome: 'Língua'
        },
        {
          id: 4,
          nome: 'País'
        },
        {
          id: 5,
          nome: 'Código de ligação'
        }
      ],
      selectOne: null,
      regionId: null,
      capitais: [],
      capitalId: null,
      linguaId: null,
      paisesSelect: [],
      paisId: null,
      option: null,
      loadingPesquisar: false,
      pais: {
        name: null,
        population: null,
        region: null,
        subregion: null,
        languages: null,
        alpha2Code: null,
        flag: null,
        capital: null,
        border: null
      },
    }),
    methods: {
      onOptionSelect (value) {
        this.option = value.option
        this.regionId = value.regionId
        this.capitalId = value.capitalId
        this.linguaId = value.linguaId
        this.paisId = value.paisId
        this.goFilter()
      },
      onBackChild (value) {
        this.viewPais = value
      },
      async getPaises(){
        try {
          const paises = await this.$axios.$get('all?fields=name;flag;region;capital;languages;alpha2Code;currencies;population;subregion;borders')
          this.paises = paises
          this.paisesPaginated = paises.slice((this.page - 1)* this.perPage, this.page* this.perPage)
          this.$emit('paisesFilter', this.paises)
        } catch (error) {
          throw new Error(error)
        }
      },
      goFilter(){
        try {
          if(this.option != null){
            this.loadingPesquisar = true
            switch (this.option){
              case 1:     this.getPaisesByRegiao();      break;
              case 2:     this.getPaisesByCapital();      break;
              case 3:     this.getPaisesByLanguage();      break;
              case 4:     this.getPaisesById();       break;
              case 5:     this.getPaisesByRegiao();      break;
              default:
                break
            }
            this.resetVariaveis()
          }else{
            var inputSelect = document.getElementById("input-select");
            // inputSelect.classList.add("bounce");
            setTimeout(function() {
              // inputSelect.classList.remove("bounce");
            }, 1000);
          }
        } catch (error) {
          throw new Error(error)
        }
      },
      visiblePages(){
        this.paisesPaginated = this.paises.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        this.loadingPesquisar = false
      },
      visiblePagesVizinhos(){
        this.paisesVizinhosPaginated = this.paisesVizinhos.slice((this.pageVizinho - 1)* this.perPageVizinho, this.pageVizinho* this.perPageVizinho)
      },
      async getPaisesByRegiao(){
        try {
          const paises = await this.$axios.$get(`region/${this.regionId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`)
          this.paises = paises
          this.visiblePages()
        } catch (error) {
          throw new Error(error)
        }
      },
      async getPaisesByCapital(){
        try {
          const paises = await this.$axios.$get(`capital/${this.capitalId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`)
          this.paises = paises
          this.visiblePages()
        } catch (error) {
          throw new Error(error)
        }
      },
      async getPaisesByLanguage(){
        try {
          const paises = await this.$axios.$get(`lang/${this.linguaId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`)
          this.paises = paises
          this.visiblePages()
        } catch (error) {
          throw new Error(error)
        }
      },
      async getPaisesById(){
        try {
          this.paises = []
          const paises = await this.$axios.$get(`alpha/${this.paisId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`)
          this.paises.push(paises)
          this.visiblePages()
        } catch (error) {
          throw new Error(error)
        }
      },
      resetVariaveis(){
        this.paisesVizinhos = []
        this.paisesVizinhosPaginated = []
        this.page = 1
        this.pageVizinho = 1
      },
      async getDataPais(alpha){
        try {
          this.resetVariaveis()
          const pais = await this.$axios.$get(`alpha/${alpha}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`)
          this.pais = pais
          this.pais.population = numeral(this.pais.population).format('0.0a');
          for(var i = 0; i < this.pais.borders.length; i++){
            const paisesVizinhos = await this.$axios.$get(`alpha/${this.pais.borders[i]}?fields=alpha2Code;flag`)
            this.paisesVizinhos.push({
              alpha2Code: paisesVizinhos.alpha2Code,
              flag: paisesVizinhos.flag
            })
          }
          this.paisesVizinhosPaginated = this.paisesVizinhos
          this.viewPais = true
        } catch (error) {
          throw new Error(error)
        }
      },
    },
    created() {
      this.getPaises()
    },
    mounted() {
      // this.getPaises()
    },
  }
</script>
<style scoped>
.v-card .on-hover {
  transition: opacity .4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 1;
}
.v-card:hover .on-hover{
  opacity: 0.7;
  cursor: pointer;
}
.linkClickable {
  color: purple;
  text-decoration: underline;
  text-decoration-color: purple;
}
.linkClickable:hover {
  cursor: pointer;
}
.bounce {
  outline: 0;
  animation-name: bounce;
  animation-duration: .5s;
}
@keyframes bounce {
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
}
.pesquisarRight{
  text-align: right;
}
</style>
