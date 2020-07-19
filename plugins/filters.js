import Vue from 'vue'
import moment from 'moment'

export function dateFormat(value) {
  return moment(value).format('d.M.Y v h:mm')
}

Vue.filter('dateFormat', dateFormat)
