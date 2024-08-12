<template>
<div class="container mx-auto w-2/5">
  <div class="mt-16">
    <div class="text-blue-600 mb-12 text-5xl text-center">
      {{ schoolName }}
    </div>
    <Card class="elevation-8" :class="{'p-card-light': true}">
      <template #title>
        <div class="text-3xl">Bienvenido a ARTypist</div>
      </template>

      <template #content>
        <div v-if="hasToken">
          <div class="text-secondary mb-6">Intentando autenticar. Espere unos segundos...</div>
          <ProgressSpinner class="mb-6" :style="{ width: '64px', height: '64px' }" strokeWidth="4" />
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

          <form @submit="login">
            <div class="mb-4 w-full flex items-center">
              <i class="pi pi-users mr-4"></i>
              <Select v-if="classrooms.length > 0" class="w-full" :options="classrooms" optionLabel="displayName" optionValue="id" v-model="classroom" placeholder="Selecciona tu grupo" />
            </div>
            <div class="mb-4 w-full flex items-center">
              <i class="pi pi-user mr-4"></i>
              <InputText v-model="user" class="w-full" autocomplete="username" label="Introduce tu nombre de usuario" placeholder="Usuario" />
            </div>
            <div class="mb-4 w-full flex items-center">
              <i class="pi pi-lock mr-4"></i>
              <Password v-model="password" class="w-full" autocomplete="current-password" label="Introduce tu contraseña" placeholder="Contraseña" toggleMask />
            </div>

            <div v-if="errorCode && errorCode.length > 0" class="mb-4 w-full flex items-center">
              <Message severity="warn">
                <template v-if="errorCode === 'ACCESS_BLOCKED'">
                  El acceso de tu usuario está bloqueado. Ponte en contacto con tu profesor para desbloquearlo.
                </template>
                <template v-else>
                  Parece que el nombre de usuario o la contraseña no son correctos
                </template>
              </Message>
            </div>

            <div class="w-full text-center">
              <Button class="justify-self-center" type="submit" label="Entrar" />
            </div>
          </form>
        </div>
      </template>
    </Card>
  </div>
</div>
</template>

<script setup>
const user = ref('')
const password = ref('')
const passwordVisible = ref (false)
const hasToken = ref(false)
const schoolName = ref('Demo School')
const errorCode= ref()
const classroom = ref()

const classrooms = [
  { displayName : 'My Classroom 1', id: 1},
  { displayName : 'My Classroom 2', id: 2},
  { displayName : 'My Classroom 3', id: 3},
]

const login = () => {
  console.log ("Click on login!")
}
</script>