import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Antonio Valentini",
  DESCRIPTION: "Yet another developer blog.",
  EMAIL: "info [at] antoniovalentini [dot] com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Yet another developer blog.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)",
    HREF: "https://twitter.com/Mediatore88",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/antoniovalentini",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/antonio-valentini-a4577a4a/",
  },
];
