"use client";

import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const menuSections = [
  {
    title: "Hot Beverages",
    emoji: "☕",
    items: [
      { name: "Espresso", price: "$4.80" },
      { name: "Double Espresso", price: "$5.80" },
      { name: "Long Black", price: "$6.80" },
      { name: "Latte", price: "$7.00" },
      { name: "Flat White", price: "$7.00" },
      { name: "Cappuccino", price: "$7.00" },
      { name: "Hot Chocolate", price: "$7.00" },
      { name: "Chai Latte", price: "$7.00" },
      { name: "Mocha", price: "$7.50" },
      { name: "Dirty Chai", price: "$7.50" },
    ],
  },
  {
    title: "Cold Beverages",
    emoji: "🧃",
    items: [
      { name: "Kids Milk", price: "$3.30" },
      { name: "Cold Pressed Juices", price: "$8.20" },
      { name: "Iced Latte", price: "$9.20" },
      { name: "Milkshakes", price: "$9.75" },
      { name: "Iced Drink", price: "$10.40" },
      { name: "Smoothies", price: "$11.50" },
      { name: "Shake It Up Thick Shakes", price: "$11.80" },
    ],
  },
  {
    title: "Rolls, Wraps & Sandwiches",
    emoji: "🥖",
    items: [
      { name: "Toasty", price: "$10.00" },
      { name: "Turkish Roll", price: "$15.00" },
      { name: "Bagel", price: "$15.00" },
      { name: "Wrap", price: "$15.20" },
      { name: "Kids Meal Deal", price: "$14.50" },
      { name: "Gluten Free Roll", price: "$16.00" },
    ],
  },
  {
    title: "From the Menu",
    emoji: "🍳",
    items: [
      { name: "Sourdough Toast", price: "$7.80" },
      { name: "Fruit Toast", price: "$8.20" },
      { name: "Scones with Cream (House Made)", price: "$9.70" },
    ],
  },
  {
    title: "From the Cabinet",
    emoji: "🧁",
    items: [
      { name: "Biscuits", price: "$2.20" },
      { name: "Peanut Bliss Ball", price: "$4.50" },
      { name: "Cakes", price: "$5.20" },
      { name: "Gluten Free Cakes", price: "$7.00" },
      { name: "Savoury Muffin (House Made)", price: "$8.90" },
      { name: "Sausage Roll (House Made)", price: "$8.00" },
      { name: "House Made Muffins", price: "$7.80" },
      { name: "Croissant", price: "$11.00" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--espresso)] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--purple)] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            What we serve
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">Our Menu</h1>
          <p className="text-[var(--stone-light)]/60 max-w-md mx-auto">
            Fresh food made to order, specialty coffee, and house-made treats every day.
          </p>
        </motion.div>
      </section>

      {/* Menu sections */}
      <section className="py-20 px-6 bg-[var(--cream)]">
        <div className="max-w-4xl mx-auto space-y-16">
          {menuSections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: si * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{section.emoji}</span>
                <h2 className="font-display text-3xl text-[var(--espresso)]">{section.title}</h2>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-4 group"
                  >
                    <span className="text-[var(--warm-gray)] group-hover:text-[var(--espresso)] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[var(--purple)] font-medium tabular-nums">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-center text-[var(--muted)] text-sm mt-16 max-w-md mx-auto">
          Menu and prices may vary. Please ask our team about daily specials, dietary requirements, or allergen information.
        </motion.p>
      </section>
    </>
  );
}
