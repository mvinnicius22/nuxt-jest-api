<template>
  <v-app-bar
      app>
    <v-app-bar-nav-icon disabled>
      <v-layout row class="ml-12">
        <v-img
            class="ml-12"
            src="https://mova.vc/img/footer_mova.svg"
            max-width="80"
        ></v-img>
      </v-layout>
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn elevation="2"
            outlined
            tile
            class="mr-12 mr-sm-6"
            color="purple"
            v-show="!$vuetify.breakpoint.xs"
            v-on:click="onClickButton"
    >
      <v-icon dense
              color="purple"
      >
        keyboard_return
      </v-icon>
      <span class="pl-2 hidden-xs-only" style="text-transform: capitalize; letter-spacing: 2px;">
        Voltar
      </span>
    </v-btn>
    <v-icon
          color="purple"
          class="iconBack pr-4"
          v-show="$vuetify.breakpoint.xs"
          v-on:click="onClickButton"
    >
      keyboard_return
    </v-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "ToolbarSystem",
  data () {
    return {
      fixed: false,
      clipped: false,
    }
  },
  methods: {
    onClickButton () {
         this.$emit('clicked', false)
     }
  }
}
</script>

<style scoped>
.iconBack:hover{
  opacity: 0.6;
  transition: opacity .4s ease-in-out;
}
</style>