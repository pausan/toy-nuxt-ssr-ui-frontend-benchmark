<template>
  <el-container class="mt-16">
    <el-row :gutter="20" align="middle" justify="center">
      <el-col :xs="24" :sm="20" :md="16" style="max-width: 500px;">
        <div class="text-h3 mb-12 text-primary text-center">{{ schoolName }}</div>
        <el-card class="elevation-8">
            <div class="card-header">
              <div class="text-h4 text-center">Bienvenido a ARTypist</div>
            </div>

          <el-divider />

          <div v-if="hasToken">
            <div class="text-secondary mb-6">Intentando autenticar. Espere unos segundos...</div>
            <el-progress :duration="5" :stroke-width="2" color="primary" :text-inside="true" :indeterminate="true"></el-progress>
            <el-progress
      :percentage="100"
      :indeterminate="true"
      :show-text="false"
      :duration="5"
    />
          </div>

          <div v-else>
            <div class="mb-6">
              <template v-if="classrooms.length <= 1">
                Introduce tu usuario y contraseña
              </template>
              <template v-else>
                Selecciona tu grupo e introduce tu usuario y contraseña
              </template>
            </div>

            <el-form ref="loginForm" @submit.prevent="login">
              <el-select
                v-if="classrooms.length > 0"
                v-model="classroom"
                :placeholder="'Selecciona tu grupo'"
                :rules="[{ required: true, message: 'Es necesario seleccionar un grupo' }]"
                :prepend="['mdi-account-group']"
              >
                <el-option
                  v-for="classroom in classrooms"
                  :key="classroom.id"
                  :label="classroom.displayName"
                  :value="classroom.id"
                ></el-option>
              </el-select>
              <el-input
                v-model="user"
                :autocomplete="'username'"
                :placeholder="'Usuario'"
                :rules="[{ required: true, message: 'Es necesario introducir un nombre de usuario' }]"
                :prepend="['mdi-account']"
                :type="'text'"
                :autofocus="true"
              ></el-input>

              <el-input
                v-model="password"
                :autocomplete="'current-password'"
                :placeholder="'Contraseña'"
                :prepend="['mdi-lock-open']"
                :type="passwordVisible ? 'text' : 'password'"
                @click:append-inner="passwordVisible = !passwordVisible"
                :append="[{ inner: true, icon: passwordVisible ? 'mdi-eye' : 'mdi-eye-off' }]"
              ></el-input>

              <el-alert
                v-if="errorCode && errorCode.length > 0"
                :title="errorCode === 'ACCESS_BLOCKED' ? 'El acceso de tu usuario está bloqueado. Ponte en contacto con tu profesor para desbloquearlo.' : 'Parece que el nombre de usuario o la contraseña no son correctos'"
                :type="'warning'"
                :closable="false"
                :show-icon="true"
                :center="true"
              ></el-alert>
              <el-button class="mt-6" block="block" type="primary" @click.native.prevent="login">
                Entrar
              </el-button>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';

const user = ref('');
const password = ref('');
const passwordVisible = ref(false);
const hasToken = ref(false);
const schoolName = ref('Demo School');
const errorCode = ref(null);
const classroom = ref(null);

const classrooms = [
  { displayName: 'My Classroom 1', id: 1 },
  { displayName: 'My Classroom 2', id: 2 },
  { displayName: 'My Classroom 3', id: 3 },
];

const login = () => {
  console.log('Click on login!');
};
</script>
