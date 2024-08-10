<template>
<div class="grid grid-cols-3 content-center mt-32">
  <div class="col-start-2 text-center">
    <div class="text-h3 mb-12 text-primary text-center">{{ schoolName }}</div>
    <u-card class="elevation-8" light="light">
      <template #header>
        <div class="text-4xl text-center">Bienvenido a ARTypist</div>
      </template>

      <template v-if="hasToken">
        <div class="text-secondary mb-6">Intentando autenticar. Espere unos segundos...</div>
        <u-progress class="mb-6" size="lg" animation="carousel" />
      </template>

      <template v-else>
        <div class="mb-6">
          <template v-if="classrooms.length <= 1">
            Introduce tu usuario y contraseña
            </template>
          <template v-else>
            Selecciona tu grupo e introduce tu usuario y contraseña
          </template>
        </div>

        <u-form ref="loginForm" :state="formState" @submit.prevent="login">
          <u-form-group label="Selecciona tu grupo">
            <u-select
              class="mb-4"
              size="lg"
              v-if="classrooms.length > 0"
              v-model="formState.classroom"
              :options="classrooms"
              option-attribute="displayName"
              value-attribute="id"
              color="primary"
              :rules="[v => !!v || 'Es necesario seleccionar un grupo']"
              required="required"
              icon="i-mdi-account-group"
            ></u-select>
          </u-form-group>

          <u-form-group label="Introduce tu nombre de usuario">
            <u-input
              class="mb-4"
              size="lg"
              v-model="formState.user"
              autocomplete="username"
              placeholder="Usuario"
              color="primary"
              :rules="[v => !!v || 'Es necesario introducir un nombre de usuario']"
              icon="mdi-account"
              type="text"
              required="required"
              autofocus="autofocus"
            ></u-input>
          </u-form-group>

          <u-form-group label="Introduce tu contraseña">
          <u-input
            class="mb-4"
              size="lg"
            v-model="formState.password"
            autocomplete="current-password"
            label="Introduce tu contraseña"
            placeholder="Contraseña"
            color="primary"
            icon="mdi-lock-open"
            :type="passwordVisible ? 'text' : 'password'"
            :append-inner-icon="passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click:append-inner="passwordVisible = !passwordVisible">
            </u-input>
          </u-form-group>

          <u-alert
            v-if="errorCode && errorCode.length > 0"
            color="warning"
            icon="fa fa-exclamation-triangle"
            variant="tonal">

            <template v-if="errorCode === 'ACCESS_BLOCKED'">
              El acceso de tu usuario está bloqueado. Ponte en contacto con tu profesor para desbloquearlo.
            </template>
            <template v-else>
              Parece que el nombre de usuario o la contraseña no son correctos
            </template>
          </u-alert>
          <u-button class="mt-6" type="submit">
            Entrar
          </u-button>

        </u-form>
      </template>
    </u-card>
  </div>
</div>
</template>

<script setup>
const passwordVisible = ref (false)
const hasToken = ref(false)
const schoolName = ref('Demo School')
const errorCode= ref(false)

const formState = reactive( {
  user: '',
  password: '',
  classroom: undefined
})

const classrooms = [
  { displayName : 'My Classroom 1', id: 1},
  { displayName : 'My Classroom 2', id: 2},
  { displayName : 'My Classroom 3', id: 3},
]

const login = () => {
  console.log ("Click on login!")
}
</script>