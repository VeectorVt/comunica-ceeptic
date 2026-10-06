import React, { useEffect, useState } from 'react';
// import homeImg1 from '../assets/home/WhatsApp Image 2026-10-01 at 16.08.46.jpeg';
import homeImg2 from '../assets/home/WhatsApp Image 2026-10-01 at 16.08.46 (1).jpeg';
import homeImg3 from '../assets/home/WhatsApp Image 2026-10-01 at 16.08.46 (2).jpeg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, Bell, Map, Calendar, Utensils, BookOpen, ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import { avisos } from '../data/avisos';
import { eventos } from '../data/calendario';
import { locais } from '../data/mapa';

const homeSlides = [
  { src: '/logo_ceeptic_2026.jpeg', alt: 'Logo do CEEPTIC Lauro de Freitas', fit: 'object-contain bg-slate-900' },
  { src: '/WhatsApp%20Image%202026-09-29%20at%2012.20.22.jpeg', alt: 'Vista aérea da escola', fit: 'object-cover' },
  { src: '/WhatsApp%20Image%202026-09-29%20at%2012.20.23.jpeg', alt: 'Estudantes desenvolvendo projetos de robótica', fit: 'object-cover' },
  { src: '/WhatsApp%20Image%202026-09-29%20at%2012.20.23%20(1).jpeg', alt: 'Estudantes no espaço de convivência da escola', fit: 'object-cover' },
  { src: homeImg2, alt: 'Card FACEM / Aviso Eleitoral', fit: 'object-contain bg-slate-950' },
  { src: homeImg3, alt: 'Programação FACEM 2026', fit: 'object-contain bg-slate-950' },
];

const convivenciaRules = [
  { title: 'Uniforme obrigatório', description: 'Use a camisa oficial da escola, calça jeans azul ou preta e calçado fechado. A camisa não deve ser descaracterizada.' },
  { title: 'Horário das aulas', description: 'Matutino: 7h10 às 12h. Vespertino: 13h às 17h50. Há tolerância de 15 minutos; após esse período, a entrada depende de autorização da Gestão ou Coordenação.' },
  { title: 'Intervalo', description: 'Matutino: 9h25 às 9h45. Vespertino: 15h15 às 15h35. Saia após o toque da sirene e retorne à sala antes do professor.' },
  { title: 'Garrafas de água', description: 'Abasteça sua garrafa antes das aulas ou durante o intervalo.' },
  { title: 'Uso do sanitário', description: 'Peça autorização ao professor. É permitida a saída de um aluno por vez.' },
  { title: 'Uso do celular', description: 'Permitido apenas para fins pedagógicos e com autorização do professor.' },
  { title: 'Ausência do professor', description: 'A Coordenação organizará as atividades. Os estudantes devem permanecer em sala.' },
  { title: 'Indisciplina', description: 'O descumprimento das regras será encaminhado à Coordenação Escolar.' },
  { title: 'Venda de alimentos', description: 'Não é permitida a venda de alimentos na unidade escolar.' },
];

const parseLocalDate = (date) => {
  const [day, month, year] = date.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % homeSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showSlide = (index) => {
    setActiveSlide((index + homeSlides.length) % homeSlides.length);
  };

  const features = [
    { icon: <Bell className="w-6 h-6" />, title: 'Avisos', path: '/avisos', color: 'bg-blue-100 text-blue-600' },
    { icon: <Utensils className="w-6 h-6" />, title: 'Cardápio', path: '/cardapio', color: 'bg-orange-100 text-orange-600' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Calendário', path: '/calendario', color: 'bg-teal-100 text-teal-600' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Grade de Aulas', path: '/grade', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <Map className="w-6 h-6" />, title: 'Mapa', path: '/mapa', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfUrgentWindow = new Date(today);
  endOfUrgentWindow.setDate(endOfUrgentWindow.getDate() + 7);
  const urgentAvisos = [
    ...avisos
      .filter((aviso) => aviso.categoria === 'Urgente' && parseLocalDate(aviso.data) >= today)
      .map((aviso) => ({ ...aviso, alertDate: parseLocalDate(aviso.data) })),
    ...eventos
      .filter((evento) => {
        if (evento.tipo !== 'prova') return false;
        const examDate = new Date(`${evento.data}T00:00:00`);
        return examDate >= today && examDate <= endOfUrgentWindow;
      })
      .map((evento) => {
        const alertDate = new Date(`${evento.data}T00:00:00`);
        return {
          id: `prova-${evento.id}`,
          titulo: evento.titulo,
          descricao: evento.descricao,
          data: alertDate.toLocaleDateString('pt-BR'),
          categoria: 'Urgente',
          alertDate,
        };
      }),
  ].sort((first, second) => first.alertDate - second.alertDate);
  const normalizedQuery = searchQuery.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matchingAvisos = avisos.filter((aviso) =>
    [aviso.titulo, aviso.descricao, aviso.categoria]
      .some((value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery))
  );
  const matchingLocais = locais.filter((local) =>
    [local.nome, local.descricao]
      .some((value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery))
  );
  const hasSearchQuery = normalizedQuery.length > 0;

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero Banner */}
      <div
        className="relative left-1/2 -mt-4 flex w-screen -translate-x-1/2 flex-col overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-700/60 shadow-lg md:-mt-6 md:w-[calc(100vw-16rem)] lg:-mt-8"
      >
      <div className="relative z-10 order-2 mx-auto mt-6 w-[calc(100%-2rem)] overflow-hidden rounded-3xl bg-slate-950 shadow-xl sm:w-[calc(100%-4rem)] lg:max-w-6xl" aria-label="Imagens do CEEPTIC">
        <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/8]">
          {homeSlides.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${slide.fit} ${index === activeSlide ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              aria-hidden={index !== activeSlide}
            />
          ))}
          <button
            type="button"
            onClick={() => showSlide(activeSlide - 1)}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/55 text-white transition hover:bg-slate-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => showSlide(activeSlide + 1)}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/55 text-white transition hover:bg-slate-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2" aria-label={`Imagem ${activeSlide + 1} de ${homeSlides.length}`}>
            {homeSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Ir para imagem ${index + 1}`}
                aria-current={index === activeSlide ? 'true' : undefined}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

        <div className="relative z-10 order-1 flex justify-between items-center px-6 pt-8 mb-6 text-white">
          <div>
            <h1 className="text-2xl font-bold drop-shadow">Bem-vindo! 👋</h1>
            <p className="text-blue-100 mt-1 drop-shadow">CEEPTIC – Lauro de Freitas</p>
          </div>
          <img
            src="/logo_ceeptic_2026.jpeg"
            alt="Logo CEEPTIC"
            className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-white/40"
          />
        </div>

        {/* Search Bar */}
        <div className="relative z-10 order-3 mt-6 px-6 pb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar avisos, locais..."
              className="w-full bg-white text-slate-800 rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar avisos e locais"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute inset-y-0 right-3 flex items-center p-2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-5 px-4 sm:px-6">
        <div className="grid grid-cols-5 gap-1 rounded-xl border border-white/60  px-2 py-3 shadow-md backdrop-blur">
          {features.map((feature, idx) => (
            <motion.button
              key={feature.path}
              type="button"
              whileHover={{ y: -5, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(feature.path)}
              className="flex min-w-0 flex-col items-center gap-2 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${feature.color}`}>
                {feature.icon}
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-slate-600">{feature.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8">
        {hasSearchQuery ? (
          <section aria-live="polite">
            <h2 className="text-lg font-bold text-slate-800">Resultados da busca</h2>
            {matchingAvisos.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-500">Avisos</h3>
                {matchingAvisos.map((aviso) => (
                  <button
                    key={aviso.id}
                    type="button"
                    onClick={() => navigate('/avisos')}
                    className="w-full rounded-lg border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-200"
                  >
                    <span className="text-sm font-bold text-slate-800">{aviso.titulo}</span>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">{aviso.descricao}</p>
                    <span className="mt-2 inline-block text-xs font-medium text-blue-600">{aviso.categoria} · {aviso.data}</span>
                  </button>
                ))}
              </div>
            )}
            {matchingLocais.length > 0 && (
              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-500">Locais</h3>
                {matchingLocais.map((local) => (
                  <button
                    key={local.id}
                    type="button"
                    onClick={() => navigate('/mapa')}
                    className="w-full rounded-lg border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200"
                  >
                    <span className="text-sm font-bold text-slate-800">{local.nome}</span>
                    <p className="mt-1 text-xs text-slate-600">{local.descricao}</p>
                  </button>
                ))}
              </div>
            )}
            {matchingAvisos.length === 0 && matchingLocais.length === 0 && (
              <p className="mt-3 rounded-lg bg-white p-4 text-sm text-slate-500">Nenhum aviso ou local encontrado.</p>
            )}
          </section>
        ) : (
          <>

              <section aria-labelledby="urgent-heading" className="mb-8">
              <div className="mb-4 flex items-end justify-between gap-3">
                <h2 id="urgent-heading" className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  <AlertTriangle className="h-5 w-5 text-red-600" /> Avisos urgentes
                </h2>
                <button onClick={() => navigate('/avisos')} className="flex items-center text-sm font-medium text-blue-600">
                  Ver avisos <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>

              {urgentAvisos.length > 0 ? (
                <div className="space-y-3">
                  {urgentAvisos.map((aviso) => (
                <motion.div
                  key={aviso.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border-2 border-red-200 bg-red-50 p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex animate-pulse items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white motion-reduce:animate-none">
                        <AlertTriangle className="h-3.5 w-3.5" /> URGENTE
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{aviso.data}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">{aviso.titulo}</h3>
                      <p className="text-xs text-slate-700">{aviso.descricao}</p>
                </motion.div>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-slate-200 bg-white/90 p-4 text-sm text-slate-600">Nenhum aviso urgente no momento.</p>
              )}
            </section>

            <section aria-labelledby="convivencia-heading" >
              <h2 id="convivencia-heading" className=" text-lg font-bold text-slate-800">Regras de convivência</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {convivenciaRules.map((rule) => (
                  <article key={rule.title} className="rounded-lg border border-slate-200 bg-white/95 p-4 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800">{rule.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{rule.description}</p>
                  </article>
                ))}
              </div>
            </section>

        
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
