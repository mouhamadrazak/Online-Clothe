import 'react'
import Title from '../componens/Title'
import { assests } from '../assets/assests'
import NewesLetterBox from '../componens/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/> 
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] ' src={assests.abaya1} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to our online store, where fashion meets convenience! We specialize in offering high-quality, trendy, and stylish clothing for all occasions. Our goal is to provide our customers with the best selection of outfits, ensuring that you look and feel your best at all times.</p>
          <p>With a wide range of imported outfits, we take pride in curating collections that cater to diverse fashion needs. Whether you’re looking for casual wear, formal attire, or statement pieces, we have something for everyone.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to make fashion accessible to everyone while maintaining quality and affordability. We believe that style should not be compromised, and our dedicated team works hard to bring you the latest trends, premium fabrics, and exceptional designs.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {/* ------- Quality Assurance ----- */ }
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We prioritize quality in every piece we offer. Our products undergo strict quality control to ensure durability, comfort, and elegance. When you shop with us, you can trust that you're receiving only the best.</p>
        </div>

        {/* ------- Convenience ----- */ }
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Shopping with us is seamless and hassle-free. Our user-friendly website, secure payment options, and fast delivery services ensure that you get your favorite outfits without any stress.</p>
        </div>

        {/* ------- Exceptional Customer Service ----- */ }
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Customer satisfaction is our top priority. Our dedicated support team is always available to assist you with any inquiries, ensuring a smooth and enjoyable shopping experience.</p>
        </div>
      </div>

      <div>
        <NewesLetterBox/>
      </div>
    </div>
  )
}

export default About
