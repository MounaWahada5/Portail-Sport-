import { useState, useEffect } from "react";
import Chatbox from "../components/ChatBot";

// Composant compteur animé
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

// Mini widget Challenge du jour
function DailyChallenge() {
  const challenges = [
    "10 pompes 💪",
    "30 squats 🦵",
    "15 burpees 🔥",
    "1 min planche 🧘‍♂️",
    "20 jumping jacks 🤸‍♀️",
  ];

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 || completed) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, completed]);

  const nextChallenge = () => {
    setCompleted(false);
    setTimeLeft(30);
    setIndex((index + 1) % challenges.length);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mb-16 text-center select-none">
      <h3 className="text-2xl font-bold mb-4">Challenge sportif du jour</h3>
      <p className="text-xl mb-4">{challenges[index]}</p>
      <div className="text-6xl font-mono mb-6">{timeLeft}s</div>
      {!completed ? (
        <button
          onClick={() => setCompleted(true)}
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
        >
          J’ai réussi !
        </button>
      ) : (
        <div>
          <p className="text-green-700 font-semibold mb-4">Bravo ! 🎉</p>
          <button
            onClick={nextChallenge}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Challenge suivant
          </button>
        </div>
      )}
    </div>
  );
}

const timelineSteps = [
  { step: "Débutant", desc: "Apprends les bases du sport et développe ta motivation." },
  { step: "Intermédiaire", desc: "Progresse efficacement avec un entraînement ciblé." },
  { step: "Avancé", desc: "Atteins ton pic de performance avec des défis adaptés." },
];

const testimonials = [
  {
    name: "Sofia, marathonienne",
    text: "Grâce à SportCoach AI, j’ai amélioré mes temps et trouvé l’équilibre nutritionnel parfait.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Youssef, coach personnel",
    text: "Une ressource incroyable pour mes clients qui veulent progresser sans blessures.",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Leila, adepte de fitness",
    text: "Le chat m’a toujours conseillé les meilleurs exercices adaptés à mon rythme.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Home() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-white text-green-900 font-sans">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
  <video
    autoPlay
    muted
    loop
    className="absolute inset-0 w-full h-full object-cover brightness-75"
    src="https://cdn.videvo.net/videvo_files/video/free/2019-04/small_watermarked/190222_04_SportsBiking_03_preview.webm"
    type="video/webm"
  />
  <div className="relative z-10 max-w-4xl">
    <h1 className="text-6xl font-extrabold drop-shadow-lg leading-tight mb-4">
      🏋️ SportCoach AI
    </h1>
    <p className="text-xl italic drop-shadow-md max-w-3xl mx-auto mb-6">
      Repousse tes limites. Atteins tes objectifs. Avec SportCoach AI, ton meilleur allié sportif.
    </p>
    <button
      onClick={() => setChatVisible(true)}
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-16 rounded-full shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400"
    >
      Demander à AIcoach
    </button>
  </div>
</section>

      {/* Challenge sportif du jour */}
      <DailyChallenge />

      {/* Piliers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-14 text-center tracking-wide">Nos piliers du succès</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: "⚡", title: "Performance", desc: "Entraînements intensifs et ciblés." },
            { icon: "🥗", title: "Nutrition", desc: "Alimentation saine et adaptée." },
            { icon: "🧠", title: "Mental", desc: "Coaching mental et motivation." },
            { icon: "💤", title: "Récupération", desc: "Techniques pour éviter les blessures." },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer select-none"
              tabIndex={0}
              role="button"
              aria-pressed="false"
            >
              <div className="text-6xl mb-5 animate-bounce">{icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-14 tracking-wide">Nos chiffres clés</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-16 text-green-800">
          <div>
            <div className="text-5xl font-extrabold mb-3">
              <AnimatedCounter target={10000} />+
            </div>
            <div className="text-lg font-semibold">Sportifs accompagnés</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3">
              <AnimatedCounter target={95} />%
            </div>
            <div className="text-lg font-semibold">Taux de satisfaction</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3">3x</div>
            <div className="text-lg font-semibold">Progrès plus rapides</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-14 text-center tracking-wide">Ton parcours avec nous</h2>
        <div className="relative border-l-4 border-green-600 max-w-xl mx-auto space-y-12">
          {timelineSteps.map(({ step, desc }, i) => (
            <div key={i} className="ml-10 relative flex items-start space-x-6">
              <div className="absolute -left-8 top-1 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 text-lg select-none">
                {i + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-700 leading-relaxed max-w-md">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-14 text-center tracking-wide">Ils ont adopté SportCoach AI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {testimonials.map(({ name, text, img }, i) => (
            <article
              key={i}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-shadow hover:shadow-xl"
              tabIndex={0}
            >
              <img
                src={img}
                alt={`Photo de ${name}`}
                className="w-28 h-28 rounded-full mb-6 object-cover border-4 border-green-600"
                loading="lazy"
              />
              <p className="italic text-gray-700 mb-4 leading-relaxed max-w-xs">“{text}”</p>
              <strong className="text-green-700 text-lg">{name}</strong>
            </article>
          ))}
        </div>
      </section>

      {/* Bouton chat flottant */}
      <button
        onClick={() => setChatVisible(true)}
        className="fixed bottom-8 right-8 bg-green-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-3xl font-bold z-50 animate-bounce transition-transform active:scale-90 focus:outline-none focus:ring-4 focus:ring-green-400"
        aria-label="Ouvrir chat AIcoach"
        title="Pose ta question"
      >
        💬
      </button>

      {/* Overlay + chatbox */}
      {chatVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-end z-50">
          <div className="w-full max-w-md h-full bg-white shadow-2xl rounded-l-3xl p-6 flex flex-col">
            <button
              onClick={() => setChatVisible(false)}
              className="self-end text-gray-600 hover:text-gray-900 text-3xl font-bold mb-4 focus:outline-none"
              aria-label="Fermer chat"
            >
              ✖
            </button>
            <Chatbox />
          </div>
        </div>
      )}
    </div>
  );
}
