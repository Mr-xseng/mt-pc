<template>
  <div class="page-index">
    <el-row>
      <el-col
        :span="5"
      >
        <home-menu/>
      </el-col>
      <el-col
        :span="19"
      >12</el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
      >
        24
      </el-col>
    </el-row>
  </div>
</template>

<script>
import homeMenu from '../components/index/menu'
export default {
  components: {
    homeMenu
  }
}
</script>
<style lang="scss">
  @import "../assets/css/index/index";
</style>
