import { motion } from 'framer-motion';

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
          <p className='bigText'>
            “Watch colectors love a goodstory.This is one of the very best."
          </p>
          <p className='author_name'>James Lamdin</p>
          <p className='author_role'>Founder,Analog:Shift</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='smallText'>
            “With its own unique style and aesthetic and with its innovative
            micro-rotor movement, this watch has built up a reputation that
            continues even to this day, reigning as a popular and highly
            sought-afer piece in the vintage market.”
          </p>
          <p className='author_name'>John Goldberger</p>
          <p className='author_role'>Colector & author</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='mediumText'>
            “Designed by the man that many great colectors qualify as the
            greatest watch designer of the 20th century.”
          </p>
          <p className='author_name'>Mr.A</p>
          <p className='author_role'>Colector & Entrepeneur</p>
        </motion.div>
      </div>

      <div className='secondCol'>
        <motion.div className='testimonial'>
          <p className='mediumText'>
            “Designed by the man that many great colectors qualify as the
            greatest watch designer of the 20th century.”
          </p>
          <p className='author_name'>Virginie Liatard Roesli</p>
          <p className='author_role'>Watch Specialist, Philips</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='smallText'>
            “With its own unique style and aesthetic and with its innovative
            micro-rotor movement, this watch has built up a reputation that
            continues even to this day, reigning as a popular and highly
            sought-afer piece in the vintage market.”
          </p>
          <p className='author_name'>Nicholas Vernier</p>
          <p className='author_role'>CEO, Universal Geneve SA</p>
        </motion.div>
        <motion.div className='testimonial'>
          <p className='bigText'>
            “Watch colectors love a goodstory.This is one of the very best."
          </p>
          <p className='author_name'>Pietro Giuliano Sala</p>
          <p className='author_role'>Colector & author</p>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonsials;
