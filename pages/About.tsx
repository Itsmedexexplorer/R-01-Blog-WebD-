import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-paper dark:bg-darkBg transition-colors duration-500"
    >
      <div className="max-w-2xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="font-serif text-5xl font-bold text-charcoal dark:text-white mb-6">
            About Rutansh
          </h1>
          <div className="w-24 h-1 bg-terracotta mx-auto"></div>
        </header>

        <div className="font-body text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 space-y-8">
          <p className="drop-cap">
            Rutansh is not a news portal. It is a reaction against the velocity of the modern web. In an age of infinite scrolling and 15-second attention spans, we are building a digital sanctuary for slow reading, deep analysis, and long-term thinking.
          </p>

          <section>
            <h2 className="font-serif text-2xl text-charcoal dark:text-gray-100 mb-4 mt-12">The Philosophy</h2>
            <p>
              We focus on <strong>Bharat</strong>—not just as a geopolitical entity, but as a civilizational continuity. We explore how ancient systems of dharma, community, and trade intersect with modern technology, AI, and global economics.
            </p>
          </section>

          <blockquote className="pl-6 border-l-4 border-terracotta italic text-xl text-gray-600 dark:text-gray-400 my-10">
            "We are building cathedrals of thought, not tents of information."
          </blockquote>

          <section>
            <h2 className="font-serif text-2xl text-charcoal dark:text-gray-100 mb-4 mt-12">Why "Rutansh"?</h2>
            <p>
              Derived from the roots of seasonal rhythm ('Ritu') and part/essence ('Ansh'), Rutansh symbolizes a fragment of the eternal cycle. We believe that true understanding comes not from reacting to the breaking news, but from observing the changing seasons of history.
            </p>
          </section>

          <section className="border-t border-dashed border-terracotta/30 pt-10 mt-16">
            <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-terracotta mb-4">Colophon</h3>
            <p className="text-base">
              Set in <em>Lora</em> for body text and <em>Playfair Display</em> for headings. 
              Designed with a focus on high contrast, readability, and minimal digital footprint.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};