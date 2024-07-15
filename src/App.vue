<template>
  <a-config-provider>
    <a-spin
      style="width: 100%"
      :loading="globalLoadingFlag"
      :tip="globalLoadingTip"
    >
      <router-view />
    </a-spin>
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import GlobalSetting from '@/components/global-setting/index.vue'
  import { useLayoutLoading } from '@/hooks/layout-loading'

  const { globalLoadingFlag, globalLoadingTip } = useLayoutLoading()
</script>
