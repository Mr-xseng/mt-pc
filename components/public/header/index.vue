<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-box/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TopBar from './topbar.vue'
import SearchBox from './searchBar'
export default {
  components: {
    TopBar,
    SearchBox
  }
}
</script>
<style lang="scss">
  @import "../../../assets/css/public/header/index.scss";
</style>
