# Install dependencies
- Run command `docker-compose build && docker-compose up`
- [http://localhost:3030/](http://localhost:3030) - Frontend VMS 

# Configuration
- `.env` API configuration file 
- `config.env` 

# Templates
- [Demo Core UI 2.0](https://coreui.io/demo/2.0/#main.html) - sample template
 
# Docs library:
- [Nuxt.js docs](https://nuxtjs.org) - Nuxt.js & Vue.js
- [vue-tables-2](https://www.npmjs.com/package/vue-tables-2) 
- [DOCS](https://matanya.gitbook.io/vue-tables-2/)   
- [Axios](https://axios.nuxtjs.org/) - HTTP client for the browser and node.js


# Apiary (mock data)
- [VMS API](https://vmsapi3.docs.apiary.io)
- [VMS tendr API](https://vmstendrapi.docs.apiary.io/)
- [Auth API](https://vmsauthapi.docs.apiary.io)

# Commands (only on Docker!)
- `npm run dev` - start project in development mode 
- `npm run build && npm run start` - build and start to production mode

# Other commands
- `npm run esling --fix` - run Vue linter and autofix
- `npm run cy:open` - open Cypress in browser
- `npm run cy:cli` - run all test in CLI mode
- `npm run kill:all` - run all node job
