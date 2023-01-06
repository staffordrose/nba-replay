import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { css } from '@emotion/react';
import { seasons } from '@/common/data';
import { Image } from '@/components';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Seasons | NBA REPLAY</title>
        <meta name='description' content='View seasons.' />
      </Head>

      <main
        css={(theme) => css`
          display: flex;
          flex-direction: column;
          width: ${theme.width.full};
          max-width: ${theme.maxWidth['5xl']};
          min-height: calc(${theme.height.screen} - ${theme.height[16]});
          margin: ${theme.margin.center};
        `}
      >
        <div
          css={(theme) => css`
            width: ${theme.width.full};
            padding: 0 ${theme.padding[2]};
            text-align: center;

            @media (min-width: ${theme.breakpoints.sm}) {
              padding: 0 ${theme.padding[3]};
            }
          `}
        >
          <h1>Seasons</h1>
        </div>

        <div
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            gap: ${theme.space[5]};

            @media (min-width: ${theme.breakpoints.sm}) {
              gap: ${theme.space[6]};
              padding: ${theme.padding[3]};
            }
          `}
        >
          {Object.values(seasons).map(({ id, year, image }, i) => {
            return (
              <div
                key={id}
                css={(theme) => css`
                  width: ${theme.width.full};
                  height: ${theme.height[144]};
                  padding: ${theme.borderWidth[6]} 0;
                  background: linear-gradient(
                    135deg,
                    ${theme.colors.primary[50]},
                    ${theme.colors.primary[100]}
                  );
                  cursor: pointer;

                  & > * {
                    user-select: none;
                  }

                  & > span {
                    position: relative;
                    overflow: hidden;
                    display: grid;
                    grid-template-rows: 1fr ${theme.space[8]};
                    align-items: center;
                    width: ${theme.width.full};
                    height: ${theme.height.full};
                    background-color: ${theme.colors.primary[50]};

                    &::before {
                      content: '';
                      position: absolute;
                      z-index: 1;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      background-color: ${theme.colors.primary[100]};
                      opacity: 0;
                      transition: opacity 200ms ease-in-out;
                    }
                  }

                  &:hover {
                    & > span {
                      &::before {
                        opacity: 0.25;
                      }
                    }
                  }

                  &:active {
                    & > span {
                      &::before {
                        opacity: 0.5;
                      }
                    }
                  }

                  @media (min-width: ${theme.breakpoints.sm}) {
                    padding: ${theme.borderWidth[6]};
                    border-radius: ${theme.borderRadius['3xl']};

                    & > span {
                      border-radius: ${theme.borderRadius['2xl']};
                    }
                  }
                `}
              >
                <span>
                  <div
                    css={(theme) => css`
                      position: absolute;
                      top: 0;
                      left: 0;
                      overflow: hidden;
                      width: ${theme.width.full};
                      height: ${theme.height.full};
                      background-color: ${theme.colors.primary[50]};
                    `}
                  >
                    <Image
                      src={image.src}
                      alt={id}
                      layout='fill'
                      objectFit='cover'
                      priority={i < 2 ? true : false}
                    />
                  </div>

                  <Link href={`/${year}`}>
                    <a
                      css={(theme) => css`
                        position: relative;
                        z-index: 2;
                        display: flex;
                        justify-content: end;
                        align-items: center;
                        width: ${theme.width.full};
                        height: ${theme.height.full};
                        padding-top: ${theme.space[8]};
                        padding-left: ${theme.padding[3]};
                        padding-right: ${theme.padding[3]};

                        & > span {
                          position: relative;
                          font-size: 72px;
                          font-weight: ${theme.fontWeight.medium};
                          text-align: right;
                          text-decoration: none;
                          color: ${theme.colors.primary[50]};

                          & > span.year-separator {
                            position: relative;
                            top: 8px;
                            font-size: 96px;
                            color: ${theme.colors.primary[500]};
                          }
                        }

                        @media (min-width: ${theme.breakpoints.sm}) {
                          padding-left: ${theme.padding[4]};
                          padding-right: ${theme.padding[4]};

                          & > span {
                            font-size: 128px;

                            & > span.year-separator {
                              font-size: 144px;
                            }
                          }
                        }
                      `}
                    >
                      <span>
                        <span>{year}</span>
                        <span className='year-separator'>/</span>
                        <span>{(year + 1).toString().slice(2)}</span>
                      </span>
                    </a>
                  </Link>

                  <p
                    css={(theme) => css`
                      position: relative;
                      z-index: 2;
                      width: ${theme.width.full};
                      height: ${theme.height.full};
                      margin: 0;
                      padding: ${theme.padding[2]} ${theme.padding[3]};
                      font-size: ${theme.fontSize.xs};
                      line-height: ${theme.lineHeight.base};
                      color: ${theme.colors.white};
                      cursor: default;

                      & > * {
                        opacity: 0.25;
                      }

                      & > a {
                        text-decoration: none;
                        color: ${theme.colors.white};
                      }
                      & > a:hover {
                        opacity: 1;
                      }

                      @media (min-width: ${theme.breakpoints.sm}) {
                        padding-left: ${theme.padding[4]};
                        padding-right: ${theme.padding[4]};
                      }
                    `}
                  >
                    {image.credit?.person && (
                      <>
                        <span>Photo by</span>{' '}
                        {image.credit.personUrl ? (
                          <a href={image.credit.personUrl}>
                            {image.credit.person}
                          </a>
                        ) : (
                          <span>{image.credit.person}</span>
                        )}
                        {!!image.credit.company && (
                          <>
                            {' '}
                            <span>on</span>{' '}
                            {image.credit.companyUrl ? (
                              <a href={image.credit.companyUrl}>
                                {image.credit.company}
                              </a>
                            ) : (
                              <span>{image.credit.company}</span>
                            )}
                          </>
                        )}
                        <span>.</span>
                      </>
                    )}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
