import Vue from 'vue';

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  // stub
  let promoObj: any = {};
  if (type.endsWith('NOT_YET_IMPLEMENTED')) {
    Vue.prototype.$gtag.event('select_content', {
      'promotions': [
        {
          'id': 'abc123',
          'name': 'summer_promo'
        },
        {
          'id': 'xyz987',
          'name': 'spring savings'
        }
      ]
    });
  }
})
