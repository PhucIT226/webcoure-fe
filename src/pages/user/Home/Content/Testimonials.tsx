// import "../../../../styles/user/home/Testimonials.scss";
const testimonials = [
  {
    text: (
      <>
        Udemy was rated the{" "}
        <b>most popular online course or certification program</b> for learning
        how to code according to{" "}
        <a href="#" className="highlight">
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
    <section className="testimonials">
      <div className="container">
        <h2 className="title">
          Join others transforming their lives through learning
        </h2>
        <div className="cards">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="quote">❝ {t.text} ❞</p>
              <div className="user">
                {t.image && <img src={t.image} alt={t.author} />}
                <div>
                  <p className="author">{t.author}</p>
                  <p className="role">{t.role}</p>
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
