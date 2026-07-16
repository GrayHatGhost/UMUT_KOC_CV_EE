"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ImageIcon,
} from "lucide-react";

import {
  projects,
  type Project,
} from "@/src/content/projects";

const ProjectModal = dynamic(
  () => import("@/components/projects/ProjectModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.7,
              delay,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsScene() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [failedCovers, setFailedCovers] = useState<
    Set<string>
  >(() => new Set());

  const markCoverAsFailed = (projectId: string) => {
    setFailedCovers((current) => {
      const next = new Set(current);
      next.add(projectId);
      return next;
    });
  };

  return (
    <>
      <section
        className="projects-apple page-section"
        aria-labelledby="projects-title"
      >
        <div className="site-wrap">
          <div className="projects-apple__intro-grid">
            <Reveal className="projects-apple__intro-main">
              <article className="apple-card projects-apple__intro-card">
                <div>
                  <p className="card-eyebrow">
                    DİJİTAL OPERASYON ÇALIŞMASI
                  </p>

                  <h2
                    id="projects-title"
                    className="projects-apple__title"
                  >
                    İçerik, panel ve yayın akışını
                    <span>birlikte yönetmek.</span>
                  </h2>
                </div>

                <p className="projects-apple__intro-copy">
                  Yönetim paneli kullanımı, içerik doğruluğu,
                  görsel hazırlama, yayın kontrolü ve
                  güncelleme takibini gerçek bir çalışma
                  içinde yürüttüğüm devam eden deneyim.
                </p>
              </article>
            </Reveal>

            <Reveal
              delay={0.08}
              className="projects-apple__intro-side"
            >
              <aside className="apple-card apple-card--dark projects-apple__stat-card">
                <div>
                  <p className="card-eyebrow">
                    DEVAM EDEN OPERASYON
                  </p>

                  <p className="projects-apple__stat-heading">
                    Genç Savunma
                  </p>
                </div>

                <p className="projects-apple__stat-copy">
                  İçerik girişinden yayın sonrası
                  güncellemeye kadar süreci düzenli, takip
                  edilebilir ve sürdürülebilir tutmaya
                  odaklanıyorum.
                </p>
              </aside>
            </Reveal>
          </div>

          <div className="projects-apple__grid">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 0.07}
                className="projects-apple__item"
              >
                <ProjectCard
                  project={project}
                  imageFailed={failedCovers.has(project.id)}
                  onImageError={() =>
                    markCoverAsFailed(project.id)
                  }
                  onOpen={() =>
                    setSelectedProject(project)
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style jsx global>{`
        .projects-apple {
          overflow: clip;
        }

        .projects-apple__intro-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.28fr)
            minmax(340px, 0.72fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .projects-apple__intro-main,
        .projects-apple__intro-side {
          min-width: 0;
          height: 100%;
        }

        .projects-apple__intro-card,
        .projects-apple__stat-card {
          min-height: 430px;
          height: 100%;
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          gap: var(--content-gap-2xl);
        }

        .projects-apple__title {
          max-width: 14ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 850;
          letter-spacing: -0.062em;
          line-height: 1;
          text-wrap: balance;
        }

        .projects-apple__title span {
          display: block;
          margin-top: 0.08em;
          color: var(--ink-3);
        }

        .projects-apple__intro-copy {
          max-width: 62ch;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .projects-apple__stat-heading {
          max-width: 9ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2.6rem, 5vw, 5rem);
          font-weight: 850;
          letter-spacing: -0.065em;
          line-height: 0.96;
          text-wrap: balance;
        }

        .projects-apple__stat-copy {
          max-width: 34ch;
          color: var(--ink-inverse-2);
          font-size: 0.95rem;
          line-height: 1.68;
        }

        .projects-apple__grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--grid-gap);
          margin-top: var(--grid-gap);
        }

        .projects-apple__item {
          width: 100%;
          min-width: 0;
        }

        @media (max-width: 980px) {
          .projects-apple__intro-grid {
            grid-template-columns: 1fr;
          }

          .projects-apple__intro-card,
          .projects-apple__stat-card {
            min-height: 390px;
          }
        }

        @media (max-width: 720px) {
          .projects-apple__intro-card,
          .projects-apple__stat-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  );
}

function ProjectCard({
  project,
  imageFailed,
  onImageError,
  onOpen,
}: {
  project: Project;
  imageFailed: boolean;
  onImageError: () => void;
  onOpen: () => void;
}) {
  const cover = project.images[0];
  const hasCover = Boolean(cover?.src) && !imageFailed;

  return (
    <button
      type="button"
      className="apple-card apple-card--interactive project-card"
      onClick={onOpen}
      aria-label={`${project.title} çalışmasını incele`}
    >
      <div className="project-card__media">
        {hasCover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            className="project-card__image"
            onError={onImageError}
          />
        ) : (
          <div className="project-card__fallback">
            <ImageIcon
              size={28}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <strong>{project.title}</strong>
            <span>Devam eden dijital operasyon</span>
          </div>
        )}

        <span className="project-card__number">
          {project.number}
        </span>
      </div>

      <div className="project-card__content">
        <div>
          <div className="project-card__categories">
            {project.category
              .split(" · ")
              .slice(0, 3)
              .map((category) => (
                <span key={category}>{category}</span>
              ))}
          </div>

          <h3 className="project-card__title">
            {project.title}
          </h3>

          <p className="project-card__copy">
            {project.shortDescription}
          </p>
        </div>

        <span className="project-card__action">
          Çalışmayı incele
          <ArrowUpRight
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
      </div>

      <style jsx>{`
        .project-card {
          width: 100%;
          min-width: 0;
          min-height: 430px;
          display: grid;
          grid-template-columns:
            minmax(0, 1.12fr)
            minmax(360px, 0.88fr);
          grid-template-rows: 1fr;
          padding: 0;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
        }

        .project-card__media {
          position: relative;
          min-width: 0;
          min-height: 0;
          aspect-ratio: 16 / 9;
          align-self: center;
          overflow: hidden;
          margin: 0.7rem 0 0.7rem 0.7rem;
          border-radius: calc(var(--radius-lg) - 9px);
          background: linear-gradient(
            145deg,
            #eeeef1,
            #e3e3e7
          );
        }

        .project-card__image {
          object-fit: contain;
          object-position: center;
          background: #e9e9ed;
          transition: transform 0.7s var(--ease);
        }

        .project-card:hover .project-card__image {
          transform: scale(1.025);
        }

        .project-card__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          padding: 2rem;
          color: var(--ink-3);
          text-align: center;
        }

        .project-card__fallback strong {
          max-width: 22ch;
          color: var(--ink);
          font-size: clamp(1.6rem, 2.8vw, 2.8rem);
          font-weight: 820;
          letter-spacing: -0.05em;
          line-height: 1.04;
          text-wrap: balance;
        }

        .project-card__fallback span {
          font-size: 0.64rem;
          font-weight: 740;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .project-card__number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          min-width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-xs);
          color: var(--ink);
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .project-card__content {
          min-width: 0;
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          gap: 1.75rem;
          padding: clamp(2rem, 3vw, 2.6rem);
        }

        .project-card__categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.42rem;
        }

        .project-card__categories span {
          display: inline-flex;
          padding: 0.38rem 0.62rem;
          border-radius: 999px;
          background: var(--surface-2);
          color: var(--ink-3);
          font-size: 0.6rem;
          font-weight: 740;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-card__title {
          max-width: 18ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: clamp(2.1rem, 4vw, 4rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 1;
          text-wrap: balance;
        }

        .project-card__copy {
          max-width: 58ch;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: 0.95rem;
          line-height: 1.68;
        }

        .project-card__action {
          min-height: 24px;
          display: inline-flex;
          align-items: center;
          align-self: end;
          gap: 0.48rem;
          color: var(--ink);
          font-size: 0.75rem;
          font-weight: 740;
        }

        .project-card__action :global(svg) {
          transition: transform 0.3s var(--ease);
        }

        .project-card:hover
          .project-card__action
          :global(svg) {
          transform: translate(3px, -3px);
        }

        @media (max-width: 900px) {
          .project-card {
            min-height: auto;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto auto;
          }

          .project-card__media {
            min-height: 0;
            aspect-ratio: 16 / 9;
            margin: 0.55rem 0.55rem 0;
          }

          .project-card__content {
            padding: 1.5rem;
          }

          .project-card__title {
            max-width: 22ch;
          }
        }

        @media (max-width: 720px) {
          .project-card {
            grid-template-rows: auto auto;
          }

          .project-card__media {
            min-height: 0;
            aspect-ratio: 16 / 9;
          }

          .project-card__content {
            gap: 1.4rem;
            padding: 1.3rem;
          }

          .project-card__categories span {
            white-space: normal;
          }

          .project-card__title {
            max-width: none;
            font-size: clamp(1.7rem, 8vw, 2.4rem);
            line-height: 1.07;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .project-card:hover .project-card__image {
            transform: none;
          }

          .project-card:hover
            .project-card__action
            :global(svg) {
            transform: none;
          }
        }
      `}</style>
    </button>
  );
}
