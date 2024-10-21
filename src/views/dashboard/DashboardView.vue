<template>
  <section class="home text-center" style="gap: 24px">
    <div class="row" style="margin-top: 54px">
      <div class="col text-center">
        <img alt="logo" src="../../assets/logo-noos.png" />
      </div>
    </div>
    <div class="row">
      <div class="col text-center" v-if="noosUser?.role">
        <strong class="fs-3">
          Todo esta listo para la mejor experiencia en nuestro sistema personalizado de interacción
          educativo online
        </strong>
      </div>
      <div class="col text-center" v-if="!noosUser?.role">
        <strong class="fs-3">
          Ya casi estas listo para vivir la mejor experiencia en nuestro sistema personalizado de
          interacción educativo online. Debes esperar que te asignen un rol.
        </strong>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardView",
  computed: {
    ...mapState(["noosUser"]),
  },
};
</script>
