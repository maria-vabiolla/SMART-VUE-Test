<template>
  <v-dialog
    v-model="isOpen"
    max-width="60rem"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="pb-4">
      <v-card-text class="mb-4 mt-6">
        <v-form class="px-4 pt-4" ref="form" @submit.prevent="save()">
          <v-card
            class="mx-auto mb-4"
            tile
          >
            <v-row>
                <v-col cols="6">
                <image-view :imageUrl="items.thumbnail" :imageHeight="250"></image-view>
                </v-col>
              <v-col cols="6">
                <v-card-title> {{ items.title }}</v-card-title>
                <v-card-text>
                  {{ formatCurrency((items.price)*15711) }}</v-card-text
                >
                <v-row
                    class="mx-0"
                    justify="end"
                >
                    <v-rating
                    :value="items.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                    {{ items.rating }}
                    </div>
                </v-row>
                  <v-btn
                    v-if="quantity > 1"
                    fab
                    icon
                    rounded
                    x-small
                    class="mt-3"
                    @click="changeQuantity(false)"
                  >
                    <v-icon> mdi-minus</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" fab dark color="black" small rounded
                    >{{ quantity }}
                  </v-btn>
                  <v-btn
                    class="mt-3"
                    fab
                    rounded
                    x-small
                    icon
                    @click="changeQuantity(true)"
                  >
                    <v-icon> mdi-plus</v-icon>
                  </v-btn>
                <v-card-text>{{ items.description }}</v-card-text>
              </v-col>
              
            </v-row>
          </v-card>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary"><!--Nothing happens because open api only have create new cart or update cart not add new item to carts-->
                <v-icon>mdi-cart</v-icon><v-card-text> Add to cart</v-card-text>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import BaseService from '@/services/Base';
import ImageView from '@/components/atom/ImageView.vue';

export default Vue.extend({
  name: 'DigitalDialog',
  props: ['formatCurrency'],
  components: { ImageView},
  data: () => ({
    isOpen: false,
    cartsId: '',
    items: [],
    service: new BaseService(),
    quantity: 1,
  }),

  async created() {
    this.setLoading(true);
    this.setLoading(false);
  },

  methods: {
    ...mapActions(['setLoading', 'setSnackbar']),

    async startForm(item, id) {
        this.isOpen = true;
        this.items = item;
        this.cartsId = id;
    },

    async changeQuantity(isPlus) {
      try {
        this.quantity =  isPlus ? this.quantity + 1 :this.quantity - 1,
        this.$forceUpdate();
      } catch (e) {
        this.setSnackbar({
          isVisible: true,
          message: e,
          color: 'error',
        });
      } finally {
        this.setLoading(false);
      }
    },

    // async save() {
    //   try {
    //     this.setLoading(true);
    //     const payload = {
    //     };
    //     this.setLoading(false);
    //   } catch (e) {
    //     this.setLoading(false);
    //     this.setSnackbar({
    //       isVisible: true,
    //       message: e,
    //       color: 'danger',
    //     });
    //   }
    // },
    validate() {
      return (
        this.$refs.form as Vue & {
          validate: () => boolean;
        }
      ).validate();
    },
  },
});
</script>
