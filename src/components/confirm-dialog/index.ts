import ConfirmDialog from '@/components/confirm-dialog/confirm-dialog.vue'
import { App, VNode, h, render } from 'vue'
interface ConfirmOptions {
  title?: string,
  message?: VNode | (() => VNode),
  formData?: Record<string, unknown>,
  formItems?: Array<unknown>
}
const ConfirmPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$confirm = async (options: ConfirmOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        const container = document.createElement('div')
        // 可以在这里做一些自定义的操作，比如判断message是否是一个VNode,自定义表单内容
        const boxVNode = h(ConfirmDialog, {
          ...options,
          visible: true,
          isAppendToBody: false,
          onConfirm: (data) => { resolve(data); onClose() },
          onCancel: () => { reject(new Error('')); onClose() }
        })
        render(boxVNode, container)
        document.body.appendChild(container)
        const onClose = () => {
          // eslint-disable-next-line no-unused-expressions
          container.parentNode?.removeChild(container)
        }
      })
    }
  }
}
export default ConfirmPlugin
