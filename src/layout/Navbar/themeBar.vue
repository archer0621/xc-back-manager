<template>
  <div class="right_menu-item">
    <div class="right_menu-item">
      <CompressOutlined class="icon-svg" @click="toggle" v-if="isFullscreen" />
      <ExpandOutlined class="icon-svg" @click="toggle" v-else />
    </div>
    <div class="right_menu-item">
      <github-outlined />
    </div>
    <div class="right_menu-item hidden-xs">
      <img v-if="userInfo.userpic" class="user-head" src="@/assets/img/default_user.png" alt="" />
      <img v-else class="user-head" src="@/assets/img/default_user.png" alt="" />
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ userInfo.nickname }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/user">修改资料</router-link>
            </a-menu-item>
            <a-menu-item @click="logout">
              <LogoutOutlined />
              退出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useUserStoreHook } from '@/pinia/modules/user'

const userStore = useUserStoreHook()
const userInfo: any = userStore.roles
// 设置浏览器全屏显示
const { isFullscreen, toggle } = useFullscreen()

// 退出登陆
const logout = () => {
  userStore
    .logout()
    .then(() => {
      location.href = '/login'
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<style lang="less">
.right_menu-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 30px;
  margin: 0 6px;
  text-align: center;
  justify-content: center;
  transition: background-color 0.3s;
  .user-head {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
