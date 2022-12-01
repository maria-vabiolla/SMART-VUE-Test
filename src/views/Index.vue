<template>
  <v-breadcrumbs class="container">
    <v-row class="d-flex">
      <v-row style="overflow-y: scroll; max-height: calc(100vh - 8rem)">
        <v-col cols="12" xl="12" lg="10" md="10" sm="6">
          <v-col cols="2" offset="3" align="center" id="promo">
            <h2 class="secondary--text">Check out<br>our newest</h2>
            <h1 class="secondary--text"><b>Promos</b></h1>
          </v-col>
          <v-col cols="6" offset="1" align="center">
          <v-row width="100%">
            <v-hover v-slot="{ hover }">
              <v-col cols="6">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
              >
                <v-img
                  :aspect-ratio="13/5"
                  src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h4 white--text"
                      style="height: 35%;"
                    >
                      50% off Sale for selected items
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
              </v-col>
            </v-hover>
            <v-hover v-slot="{ hover }">
              <v-col cols="6">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
              >
                <v-img
                  :aspect-ratio="13/5"
                  src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h4 white--text"
                      style="height: 35%;"
                    >
                      50% off Sale for selected items
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
              </v-col>
            </v-hover>
            <v-hover v-slot="{ hover }">
              <v-col cols="6" offset="3">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
              >
                <v-img
                  :aspect-ratio="13/5"
                  src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h4 white--text"
                      style="height: 35%;"
                    >
                      50% off Sale for selected items
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
              </v-col>
            </v-hover>
          </v-row>
        </v-col>
          <v-col cols="2" offset="3" align="center" id="categories">
            <h2 class="primary--text">Look through our<br> Categories</h2>
          </v-col>
          <v-col cols="7">
            <div style="position: relative">
              <v-tabs
                v-model="tab"
                icons-and-text
                background-color="white"
                center-active
                @change="refresh"
              >
                <v-tab
                  v-for="categoryItem in categoryItems"
                  :key="categoryItem.text"
                >
                  <v-icon>{{ categoryItem.icon }}</v-icon>
                  <v-card-text flat> {{ categoryItem.text }} </v-card-text>
                </v-tab>
              </v-tabs>
            </div>
          </v-col>
          <v-row class="mt-3">
            <v-col v-for="(item, i) in items" :key="i" cols="2">
              <v-card
                elevation="1"
                class="mx-2 my-2"
                width="300"
                height="300"
                @click="buyItem(item)"
              >
                <v-avatar class="ma-3" size="125" tile>
                  <image-view
                    :imageUrl="item.thumbnail"
                    :imageHeight="150"
                  ></image-view>
                </v-avatar>

                <v-card-title> {{ item.title }}</v-card-title>

                <v-card-text>
                  <div class="my-4 text-subtitle-1">
                    {{ formatCurrency(item.price * 15711) }}
                  </div>
                  <!-- Currency change from USD to Indonesia-->
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="item.rating"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                      {{ item.rating }}
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <div class="slidein" :class="open ? 'open' : ''" v-if="count===1">
      <v-row>
        <v-btn icon @click="toggle(false)"><v-icon>mdi-close</v-icon></v-btn>
        <v-spacer />
        <v-icon>mdi-cart</v-icon>
        <v-card-title>Shopping Cart</v-card-title>
      </v-row>
      <v-form class="px-4 pt-4" ref="form" @submit.prevent="save()">
        <v-card
          class="mx-auto mb-4"
          v-for="(item, index) in cartProducts"
          :key="index"
          outlined
          color="primary"
        >
          <v-row>
            <!-- <v-col cols="2">
                <image-view :imageUrl="item.thumbnail" :imageHeight="100"></image-view>
              </v-col> 
              In open api doesn't return photo in shopping cart
              -->
            <v-col cols="6">
              <v-card-text> {{ item.title }}</v-card-text>
              <v-card-subtitle>
                {{ formatCurrency(item.price * 15711) }}</v-card-subtitle
              >
            </v-col>
            <v-col cols="6" class="justify-end align-self-right">
              <v-row>
                <v-card-actions class="justify-end align-self-right">
                  <v-btn
                    v-if="item.quantity > 1"
                    fab
                    icon
                    rounded
                    x-small
                    class="mt-3"
                    @click="changeQuantity(item, false)"
                  >
                    <v-icon> mdi-minus</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" fab dark color="black" small rounded
                    >{{ item.quantity }}
                  </v-btn>
                  <v-btn
                    class="mt-3"
                    fab
                    rounded
                    x-small
                    icon
                    @click="changeQuantity(item, true)"
                  >
                    <v-icon> mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    class="mt-3"
                    fab
                    rounded
                    icon
                    x-small
                    color="error"
                    @click="promptDeleteItem(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-row>
              <v-row>
                <v-card-subtitle
                  ><b>
                    {{ formatCurrency(item.price * 15711 * item.quantity) }}
                  </b>
                </v-card-subtitle>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-spacer/>
          <v-btn class="mt-4" outlined small @click="toggle(true)">Check out items <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
      </v-form>
    </div>
    <div class="slidein" :class="open ? 'open' : ''" v-else-if="count===2">
      <v-row>
        <v-btn icon @click="toggle(false)"><v-icon>mdi-close</v-icon></v-btn>
        <v-spacer />
        <v-icon>mdi-cart</v-icon>
        <v-card-title>Shopping Cart <v-icon>mdi-chevron-right</v-icon> Shipping</v-card-title>
      </v-row>
      <v-form class="px-4 pt-4" ref="form" @submit.prevent="save()">
        <v-row class="mt-4 ml-2">
          <v-icon>mdi-account-box</v-icon><v-card-subtitle>Contact Information</v-card-subtitle>
        </v-row>
        <v-text-field
          label="Full Name"
          class="mt-3 custom-validation text--white"
          color="white"
          solo
          rounded
        />
        <v-text-field
          label="Phone Number"
          class="custom-validation text--white"
          color="white"
          solo
          rounded
        />
        <v-row class="mt-4 ml-2">
          <v-icon>mdi-map-marker</v-icon><v-card-subtitle>Address</v-card-subtitle>
        </v-row>
        <v-text-field
          label="Address 1"
          class="mt-3 custom-validation"
          color="white"
          solo
          rounded
        />
        <v-text-field
          label="Address 2"
          class="custom-validation"
          color="white"
          solo
          rounded
        />
        <v-row>
          <v-col cols="8">
            <v-select
              :items="countries"
              label="Country"
              class="custom-validation"
              color="white"
              solo
              rounded
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
            label="Post Code"
            class="custom-validation"
            color="white"
            solo
            rounded
          />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-btn class="mt-4" outlined small @click="toggle(true)">Go To Payment <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
      </v-form>
    </div>
    <div class="slidein" :class="open ? 'open' : ''" v-else-if="count===3">
      <v-row>
        <v-btn icon @click="toggle(false)"><v-icon>mdi-close</v-icon></v-btn>
        <v-spacer />
        <v-icon>mdi-cart</v-icon>
        <v-card-title>Shopping Cart <v-icon>mdi-chevron-right</v-icon> Shipping <v-icon>mdi-chevron-right</v-icon> Payment</v-card-title>
      </v-row>
      <v-form class="px-4 pt-4" ref="form" @submit.prevent="save()">
        <v-row class="mt-4 ml-2">
          <v-card-subtitle><b>Got discount code?</b></v-card-subtitle>
        </v-row>
        <v-text-field
          label="Discount Code"
          class="mt-3 custom-validation text--white"
          color="white"
          solo
          rounded
        />
        <v-row class="mt-4">
          <v-card-subtitle><b>Summary</b></v-card-subtitle>
        </v-row>
        <v-row>
          <v-row v-for="(item, i) in cartProducts" :key="i" class="my-0">
            <v-col cols="4">
            <v-card-text>{{item.title}}</v-card-text>
            </v-col>
            <v-col cols="4">
            <v-card-text> x{{item.quantity}}</v-card-text>
            </v-col>
            <v-col cols="4">
            <v-card-text>{{formatCurrency(item.quantity*item.price*15711)}}</v-card-text>
            </v-col>
          </v-row>
        </v-row>
        <v-divider style="border-color:black;"></v-divider>
        <v-row>
          <v-col cols="6" class="text-end">
            <v-card-text><b>Total</b></v-card-text>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-card-text><b>{{formatCurrency((totalTransaction)*15711)}}</b></v-card-text>
          </v-col>
        </v-row>
        <v-row class="mt-4 ml-2">
          <v-icon>mdi-map-marker</v-icon><v-card-subtitle>Payment Information</v-card-subtitle>
        </v-row>
        <v-text-field
          label="E-mail"
          class="mt-3 custom-validation"
          color="white"
          solo
          rounded
        />
        <v-text-field
          label="Card Number"
          class="custom-validation"
          color="white"
          solo
          rounded
        />
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="MM/YY"
              class="custom-validation"
              color="white"
              solo
              rounded
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="CVC"
              class="custom-validation"
              color="white"
              solo
              rounded
            />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-btn class="mt-4" outlined small @click="toggle(true)">Place Order <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
      </v-form>
    </div>
    <div class="slidein" :class="open ? 'open' : ''" v-else-if="count===4">
      <v-row>
        <v-btn icon @click="toggle(false)"><v-icon>mdi-close</v-icon></v-btn>
        <v-spacer />
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center align-center justify-center">
          <img src="@/assets/image/cart.png" />
          <h1 class="text-center align-center justify-center"><b>Thank you<br>for your purchase!</b></h1>
        </v-col>
      </v-row>
    </div>
    <v-fab-transition>
      <v-btn
        color="primary"
        absolute
        bottom
        right
        fab
        class="mb-15"
        @click="toggle(true)"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-fab-transition>
    <DetailProductDialog ref="openDialog" :formatCurrency="formatCurrency" />
  </v-breadcrumbs>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import BaseService from '@/services/Base';
import DetailProductDialog from '@/views/DetailProductDialog.vue';
import ImageView from '@/components/atom/ImageView.vue';

export default Vue.extend({
  name: 'IndexManager',
  components: { DetailProductDialog, ImageView },
  data: () => ({
    items: [] as any[],
    categoryItems: [
      { text: 'All', icon: 'mdi-view-list' },
      { text: 'Smartphones', icon: 'mdi-cellphone' },
      { text: 'Laptops', icon: 'mdi-laptop' },
      { text: 'Fragrances', icon: 'mdi-cup-water' },
      { text: 'Skincare', icon: 'mdi-face-woman-shimmer' },
      { text: 'Groceries', icon: 'mdi-basket-check' },
      { text: 'Home-decoration', icon: 'mdi-home-heart' },
      { text: 'Furniture', icon: 'mdi-table-furniture' },
      { text: 'Tops', icon: 'mdi-tshirt-v' },
      { text: 'Womens-dresses', icon: 'mdi-hanger' },
      { text: 'Womens-shoes', icon: 'mdi-shoe-heel' },
      { text: 'Mens-shirts', icon: 'mdi-tshirt-v' },
      { text: 'Mens-shoes', icon: 'mdi-shoe-sneaker' },
      { text: 'Watches', icon: 'mdi-watch' },
      { text: 'Womens-bags', icon: 'mdi-bag-checked' },
      { text: 'Womens-jewellery', icon: 'mdi-diamond-stone' },
      { text: 'Sunglasses', icon: 'mdi-sunglasses' },
      { text: 'Automotive', icon: 'mdi-toolbox' },
      { text: 'Motorcycle', icon: 'mdi-motorbike' },
      { text: 'Lighting', icon: 'mdi-lightbulb' },
    ],
    tab: 0,
    cartsId: null,
    cartProducts: [] as any,
    open: false,
    count: 0,
    countries: ["Indonesia","Singapore","China","Korea","Vietnam"],
    totalTransaction: 0,
  }),

  async created() {
    this.setLoading(true);
    await this.refresh();
    await this.fetchCartsID();
    await this.fecthOneCarts();
    this.setLoading(false);
  },
  computed: {
    ...mapGetters(['authenticatedUser']),
  },

  methods: {
    ...mapActions(['setLoading', 'setSnackbar']),

    async refresh() {
      try {
        await this.request('limit=100');
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
    async request(params) {
      this.setLoading(true);
      const service = new BaseService('/products');
      const res = await service.get(params);
      switch (this.tab) {
        case 1:
          this.items = res.products.filter(
            (item) => item.category === 'smartphones'
          );
          break;
        case 2:
          this.items = res.products.filter(
            (item) => item.category === 'laptops'
          );
          break;
        case 3:
          this.items = res.products.filter(
            (item) => item.category === 'fragrances'
          );
          break;
        case 4:
          this.items = res.products.filter(
            (item) => item.category === 'skincare'
          );
          break;
        case 5:
          this.items = res.products.filter(
            (item) => item.category === 'groceries'
          );
          break;
        case 6:
          this.items = res.products.filter(
            (item) => item.category === 'home-decoration'
          );
          break;
        case 7:
          this.items = res.products.filter(
            (item) => item.category === 'furniture'
          );
          break;
        case 8:
          this.items = res.products.filter((item) => item.category === 'tops');
          break;
        case 9:
          this.items = res.products.filter(
            (item) => item.category === 'womens-dresses'
          );
          break;
        case 10:
          this.items = res.products.filter(
            (item) => item.category === 'womens-shoes'
          );
          break;
        case 11:
          this.items = res.products.filter(
            (item) => item.category === 'mens-shirts'
          );
          break;
        case 12:
          this.items = res.products.filter(
            (item) => item.category === 'mens-shoes'
          );
          break;
        case 13:
          this.items = res.products.filter(
            (item) =>
              item.category === 'mens-watches' ||
              item.category === 'womens-watches'
          );
          break;
        case 14:
          this.items = res.products.filter(
            (item) => item.category === 'womens-bags'
          );
          break;
        case 15:
          this.items = res.products.filter(
            (item) => item.category === 'womens-jewellery'
          );
          break;
        case 16:
          this.items = res.products.filter(
            (item) => item.category === 'sunglasses'
          );
          break;
        case 17:
          this.items = res.products.filter(
            (item) => item.category === 'automotive'
          );
          break;
        case 18:
          this.items = res.products.filter(
            (item) => item.category === 'motorcycle'
          );
          break;
        case 19:
          this.items = res.products.filter(
            (item) => item.category === 'lighting'
          );
          break;
        default:
          this.items = res.products;
          break;
      }
      this.$forceUpdate();
    },
    async fetchCartsID() {
      const service = new BaseService(
        `/carts/user/${this.authenticatedUser.id}`
      );
      const res = await service.get('');
      this.cartsId = res.carts[0].id;
    },

    async buyItem(item) {
      const { openDialog }: any = this.$refs;
      openDialog.startForm(item, this.cartsId);
      this.$forceUpdate();
    },

    async fecthOneCarts() {
      const service = new BaseService(`/carts/${this.cartsId}`);
      const res = await service.get('');
      this.cartProducts = res.products;
      this.totalTransaction = res.total;
    },

    toggle(isOpen) {
      if(isOpen === true){
        this.count = this.count + 1;
        this.open = true;
      } else {
        this.open = !this.open;
        this.count = 0;
      }
    },

    async changeQuantity(item, isPlus) {
      try {
        const payload = {
          id: item.id,
          quantity: isPlus ? item.quantity + 1 : item.quantity - 1,
        };
        const service = new BaseService('/carts');
        await service.put(this.cartsId, payload);
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

    formatCurrency(value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumSignificantDigits: 1,
      });
      return formatter.format(value);
    },
  },
});
</script>

<style>
.slidein {
  width: 600px;
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: -100%;
  background: #2e99cc;
  height: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
  overflow: auto;
}

/* Set positioning back to 0 when toggled opened */
.open {
  right: 0;
}

/* add a close button in case toggle button is hidden on smaller screens */
.close-btn {
  border: none;
  font-weight: bold;
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
</style>
