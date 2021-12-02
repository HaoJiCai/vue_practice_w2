import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.23/vue.esm-browser.js";

const productsApp = {
  data() {
    return {
      api: {
        baseURL: "https://vue3-course-api.hexschool.io/v2/api", // 預設宣告 API URL
        api_path: "jimmycai", // 預設宣告 api_path 
        api_checkedLoginStatus: "/user/check", // 宣告 Check Login API
        api_getProducts: "/admin/products" // 宣告 Get Admin Products API
      },
      products: [],
      productDetail: {},
      isTemplateLoading: false
    }
  },
  methods: {
    // 檢查登入驗證
    checkedLoginStatus() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hasToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 取得名為 hasToken 的 cookie 
      axios.defaults.headers.common['Authorization'] = token; // 把 Token 加入到 Headers Authorization 裡

      // 串接 /user/check API
      axios.post(`${this.api.baseURL}${this.api.api_checkedLoginStatus}`).then(status =>{
        console.log(status);
        if (status.data.success){
          this.isTemplateLoading = true;
          this.getProductsData();
        };
      }).catch(err =>{
        alert(`
        登入逾時！！
        ${err}
        `);
        window.location = "../templates/manager_login.html";
      });
    },
    getProductsData() {
      axios.get(`${this.api.baseURL}/${this.api.api_path}${this.api.api_getProducts}`).then(res =>{
        if (res.data.success){
          this.products = res.data.products;
        };
      }).catch(err =>{
        alert(err);
      });
    },
    // 查看功能是否啟用
    switchEnabled(product) {
      product.is_enabled = !product.is_enabled;
    },
    // 查看產品詳情
    showProductDetail(product) {
      this.productDetail = product;
      //console.log(this.productDetail)
    }
  },
  created() {
    this.checkedLoginStatus();
  }
};

createApp(productsApp).mount('#app');