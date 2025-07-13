import React from 'react'

const RupiahFormat = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number);
}

export default RupiahFormat