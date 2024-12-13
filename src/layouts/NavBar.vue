<template>
  <div class="nav-bar">
    <i :class="folderIcon" @click="handleClick" @keydown="handleClick"></i>

    <div class="nav-bar__menu" @click="handleLogin" @keydown="handleLogin">
      <el-avatar
        class="nav-bar__menu__avatar"
        :size="30"
        :src="circleUrl"
      ></el-avatar>
    </div>

    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账户">
            <el-input v-model="form.username" type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import avatarDefault from '@/assets/avatar.png';
import avatarAdmin from '@/assets/favicon-32x32.png';

export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  name: 'NavBar',
  data() {
    const isAdmin = localStorage.getItem('role') === 'admingallup';
    return {
      isAdmin,
      circleUrl: isAdmin ? avatarAdmin : avatarDefault,
      dialogVisible: false,
      form: {},
    };
  },
  computed: {
    folderIcon() {
      return this.isCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
  },
  methods: {
    handleClick() {
      this.$emit('changeCollapsed');
    },
    handleLogin() {
      console.log('Login');
      if (this.isAdmin) {
        return;
      }
      this.dialogVisible = true;
    },
    handleSubmit() {
      console.log('submit', this.form);
      const { username, password } = this.form;
      if (`${username}${password}` !== 'admingallup') {
        this.$message.error('用户名或密码错误');
        return false;
      }

      localStorage.setItem('role', `${username}${password}`);
      this.circleUrl = avatarAdmin;
      window.location.reload();

      return true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        // eslint-disable-next-line no-unused-vars
        .then((_) => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2c3e50;
  color: white;

  > i {
    cursor: pointer;
  }

  &__menu {
    // align-self: flex-end;
    align-items: flex-end;
    position: relative;
    box-sizing: border-box;
    padding: 0 12px;

    &__avatar {
      cursor: pointer;
    }
  }
}
</style>
