"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = ({ params }) => {
  const { code } = params;


  return (
    <div>
      Redirecting to <code>{code}</code>
    </div>
  );
};

export default RedirectPage;
