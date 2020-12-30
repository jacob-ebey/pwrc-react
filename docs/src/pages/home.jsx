import * as React from "react";
import { useCallback } from "react";
import { withResources } from "react-lazy-data";
import { Helmet } from "react-helmet-async";

import "../styles/markdown.css";

import Spinner from "../components/spinner";
import TextHero from "../components/text-hero";
import useMailingList from "../hooks/use-mailing-list";

import global from "../../blog/global";

function Home() {
  const [subscribe, { loading, error, subscribed }] = useMailingList();

  const handleSubscribe = useCallback((event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;

    if (!email) {
      return;
    }

    subscribe(email);
  });

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <title>{global.siteName} | About</title>
        <meta name="description" content="Learn more about @PWRC" />
      </Helmet>
      <div className="container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto">
        <TextHero
          title={
            <>
              Coming Soon
              <br />
              <small>
                Create blazing fast websites and apps, both hybrid static &amp;
                server rendered with @PWRC
              </small>
            </>
          }
          details={
            <>
              The "not a framework" react framework that's really just a webpack
              plugin. Don't worry, there is a nice little CLI on top of it 😉
            </>
          }
        />

        <section className="flex flex-wrap mt-32 mb-28">
          <div className="px-8 py-6 lg:w-2/4 md:w-full">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              Suspense on the Server
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              Suspense on the Server is not just a good developer experience but
              forces you to develop amazing user exerience with fallbacks and
              error boundaries
            </p>
            <a
              href="https://github.com/jacob-ebey/pwrc-react/blob/main/examples/ecom-example/src/pages/home.jsx"
              className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 "
            >
              See Example
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </a>
          </div>
          <div className="px-8 py-6 lg:w-2/4 md:w-full">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              @PWRC + Vercel = ❤️
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              @PWRC provides a zero config vercel API handler with built in
              support for SSR stale while revalidate. You are still free to
              pre-render any routes you wish such as a 404 page.
            </p>
            <a
              href="https://github.com/jacob-ebey/pwrc-react/blob/main/examples/static-blog-example/src/vercel.js"
              className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 "
            >
              See Example
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </a>
          </div>
          <div className="px-8 py-6 lg:w-2/4 md:w-full">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              SSG via{" "}
              <code>
                <small className="p-1 bg-gray-100 border-gray-400">
                  @pwrc/static
                </small>
              </code>
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              @PWRC also provides a handler for SSG where all you have to pass
              is a list of routes. The blog for this site will be pre-rendered
              shortly along-side SSR'd stale while revalidate pages.
            </p>
            <a
              href="https://github.com/jacob-ebey/pwrc-react/blob/main/examples/static-blog-example/src/static.js"
              className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 "
            >
              See Example
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </a>
          </div>
          <div className="px-8 py-6 lg:w-2/4 md:w-full">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              Lower Level Prerender
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              All of the provided wrappers utilize the{" "}
              <code>
                <small className="p-1 bg-gray-100 border-gray-400">
                  @pwrc/prerender
                </small>
              </code>{" "}
              package. This is a simple function that accepts a path and
              basename and returns rendered HTML along with number for use with
              a cache-control header.
            </p>
            <a
              href="https://github.com/jacob-ebey/pwrc-react/blob/main/packages/vercel/index.js"
              className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 "
            >
              See Usage
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </a>
          </div>
        </section>

        <div className="flex flex-wrap mb-32">
          <div className="px-8 py-6 text-left lg:w-2/4 md:w-full lg:border-r">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              Subscribe for Email Alerts
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              {!subscribed
                ? "You're not going to want to miss these updates."
                : "Thanks for subscribing for updates!"}
            </p>
            {loading ? (
              <Spinner className="ml-2" size={8} />
            ) : (
              !subscribed && (
                <form
                  onSubmit={handleSubscribe}
                  className="flex justify-center mt-6"
                >
                  <input
                    className="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-purple-700 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white"
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    required
                  />
                  <button className="flex items-center px-4 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:scale-110 focus:ringfocus:outline-none">
                    Subscribe
                  </button>
                </form>
              )
            )}
            {error && (
              <span className="block mt-4 text-red-600">
                something went wrong 😔 try again?
              </span>
            )}
          </div>
          <div className="px-8 py-6 text-left lg:w-2/4 md:w-full">
            <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
              Longer Information 2
            </h2>
            <p className="mb-4 text-base leading-relaxed">
              Professionally designed and 100% responsive static templates for
              startups and personal use. .Fingerstache flexitarian street art
              8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
            </p>
          </div>
        </div>

        <TextHero
          className="mb-32"
          small
          title={<>Where did this come from?</>}
          details={
            <>
              This came about in research and preparation for enabling
              distributed rendering and federated architectures at scale, this
              includes SSR, chunk pre-loading and more.
            </>
          }
        />

        <TextHero
          className="mb-32"
          small
          title={<>Who should use this?</>}
          details={
            <>
              Everyone with a curious mind should give it a go, but use it in
              production at your own risk. The more feedback I get once
              distributed rendering and federation support drop, the faster we
              can get this to production!
            </>
          }
        />
      </div>
    </>
  );
}

export default Home;
