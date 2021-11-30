import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Relative Imports

const markdown = `

## Attack Vector Preventions

1. [https://swcregistry.io/docs/SWC-100](https://swcregistry.io/docs/SWC-100)

- Problem: Function Default Visibility
- Solution: Correctly define default function Visibilities

2. [https://swcregistry.io/docs/SWC-105](https://swcregistry.io/docs/SWC-105)

- Problem: Unprotected Ether Withdrawal
- Solution: Provide correct access control
`;

const Attacks = () => {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default Attacks;
