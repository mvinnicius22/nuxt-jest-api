<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
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
