import ContactMessage from '@/components/contact/ContactMessage'
import ContactUs from '@/components/contact/ContactUs'
import Subscribe from '@/components/sheard/Subscribe'
import React from 'react'

const page = () => {
  return (
    <section>
        <ContactUs />
        <ContactMessage />
       <Subscribe />
    </section>
  )
}

export default page