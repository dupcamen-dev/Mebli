import contentData from "../../data/content.json";

export interface ContentData {
  hero: {
    subtitle: string;
    heading1: string;
    headingAccent: string;
    heading2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  process: {
    subtitle: string;
    heading: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  categories: {
    subtitle: string;
    heading: string;
    description: string;
  };
  reviews: {
    subtitle: string;
    heading: string;
    description: string;
    items: { name: string; location: string; project: string; text: string }[];
    stats: { value: string; label: string }[];
  };
  contact: {
    subtitle: string;
    heading: string;
    description: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    socialLabel: string;
    formNameLabel: string;
    formNamePlaceholder: string;
    formPhoneLabel: string;
    formPhonePlaceholder: string;
    formEmailLabel: string;
    formEmailPlaceholder: string;
    formMessageLabel: string;
    formMessagePlaceholder: string;
    formSubmitting: string;
    formSubmit: string;
    formError: string;
    successHeading: string;
    successDescription: string;
    successOrderLabel: string;
    successTrackLink: string;
  };
  navbar: {
    brand: string;
    backToSite: string;
    links: { href: string; label: string }[];
    admin: string;
    tracking: string;
    cta: string;
    signIn: string;
    signOut: string;
    signInGoogle: string;
    adminPanel: string;
  };
  footer: {
    brand: string;
    description: string;
    categoriesHeading: string;
    navigationHeading: string;
    tracking: string;
    copyright: string;
    credit: string;
  };
  scrollToTop: {
    contactsLabel: string;
    topLabel: string;
  };
  track: {
    subtitle: string;
    heading: string;
    description: string;
    placeholder: string;
    button: string;
    searching: string;
    notFound: string;
    status: { new: string; in_progress: string; completed: string; cancelled: string };
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const content: ContentData = contentData as ContentData;
