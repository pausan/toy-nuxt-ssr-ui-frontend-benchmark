<template>
<n-grid :cols="3">
  <n-grid-item :offset="1" style="max-width: 500px;">
      <n-h1 style="text-align: center">
        <n-text type="info">
        {{ schoolName }}
        </n-text>
      </n-h1>

      <n-card class="elevation-8" title="Bienvenido a ARTypist" size="huge">

        <template v-if="hasToken">
          <div class="text-secondary mb-6">Intentando autenticar. Espere unos segundos...</div>
          <n-space justify="space-around">
            <n-spin size="large" />
          </n-space>
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

          <n-form ref="loginForm" :model="formState">
            <n-form-item label="Selecciona tu grupo">
              <n-select
                v-if="classrooms.length > 0"
                :items="classrooms"
                label-field="displayName"
                value-field="id"
                v-model="formState.classroom"
                color="primary"
                variant="underlined"
                label="Selecciona tu grupo"
                :rules="[v => !!v || 'Es necesario seleccionar un grupo']"
                prepend-icon="mdi-account-group"
                required="required"
              ></n-select>
            </n-form-item>

            <n-form-item label="Introduce tu nombre de usuario">
              <n-input
                v-model="formState.user"
                autocomplete="username"
                placeholder="Usuario"
                color="primary"
                variant="underlined"
                :rules="[v => !!v || 'Es necesario introducir un nombre de usuario']"
                prepend-icon="mdi-account"
                type="text"
                required="required"
                autofocus="autofocus"
              ></n-input>
            </n-form-item>

            <n-form-item label="Introduce tu contraseña">
              <n-input
                v-model="formState.password"
                autocomplete="current-password"
                placeholder="Contraseña"
                color="primary"
                variant="underlined"
                prepend-icon="mdi-lock-open"
                :type="passwordVisible ? 'text' : 'password'"
                :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="passwordVisible = !passwordVisible">
                </n-input>
            </n-form-item>

            <n-alert
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
            </n-alert>

            <n-button type="info">
                Entrar
            </n-button>

          </n-form>
        </template>
      </n-card>
  </n-grid-item>
</n-grid>
</template>

<script setup>
import {
  NConfigProvider,   NButton,   NSpace,   NA,   NAffix,   NAlert,   NAnchor,   NBackTop,   NAutoComplete,   NAvatar,   NAvatarGroup,   NAnchorLink,   NBadge,   NBlockquote,   NBreadcrumb,   NBreadcrumbItem,   NButtonGroup,   NCalendar,   NCascader,   NCheckbox,   NCheckboxGroup,   NCol,   NCollapse,   NCollapseItem,   NCollapseTransition,   NColorPicker,   NCountdown,   NCard,   NCarousel,   NCarouselItem,   NDataTable,   NDatePicker,   NDescriptions,   NDescriptionsItem,   NDialog,   NDialogProvider,   NDivider,   NDrawer,   NDropdown,   NDynamicInput,   NDynamicTags,   NForm,   NEl,   NEllipsis,   NEmpty,   NFormItem,   NFormItemCol,   NFormItemGi,   NFormItemGridItem,   NFormItemRow,   NGi,   NGlobalStyle,   NGradientText,   NGrid,   NGridItem,   NH1,   NHr,   NIcon,   NIconWrapper,   NImage,   NImageGroup,   NInput,   NInputGroup,   NInputGroupLabel,   NInputNumber,   NLayout,   NLayoutContent,   NLayoutFooter,   NLayoutHeader,   NLayoutSider,   NLi,   NList,   NListItem,   NLoadingBarProvider,   NLog,   NMention,   NMenu,   NMessageProvider,   NNotificationProvider,   NModal,   NNumberAnimation,   NOl,   NP,   NPageHeader,   NPagination,   NPopconfirm,   NPopover,   NPopselect,   NProgress,   NRadio,   NRadioButton,   NRadioGroup,   NRate,   NResult,   NScrollbar,   NSelect,   NSkeleton,   NSlider,   NSpin,   NStatistic,   NStep,   NSteps,   NSwitch,   NTabPane,   NTable,   NTag,   NText,   NTabs,   NThing,   NTime,   NTooltip,   NTimePicker,   NTimeline,   NTimelineItem,   NTransfer,   NTree,   NTreeSelect,   NUl,   NUpload,   NUploadDragger,   NWatermark,   NRow
} from 'naive-ui'

const passwordVisible = ref (false)
const hasToken = ref(false)
const schoolName = ref('Demo School')
const errorCode = ref(null)

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
