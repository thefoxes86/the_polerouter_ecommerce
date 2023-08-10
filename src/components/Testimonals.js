import { motion } from 'framer-motion';
import Image from 'next/image';

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
          <img className='book__image' src='/img/Goldberger-Macro_B&W.jpeg' />
        </motion.div>
      </div>

      <div className='secondCol'>
        <motion.div className='testimonial'>
          <p className='mediumText'>
            “Universal Genève is delighted with the publication of the
            magnificent book you are holding in your hands. This book, the
            result of remarkable work, will undoubtedly be a reference for all
            Universal watch collectors.”
          </p>
          <p className='author_name'>Nicholas Vernier</p>
          <p className='author_role'>CEO, Universal Geneve SA</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='bigText'>
            “Watch colectors love a goodstory.<br></br>This is one of the very
            best."
          </p>
          <p className='author_name'>James Lamdin</p>
          <p className='author_role'>Founder, Analog:Shift</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='mediumText'>
            “With its own unique style and aesthetic and with its innovative
            micro-rotor movement, this watch has built up a reputation that
            continues even to this day, reigning as a popular and highly
            sought-afer piece in the vintage market.”
          </p>
          <p className='author_name'>John Goldberger</p>
          <p className='author_role'>Collector & author</p>
        </motion.div>

        <motion.div className='testimonial'>
          <p className='bigText'>
            “Designed by the man that many great colectors qualify as the
            greatest watch designer of the 20th century.”
          </p>
          <p className='author_name'>Virginie Liatard Roesli</p>
          <p className='author_role'>Watch Specialist, Philips</p>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonsials;
