<template>
  <a-form-model
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('loginForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapActions } from 'vuex';
// import cookies from '@/untils/cookie';

export default {
  data() {
    const emailRef = /^[\w-]+@[\w.-]+.com/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailRef.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的邮箱格式'));
    };
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: checkPass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    ...mapActions(['setUser']),
    submitForm(formName) {
      //   console.log(this.$axios.login(this.loginForm));
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .login(this.loginForm)
            .then((res) => {
              console.log(res.data.data);
              if (res.data.status === 'success') {
                // cookies.setCookie(res.data.data);
                this.setUser(res.data.data);
                console.log(this.$store.state.user);
                this.$router.push({
                  name: 'Home',
                });
              } else if (res.data.status === 'fail') {
                this.$message.error(res.data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message.error(error);
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
