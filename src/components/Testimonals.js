import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Testimonsials = () => {
  return (
    <>
      <div className='firstCol'>
        <motion.div
          initial='hidden'
          animate='visible'
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -10 },
          }}
          className='testimonial'
        >
          <img className='book__image' src='/img/17-BW.jpg' />
        </motion.div>
      </div>

      <div className='secondCol'>
        <motion.div className='testimonial'>
          <p className='bigText w-full text-center'>
            “To celebrate the 70th Anniversary of the<br></br>
            inaugural trans-polar SAS flights,<br></br>
            The Polerouter book is available at<br></br>a reduced price for the
            remainder of 2024"
          </p>
          {/* <p className='author_name'>James Lamdin</p> */}
          {/* <p className='author_role'>Founder, Analog:Shift</p> */}
        </motion.div>
        <motion.div className='testimonial text-center'>
          <p className='mediumText w-full text-center'>BOOK REVIEWS</p>
          <span className='w-full h-px block mb-5 bg-white'></span>
          <div className='flex w-full items-center justify-around'>
            <Link
              href={
                'https://www.fratellowatches.com/book-review-the-polerouter/'
              }
            >
              <Image src={'/img/Fratello.png'} width={130} height={130} />
            </Link>
            <Link
              href={
                'https://www.hodinkee.com/articles/the-polerouter-a-new-book-adds-to-our-age-old-appreciation-for-a-vintage-icon'
              }
            >
              <Image src={'/img/Hodinkee_logo.png'} width={130} height={130} />
            </Link>
            <Link
              href={
                'https://monochrome-watches.com/book-review-the-polerouter-book-celebrating-iconic-universal-geneve-watch/'
              }
            >
              <Image src={'/img/Monochrome.jpg'} width={130} height={130} />
            </Link>
            <Link
              href={
                'https://watchesbysjx.com/2023/12/universal-geneve-polerouter-book-review.html'
              }
            >
              <Image src={'/img/SJX.png'} width={130} height={130} />
            </Link>
            <Link
              href={
                'https://wornandwound.com/the-universal-geneve-polerouter-gets-the-reference-treatment-in-a-gorgeous-new-book-covering-the-enormous-breadth-of-the-collection/'
              }
            >
              <Image
                src={'/img/ww_diamond_1500x1500-600x504.jpg'}
                width={130}
                height={130}
              />
            </Link>
          </div>
          {/* <p className='author_name'>James Lamdin</p> */}
          {/* <p className='author_role'>Founder, Analog:Shift</p> */}
        </motion.div>
      </div>
    </>
  );
};

export default Testimonsials;
