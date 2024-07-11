<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { onActivated } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  onActivated(() => {
    const gotoPath = route.params.path as string
    router.replace(gotoPath)
  })
</script>

<style scoped lang="less"></style>
