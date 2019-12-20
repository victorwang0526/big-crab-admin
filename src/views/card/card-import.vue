<template>
  <div class="app-container">
    <div class="search-container">
      <el-form method="post">
        <el-form-item>
          <input type="file" ref="file" @change="handleFileUpload()" style="width: 200px;"/>
        </el-form-item>
        <el-button type="primary" @click="importCards()">导入</el-button>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { importCards } from '@/api/cards'

@Component({
  name: 'card-import'
})
export default class extends Vue {
  file: any;

  handleFileUpload() {
    const f: any = this.$refs.file
    this.file = f.files[0]
  }

  importCards() {
    if (!this.file) {
      this.$message({
        message: '请选择导入文件',
        type: 'error',
        showClose: true
      })
      return
    }
    let formData = new FormData()
    formData.append('file', this.file)
    importCards(formData).then(() => {
      this.$message({
        message: '导入成功',
        type: 'success',
        showClose: true
      })
    }).catch(() => {
      this.$message({
        message: '导入失败',
        type: 'error',
        showClose: true
      })
    })
  }
}
</script>
