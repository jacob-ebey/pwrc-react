import * as React from "react";
import lazy from "react-lazy-ssr";
import { Helmet } from "react-helmet-async";
import TextHero from "../components/text-hero";

import useCacheControl from "@pwrc/cache-control";

const ClientCategoryGrid = lazy(() => CategoryGrid, { ssr: false });

function Home() {
  useCacheControl(300);

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <title>Brand | About</title>
        <meta name="description" content="Learn more about @PWRC" />
      </Helmet>
      <div className="container mx-auto px-6">
        <main className="my-8">
          <TextHero
            title="Built with @PWRC"
            details="A better experience for your developers and less stress on your team team."
            ctaText="Download for Free"
          />
        </main>
      </div>
    </>
  );
}

export default Home;
