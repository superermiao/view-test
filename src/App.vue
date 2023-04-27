<template>
  <div id="nav">
    <button class="btn" @click="showVisible">点击出现组件弹窗</button>
    <button class="btn btn-primary" style="margin-left: 10px" @click="showFuncVisible">点击出现函数确认弹窗</button>
  </div>
  <confirm-dialog v-model:visible="visible" v-model:formData="form.formData" @confirm="confirmForm" :formItems="form.formItems"></confirm-dialog>
  <!-- <router-view/> -->
</template>
<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, h } from 'vue'

export default defineComponent({
  setup () {
    const instance = getCurrentInstance()
    const visible = ref(false)
    const form = reactive({
      formData: {
        name: 'chaozhou',
        age: 12
      },
      formItems: [
        {
          name: 'name',
          label: '名称'
        },
        {
          name: 'age',
          label: '年龄'
        }
      ]
    })
    const showVisible = () => {
      console.log('visible===', visible.value)
      visible.value = true
    }
    const confirm = instance.appContext.config.globalProperties.$confirm
    const showFuncVisible = () => {
      confirm({ title: '确定表单内容吗?', formData: form.formData, formItems: form.formItems }).then((data) => {
        console.log('确定', data)
        alert('提交成功')
      }).catch(() => {
        console.log('取消')
      })
    }
    const confirmForm = (data) => {
      console.log('data====', data)
      visible.value = false
      alert('提交成功')
    }
    return {
      visible,
      showVisible,
      form,
      confirmForm,
      showFuncVisible
    }
  }
})
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: var(--el-button-font-weight);
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid;
  border-color: #dcdfe6;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}
.btn-primary {
  color: #fff;
  border-color: #409eff;
  background-color: #409eff;
}
</style>
