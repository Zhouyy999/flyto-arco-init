<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const paths = route.params.path
  const gotoPath = typeof paths === 'string' ? paths : paths[0]

  router.replace({ path: gotoPath })
</script>

<style scoped lang="less"></style>
