import React, { useEffect, useState } from 'react';
import {
  PROJECTS,
  EXPERIENCES,
  SKILLS,
  FAQ_DATA
} from './constants';

import ImageCarousel from './components/ImageCarousel';
import VideoPlayer from './components/VideoPlayer';

import { Project, Experience } from './types';

// ============================================================
// PROJECT DETAIL VIEW
// ============================================================

const ProjectDetailView: React.FC<{
  project: Project;
  onBack: () => void;
}> = ({ project, onBack }) => {
  const [showAllChallenges, setShowAllChallenges] = useState(false);

  const CHALLENGE_PREVIEW_LIMIT = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">

          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all duration-300"
            aria-label="Back to portfolio"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <span className="font-bold text-slate-200">
            Project Details
          </span>

        </div>
      </nav>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 mt-12">

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-800 mb-16 group shadow-2xl">

          <ImageCarousel
            images={project.images}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-8 left-8 right-8">

            <span className="inline-block px-4 py-1.5 bg-copper-600 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
              {project.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
              {project.title}
            </h1>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <section className="animate-in fade-in slide-in-from-left duration-500 delay-100">

              <div className="flex items-center gap-4 mb-8">

                <div className="h-1 w-12 bg-gradient-to-r from-copper-500 to-copper-600 rounded" />

                <h2 className="text-2xl font-black text-white">
                  Overview
                </h2>

              </div>

              <p className="text-lg text-slate-300 leading-relaxed font-light">
                {project.description}
              </p>

            </section>

            {/* Videos */}
            <VideoPlayer
              localVideos={project.localVideos || []}
              youtubeVideos={project.youtubeVideos}
              videoTitle={project.videoTitle}
            />

            {/* Technical Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-200">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Technical Challenges
                  </h2>

                </div>

                <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300">

                  <ul className="list-disc pl-6 space-y-2">

                    {(showAllChallenges
                      ? project.challenges
                      : project.challenges.slice(0, CHALLENGE_PREVIEW_LIMIT)
                    ).map((challenge, index) => (

                      <li
                        key={index}
                        className="text-slate-300 leading-relaxed"
                      >
                        {challenge}
                      </li>

                    ))}

                  </ul>

                  {project.challenges.length > CHALLENGE_PREVIEW_LIMIT && (
                    <div className="mt-4">

                      <button
                        onClick={() =>
                          setShowAllChallenges((value) => !value)
                        }
                        className="text-sm font-bold text-copper-400 hover:underline"
                      >
                        {showAllChallenges
                          ? 'Show less'
                          : `Show all (${project.challenges.length})`
                        }
                      </button>

                    </div>
                  )}

                </div>

              </section>
            )}

            {/* Timeline */}
            {project.timeline && project.timeline.length > 0 && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-300">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-copper-500 to-copper-600 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Project Timeline
                  </h2>

                </div>

                <div className="space-y-8 pl-6 border-l-2 border-slate-700">

                  {project.timeline.map((timeline, index) => (

                    <div
                      key={index}
                      className="relative group"
                    >

                      <div className="absolute -left-8 top-1.5 w-4 h-4 bg-copper-600 rounded-full border-4 border-slate-950 group-hover:bg-emerald-500 transition-colors duration-300 shadow-lg shadow-copper-600/50" />

                      <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 group-hover:border-copper-500/40 transition-all duration-300">

                        <div className="flex items-start justify-between gap-4 mb-2">

                          <h3 className="font-bold text-white text-lg">
                            {timeline.title}
                          </h3>

                          <span className="text-xs font-mono text-copper-400 bg-slate-950 px-3 py-1 rounded whitespace-nowrap">
                            {timeline.date}
                          </span>

                        </div>

                        {timeline.description && (
                          <p className="text-slate-400 leading-relaxed">
                            {timeline.description}
                          </p>
                        )}

                      </div>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {/* Final Outcome */}
            {project.outcome && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-350">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Final Outcome
                  </h2>

                </div>

                <div className="bg-emerald-500/5 p-8 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">

                  <p className="text-slate-200 leading-relaxed">
                    {project.outcome}
                  </p>

                </div>

              </section>
            )}

            {/* Key Results */}
            {project.results && project.results.length > 0 && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-400">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-copper-500 to-emerald-500 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Key Results
                  </h2>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {project.results.map((result, index) => (

                    <div
                      key={index}
                      className="flex gap-4 items-start p-5 bg-slate-900/40 rounded-xl border border-slate-800 hover:border-copper-500/40 transition-all duration-300"
                    >

                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-copper-500/15 flex items-center justify-center mt-0.5">

                        <span className="text-copper-400 font-bold text-sm">
                          •
                        </span>

                      </div>

                      <p className="text-slate-300 leading-relaxed">
                        {result}
                      </p>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {/* Lessons Learned */}
            {project.lessons && project.lessons.length > 0 && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-500">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Lessons Learned
                  </h2>

                </div>

                <div className="space-y-3">

                  {project.lessons.map((lesson, index) => (

                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all duration-300 group"
                    >

                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 group-hover:bg-amber-500/40 transition-colors">

                        <span className="text-amber-400 font-bold text-sm">
                          ✓
                        </span>

                      </div>

                      <p className="text-slate-300 leading-relaxed pt-0.5">
                        {lesson}
                      </p>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {/* Deliverables */}
            {project.artifacts && project.artifacts.length > 0 && (
              <section className="animate-in fade-in slide-in-from-left duration-500 delay-600">

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded" />

                  <h2 className="text-2xl font-black text-white">
                    Deliverables
                  </h2>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {project.artifacts.map((artifact, index) => (

                    <a
                      key={index}
                      href={artifact.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative px-6 py-4 bg-gradient-to-br from-slate-900 to-slate-950 hover:from-emerald-600/10 hover:to-slate-950 rounded-xl font-semibold border border-slate-700 hover:border-emerald-500/50 inline-flex items-center gap-3 transition-all duration-300 overflow-hidden"
                    >

                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/0 transition-all duration-300" />

                      <div className="relative flex items-center gap-3 w-full">

                        <svg
                          className="w-5 h-5 flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <span className="text-sm text-slate-200">
                          {artifact.label}
                        </span>

                      </div>

                    </a>

                  ))}

                </div>

              </section>
            )}

          </div>

          {/* Sidebar */}
          <aside className="space-y-6 animate-in fade-in slide-in-from-right duration-500 delay-100">

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 sticky top-24">

              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">

                <span className="w-2 h-2 bg-copper-600 rounded-full" />

                Technology Stack

              </h3>

              <div className="flex flex-wrap gap-2">

                {project.technologies.map((technology) => (

                  <span
                    key={technology}
                    className="px-3 py-2 bg-slate-950/80 border border-slate-700 hover:border-copper-500/50 rounded-lg text-xs font-semibold text-copper-400 hover:text-copper-300 transition-all duration-300 cursor-default"
                  >
                    {technology}
                  </span>

                ))}

              </div>

            </div>

            <button
              onClick={onBack}
              className="w-full py-4 bg-copper-600 hover:bg-copper-500 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-copper-600/20 hover:shadow-copper-600/40 transform hover:-translate-y-0.5"
            >
              Back to Portfolio
            </button>

          </aside>

        </div>
      </div>
    </div>
  );
};


// ============================================================
// EXPERIENCE VIEW
// ============================================================

const ExperienceView: React.FC<{
  experience: Experience;
  onBack: () => void;
}> = ({ experience, onBack }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">

      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">

          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all duration-300"
            aria-label="Back"
          >

            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

          </button>

          <span className="font-bold text-slate-200">
            Career History
          </span>

        </div>

      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-16 animate-in fade-in slide-in-from-left duration-500">

          <span className="text-copper-500 font-black tracking-widest uppercase text-sm flex items-center gap-2 mb-4">

            <span className="w-3 h-3 bg-copper-600 rounded-full" />

            {experience.period}

          </span>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {experience.role}
          </h1>

          <div className="flex items-center gap-3">

            <div className="w-12 h-1 bg-gradient-to-r from-copper-600 to-emerald-500 rounded" />

            <h2 className="text-2xl font-bold text-slate-300">
              {experience.company}
            </h2>

          </div>

        </div>

        {/* Responsibilities */}
        <section className="animate-in fade-in slide-in-from-left duration-500 delay-100">

          <div className="flex items-center gap-4 mb-8">

            <div className="h-1 w-12 bg-gradient-to-r from-copper-500 to-copper-600 rounded" />

            <h2 className="text-2xl font-black text-white">
              Core Responsibilities
            </h2>

          </div>

          <div className="space-y-4">

            {experience.description.map((item, index) => (

              <div
                key={index}
                className="flex gap-4 items-start p-6 bg-slate-900/40 rounded-xl border border-slate-800 hover:border-copper-500/40 transition-all duration-300 group"
              >

                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-copper-600/20 flex items-center justify-center mt-0.5 group-hover:bg-copper-600/40 transition-colors duration-300">

                  <span className="text-copper-400 font-bold text-sm">
                    →
                  </span>

                </div>

                <p className="text-slate-200 text-lg leading-relaxed pt-1">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>

        <div className="pt-12">

          <button
            onClick={onBack}
            className="px-8 py-4 bg-copper-600 hover:bg-copper-500 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-copper-600/20 hover:shadow-copper-600/40 transform hover:-translate-y-0.5"
          >
            Return to Portfolio
          </button>

        </div>

      </div>
    </div>
  );
};


// ============================================================
// CONTACT SUCCESS VIEW
// ============================================================

const ContactSuccessView: React.FC<{
  onReset: () => void;
}> = ({ onReset }) => (

  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 animate-in zoom-in duration-300">

    <div className="max-w-md w-full text-center space-y-8">

      <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500/50">

        <svg
          className="w-12 h-12 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>

      </div>

      <div>

        <h1 className="text-3xl font-black text-white mb-2">
          Message Received!
        </h1>

        <p className="text-slate-400">
          Thank you for reaching out. Abderrezak will get back to you shortly.
        </p>

      </div>

      <button
        onClick={onReset}
        className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold border border-slate-700 transition-all"
      >
        Back to Home
      </button>

    </div>

  </div>
);


// ============================================================
// FAQ
// ============================================================

const FAQSection: React.FC = () => {

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (

    <section className="py-32 bg-slate-900/50">

      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-black mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto">
            Learn more about my engineering background, technical skills and
            areas of expertise.
          </p>

          <div className="w-24 h-1 bg-copper-600 mx-auto rounded-full mt-6" />

        </div>

        <div className="space-y-4">

          {FAQ_DATA.map((item, index) => (

            <div
              key={index}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
            >

              <button
                onClick={() =>
                  setExpandedFaq(
                    expandedFaq === index ? null : index
                  )
                }
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-900/50 transition-colors text-left"
              >

                <span className="text-xl font-bold text-white">
                  {item.question}
                </span>

                <svg
                  className={`w-5 h-5 text-copper-500 transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>

              </button>

              {expandedFaq === index && (

                <div className="px-8 pb-6 text-slate-400 leading-relaxed border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">

                  <div className="pt-5">
                    {item.answer}
                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};


// ============================================================
// STATS
// ============================================================

const StatsAndTestimonials: React.FC = () => {

  const stats = [
    {
      label: 'Professional Experience',
      value: '2+ Years',
      icon: '⚡'
    },
    {
      label: 'Engineering Projects',
      value: '5+',
      icon: '🔧'
    },
    {
      label: 'PCB Design',
      value: 'Multi-Layer',
      icon: '▣'
    },
    {
      label: 'Embedded Platforms',
      value: 'STM32 / Arduino',
      icon: '◉'
    }
  ];

  return (

    <section className="py-32 bg-slate-950">

      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-10">

          <h2 className="text-4xl font-black mb-4 text-center">
            Engineering Profile
          </h2>

          <p className="text-slate-500 text-center max-w-2xl mx-auto">
            A combination of electronics hardware development, embedded
            programming and manufacturing experience.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="relative text-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-copper-500/30 transition-all"
            >

              <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-600">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="text-4xl mb-3 text-copper-400">
                {stat.icon}
              </div>

              <div className="text-2xl md:text-3xl font-mono font-bold text-copper-400 mb-2">
                {stat.value}
              </div>

              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                {stat.label}
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};


// ============================================================
// 404
// ============================================================

const NotFoundView: React.FC<{
  onReset: () => void;
}> = ({ onReset }) => (

  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">

    <div className="max-w-md w-full text-center space-y-8">

      <div className="text-9xl font-black text-copper-600 opacity-10">
        404
      </div>

      <div>

        <h1 className="text-4xl font-black text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

      </div>

      <button
        onClick={onReset}
        className="w-full py-4 bg-copper-600 hover:bg-copper-500 rounded-2xl font-bold transition-all shadow-lg shadow-copper-600/20"
      >
        Return to Portfolio
      </button>

    </div>

  </div>

);


// ============================================================
// MAIN APP
// ============================================================

const App: React.FC = () => {

  const [activeView, setActiveView] = useState<
    'home' | 'project' | 'experience' | 'success' | 'notfound'
  >('home');

  const [selectedProjectId, setSelectedProjectId] =
    useState<string | null>(null);

  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [contactName, setContactName] =
    useState('');

  const [contactEmail, setContactEmail] =
    useState('');

  const [contactIdentity, setContactIdentity] =
    useState('');

  const [contactDetails, setContactDetails] =
    useState('');

  const [contactError, setContactError] =
    useState<string | null>(null);

  const FORM_ENDPOINT =
    'https://formspree.io/f/mjgozwgo';


  // ============================================================
  // SCROLL TO TOP
  // ============================================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);


  // ============================================================
  // PROJECT HANDLERS
  // ============================================================

  const handleProjectClick = (id: string) => {

    setSelectedProjectId(id);
    setActiveView('project');

  };


  const handleBackFromProject = () => {

    setActiveView('home');

    setTimeout(() => {

      const projectsSection =
        document.getElementById('projects');

      if (projectsSection) {

        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }

    }, 0);

  };


  // ============================================================
  // EXPERIENCE HANDLER
  // ============================================================

  const handleExperienceClick = (
    experience: Experience
  ) => {

    setSelectedExperience(experience);
    setActiveView('experience');

  };


  // ============================================================
  // CONTACT FORM
  // ============================================================

  const handleContactSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    setContactError(null);

    try {

      const payload = {
        name: contactName,
        email: contactEmail,
        identity: contactIdentity,
        message: contactDetails,
        _subject: 'Portfolio Contact - Abderrezak Mouacher'
      };

      const response = await fetch(
        FORM_ENDPOINT,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error(
          'Network response was not ok'
        );
      }


      // Google Analytics
      try {

        if ((window as any).gtag) {

          (window as any).gtag(
            'event',
            'form_submission',
            {
              event_category: 'contact',
              event_label:
                contactIdentity ||
                contactEmail ||
                'portfolio_contact'
            }
          );

        }


        // Plausible
        if ((window as any).plausible) {

          (window as any).plausible(
            'Contact',
            {
              props: {
                identity: contactIdentity
              }
            }
          );

        }

      } catch {
        // Analytics errors intentionally ignored
      }


      // Reset form
      setContactName('');
      setContactEmail('');
      setContactIdentity('');
      setContactDetails('');

      setActiveView('success');

    } catch (error) {

      console.error(error);

      setContactError(
        'There was an error sending your message. Please try again later.'
      );

    }

  };


  // ============================================================
  // RENDER PROJECT
  // ============================================================

  if (
    activeView === 'project' &&
    selectedProjectId
  ) {

    const project =
      PROJECTS.find(
        (item) => item.id === selectedProjectId
      );

    if (project) {

      return (
        <ProjectDetailView
          project={project}
          onBack={handleBackFromProject}
        />
      );

    }

  }


  // ============================================================
  // RENDER EXPERIENCE
  // ============================================================

  if (
    activeView === 'experience' &&
    selectedExperience
  ) {

    return (
      <ExperienceView
        experience={selectedExperience}
        onBack={() => setActiveView('home')}
      />
    );

  }


  // ============================================================
  // SUCCESS
  // ============================================================

  if (activeView === 'success') {

    return (
      <ContactSuccessView
        onReset={() => setActiveView('home')}
      />
    );

  }


  // ============================================================
  // 404
  // ============================================================

  if (activeView === 'notfound') {

    return (
      <NotFoundView
        onReset={() => setActiveView('home')}
      />
    );

  }


  // ============================================================
  // HOME PAGE
  // ============================================================

  return (

    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-copper-500/30 scroll-smooth">

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            {/* Logo — styled as an IC package with leads */}

            <div className="flex items-center gap-3 brand-mark">

              <div className="relative w-10 h-10 shrink-0">

                {/* Pins */}
                <div className="absolute -left-1.5 top-1.5 w-1.5 h-1 bg-copper-400" />
                <div className="absolute -left-1.5 bottom-1.5 w-1.5 h-1 bg-copper-400" />
                <div className="absolute -right-1.5 top-1.5 w-1.5 h-1 bg-copper-400" />
                <div className="absolute -right-1.5 bottom-1.5 w-1.5 h-1 bg-copper-400" />

                <div className="w-10 h-10 bg-slate-900 border border-copper-700/60 rounded-md flex items-center justify-center font-bold text-copper-300 text-sm shadow-lg shadow-black/40">
                  AM
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-phosphor-500 shadow-[0_0_6px_1px_rgba(79,219,130,0.7)]" />

              </div>

              <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-100">
                Abderrezak Mouacher
              </span>

            </div>


            {/* Desktop Navigation */}

            <div className="hidden sm:flex space-x-6 text-sm font-bold text-slate-400 uppercase tracking-widest">

              <a
                href="#about"
                className="hover:text-copper-400 transition-colors"
              >
                About
              </a>

              <a
                href="#projects"
                className="hover:text-copper-400 transition-colors"
              >
                Projects
              </a>

              <a
                href="#experience"
                className="hover:text-copper-400 transition-colors"
              >
                Career
              </a>

              <a
                href="#skills"
                className="hover:text-copper-400 transition-colors"
              >
                Skills
              </a>

              <a
                href="#contact"
                className="hover:text-copper-400 transition-colors"
              >
                Contact
              </a>

            </div>


            {/* Mobile Menu */}

            <button
              onClick={() =>
                setMobileMenuOpen(
                  (value) => !value
                )
              }
              className="sm:hidden p-2 rounded-md text-slate-300 hover:bg-slate-800/50"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >

              {mobileMenuOpen ? (

                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>

              ) : (

                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

              )}

            </button>

          </div>

        </div>


        {/* Mobile Navigation */}

        {mobileMenuOpen && (

          <div className="sm:hidden bg-slate-950/95 border-t border-slate-800">

            <div className="px-4 py-4 flex flex-col space-y-2">

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 rounded-md text-slate-100 hover:bg-slate-900/50"
              >
                About
              </a>

              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 rounded-md text-slate-100 hover:bg-slate-900/50"
              >
                Projects
              </a>

              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 rounded-md text-slate-100 hover:bg-slate-900/50"
              >
                Career
              </a>

              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 rounded-md text-slate-100 hover:bg-slate-900/50"
              >
                Skills
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 rounded-md text-slate-100 hover:bg-slate-900/50"
              >
                Contact
              </a>

            </div>

          </div>

        )}

      </nav>


      {/* ======================================================
          HERO
      ====================================================== */}

      <header
        id="about"
        className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900"
      >

        {/* Signature: animated PCB trace diagram routing behind the hero */}

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >

          <g
            fill="none"
            stroke="#227672"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          >
           <path className="trace-path" d="M -20 120 H 240 L 320 160 " style={{ animationDelay: '0.1s' }} />
            <path className="trace-path" d="M -20 500 H 160 L 220 460 H 520" style={{ animationDelay: '0.3s' }} />
            <path className="trace-path" d="M 1220 90 H 900 L 840 150 V 260 L 780 320 H 640" style={{ animationDelay: '0.5s' }} />
            <path className="trace-path" d="M 1220 560 H 980 L 920 500 H 700 L 660 460" style={{ animationDelay: '0.7s' }} />
            <path className="trace-path" d="M 640 400 V 620" style={{ animationDelay: '0.9s' }} />
          </g>

          <g fill="#4fdb82">
            <circle className="via-node" style={{ animationDelay: '1.6s' }} cx="325" cy="163" r="4" />
            <circle className="via-node" style={{ animationDelay: '1.8s' }} cx="520" cy="450" r="4" />
            <circle className="via-node" style={{ animationDelay: '1.9s' }} cx="840" cy="150" r="4" />
            <circle className="via-node" style={{ animationDelay: '2.0s' }} cx="780" cy="320" r="4" />
            <circle className="via-node" style={{ animationDelay: '2.1s' }} cx="920" cy="500" r="4" />
          </g>
          <g fill="none" stroke="#3fb3ac" strokeWidth="2">
            <rect className="via-node" style={{ animationDelay: '2.3s' }} x="620" y="380" width="40" height="40" rx="4" />
          </g>

        </svg>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Hero Text */}

            <div className="animate-in fade-in slide-in-from-left duration-700">

              <div className="mb-6">

                <span className="inline-flex items-center gap-2 px-4 py-2 bg-copper-500/10 border border-copper-500/20 rounded-full text-copper-300 text-xs font-mono font-semibold uppercase tracking-widest">

                  <span className="w-2 h-2 bg-phosphor-500 rounded-full animate-pulse shadow-[0_0_6px_1px_rgba(79,219,130,0.6)]" />

                  Electronics &amp; Embedded Systems Engineer

                </span>

              </div>


              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tighter text-white">

                Abderrezak

                <br />

                <span className="text-copper-400">
                  Mouacher
                </span>

              </h1>


              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8 text-slate-200 font-mono">

                <span className="text-copper-500">&gt;</span> Electronics &amp; Embedded Systems Engineer

              </h2>


              <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">

                Hardware design, embedded systems, PCB development,
                microcontroller programming, electronic validation and
                SMT manufacturing.

              </p>


              <div className="flex flex-col sm:flex-row gap-4">

                <a
                  href="#projects"
                  className="px-8 py-4 bg-copper-600 hover:bg-copper-500 transition-all rounded-lg font-bold shadow-2xl shadow-copper-900/50 text-center text-white border border-copper-400/30"
                >
                  View My Projects
                </a>

                <a
                  href="#contact"
                  className="px-8 py-4 bg-slate-900/60 hover:bg-slate-800 border border-slate-700 hover:border-copper-700/60 transition-all rounded-lg font-bold text-center"
                >
                  Contact Me
                </a>

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* ======================================================
          BIOGRAPHY
      ====================================================== */}

      <section
        id="biography"
        className="py-32 bg-slate-950"
      >

        <div className="max-w-4xl mx-auto px-4">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-black mb-4">
              Professional Biography
            </h2>

            <p className="text-slate-500 max-w-2xl mx-auto">
              Electronics and Embedded Systems Engineer focused on
              hardware development, embedded systems, PCB design
              and electronic manufacturing.
            </p>

            <div className="w-24 h-1 bg-copper-600 mx-auto rounded-full mt-6" />

          </div>


          <div className="space-y-8 text-slate-300 text-lg font-light leading-relaxed">

            <p className="text-xl text-slate-200">

              I am an{' '}
              <strong>
                Electronics and Embedded Systems Engineer
              </strong>{' '}
              with a strong foundation in electrical and electronic
              engineering and practical experience in electronic
              hardware development, embedded systems, PCB design,
              testing and manufacturing.

            </p>


            <p>

              My professional experience includes the design and
              development of electronic boards, microcontroller
              integration and programming, electronic board validation,
              diagnostics and debugging, BOM and Gerber generation,
              component selection and procurement, and optimization
              of SMT production processes.

            </p>


            <p>

              I also have experience studying electronic boards and
              schematics, reviewing technical documentation, validating
              product functionality and proposing design and process
              improvements.

            </p>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">

                <div className="text-xs font-bold uppercase tracking-widest text-copper-500 mb-3">
                  Hardware Engineering
                </div>

                <p className="text-base">
                  Multi-layer PCB design, electronic schematics,
                  component selection, board validation, debugging,
                  BOM and Gerber generation.
                </p>

              </div>


              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">

                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                  Embedded Systems
                </div>

                <p className="text-base">
                  STM32 and Arduino microcontroller programming,
                  embedded hardware integration and system validation.
                </p>

              </div>


              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">

                <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
                  Electronics Manufacturing
                </div>

                <p className="text-base">
                  SMT production optimization, incoming component quality control, diagnostics, production support, inventory management, and validation of 500+ PCBA units across different electronic products.
                </p>

              </div>


              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">

                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                  Engineering & Procurement
                </div>

                <p className="text-base">
                  Technical documentation, procurement, supplier
                  coordination, cost optimization and technical
                  problem resolution.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          PROJECTS
      ====================================================== */}

      <section
        id="projects"
        className="py-32 bg-gradient-to-b from-slate-900/50 to-slate-950"
      >

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-black mb-4">
              Engineering Projects
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Embedded systems, electronic hardware, PCB development
              and industrial electronics projects developed through
              academic and professional experience.
            </p>

            <div className="w-24 h-1 bg-copper-600 mx-auto rounded-full mt-8" />

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {PROJECTS.map((project, index) => (

              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  handleProjectClick(project.id)
                }
                onKeyDown={(event) => {

                  if (
                    event.key === 'Enter' ||
                    event.key === ' '
                  ) {

                    event.preventDefault();

                    handleProjectClick(project.id);

                  }

                }}
                className="group relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-copper-500/60 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-copper-500/10 focus:outline-none focus:ring-2 focus:ring-copper-500"
                style={{
                  animationDelay: `${index * 50}ms`,
                  touchAction: 'manipulation'
                }}
              >

                {/* Project Image */}

                <div className="relative h-56 sm:h-48 overflow-hidden bg-slate-900">

                  <ImageCarousel
                    images={project.images}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="absolute top-4 right-4 px-3 py-1 bg-copper-600 rounded-lg font-mono text-xs font-bold text-white shadow-lg">
                    {project.category}
                  </div>

                </div>


                {/* Project Content */}

                <div className="p-6 space-y-4">

                  <h3 className="text-xl font-bold text-white group-hover:text-copper-400 transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>


                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>


                  <div className="flex flex-wrap gap-2 pt-2">

                    {project.technologies
                      .slice(0, 3)
                      .map((technology) => (

                        <span
                          key={technology}
                          className="px-2 py-1 bg-slate-900/80 border border-slate-700 rounded text-xs font-mono font-medium text-copper-300"
                        >
                          {technology}
                        </span>

                      ))}


                    {project.technologies.length > 3 && (

                      <span className="px-2 py-1 bg-slate-900/80 border border-slate-700 rounded text-xs font-semibold text-slate-500">

                        +{project.technologies.length - 3}

                      </span>

                    )}

                  </div>


                  <div className="pt-4 flex items-center gap-2 text-copper-400 font-bold text-sm group-hover:gap-3 transition-all duration-300">

                    <span>
                      Explore Project
                    </span>

                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>

                  </div>

                </div>


                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-copper-600 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          EXPERIENCE + SKILLS
      ====================================================== */}

      <section
        id="experience"
        className="py-32 bg-slate-950"
      >

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

            {/* EXPERIENCE */}

            <div>

              <h2 className="text-4xl font-black mb-16">
                Professional Experience
              </h2>

              <div className="space-y-12">

                {EXPERIENCES.map((experience, index) => (

                  <div
                    key={index}
                    onClick={() =>
                      handleExperienceClick(experience)
                    }
                    className="group relative pl-8 border-l border-slate-800 cursor-pointer hover:border-copper-500 transition-colors"
                  >

                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-slate-800 border-2 border-slate-950 group-hover:bg-copper-600 rounded-full transition-colors" />

                    <span className="text-copper-500 font-mono text-sm font-bold">
                      {experience.period}
                    </span>

                    <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-copper-400 transition-colors">
                      {experience.role}
                    </h3>

                    <p className="text-slate-500 font-medium mb-4">
                      {experience.company}
                    </p>

                    <div className="text-copper-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* SKILLS */}

            <div id="skills">

              <h2 className="text-4xl font-black mb-16">
                Technical Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">

                {SKILLS.map((skill, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 border-b border-slate-800/80"
                  >

                    <span className="font-mono text-[10px] text-copper-500/80 shrink-0 w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="font-semibold text-sm text-slate-200">
                      {skill.name}
                    </span>

                    <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 shrink-0">
                      {skill.category}
                    </span>

                  </div>

                ))}

              </div>


              <div className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-3xl">

                <div className="grid grid-cols-2 gap-6">

                  <div>

                    <div className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-3">
                      Software
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      KiCad, STM32CubeMX, STM32CubeIDE, MATLAB,
                      Proteus, LTspice, Zelio Soft, Blender,
                      Microsoft Word & Excel.
                    </p>

                  </div>


                  <div>

                    <div className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-3">
                      Programming
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      C, C++, VHDL, Ladder,
                      STM32 and Arduino programming.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          STATS
      ====================================================== */}

      <StatsAndTestimonials />


      {/* ======================================================
          FAQ
      ====================================================== */}

      <FAQSection />


      {/* ======================================================
          CONTACT
      ====================================================== */}

      <footer
        id="contact"
        className="py-32 bg-slate-950 border-t border-slate-900 relative overflow-hidden"
      >

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-600/5 rounded-full blur-[100px] -mr-64 -mt-64" />


        <div className="max-w-7xl mx-auto px-4 relative">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">

            {/* Contact Information */}

            <div>

              <h2 className="text-4xl font-black mb-8 text-white">

                Let's build something

                <br />

                <span className="text-copper-600">
                  precise.
                </span>

              </h2>


              <p className="text-slate-400 text-lg mb-12 font-light max-w-md">

                I am open to opportunities in electronics,
                embedded systems, hardware design, PCB development,
                electronic manufacturing and industrial electronics.

              </p>


              <div className="space-y-6 mb-12">

                {/* Email */}

                <div className="flex items-center gap-6 group">

                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:border-copper-500 transition-all">

                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                  </div>

                  <div>

                    <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                      Email Me
                    </div>

                    <a
                      href="mailto:mouacherabderrazek@gmail.com"
                      className="text-slate-200 hover:text-copper-400 transition-colors"
                    >
                      mouacherabderrazek@gmail.com
                    </a>

                  </div>

                </div>


                {/* Location */}

                <div className="flex items-center gap-6 group">

                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:border-copper-500 transition-all">

                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />

                    </svg>

                  </div>

                  <div>

                    <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                      Location
                    </div>

                    <div className="text-slate-200">
                      Blida, Algeria
                    </div>

                  </div>

                </div>

              </div>


              {/* Social Links */}

              <div className="flex gap-4">

                {/* LinkedIn */}

                <a
                  href="https://www.linkedin.com/in/abderrezak-mouacher-8b0529229/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-copper-400 hover:border-copper-500 transition-all"
                  title="LinkedIn"
                >

                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.686-2.236-1.595 0-2.547 1.075-2.966 2.122-.153.374-.191.896-.191 1.419v4.264h-3.554s.045-6.925 0-7.641h3.554v1.082c.327-1.116 2.684-2.713 6.238-2.713 4.533 0 7.94 2.967 7.94 9.364v5.908zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.958.77-1.715 1.959-1.715 1.188 0 1.914.757 1.939 1.715 0 .953-.751 1.715-1.983 1.715zm1.946 11.597H3.392V9.811h3.891v10.641zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>

                </a>


                {/* GitHub */}

                <a
                  href="https://github.com/abderrezak-mouacher"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-copper-400 hover:border-copper-500 transition-all"
                  title="GitHub"
                >

                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>

                </a>


                {/* Email */}

                <a
                  href="mailto:mouacherabderrazek@gmail.com"
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-copper-400 hover:border-copper-500 transition-all"
                  title="Email"
                >

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />

                  </svg>

                </a>

              </div>

            </div>


            {/* Contact Form */}

            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 lg:p-14 shadow-2xl">

              <form
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >

                {/* Name */}

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    Your Name
                  </label>

                  <input
                    required
                    value={contactName}
                    onChange={(event) =>
                      setContactName(
                        event.target.value
                      )
                    }
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm focus:border-copper-500 outline-none transition-all"
                    placeholder="E.g. John Doe"
                  />

                </div>


                {/* Email */}

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    Your Email
                  </label>

                  <input
                    required
                    value={contactEmail}
                    onChange={(event) =>
                      setContactEmail(
                        event.target.value
                      )
                    }
                    type="email"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm focus:border-copper-500 outline-none transition-all"
                    placeholder="your.email@example.com"
                  />

                </div>


                {/* Identity */}

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    Company / Role
                  </label>

                  <input
                    required
                    value={contactIdentity}
                    onChange={(event) =>
                      setContactIdentity(
                        event.target.value
                      )
                    }
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm focus:border-copper-500 outline-none transition-all"
                    placeholder="E.g. Hardware Engineer at Schneider Electric"
                  />

                </div>


                {/* Message */}

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                    Project Details
                  </label>

                  <textarea
                    required
                    value={contactDetails}
                    onChange={(event) =>
                      setContactDetails(
                        event.target.value
                      )
                    }
                    rows={5}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm focus:border-copper-500 outline-none transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />

                </div>


                {/* Error */}

                {contactError && (

                  <div className="text-sm text-rose-500 font-bold">
                    {contactError}
                  </div>

                )}


                {/* Submit */}

                <button
                  type="submit"
                  className="w-full py-5 bg-copper-600 hover:bg-copper-500 rounded-2xl font-black text-white shadow-xl shadow-copper-600/20 transition-all transform active:scale-95"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>


          {/* Footer Bottom */}

          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-600">

            <p>
              © 2026 Abderrezak Mouacher. Engineered with precision.
            </p>

            <div className="flex gap-8 font-bold uppercase tracking-widest">

              <a
                href="#about"
                className="hover:text-copper-500 transition-colors"
              >
                About
              </a>

              <a
                href="#biography"
                className="hover:text-copper-500 transition-colors"
              >
                Biography
              </a>

              <a
                href="#projects"
                className="hover:text-copper-500 transition-colors"
              >
                Projects
              </a>

              <a
                href="#experience"
                className="hover:text-copper-500 transition-colors"
              >
                Experience
              </a>

              <a
                href="#contact"
                className="hover:text-copper-500 transition-colors"
              >
                Contact
              </a>

            </div>

          </div>

        </div>

      </footer>

    </div>

  );
};


export default App;