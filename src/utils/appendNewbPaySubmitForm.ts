import type { NewebPay } from '@/types/newebPay/newebPay'

export function appendNewbPaySubmitForm(orderInfo: NewebPay) {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway'
  const formData = {
    MerchantID: orderInfo.MerchantID,
    Version: orderInfo.Version,
    TimeStamp: orderInfo.TimeStamp,
    TradeSha: orderInfo.shaEncrypt,
    TradeInfo: orderInfo.aesEncrypt,
    Email: orderInfo.order?.email
  }
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input')
      hiddenField.type = 'hidden'
      hiddenField.name = key
      hiddenField.value = formData[key as keyof typeof formData]?.toString() ?? ''
      form.appendChild(hiddenField)
    }
  }
  document.body.appendChild(form)
  return new Promise((resolve) => {
    form.addEventListener('submit', resolve)
    form.submit()
  })
}
