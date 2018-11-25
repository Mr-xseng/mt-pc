<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header/>
    </el-header>
    <el-main style="margin-bottom: 300px">
      <nuxt/>
    </el-main>
  </el-container>
</template>
<script>
  import MyHeader from '../components/public/header/index.vue'
  export default {
    components: {
      MyHeader
    }
  }
</script>
