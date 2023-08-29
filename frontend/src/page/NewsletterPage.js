import React from "react";

import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
};

const NewsletterPage = () => {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
};

export default NewsletterPage;