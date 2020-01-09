import Vue from 'vue';

Vue.filter('ucfirst', value => value.charAt(0).toUpperCase() + value.slice(1));
Vue.filter('toPascalCase', value => value.match(/[a-z]+/gi)
  .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join(''));
Vue.filter('formatUSD', value => `$${parseInt(value).toFixed(2)}`);
