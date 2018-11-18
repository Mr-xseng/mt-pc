<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24"><iSelect/></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><hot/></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">12</el-col>
    </el-row>
  </div>
</template>
<script>
import iSelect from '../components/changeCity/iseclect'
import Hot from '../components/changeCity/hot'
export default {
  // layout:'blank',
  components:{
    iSelect,
    Hot
  }
}
</script>
<style lang="css">

</style>

