<div class="container mt-16 text-center">
  <div class="row justify-content-center">
    <div class="col-align-self-center col-sm-12 col-md-10 col-lg-8" style="max-width: 500px;">
      <div class="fs-1 mb-12 text-primary text-center" style="margin-top: 100px">
        {{ schoolName }}
      </div>
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="fs-2 text-center">Bienvenido a ARTypist</div>
          </div>

          <div class="card-text" v-if="hasToken">
            <div class="text-secondary mt-4">Intentando autenticar. Espere unos segundos...</div>

            <div class="spinner-border mt-4" style="width: 64px; height: 64px;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="card-text" v-else>
            <div class="mb-6">
              <template v-if="classrooms.length <= 1">
                Introduce tu usuario y contraseña
                </template>
              <template v-else>
                Selecciona tu grupo e introduce tu usuario y contraseña
              </template>
            </div>

            <form ref="loginForm" @submit.prevent="login">
              <div class="form-floating mt-4 mb-4">
                <select id="myclass" v-if="classrooms.length > 0" class="form-select mb-4" v-model="classroom">
                  <template v-for="cls in classrooms">
                    <option :value="cls.id">{{ cls.displayName }}</option>
                  </template>
                </select>
                <label for="myclass">Selecciona tu grupo</label>
              </div>

              <div class="form-floating mb-4">
                <input type="text" class="form-control" v-model="user" autocomplete="username" autofocus>
                <label for="myclass">Introduce tu nombre de usuario</label>
              </div>

              <div class="input-group mb-3">
                <div class="form-floating">
                  <input
                    class="form-control"
                    name="mypass"
                    v-model="password"
                    autocomplete="current-password"
                    autofocus
                    :type="passwordVisible ? 'text' : 'password'"
                    required
                    />
                  <label for="mypass">Introduce tu contraseña</label>
                </div>
                <span class="input-group-text">
                  <i :class="passwordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'"
                      @click="passwordVisible = !passwordVisible"
                    />
                </span>
              </div>

              <div
                class="alert alert-warning"
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
              </div>

              <button class="btn btn-primary mt-6" type="submit" color="primary">
                  Entrar
              </button >

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>