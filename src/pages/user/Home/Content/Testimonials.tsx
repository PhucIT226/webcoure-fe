const testimonials = [
  {
    text: (
      <>
        Udemy was rated the{" "}
        <b>most popular online course or certification program</b> for learning
        how to code according to{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          StackOverflow’s 2023 Developer survey
        </a>
        .
      </>
    ),
    author: "Stack Overflow",
    role: "37,076 responses collected",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg",
  },
  {
    text: (
      <>
        Udemy was truly a game-changer and a great guide for me as we brought
        Dimensional to life.
      </>
    ),
    author: "Alvin Lim",
    role: "Technical Co-Founder, CTO at Dimensional",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: (
      <>
        Udemy gives you the ability to be persistent. I learned exactly what I
        needed to know in the real world. It helped me sell myself to{" "}
        <b>get a new role</b>.
      </>
    ),
    author: "William A. Wachlin",
    role: "Partner Account Manager at Amazon Web Services",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    text: (
      <>
        With Udemy Business employees were able to marry the two together,
        technology and consultant soft skills… to help drive their careers
        forward.
      </>
    ),
    author: "Ian Stevens",
    role: "Head of Capability Development, North America at Publicis Sapient",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800">
          Join others transforming their lives through learning
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col justify-between"
            >
              <p className="text-gray-700 text-sm sm:text-base mb-6">
                ❝ {t.text} ❞
              </p>
              <div className="flex items-center gap-4 mt-auto">
                {t.image && (
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
