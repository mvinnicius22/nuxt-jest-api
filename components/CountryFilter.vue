<template>
    <v-flex d-flex>
        <v-layout wrap>
            <v-flex md4 sm6 xs12 class="pl-6 pr-6">
                <v-select
                        label="Escolha uma opção"
                        :items="optionsOne"
                        item-text="nome"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.selectOne"
                        @change="filter.option = null"
                >
                </v-select>
            </v-flex>
            <v-flex md4 sm6 xs12 class="pl-6 pr-6">
                <v-select
                        v-if="filter.selectOne == 1"
                        label="Escolha uma região"
                        :items="filteredRegioes"
                        item-text="region"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.regionId"
                        @input="filter.option = 1"
                >
                </v-select>
                <v-autocomplete
                        v-if="filter.selectOne == 2"
                        label="Escolha uma capital"
                        :items="capitais"
                        item-text="capital"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.capitalId"
                        @input="filter.option = 2"
                >
                </v-autocomplete>
                <v-autocomplete
                        v-if="filter.selectOne == 3"
                        label="Escolha uma língua"
                        :items="linguas"
                        item-text="lingua"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.linguaId"
                        @input="filter.option = 3"
                >
                </v-autocomplete>
                <v-autocomplete
                        v-if="filter.selectOne == 4"
                        label="Escolha um país"
                        :items="paisesSelect"
                        item-text="pais"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.paisId"
                        @input="filter.option = 4"
                >
                </v-autocomplete>
                <v-select
                        v-if="filter.selectOne == 5"
                        label="Escolha uma região"
                        :items="filteredRegioes"
                        item-text="region"
                        color="purple"
                        item-color="purple"
                        item-value="id"
                        v-model="filter.regionId"
                        @input="filter.option = 5"
                >
                </v-select>
            </v-flex>
            <v-flex md4 :class="{'pesquisarRight': $vuetify.breakpoint.xs}" class="pl-6 pr-6 pt-md-4 pt-sm-0 pt-xs-0">
                <v-btn elevation="2"
                        color="purple"
                        @click="setFilter()"
                        :loading="filter.loadingPesquisar"
                        class="white--text"
                        id="input-select"
                >
                    <span class="white--text pr-4 pl-4">
                        Pesquisar
                    </span>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-flex>
</template>
<script>
export default {
    name: 'CountryFilter',
    props: {
        filter: {
            selectOne: Number,
            regionId: Number,
            capitalId: Number,
            linguaId: Number,
            paisId: Number,
            option: Number,
            loadingPesquisar: Boolean
        }
    },
    data: () => ({
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
        regioes: [],
        capitais: [],
        linguas: [],
        paisesSelect: [],
        paises: [],
    }),
    computed: {
        filteredRegioes(){
            return this.regioes.filter(item => item.id != '')
        }
    },
    methods: {
        setFilter(){
            this.$emit('option', {
                option: this.filter.option,
                regionId: this.filter.regionId,
                capitalId: this.filter.capitalId,
                linguaId: this.filter.linguaId,
                paisId: this.filter.paisId
            })
        },
        getRegioes(){
            this.regioes = this.paises.map((pais) => {
            if(pais){
                return {
                    id: pais.region,
                    region: pais.region
                }
            }
            })
        },
        getCapitais(){
        this.capitais = this.paises.map((pais) => {
            if(pais){
            return {
                id: pais.capital,
                capital: pais.capital
            }
            }
        })
        },
        getLinguas(){
            this.linguas = this.paises.map((pais) => {
                for(var i = 0; i < pais.languages.length; i++){
                if(pais){
                    return {
                        id: pais.languages[i].iso639_1,
                        lingua: pais.languages[i].nativeName
                    }
                }
                }
            })
        },
        getPaisesForSelect(){
        this.paisesSelect = this.paises.map((pais) => {
            if(pais){
            return {
                id: pais.alpha2Code,
                pais: pais.name
            }
            }
        })
        },
        async getPaises(){
            try {
                const paises = await this.$axios.$get('/all?fields=name;flag;region;capital;languages;alpha2Code;currencies;population;subregion;borders')
                this.paises = paises
                this.getRegioes()
                this.getCapitais()
                this.getLinguas()
                this.getPaisesForSelect()
            } catch (error) {
                throw new Error(error)
            }
        },
    },
    created() {
        this.getPaises()
    },
}
</script>