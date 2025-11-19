
import CheckoutPage from '@/components/checkout/Checkoutpage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
     <Suspense fallback={<><h2>Loading</h2></>}>
      <CheckoutPage />
     </Suspense>
    </>
  )
}

export default page