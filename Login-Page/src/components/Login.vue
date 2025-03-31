<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
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
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/login`, {
              email: this.email,
              password: this.password
          });
          // Handle successful login (e.g., store token, redirect)
          console.log('Login successful:', response.data);
          // Example: this.$router.push('/dashboard');
        } catch (err) {
          this.error = err.response?.data?.message || 'Login failed';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #cccccc;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>