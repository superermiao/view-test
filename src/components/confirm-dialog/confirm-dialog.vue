<template>
  <teleport to="body" :disabled="!isAppendToBody">
    <div v-if="visible" class="popup-background">
      <div class="popup-container">
        <div class="popup-header">
          <h3>{{ title }}</h3>
          <button @click="handleCancel">X</button>
        </div>
        <div class="popup-content">
          <slot v-if="$slots.default" name="default"></slot>
          <!-- form表单也可以写成一个组件 -->
          <form v-else>
            <div v-for="item in formItems" :key="item.name">
              <label>{{ item.label }}</label>
              <!-- 可以通过type区分用什么组件，input, select等等 -->
              <input v-model="formValue[item.name]">
            </div>
          </form>
        </div>
        <div class="popup-footer">
          <slot v-if="$slots.footer" name="footer"></slot>
          <span v-else>
            <button class="btn" @click="handleCancel">取消</button>
            <button class="btn btn-primary" @click="handleConfirm">确定</button>
          </span>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'ConfirmDialog',
  // 可以做更多的样式处理，这里暂时只做简单的弹窗事件
  props: {
    title: {
      type: String,
      default: '提示'
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    isAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  emits: ['confirm', 'cancel', 'update:formData', 'update:visible'],
  setup (props, { emit }) {
    const formValue = computed({
      get: () => props.formData,
      set: (val) => {
        emit('update:formData', val)
      }
    })
    const handleConfirm = () => {
      emit('confirm', formValue.value)
    }
    const handleCancel = () => {
      emit('update:visible', false)
      emit('cancel')
    }
    return {
      formValue,
      handleConfirm,
      handleCancel
    }
  }
})
</script>
<style scoped>
.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  width: 568px;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

.popup-header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
}

.popup-header h2 {
  margin: 0;
}

.popup-header button {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.popup-content {
  padding: 20px;
}
.popup-footer {
  padding: 12px;
  text-align: right;
}
.btn-primary {
  margin-left: 8px;
}
</style>
