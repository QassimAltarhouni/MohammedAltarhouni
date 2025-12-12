import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledMediaSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .media-intro {
    color: var(--slate);
    margin: 0 0 25px;
  }

  .media-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .media-item {
    position: relative;
    padding: 24px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    @media (prefers-reduced-motion: no-preference) {
      &:hover,
      &:focus-within {
        transform: translateY(-5px);
      }
    }

    h3 {
      font-size: var(--fz-xl);
      margin-bottom: 10px;
      color: var(--lightest-slate);
    }

    .media-description {
      color: var(--light-slate);
      font-size: var(--fz-md);
      margin-bottom: 16px;

      p {
        margin: 0;
      }
    }

    .media-link {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      display: inline-flex;
      align-items: center;
      gap: 8px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const Media = () => {
  const data = useStaticQuery(graphql`
    query {
      media: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/media/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              link
              cta
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealIntro = useRef(null);
  const revealMedia = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealIntro.current, srConfig());
    revealMedia.current.forEach((ref, i) => sr.reveal(ref, srConfig((i + 1) * 100)));
  }, [prefersReducedMotion]);

  const mediaItems = data.media.edges;

  return (
    <StyledMediaSection id="media">
      <h2 className="numbered-heading" ref={revealTitle}>
        Media &amp; Public Communication
      </h2>
      <p className="media-intro" ref={revealIntro}>
        Here are a couple of public communication videos I appeared in, mainly focused on explaining digital services and guiding users through online processes.
      </p>

      <ul className="media-grid">
        {mediaItems.map(({ node }, i) => {
          const {
            frontmatter: { title, link, cta },
            html,
          } = node;

          return (
            <li className="media-item" key={title} ref={el => (revealMedia.current[i] = el)}>
              <h3>{title}</h3>
              <div className="media-description" dangerouslySetInnerHTML={{ __html: html }} />
              {link && (
                <a className="media-link" href={link} target="_blank" rel="noreferrer">
                  {cta || 'View Media'}
                  <Icon name="External" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </StyledMediaSection>
  );
};

export default Media;
