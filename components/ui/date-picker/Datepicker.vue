<script setup lang="ts">

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Input from '../input/Input.vue'
import { CalendarIcon } from '~/assets'
import moment from 'moment';
import { XIcon } from 'lucide-vue-next';

const props = defineProps<{
  value: any,
  hasError?: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:value', value: any): void
}>();

const inputValue = ref(props.value ?? '')

// Keep inputValue in sync with prop
watch(() => props.value, (val) => {
  inputValue.value = val ?? ''
})

// When input changes, validate and emit formatted date or null
watch(inputValue, (val) => {
  if (!val) {
    emit('update:value', null)
    return
  }
  const parsedDate = moment(val, "YYYY-MM-DD", true)
  if (parsedDate.isValid()) {
    emit('update:value', parsedDate.format('YYYY-MM-DD'))
  } else {
    emit('update:value', null)
  }
})

// Handle calendar date selection
const handleCalendarSelect = (date: Date | null) => {
  if (date) {
    inputValue.value = moment(date).format('YYYY-MM-DD')
  } else {
    inputValue.value = ''
  }
}

// Clear the date
const resetDate = () => {
  inputValue.value = ''
}
</script>

<template>

  <Popover>
    <Input class="no-calendar-icon" enable-clear :aria-invalid="hasError" v-model="inputValue" :suffix-button="true" type="date">
    <template #suffixButton>
      <template v-if="!inputValue">
        <PopoverTrigger as-child>
          <CalendarIcon />
        </PopoverTrigger>
        <PopoverContent tabindex="-1" class="w-auto p-0">
          <Calendar v-model="inputValue" initial-focus mode="single"
            :selected="inputValue ? moment(inputValue, 'YYYY-MM-DD', true).toDate() : undefined"
            @change="(date: Date | null) => handleCalendarSelect(date)" />
        </PopoverContent>
      </template>
      <XIcon @click="resetDate" v-else />
    </template>
    </Input>
  </Popover>
</template>