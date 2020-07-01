import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { ModalView } from '../../generic/modal-view'

import Vue from 'vue'
import * as _ from 'lodash'

require('./cron-component.less')

@Component({
   components: {
      'modal-view': ModalView
   },
   name: 'cron-component',
   props: ['value', 'noTrim'],
   template: require('./cron-component.html')
})

class CronComponent extends Vue {
   $http: any

   noTrim: boolean
   fieldData: string = ''
   value: any
   cronPopover: boolean = false
   showCronModal: boolean = false
   warning: any = { show: false, message: '' }
   currentYear: any = new Date().getFullYear()

   second: any = { cronEvery: 'everySecond', specific: 1 }
   minute: any = { cronEvery: 'everyMinute', specific: 1 }
   hour: any = { cronEvery: 'everyHour', specific: 1 }
   day: any = { cronEvery: 'everyDay', specific: 1 }
   week: any = { cronEvery: 'everyWeek', specific: 1 }
   month: any = { cronEvery: 'everyMonth', specific: 1 }
   year: any = { cronEvery: 'everyYear', specific: 2020 }
   output: any = {
      second: '',
      minute: '',
      hour: '',
      day: '',
      month: '',
      week: '',
      year: '',
   }

   $refs: any = {
      valueDropdownSecond: {
         value: this.second.specific
      },
      valueDropdownMinute: {
         value: this.minute.specific
      },
      valueDropdownHour: {
         value: this.hour.specific
      },
      valueDropdownDayWeek: {
         value: this.week.specific
      },
      valueDropdownDayMonth: {
         value: this.day.specific
      },
      valueDropdownMonth: {
         value: this.month.specific
      },
      valueDropdownYear: {
         value: this.year.specific
      }
   }

   secondDropdownId: string = 'secondDropdownId'
   minuteDropdownId: string = 'minuteDropdownId'
   hourDropdownId: string = 'hourDropdownId'
   dayWeekDropdownId: string = 'dayWeekDropdownId'
   dayMonthDropdownId: string = 'dayMonthDropdownId'
   monthDropdownId: string = 'monthDropdownId'
   yearDropdownId: string = 'yearDropdownId'

   mounted() {
      this.setTabs()
      this.setDropdowns()
   }

   setTabs() {
      $('.menu .item.itemTab').tab()
   }

   setDropdowns() {
      $('.ui.dropdown').dropdown()
   }

   getSecond() {
      const sec = _.get(this.$refs.valueDropdownSecond, 'value')

      if (!_.isNull(this.second.specific) && !_.isNull(this.second.specific) && !_.isUndefined(this.second.specific)) {
         _.set(this.second, 'specific', sec)
      }
   }

   getMinute() {
      const min = _.get(this.$refs.valueDropdownMinute, 'value')

      if (!_.isNull(this.minute.specific) && !_.isNull(this.minute.specific) && !_.isUndefined(this.minute.specific)) {
         _.set(this.minute, 'specific', min)
      }
   }

   getHour() {
      const ho = _.get(this.$refs.valueDropdownHour, 'value')

      if (!_.isNull(this.hour.specific) && !_.isNull(this.hour.specific) && !_.isUndefined(this.hour.specific)) {
         _.set(this.hour, 'specific', ho)
      }
   }

   getDayWeek() {
      const we = _.get(this.$refs.valueDropdownDayWeek, 'value')

      if (!_.isNull(this.week.specific) && !_.isNull(this.week.specific) && !_.isUndefined(this.week.specific)) {
         _.set(this.week, 'specific', we)
      }
   }

   getDayMonth() {
      const da = _.get(this.$refs.valueDropdownDayMonth, 'value')

      if (!_.isNull(this.day.specific) && !_.isNull(this.day.specific) && !_.isUndefined(this.day.specific)) {
         _.set(this.day, 'specific', da)
      }
   }

   getMonth() {
      const mon = _.get(this.$refs.valueDropdownMonth, 'value')

      if (!_.isNull(this.month.specific) && !_.isNull(this.month.specific) && !_.isUndefined(this.month.specific)) {
         _.set(this.month, 'specific', mon)
      }
   }

   getYear() {
      const ye = _.get(this.$refs.valueDropdownYear, 'value')

      if (!_.isNull(this.year.specific) && !_.isNull(this.year.specific) && !_.isUndefined(this.year.specific)) {
         _.set(this.year, 'specific', ye)
      }
   }

   update(val) {
      switch (val) {
         case 'second': {
            this.getSecond()
         }
         case 'minute': {
            this.getMinute()
         }
         case 'hour': {
            this.getHour()
         }
         case 'dayWeek': {
            this.getDayWeek()
         }
         case 'dayMonth': {
            this.getDayMonth()
         }
         case 'month': {
            this.getMonth()
         }
         case 'year': {
            this.getYear()
         }
         default:
      }
      this.cron()
   }

   @Watch('value', { immediate: true, deep: true })
   onValueChanged(newValue) {
      if (newValue !== _.trim(this.fieldData)) {
         this.fieldData = _.isEmpty(newValue) ? '' : newValue
      }
   }

   onFieldDataChanged() {
      this.$emit('fieldDataChanged', {
         value: this.noTrim ? this.fieldData : _.trim(this.fieldData)
      })
   }

   secondsText() {
      let seconds = ''
      const cronEvery = this.second.cronEvery
      switch (cronEvery.toString()) {
         case 'everySecond':
            seconds = '*'
            break
         case 'specificSecond':
            seconds = this.second.specific
            break
      }
      return seconds
   }

   minutesText() {
      let minutes = ''
      const cronEvery = this.minute.cronEvery
      switch (cronEvery.toString()) {
         case 'everyMinute':
            minutes = '*'
            break
         case 'specificMinute':
            minutes = this.minute.specific
            break
      }
      return minutes
   }

   hoursText() {
      let hours = ''
      const cronEvery = this.hour.cronEvery
      switch (cronEvery.toString()) {
         case 'everyHour':
            hours = '*'
            break
         case 'specificHour':
            hours = this.hour.specific
            break
      }
      return hours
   }

   daysText() {
      let days = ''
      const cronEvery = this.day.cronEvery
      switch (cronEvery.toString()) {
         case 'everyDay':
            days = '*'
            break
         case 'specificWeekDay':
            days = '?'
            break
         case 'specificMonthDay':
            days = this.day.specific
            break
      }
      return days
   }

   weeksText() {
      let weeks = ''
      const cronEvery = this.day.cronEvery
      switch (cronEvery.toString()) {
         case 'everyDay':
            weeks = '?'
            break
         case 'specificWeekDay':
            weeks = this.week.specific
            break
         case 'specificMonthDay':
            weeks = '?'
            break
      }
      return weeks
   }

   monthsText() {
      let months = ''
      const cronEvery = this.month.cronEvery
      switch (cronEvery.toString()) {
         case 'everyMonth':
            months = '*'
            break
         case 'specificMonth':
            months = this.month.specific
            break
      }
      return months
   }

   yearsText() {
      let years = ''
      const cronEvery = this.year.cronEvery
      switch (cronEvery.toString()) {
         case 'everyYear':
            years = '*'
            break
         case 'specificYear':
            years = this.year.specific
            break
      }
      return years
   }

   showWarning(val: boolean) {
      this.warning.show = val
   }

   cron() {
      this.output.second = this.secondsText()
      this.output.minute = this.minutesText()
      this.output.hour = this.hoursText()
      this.output.day = this.daysText()
      this.output.week = this.weeksText()
      this.output.month = this.monthsText()
      this.output.year = this.yearsText()

      this.showWarning(false)
      this.warning.message = ''

      // Warning si :
      // Toutes les secondes/minutes/heures
      if (this.output.day === '*' && this.output.month === '*' || this.output.second === '*' || this.output.minute === '*' || this.output.hour === '*') {
         this.showWarning(true)
         this.warning.message = this.$t('message.ui.cron-component.warningShortCron')
      }
      // Année loin dans le futur
      if (this.output.year !== '*' && parseInt(this.output.year, 10) > this.currentYear + 1) {
         this.showWarning(true)
         this.warning.message = this.$t('message.ui.cron-component.warningFutureCron')
      }
   }

   createCronString() {
      return this.output.second + ' ' + this.output.minute + ' ' + this.output.hour + ' ' + this.output.day + ' ' + this.output.month + ' ' + this.output.week + ' ' + this.output.year
   }

   validCron() {
      this.fieldData = this.createCronString()
      this.onFieldDataChanged()
      this.setCronModal(false)
   }

   setCronModal(val: boolean) {
      this.showCronModal = val
      if (val) {
         this.cron()
      }
   }
}

export { CronComponent }
