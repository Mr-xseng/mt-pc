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
      ><home-life/></el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
      >
        <home-artistic/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import homeMenu from '../components/index/menu'
import homeLife from '../components/index/life'
import homeArtistic from '../components/index/artistic'
import axios from 'axios'
export default {
  components: {
    homeMenu,
    homeLife,
    homeArtistic
  }
}
</script>
<style lang="scss">
  @import "../assets/css/index/index";
</style>
/*根路径显示页面,公共面板为default*/
