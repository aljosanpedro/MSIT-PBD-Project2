"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "tl" | "ceb";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const translations: Record<Exclude<Language, "en">, Record<string, string>> = {
  tl: {
    "Davao Tele-Mental Health": "Tele-Mental Health ng Davao",
    "Book Appointment": "Mag-book ng Appointment",
    "Ask Questions": "Magtanong",
    "Make a Payment": "Magbayad",
    "Log In": "Mag-log In",
    "Log Out": "Mag-log Out",
    "Sign Up": "Mag-sign Up",
    "Kalagyo connects people in Davao and beyond with compassionate, accessible tele-mental health support from the comfort of home.":
      "Ikinokonekta ng Kalagyo ang mga tao sa Davao at iba pa sa mahabagin at madaling ma-access na tele-mental health support mula sa tahanan.",
    "Our platform makes it easier to find a clinician who understands your needs and to take the first step toward better mental well-being.":
      "Pinapadali ng aming platform ang paghahanap ng clinician na nakauunawa sa iyong mga pangangailangan at ang pagsisimula tungo sa mas mabuting kalusugang pangkaisipan.",
    "Browse available professionals, learn about their areas of support, and book an appointment that fits your schedule.":
      "Tingnan ang mga available na propesyonal, alamin ang kanilang mga larangan ng suporta, at mag-book ng appointment na akma sa iyong iskedyul.",
    "Whether you are managing stress, navigating a life transition, or looking for ongoing support, you do not have to face it alone.":
      "Kahit ikaw ay humaharap sa stress, pagbabago sa buhay, o naghahanap ng patuloy na suporta, hindi mo kailangang harapin ito nang mag-isa.",
    "Start by exploring our services, asking a question, or booking a consultation with a member of the Kalagyo care community.":
      "Magsimula sa pagtingin sa aming mga serbisyo, pagtatanong, o pag-book ng konsultasyon sa isang miyembro ng komunidad ng Kalagyo.",
    "Email": "Email",
    "Password": "Password",
    "Confirm Password": "Kumpirmahin ang Password",
    "No account?": "Wala pang account?",
    "Already have an account?": "May account ka na?",
    "Frequently Asked Questions": "Mga Madalas Itanong",
    "Still have questions?": "May mga tanong pa?",
    "What is Kalagyo?": "Ano ang Kalagyo?",
    "Who can use Kalagyo?": "Sino ang maaaring gumamit ng Kalagyo?",
    "How do I book an appointment?": "Paano ako mag-book ng appointment?",
    "Name": "Pangalan",
    "Contact Details": "Mga Detalye ng Pakikipag-ugnayan",
    "What kind of question do you have?": "Anong uri ng tanong ang mayroon ka?",
    "General Information": "Pangkalahatang Impormasyon",
    "Appointment": "Appointment",
    "Payment": "Bayad",
    "Mental Health Support": "Suporta sa Kalusugang Pangkaisipan",
    "What's your question?": "Ano ang iyong tanong?",
    "Choose File": "Pumili ng File",
    "Submit": "Isumite",
    "Return Home": "Bumalik sa Home",
    "Payments": "Mga Bayad",
    "Place your booking code here": "Ilagay dito ang booking code",
    "View Bill": "Tingnan ang Bill",
    "Request Bill Changes": "Humiling ng Pagbabago sa Bill",
    "Consultation": "Konsultasyon",
    "Service fee": "Bayad sa serbisyo",
    "Total": "Kabuuan",
    "What change would you like to request?": "Anong pagbabago ang nais mong hilingin?",
    "Bill amount": "Halaga ng bill",
    "Service details": "Mga detalye ng serbisyo",
    "Personal details": "Mga personal na detalye",
    "Other": "Iba pa",
    "Any details that could help us?": "May iba pa bang detalye na makatutulong sa amin?",
    "Pay": "Magbayad",
    "Appointment Calendar": "Kalendaryo ng Appointment",
    "Available times for": "Mga available na oras para sa",
    "Confirm": "Kumpirmahin",
    "Available": "Available",
    "Search by day of week, service, symptoms, clinician name...":
      "Maghanap ayon sa araw, serbisyo, sintomas, o pangalan ng clinician...",
    "Book": "Mag-book",
    "Legal stuff applies": "Nalalapat ang mga legal na tuntunin",
  },
  ceb: {
    "Davao Tele-Mental Health": "Tele-Mental Health sa Davao",
    "Book Appointment": "Mag-book og Appointment",
    "Ask Questions": "Pangutana",
    "Make a Payment": "Mobayad",
    "Log In": "Mag-log In",
    "Log Out": "Mag-log Out",
    "Sign Up": "Mag-sign Up",
    "Kalagyo connects people in Davao and beyond with compassionate, accessible tele-mental health support from the comfort of home.":
      "Gikonektar sa Kalagyo ang mga tawo sa Davao ug sa unahan ngadto sa malumo ug sayon ma-access nga tele-mental health support gikan sa panimalay.",
    "Our platform makes it easier to find a clinician who understands your needs and to take the first step toward better mental well-being.":
      "Gipasayon sa among plataporma ang pagpangita og clinician nga nakasabut sa imong mga panginahanglan ug ang unang lakang padulong sa mas maayong kahimsog sa hunahuna.",
    "Browse available professionals, learn about their areas of support, and book an appointment that fits your schedule.":
      "Tan-awa ang mga available nga propesyonal, hibaloi ang ilang mga natad sa suporta, ug mag-book og appointment nga angay sa imong iskedyul.",
    "Whether you are managing stress, navigating a life transition, or looking for ongoing support, you do not have to face it alone.":
      "Bisan nag-atubang ka sa stress, kausaban sa kinabuhi, o nangita og padayon nga suporta, dili nimo kinahanglan atubangon kini nga ikaw ra.",
    "Start by exploring our services, asking a question, or booking a consultation with a member of the Kalagyo care community.":
      "Sugdi pinaagi sa pagsusi sa among mga serbisyo, pagpangutana, o pag-book og konsultasyon uban sa miyembro sa komunidad sa pag-atiman sa Kalagyo.",
    "Email": "Email",
    "Password": "Password",
    "Confirm Password": "Kumpirmahi ang Password",
    "No account?": "Wala pay account?",
    "Already have an account?": "Aduna na kay account?",
    "Frequently Asked Questions": "Kasagarang mga Pangutana",
    "Still have questions?": "Aduna pa kay mga pangutana?",
    "What is Kalagyo?": "Unsa ang Kalagyo?",
    "Who can use Kalagyo?": "Kinsa ang makagamit sa Kalagyo?",
    "How do I book an appointment?": "Unsaon nako pag-book og appointment?",
    "Name": "Ngalan",
    "Contact Details": "Mga Detalye sa Kontak",
    "What kind of question do you have?": "Unsang matang sa pangutana ang imong naa?",
    "General Information": "Kinatibuk-ang Impormasyon",
    "Appointment": "Appointment",
    "Payment": "Bayad",
    "Mental Health Support": "Suporta sa Kahimsog sa Hunahuna",
    "What's your question?": "Unsa ang imong pangutana?",
    "Choose File": "Pili og File",
    "Submit": "Isumite",
    "Return Home": "Balik sa Home",
    "Payments": "Mga Bayad",
    "Place your booking code here": "Ibutang dinhi ang booking code",
    "View Bill": "Tan-awa ang Bill",
    "Request Bill Changes": "Hangyo og Kausaban sa Bill",
    "Consultation": "Konsultasyon",
    "Service fee": "Bayad sa serbisyo",
    "Total": "Kinatibuk-an",
    "What change would you like to request?": "Unsa nga kausaban ang imong hangyoon?",
    "Bill amount": " kantidad sa bill",
    "Service details": "Mga detalye sa serbisyo",
    "Personal details": "Personal nga mga detalye",
    "Other": "Uban pa",
    "Any details that could help us?": "Aduna bay mga detalye nga makatabang kanamo?",
    "Pay": "Mobayad",
    "Appointment Calendar": "Kalendaryo sa Appointment",
    "Available times for": "Mga available nga oras para sa",
    "Confirm": "Kumpirmahi",
    "Available": "Available",
    "Search by day of week, service, symptoms, clinician name...":
      "Pangitaa sumala sa adlaw, serbisyo, sintomas, o ngalan sa clinician...",
    "Book": "Mag-book",
    "Legal stuff applies": "Magamit ang mga legal nga lagda",
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function translateText(value: string, language: Language) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const key = value.trim();
  const translated =
    language === "en"
      ? Object.entries(translations).flatMap(([, dictionary]) =>
          Object.entries(dictionary),
        ).find(([, translation]) => translation === key)?.[0] ?? key
      : translations[language][key] ?? key;
  return translated ? `${leading}${translated}${trailing}` : value;
}

let isTranslating = false;

function translateDocument(language: Language) {
  if (isTranslating) {
    return;
  }
  isTranslating = true;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }
  try {
    nodes.forEach((textNode) => {
      textNode.textContent = translateText(textNode.textContent ?? "", language);
    });
    document
      .querySelectorAll<HTMLElement>("[placeholder], [aria-label]")
      .forEach((element) => {
        ["placeholder", "aria-label"].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (value) {
            element.setAttribute(attribute, translateText(value, language));
          }
        });
      });
  } finally {
    isTranslating = false;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => {
        window.localStorage.setItem("kalagyo-language", nextLanguage);
        setLanguageState(nextLanguage);
      },
    }),
    [language],
  );

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("kalagyo-language");
    const restoreLanguage = window.setTimeout(() => {
      if (storedLanguage === "tl") {
        setLanguageState(storedLanguage);
      } else if (storedLanguage === "ceb") {
        window.localStorage.setItem("kalagyo-language", "en");
      }
    }, 0);
    return () => window.clearTimeout(restoreLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    translateDocument(language);
    const observer = new MutationObserver(() => {
      if (!isTranslating) {
        translateDocument(language);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
