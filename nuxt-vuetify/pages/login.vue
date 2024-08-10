<template>
<v-container class="mt-16">
  <v-row align="center" justify="center" fill-height="fill-height">
    <v-col xs="12" sm="10" md="8" style="max-width: 500px;">
      <div class="text-h3 mb-12 text-primary text-center">{{ schoolName }}</div>
      <v-card class="elevation-8" light="light">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <div class="text-h4 text-center">Bienvenido a ARTypist</div>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-card-text v-if="hasToken">
          <div class="text-secondary mb-6">Intentando autenticar. Espere unos segundos...</div>
          <v-progress-circular class="mb-6" :size="64" color="primary" indeterminate="indeterminate" :width="1"></v-progress-circular>
        </v-card-text>

        <v-card-text v-else>
          <div class="mb-6">
            <template v-if="classrooms.length <= 1">
              Introduce tu usuario y contraseña
              </template>
            <template v-else>
              Selecciona tu grupo e introduce tu usuario y contraseña
            </template>
          </div>

          <v-form ref="loginForm" @submit.prevent="login">
            <v-select
              v-if="classrooms.length > 0"
              :items="classrooms"
              item-title="displayName"
              item-value="id"
              v-model="classroom"
              color="primary"
              variant="underlined"
              label="Selecciona tu grupo"
              :rules="[v => !!v || 'Es necesario seleccionar un grupo']"
              prepend-icon="mdi-account-group"
              required="required"
            ></v-select>
            <v-text-field
              v-model="user"
              autocomplete="username"
              label="Introduce tu nombre de usuario"
              placeholder="Usuario"
              color="primary"
              variant="underlined"
              :rules="[v => !!v || 'Es necesario introducir un nombre de usuario']"
              prepend-icon="mdi-account"
              type="text"
              required="required"
              autofocus="autofocus"
            ></v-text-field>

            <v-text-field
              v-model="password"
              autocomplete="current-password"
              label="Introduce tu contraseña"
              placeholder="Contraseña"
              color="primary"
              variant="underlined"
              prepend-icon="mdi-lock-open"
              :type="passwordVisible ? 'text' : 'password'"
              :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="passwordVisible = !passwordVisible">
              </v-text-field>

            <v-alert
              v-if="errorCode && errorCode.length > 0"
              color="amber-darken-1"
              icon="fa fa-exclamation-triangle"
              variant="tonal">

              <template v-if="errorCode === 'ACCESS_BLOCKED'">
                El acceso de tu usuario está bloqueado. Ponte en contacto con tu profesor para desbloquearlo.
              </template>
              <template v-else>
                Parece que el nombre de usuario o la contraseña no son correctos
              </template>
            </v-alert>
            <v-btn class="mt-6" block="block" type="submit" color="info">
                Entrar
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
const user = ref('')
const password = ref('')
const passwordVisible = ref (false)
const hasToken = ref(false)
const schoolName = ref('Demo School')
const errorCode= ref(null)
const classroom = ref(null)

const classrooms = [
  { displayName : 'My Classroom 1', id: 1},
  { displayName : 'My Classroom 2', id: 2},
  { displayName : 'My Classroom 3', id: 3},
]

const login = () => {
  console.log ("Click on login!")
}
</script>