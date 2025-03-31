<template>
  <div class="login-container">
    <h1 class="instagram-logo">STFU</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit" :disabled="loading" class="login-button">
        {{ loading ? 'Logging in...' : 'Log In' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="divider">
        <span>OR</span>
      </div>
      <div class="alternative-login">
        <a href="#" class="facebook-login">Log in with Facebook</a>
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
    </form>
    <div class="signup-section">
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: white;
  border: 1px solid #dbdbdb;
}

.instagram-logo {
  font-family: 'Instagram Sans Script', cursive;
  font-size: 40px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 9px 8px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  font-size: 12px;
}

.login-button {
  width: 100%;
  padding: 7px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 10px;
}

.login-button:disabled {
  background-color: #b2dffc;
}

.divider {
  position: relative;
  margin: 20px 0;
  text-align: center;
}

.divider span {
  background: white;
  padding: 0 10px;
  color: #8e8e8e;
  font-size: 13px;
  font-weight: 600;
}

.alternative-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
}

.facebook-login {
  color: #385185;
  font-weight: 600;
  text-decoration: none;
}

.forgot-password {
  color: #385185;
  text-decoration: none;
}

.signup-section {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dbdbdb;
  font-size: 14px;
}

.signup-section a {
  color: #0095f6;
  text-decoration: none;
  font-weight: 600;
}

.error {
  color: #ed4956;
  font-size: 14px;
  margin-top: 10px;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async handleLogin() {
  this.loading = true;
  this.error = '';
  try {
    const url = 'https://basic-login-page-using-vue-and-mongodb-atlas-o6j1.vercel.app'; // Hardcode for now
    console.log('Using API URL:', url);
    const response = await axios.post(`${url}/api/login`, {
      email: this.email,
      password: this.password
    });
    console.log('Login successful:', response.data);
  } catch (err) {
    console.error('Login error:', err);
    this.error = err.response?.data?.message || err.message || 'Login failed';
  } finally {
    this.loading = false;
  }
  }
  }
};
</script>

<style scoped>
.login-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; }
input { width: 100%; padding: 8px; }
button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; }
button:disabled { background-color: #cccccc; }
.error { color: red; margin-top: 10px; }
</style>