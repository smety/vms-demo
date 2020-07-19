import Vue from 'vue'
import { ClientTable } from 'vue-tables-2'

Vue.use(
  ClientTable,
  {
    texts: {
      count:
        'Zobrazuji {from} z {to} do {count} záznamů|{count} záznamů|Jeden záznam',
      first: 'První',
      last: 'Poslední',
      filter: 'Filtrace:',
      filterPlaceholder: 'Vyhledejte ...',
      limit: 'Záznamů:',
      page: 'Stránka:',
      noResults: 'Žádná data nebyly nalezeny',
      filterBy: '{column}',
      loading: 'Načítám ...',
      defaultOption: 'Vybrat {column}',
      columns: 'Sloupce'
    }
  },
  false,
  'bootstrap4'
)
