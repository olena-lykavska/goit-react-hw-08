import PageTitle from "../../components/PageTitle/PageTitle";

export default function HomePage() {
  return (
    <div>
      <PageTitle>
        Welcome{" "}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </PageTitle>
      <p>
        My name is Olena, and this is my final project in React. This application
        is designed as a contact book where users can register, add their contacts,
        search for them, and delete any unwanted ones. The application ensures privacy,
        as all data is securely stored and will be inaccessible once a user logs out.
        Each user has their own private set of contacts, and the information is completely
        isolated from others. This project showcases my skills in React, user authentication,
        state management, and ensuring data privacy within a web application.
      </p>
      <p>
        I graduated with honors from Ivan Franko National University of Lviv in 2021,
        completing my Master's degree in Mathematics from the Faculty of Mechanics and
        Mathematics. During my studies, I had the opportunity to spend a semester in Norway,
        where I specialized in system dynamics. This experience broadened my analytical thinking
        and deepened my understanding of complex systems, which I find particularly fascinating.
      </p>
      <p>
        My passion for mathematics has driven both my academic and professional endeavors.
        Since 2018, I have worked as a mathematics tutor, helping students grasp challenging
        mathematical concepts. This role has not only reinforced my knowledge of mathematics
        but also refined my communication skills, enabling me to explain complex topics in
        an engaging and understandable way.
      </p>
      <p>
        As a highly organized individual with a keen eye for detail, I enjoy working in structured
        environments where precision and clarity are essential. My goal is to continually enhance
        my skills and apply them to solve real-world problems. I am excited about the opportunities
        ahead and look forward to contributing my expertise to dynamic and impactful projects.
      </p>
    </div>
  );
}
