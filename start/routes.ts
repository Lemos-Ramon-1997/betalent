import '../app/modules/user/routes/user_routes.js';
import '../app/modules/auth/routes/auth_routes.js';
import '../app/modules/gateway/routes/gateway_routes.js';
import '../app/modules/client/routes/client_routes.js';
import '../app/modules/product/routes/product_routes.js';

import router from '@adonisjs/core/services/router';

router.get('/', async () => {
  return {
    hello: 'world',
  };
});
