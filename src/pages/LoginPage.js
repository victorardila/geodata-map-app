import React from 'react'
import Layout from '../components/auth/Layout'
import Login from '../components/auth/login/Login'
import Regain from '../components/auth/regain/Regain'
import Register from '../components/auth/register/Register'

function LoginPage({path}) {
  return (
    <Layout path={path}>
      <Login />
      {
        path === 'register' ? (
          <Register />
        ) : path === 'reset-password' ? (
          <Regain />
        ) : null
      }
    </Layout>
  )
}

export default LoginPage