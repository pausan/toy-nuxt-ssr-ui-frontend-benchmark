<template>
<div class="q-mt-xl">
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-3">
      <div class="text-h3 q-mb-lg text-primary text-center">
        {{ schoolName }}
      </div>

      <q-card class="elevation-8" light="light">
        <q-list>
          <q-item>
            <q-item-section>
              <div class="text-h4 text-center">Bienvenido a ARTypist</div>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-section v-if="hasToken">
          <div class="text-secondary q-mb-md">Intentando autenticar. Espere unos segundos...</div>
          <q-spinner class="q-mb-md" size="64px" color="primary" />
        </q-card-section>

        <q-card-section v-else>
          <div class="q-mb-md">
            <template v-if="classrooms.length <= 1">
              Introduce tu usuario y contraseña
            </template>
            <template v-else>
              Selecciona tu grupo e introduce tu usuario y contraseña
            </template>
          </div>

          <q-form ref="loginForm" @submit.prevent="login">
            <q-select
              v-if="classrooms.length > 0"
              :options="classrooms"
              option-label="displayName"
              option-value="id"
              v-model="classroom"
              color="primary"
              outlined
              label="Selecciona tu grupo"
              :rules="[v => !!v || 'Es necesario seleccionar un grupo']"
              required
            >
              <template v-slot:prepend>
                <q-icon :name="mdiAccountGroup" />
              </template>
          </q-select>

            <q-input
              v-model="user"
              autocomplete="username"
              label="Introduce tu nombre de usuario"
              placeholder="Usuario"
              color="primary"
              outlined
              :rules="[v => !!v || 'Es necesario introducir un nombre de usuario']"
              type="text"
              required
              autofocus
            >
              <template v-slot:prepend>
                <q-icon :name="mdiAccount" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              autocomplete="current-password"
              label="Introduce tu contraseña"
              placeholder="Contraseña"
              color="primary"
              outlined
              :type="passwordVisible ? 'text' : 'password'"
            >
              <template v-slot:prepend>
                <q-icon :name="mdiLockOpen" />
              </template>

              <template v-slot:append>
                <q-icon :name="passwordVisible ? mdiEye : mdiEyeOff" @click="passwordVisible = !passwordVisible" class="cursor-pointer" />
              </template>
            </q-input>

            <q-banner
              v-if="errorCode && errorCode.length > 0"
              class="q-mt-lg bg-amber-2 text-amber-9"
              icon="mdi-alert-circle"
            >
              <template v-if="errorCode === 'ACCESS_BLOCKED'">
                El acceso de tu usuario está bloqueado. Ponte en contacto con tu profesor para desbloquearlo.
              </template>
              <template v-else>
                Parece que el nombre de usuario o la contraseña no son correctos
              </template>
            </q-banner>

            <div class="text-center q-mt-md">
              <q-btn
                class="text-center"
                type="submit"
                color="info"
              >
                Entrar
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</div>
</template>

<script setup>
import { mdiLockOpen, mdiAccount, mdiAccountGroup, mdiEye, mdiEyeOff } from '@quasar/extras/mdi-v6'

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