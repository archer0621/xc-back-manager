<template>
  <div class="login">
    <div class="login-container">
      <div class="login-content">
        <div class="login-title">学成归来后台管理系统</div>
        <div class="login-input">
          <a-form :model="formData">
            <a-form-item>
              <a-input placeholder="Username" size="large" v-model:value="formData.username">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input type="password" placeholder="Password" size="large" v-model:value="formData.password">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
            <a-form-item class="checkcode" label="请输入验证码" name="checkCode">
              <a-input v-model:value="formData.checkcode"></a-input>
              <img :src="img" height="32" width="138" @click="updateCode" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" block size="large" :disabled="formData.username === '' || formData.password === '' || formData.checkcode === ''" @click="loginSubmit">立即登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ref, reactive, onMounted, defineComponent, UnwrapRef } from 'vue'
import { getCheckCode } from '@/service/index'
import { querystringify } from '@/common/index'
import { message } from 'ant-design-vue'
import router from '@/router'
import { useUserStore } from '@/pinia/modules/user'
import { debounce } from '@/utils/common/index'

interface FormData {
  username: string
  password: string
  checkcode: string
  checkcodekey?: string
  authType: string
}

interface Usernamejson {
  username: Object
  grant_type: string
  client_secret: string
  client_id: string
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const userStore = useUserStore()
    const formData: UnwrapRef<FormData> = reactive({
      username: 'super',
      password: '111111',
      checkcode: '',
      authType: 'password',
    })
    const code = ref<string>('')
    const usernamejson: UnwrapRef<Usernamejson> = reactive({
      username: formData,
      grant_type: 'password',
      client_secret: 'XcWebApp',
      client_id: 'XcWebApp',
    })
    const img = ref<string>('')
    onMounted(async () => {
      updateCode()
    })
    // 点击刷新验证码
    async function updateCode() {
      const { data } = await getCheckCode()
      formData.checkcodekey = data.data.key
      img.value = data.data.aliasing
      code.value = data.data.code


      formData.checkcode = data.data.code

      
    }
    async function login() {
      if (code.value.toLowerCase() === formData.checkcode.toLowerCase()) {
        let formDataJson = JSON.stringify(formData)
        usernamejson.username = formDataJson
        let params = querystringify(usernamejson)
        if (params) {
          await userStore.login(params)
          message.success('登录成功')
          router.push('/index')
        } else {
          message.error('未知错误')
        }
      } else {
        message.error('验证码错误')
      }
    }
    let loginSubmit = debounce(login, 2000)
    return {
      formData,
      img,
      updateCode,
      loginSubmit,
    }
  },
})
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: site-mirror;
  animation-duration: 1s;
  .login-container {
    width: 35%;
    height: 50%;
    background: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    .login-content {
      .login-title {
        user-select: none;
        height: 300px;
        width: 100%;
        text-align: center;
        line-height: 300px;
        font-size: 48px;
        background-image: linear-gradient(rgb(16, 3, 56), rgb(132, 248, 246));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      .login-input {
        width: 100%;
        height: 600px;
        .checkcode {
          display: flex;
          justify-content: space-between;
          ::v-deep(.ant-form-item-label > label) {
            font-size: 20px;
          }
          .ant-form-item-control-input-content {
            display: flex;
            justify-content: space-between;
            overflow: hidden;

            .ant-input {
              width: 40%;
            }
            img {
              display: inline-block;
              margin: 0;
              padding: 0;
              margin-left: 60px;
              margin-top: -5px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
@keyframes site-mirror {
  from {
    transform: none;
  }
  to {
    transform: perspective(800px) rotateY(360deg);
  }
}
</style>
