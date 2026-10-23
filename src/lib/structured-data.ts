const siteUrl = "https://www.edsonpimenta.net";
const profileUpdated = "2026-10-23";
const ids = {
  gran: "https://www.grancursosonline.com.br/#organization",
  person: `${siteUrl}/#person`,
  portrait: `${siteUrl}/#portrait`,
  questoes: `${siteUrl}/#gran-questoes`,
  schematicLd: `${siteUrl}/#schematic-ld`,
  socialImage: `${siteUrl}/#social-image`,
  website: `${siteUrl}/#website`,
};

interface KnowledgeGraphOptions {
  canonicalUrl: string;
  description: string;
  locale: "en-US" | "pt-BR";
  title: string;
}

export const createKnowledgeGraph = ({
  canonicalUrl,
  description,
  locale,
  title,
}: KnowledgeGraphOptions) => {
  const isPortuguese = locale === "pt-BR";
  const pageId = `${canonicalUrl}#profile`;
  const portraitUrl = `${siteUrl}/edson-pimenta.webp`;
  const socialImageUrl = `${siteUrl}/og/edson-pimenta-portfolio.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": ids.website,
        "@type": "WebSite",
        "url": `${siteUrl}/`,
        "name": "Edson Pimenta",
        "description": isPortuguese
          ? "Portfólio bilíngue de Edson Pimenta."
          : "Edson Pimenta's bilingual portfolio.",
        "inLanguage": ["en-US", "pt-BR"],
        "creator": { "@id": ids.person },
      },
      {
        "@id": ids.person,
        "@type": "Person",
        "name": "Edson Pimenta",
        "alternateName": "eddyyxxyy",
        "description": isPortuguese
          ? "Engenheiro de software focado em growth engineering, sistemas de IA e arquitetura web de alta escala."
          : "Software engineer focused on growth engineering, AI systems, and high-scale web architecture.",
        "email": "mailto:dev.edsonpimenta@gmail.com",
        "url": `${siteUrl}/`,
        "image": { "@id": ids.portrait },
        "jobTitle": "Software Engineer, Growth Engineering & AI Systems",
        "worksFor": { "@id": ids.gran },
        "sameAs": [
          "https://github.com/eddyyxxyy",
          "https://www.linkedin.com/in/edsonrobertopimenta/",
          "https://www.youtube.com/@eddyxide",
        ],
        "knowsAbout": [
          "Growth Engineering",
          "Artificial Intelligence",
          "PHP",
          "Symfony",
          "Slim Framework",
          "TypeScript",
          "Node.js",
          "React",
          "Vue.js",
          "Nuxt",
          "Docker",
          "Amazon Web Services",
          "Model Context Protocol",
          "Retrieval-Augmented Generation",
          "JSON-LD",
          "Distributed Systems",
        ],
      },
      {
        "@id": pageId,
        "@type": "ProfilePage",
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "inLanguage": locale,
        "dateModified": profileUpdated,
        "isPartOf": { "@id": ids.website },
        "mainEntity": { "@id": ids.person },
        "primaryImageOfPage": { "@id": ids.socialImage },
      },
      {
        "@id": ids.portrait,
        "@type": "ImageObject",
        "url": portraitUrl,
        "contentUrl": portraitUrl,
        "width": 600,
        "height": 800,
        "caption": "Edson Pimenta",
      },
      {
        "@id": ids.socialImage,
        "@type": "ImageObject",
        "url": socialImageUrl,
        "contentUrl": socialImageUrl,
        "width": 1200,
        "height": 630,
        "caption": isPortuguese
          ? "Portfólio de Edson Pimenta"
          : "Edson Pimenta's portfolio",
      },
      {
        "@id": ids.gran,
        "@type": "Organization",
        "name": "Gran",
        "alternateName": "Gran Cursos Online",
        "url": "https://www.grancursosonline.com.br/",
      },
      {
        "@id": ids.schematicLd,
        "@type": "SoftwareSourceCode",
        "name": "SchematicLD",
        "description": isPortuguese
          ? "Biblioteca privada e sem dependências para gerar e serializar JSON-LD com segurança, projetada e criada por Edson Pimenta para o Gran."
          : "Private zero-dependency library for securely generating and serializing JSON-LD, designed and built by Edson Pimenta for Gran.",
        "author": { "@id": ids.person },
        "copyrightHolder": { "@id": ids.gran },
        "programmingLanguage": ["TypeScript", "JavaScript"],
        "runtimePlatform": "Node.js",
      },
      {
        "@id": ids.questoes,
        "@type": "WebApplication",
        "name": "Gran Questões",
        "url": "https://questoes.grancursosonline.com.br/",
        "description": isPortuguese
          ? "Plataforma de estudos de alta escala do Gran que integra o SchematicLD em sua renderização Nuxt."
          : "Gran's high-scale study platform, which integrates SchematicLD into its Nuxt rendering.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "isBasedOn": { "@id": ids.schematicLd },
        "contributor": { "@id": ids.person },
        "publisher": { "@id": ids.gran },
      },
    ],
  };
};
