<template>
  <v-app-bar
    class="p-2"
    color="transperent"
    dense
    app
    clipped-left
    clipped-right
  >
    <div>
      <img src="@/assets/image/logo.png" />
    </div>
    <v-spacer />
    <div>
      <v-btn class="primary--text" text>News</v-btn>
      <v-btn class="primary--text" text><a href="#promo">Promos</a></v-btn>
      <v-btn class="primary--text" text><a href="#categories">Categories</a></v-btn>
      <v-btn class="primary--text" text>Browse</v-btn>
    </div>
    <v-spacer />
    <div>
      <v-card-text class="primary--text"
        >Welcome back,
        <b>{{
          authenticatedUser.firstName + ' ' + authenticatedUser.lastName
        }}</b>
        !
      </v-card-text>
    </div>
    <div>
      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn id="header-icon" v-on="on" class="mr-1" dark icon>
            <v-avatar size="40">
              <img alt="Profile Picture" :src="authenticatedUser.image" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <!---User info -->
          <v-list-item>
            <v-list-item-avatar>
              <img alt="Profile Picture" :src="authenticatedUser.image" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title color="primary">{{
                this.authenticatedUser.firstName +
                ' ' +
                this.authenticatedUser.lastName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!---End User info -->
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in userprofile"
            :key="i"
            @click="onClickHandler(item)"
          >
            <v-list-item-icon>
              <v-icon color="primary"> {{ item.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title color="primary">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
// Utilities
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'VerticalHeader',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    userprofile: [
      {
        icon: 'mdi-logout',
        title: 'Logout',
        to: '/',
      },
    ],
  }),

  computed: {
    ...mapState(['navbarColor', 'sidebarDrawer']),
    ...mapGetters(['authenticatedUser']),
  },

  methods: {
    ...mapActions(['signOut']),
    showhideLogo() {
      this.showLogo = !this.showLogo;
    },

    onClickHandler({ title, to }) {
      if (title === 'Logout') {
        this.signOut();
      }
      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
.v-application .theme--dark.white .theme--dark.v-btn.v-btn--icon {
  color: $font-color !important;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined),
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: $box-shadow;
}
.v-btn--icon.v-size--default .v-icon {
  width: 20px;
  font-size: 20px;
}
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>
