<template>
  <el-row
    :gutter="0"
    class="m-header">
    <el-col :span="5">
      <head-geo/>
    </el-col>
    <el-col :span="5">
      <head-user/>
    </el-col>
    <el-col :span="14">
      <nav-bar/>
    </el-col>
  </el-row>
</template>
<script>
import HeadGeo from './geo'
import HeadUser from './user'
import NavBar from './nav'
export default {
  components: {
    HeadGeo,
    HeadUser,
    NavBar
  }
}
</script>
<style lang="scss">
  @import "../../../assets/css/public/layout.scss";
  @import "../../../assets/css/public/header/index.scss";
</style>
