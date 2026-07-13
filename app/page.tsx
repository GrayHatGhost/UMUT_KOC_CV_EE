"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import SiteHeader from "@/components/layout/SiteHeader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ContactScene from "@/components/scenes/ContactScene";
import DesignArchiveScene from "@/components/scenes/DesignArchiveScene";
import GrowthScene from "@/components/scenes/GrowthScene";
import HeroScene from "@/components/scenes/HeroScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import StoryScene from "@/components/scenes/StoryScene";
import VisualLayers from "@/components/visual/VisualLayers";

const CvModal = dynamic(
  () => import("@/components/cv/CvModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const SECTIONS = [
  "giris",
  "hikayem",
  "gelisim",
  "projeler",
  "tasarim",
  "iletisim",
] as const;

type SectionId = (typeof SECTIONS)[number];

function isSectionId(value: string): value is SectionId {
  return SECTIONS.includes(value as SectionId);
}

export default function Home() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<SectionId>("giris");

  const openCv = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  const closeCv = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  useEffect(() => {
    const hashSection = window.location.hash.replace("#", "");

    if (isSectionId(hashSection)) {
      setActiveSection(hashSection);
    }

    const elements = SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visibility = new Map<SectionId, boolean>(
      SECTIONS.map((id) => [id, false]),
    );

    const selectClosestVisibleSection = () => {
      const viewportCenter = window.innerHeight / 2;

      const visibleSections = SECTIONS.filter(
        (id) => visibility.get(id) === true,
      )
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;

          return {
            id,
            distance: Math.abs(sectionCenter - viewportCenter),
          };
        })
        .filter(
          (
            item,
          ): item is {
            id: SectionId;
            distance: number;
          } => item !== null,
        )
        .sort((a, b) => a.distance - b.distance);

      const nextSection = visibleSections[0]?.id;

      if (!nextSection) return;

      setActiveSection((currentSection) =>
        currentSection === nextSection
          ? currentSection
          : nextSection,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement)
            .id as SectionId;

          if (!isSectionId(id)) return;

          visibility.set(id, entry.isIntersecting);
        });

        selectClosestVisibleSection();
      },
      {
        rootMargin: "-28% 0px -42% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeSectionIndex = useMemo(
    () => SECTIONS.indexOf(activeSection),
    [activeSection],
  );

  const getSceneClass = (id: SectionId) => {
    const sectionIndex = SECTIONS.indexOf(id);

    if (sectionIndex < activeSectionIndex) {
      return "scene scene-behind";
    }

    if (sectionIndex === activeSectionIndex) {
      return "scene scene-active";
    }

    return "scene scene-ahead";
  };

  return (
    <>
      <VisualLayers />
      <ScrollProgress />

      <SiteHeader
        activeSection={activeSection}
        onOpenCV={openCv}
      />

      <main className="page-shell">
        <div
          id="giris"
          className={getSceneClass("giris")}
          data-scene-index="0"
        >
          <HeroScene onOpenCV={openCv} />
        </div>

        <div
          id="hikayem"
          className={getSceneClass("hikayem")}
          data-scene-index="1"
        >
          <StoryScene />
        </div>

        <div
          id="gelisim"
          className={getSceneClass("gelisim")}
          data-scene-index="2"
        >
          <GrowthScene />
        </div>

        <div
          id="projeler"
          className={getSceneClass("projeler")}
          data-scene-index="3"
        >
          <ProjectsScene />
        </div>

        <div
          id="tasarim"
          className={getSceneClass("tasarim")}
          data-scene-index="4"
        >
          <DesignArchiveScene />
        </div>

        <div
          id="iletisim"
          className={getSceneClass("iletisim")}
          data-scene-index="5"
        >
          <ContactScene />
        </div>
      </main>

      {isCvOpen && (
        <CvModal
          isOpen={isCvOpen}
          onClose={closeCv}
        />
      )}
    </>
  );
}
