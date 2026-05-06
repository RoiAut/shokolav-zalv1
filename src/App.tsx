import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Utensils,
  Home,
  Gift,
  Camera,
  CreditCard,
  ShoppingBag,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Infinity as InfinityIcon,
  X,
  ArrowUp,
} from "lucide-react";
import { CONTACT_INFO, FEATURES, IMAGES } from "./constants";

const ICON_MAP = {
  Utensils,
  Home,
  Gift,
  Camera,
  CreditCard,
  ShoppingBag,
};

const ImageWithFallback = ({
  src,
  fallback,
  alt,
  className,
  onClick,
  loading = "lazy",
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  loading?: "lazy" | "eager";
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    onClick={onClick}
    loading={loading}
    onError={(e) => {
      (e.target as HTMLImageElement).src = fallback;
    }}
  />
);

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const galleryImages = [
    { src: IMAGES.gallery[0], fallback: IMAGES.fallbacks.gallery[0] },
    { src: IMAGES.gallery[1], fallback: IMAGES.fallbacks.gallery[1] },
    { src: IMAGES.gallery[2], fallback: IMAGES.fallbacks.gallery[2] },
    { src: IMAGES.promo, fallback: IMAGES.fallbacks.promo },
  ];

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((selectedIndex + 1) % galleryImages.length);
      }
    },
    [selectedIndex, galleryImages.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex(
          (selectedIndex - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    },
    [selectedIndex, galleryImages.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <div className="min-h-screen selection:bg-chocolate-light selection:text-white">
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-chocolate-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </motion.button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-[110] cursor-pointer"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-[110] cursor-pointer"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedImage.src}
                fallback={selectedImage.fallback}
                alt="Просмотр фото"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl pointer-events-none"
              />
              <div className="text-white/40 font-display text-sm tracking-widest uppercase">
                {selectedIndex! + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-chocolate-cream/80 backdrop-blur-md border-b border-chocolate-dark/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tighter text-chocolate-dark leading-none">
                ШОКОЛАД
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-chocolate-light font-bold">
                Банкетный зал
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm font-bold text-chocolate-dark border-r border-chocolate-dark/10 pr-6 hidden lg:flex items-center gap-2 hover:text-chocolate-light transition-colors"
            >
              <Phone size={16} />
              {CONTACT_INFO.phone}
            </a>
            <a
              href={CONTACT_INFO.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-chocolate-light transition-colors hidden md:flex items-center gap-2"
            >
              <MapPin size={16} />
              {CONTACT_INFO.address}
            </a>
            <a
              href={CONTACT_INFO.vkLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-chocolate-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-chocolate-medium transition-all shadow-lg shadow-chocolate-dark/20 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Группа ВК
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-10">
          <InfinityIcon
            className="w-full h-full text-chocolate-light"
            strokeWidth={0.5}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-chocolate-dark/5 rounded-full text-chocolate-light text-sm font-bold tracking-wider uppercase mb-6">
              Уютный банкетный зал в Магнитогорске
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-chocolate-dark leading-[0.9] mb-8">
              Ваше идеальное <br className="hidden md:block" />
              <span className="text-chocolate-light italic">
                торжество начинается здесь
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-chocolate-medium/80 mb-10 leading-relaxed">
              Мы создаем атмосферу, в которой каждый гость чувствует себя
              особенным. Доверьте нам организацию вашего торжества.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CONTACT_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-chocolate-dark text-white rounded-2xl font-bold text-lg hover:bg-chocolate-medium transition-all shadow-xl shadow-chocolate-dark/30 flex items-center justify-center gap-2"
              >
                Найти на карте
                <ChevronRight size={20} />
              </a>
              <a
                href={CONTACT_INFO.vkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-chocolate-dark/10 text-chocolate-dark rounded-2xl font-bold text-lg hover:bg-chocolate-cream transition-all flex items-center justify-center gap-2"
              >
                Связаться в ВК
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-chocolate-dark text-chocolate-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-display italic font-bold">100%</div>
              <div className="text-sm uppercase tracking-widest opacity-60">
                Душевная атмосфера
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display italic font-bold">
                Вкусная
              </div>
              <div className="text-sm uppercase tracking-widest opacity-60">
                Домашняя кухня
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-display italic font-bold">
                Подарок
              </div>
              <div className="text-sm uppercase tracking-widest opacity-60">
                Украшение зала
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-chocolate-dark mb-6 italic">
              Почему выбирают нас
            </h2>
            <div className="w-24 h-1 bg-chocolate-light mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => {
              const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white p-10 rounded-[40px] border border-chocolate-dark/5 hover:border-chocolate-light/20 hover:shadow-2xl hover:shadow-chocolate-dark/5 transition-all"
                >
                  <div className="w-16 h-16 bg-chocolate-cream rounded-2xl flex items-center justify-center text-chocolate-light mb-8 group-hover:scale-110 transition-transform">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-chocolate-dark mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-chocolate-medium/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="py-24 bg-chocolate-medium text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-chocolate-light opacity-10 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
                <Gift size={16} />
                Эксклюзивно для вас
              </div>
              <h2 className="font-display text-4xl md:text-7xl font-bold leading-tight">
                Оформление зала <br />
                <span className="text-chocolate-gold italic">в подарок</span>
              </h2>
              <p className="text-xl opacity-80 leading-relaxed max-w-lg">
                Станьте подписчиком нашей группы ВКонтакте и получите
                качественное, стильное оформление банкетного зала совершенно
                бесплатно. Пусть ваш праздник будет идеальным до мельчайших
                деталей!
              </p>
              <a
                href={CONTACT_INFO.vkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-chocolate-dark rounded-2xl font-bold text-lg hover:bg-chocolate-cream transition-all shadow-2xl"
              >
                Вступить в группу
                <ChevronRight size={20} />
              </a>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-[600px] rounded-[60px] overflow-hidden shadow-2xl shadow-black/50 rotate-3">
              <ImageWithFallback
                src={IMAGES.promo}
                fallback={IMAGES.fallbacks.promo}
                alt="Оформленный банкетный зал"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 bg-chocolate-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
            <div
              className="md:col-span-2 row-span-2 rounded-[40px] overflow-hidden shadow-lg group cursor-zoom-in min-h-[300px] md:min-h-0"
              onClick={() => setSelectedIndex(0)}
            >
              <ImageWithFallback
                src={IMAGES.gallery[0]}
                fallback={IMAGES.fallbacks.gallery[0]}
                alt="Банкетное блюдо"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div
              className="rounded-[40px] overflow-hidden shadow-lg group cursor-zoom-in h-64 md:h-full"
              onClick={() => setSelectedIndex(1)}
            >
              <ImageWithFallback
                src={IMAGES.gallery[1]}
                fallback={IMAGES.fallbacks.gallery[1]}
                alt="Декор зала"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div
              className="rounded-[40px] overflow-hidden shadow-lg group cursor-zoom-in h-64 md:h-full"
              onClick={() => setSelectedIndex(2)}
            >
              <ImageWithFallback
                src={IMAGES.gallery[2]}
                fallback={IMAGES.fallbacks.gallery[2]}
                alt="Фото-зона"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <a
              href={CONTACT_INFO.galleryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-2 rounded-[40px] overflow-hidden shadow-lg group bg-chocolate-dark hover:bg-chocolate-medium transition-colors h-64 md:h-auto flex flex-col items-center justify-center p-6 text-center"
            >
              <p className="text-white font-display italic text-5xl font-bold mb-3 group-hover:scale-105 transition-transform">
                Смотреть больше
              </p>
              <div className="w-16 h-1 bg-chocolate-gold group-hover:w-32 transition-all"></div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-chocolate-dark italic">
            Планируете провести важное <br /> мероприятие?
          </h2>
          <p className="text-xl text-chocolate-medium/70">
            Мы будем счастливы, если вы доверите нам организацию вашего
            торжества. Поводов много — праздник один!
          </p>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-4 px-10 py-5 bg-chocolate-dark text-white rounded-full font-bold text-xl hover:bg-chocolate-medium transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-chocolate-dark/30"
          >
            Забронировать дату
            <Phone size={24} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-chocolate-dark/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-tighter text-chocolate-dark leading-none">
                    ШОКОЛАД
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-chocolate-light font-bold">
                    Банкетный зал
                  </span>
                </div>
              </div>
              <p className="max-w-xs text-chocolate-medium/60 text-sm leading-relaxed mx-auto md:mx-0">
                Банкетный зал с душевной атмосферой в самом сердце
                Магнитогорска. Мы делаем ваши праздники незабываемыми.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 w-full md:w-auto">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-chocolate-light">
                  Контакты
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={CONTACT_INFO.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-chocolate-dark hover:text-chocolate-light transition-colors group"
                    >
                      <MapPin size={18} className="mt-1 flex-shrink-0" />
                      <span className="font-medium group-hover:underline underline-offset-4">
                        {CONTACT_INFO.address}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-chocolate-dark hover:text-chocolate-light transition-colors group"
                    >
                      <Phone size={18} className="flex-shrink-0" />
                      <span className="font-medium">{CONTACT_INFO.phone}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-chocolate-light">
                  Мы в соцсетях
                </h4>
                <a
                  href={CONTACT_INFO.vkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-chocolate-cream rounded-2xl text-chocolate-dark font-bold hover:bg-chocolate-light/10 transition-all border border-chocolate-dark/5"
                >
                  <MessageCircle size={20} />
                  ВКонтакте
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-chocolate-dark/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-chocolate-medium/40 font-medium uppercase tracking-[0.2em]">
            <p>&copy; {new Date().getFullYear()} Банкетный зал «Шоколад»</p>
            <p>Все права защищены</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] w-12 h-12 bg-chocolate-dark text-white rounded-full flex items-center justify-center shadow-2xl shadow-chocolate-dark/40 border border-white/10 backdrop-blur-sm hover:bg-chocolate-medium transition-colors"
            aria-label="Наверх"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
