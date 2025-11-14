import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Flutter (Dart)',
    'Angular',
    'TypeScript',
    'React (Next.js)',
    'Node.js (Express)',
    'Python',
    'Java',
    'SQL (PostgreSQL, MySQL)',
    'MongoDB',
    'Firebase',
    'REST APIs · Swagger/OpenAPI',
    'Socket.IO',
    'Oracle PL/SQL',
    'Tailwind CSS',
  ];
  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Mohammed,
              and I love building secure technology that real people rely on every day.
              My journey in software started in the banking world,
              where I discovered how much impact well-built digital solutions can have,
              especially when millions of customers depend on them for their daily needs.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of contributing to
              digital innovation in finance — from supporting IT operations at{' '}
              <a href="https://www.aman-bank.com/en/personal-banking/aman-mobile" target="_blank" rel="noopener noreferrer">
                a leading national bank
              </a>
              , to enhancing core systems with{' '}
              <a href="https://jmrinfotech.com/" target="_blank" rel="noopener noreferrer">
                an international consulting team
              </a>
              , optimizing backend systems with{' '}
              <a href="https://www.axiata.com/" target="_blank" rel="noopener noreferrer">
                a global telecommunications group
              </a>
              , and building modern mobile banking experiences at{' '}
              <a href="https://masarat.ly/en/" target="_blank" rel="noopener noreferrer">
                a fintech solutions company
              </a>
              , along with gaining global exposure through{' '}
              <a href="https://www.alrajhibank.com.sa/en" target="_blank" rel="noopener noreferrer">
                a major international bank
              </a>
              . My focus has always been delivering secure and reliable digital products that people trust.
            </p>

            <p>
              I’m currently pursuing a master’s degree in computer engineering
              at{' '}
              <a href="https://pwr.edu.pl/en/" target="_blank" rel="noopener noreferrer">
                Wrocław University of Science and Technology
              </a>
              , where I’m expanding my skills in machine learning, secure systems, and
              intelligent technologies — while continuing to build software that makes
              a real impact.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
