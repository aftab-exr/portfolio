import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import {
  Github,
  Code,
  Terminal,
  ExternalLink,
  Trophy,
  Users,
  BookOpen,
  Activity,
  Linkedin,
  Instagram,
} from 'lucide-react';

const Profiles = () => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  // const [hackerrankData, setHackerrankData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [loadingLeetcode, setLoadingLeetcode] = useState(true);
  // const [loadingHackerrank, setLoadingHackerrank] = useState(true);

  // PLACEHOLDERS: You can change these to your actual usernames later
  const GITHUB_USERNAME = 'aftab-exr';
  const LEETCODE_USERNAME = 'aftab-exr';
  const HACKERRANK_USERNAME = 'aftabsaifi2050';

  useEffect(() => {
    // Fetch Live GitHub Data
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setGithubData(data);
        setLoadingGithub(false);
      })
      .catch((err) => {
        console.error('Error fetching GitHub data:', err);
        setLoadingGithub(false);
      });

    // Fetch Live LeetCode Data (Using Alfa Community API)
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) throw new Error('API Error');
        setLeetcodeData(data);
        setLoadingLeetcode(false);
      })
      .catch((err) => {
        console.error('Error fetching LeetCode data:', err);
        setLoadingLeetcode(false);
      });

   
  }, []);

  const profiles = [
    {
      id: 'github',
      platform: 'GitHub',
      icon: <Github size={48} className="text-[var(--text-primary)]" />,
      color: 'bg-[var(--text-primary)]/5 border-[var(--glass-border)]',
      description:
        githubData?.bio ||
        'Check out my open-source projects, contributions, and frontend web development repositories.',
      link: githubData?.html_url || `https://github.com/${GITHUB_USERNAME}`,
      stats: loadingGithub
        ? ['Loading Live Data...']
        : [
            {
              icon: <Users size={14} className="text-blue-500" />,
              text: `${githubData?.followers || 0} Followers`,
            },
            {
              icon: <BookOpen size={14} className="text-emerald-500" />,
              text: `${githubData?.public_repos || 0} Public Repositories`,
            },
          ],
      liveStatus: true,
      data: githubData,
    },
    {
      id: 'leetcode',
      platform: 'LeetCode',
      icon: <Code size={48} className="text-yellow-500" />,
      color: 'bg-yellow-500/5 border-yellow-500/20',
      description:
        'Solving complex algorithmic problems to sharpen my problem-solving and data structure skills.',
      link: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      stats: loadingLeetcode
        ? ['Loading Live Data...']
        : [
            {
              icon: <Trophy size={14} className="text-yellow-500" />,
              text: `Rank: ${leetcodeData?.ranking || 'N/A'}`,
            },
            {
              icon: <Activity size={14} className="text-emerald-500" />,
              text: `${leetcodeData?.solvedProblem || 0} Solved Problems`,
            },
          ],
      liveStatus: true,
      data: leetcodeData,
    },
    {
      id: 'hackerrank',
      platform: 'HackerRank',
      icon: <Terminal size={48} className="text-emerald-500" />,
      color: 'bg-emerald-500/5 border-emerald-500/20',
      description:
        'Practicing SQL queries, Python scripts, and advanced data manipulation challenges.',
      link: `https://hackerrank.com/${HACKERRANK_USERNAME}`,
      stats: [
        { icon: <Trophy size={14} className="text-emerald-500" />, text: '5 Star SQL' },
        { icon: <Trophy size={14} className="text-blue-500" />, text: '5 Star Python' },
      ],
      liveStatus: true,
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      icon: <Linkedin size={48} className="text-blue-600" />,
      color: 'bg-blue-600/5 border-blue-600/20',
      description: 'Connect with me for professional updates, network, and data analysis insights.',
      link: 'https://linkedin.com/',
      stats: [
        { icon: <Users size={14} className="text-blue-500" />, text: '500+ Connections' },
        { icon: <Activity size={14} className="text-indigo-500" />, text: 'Actively Networking' },
      ],
      liveStatus: false,
    },
    {
      id: 'instagram',
      platform: 'aftab.exr',
      icon: <Instagram size={48} className="text-pink-500" />,
      color: 'bg-pink-500/5 border-pink-500/20',
      description: 'Follow my personal journey, behind-the-scenes coding, and life updates.',
      link: 'https://instagram.com/aftab.exr',
      stats: [
        { icon: <Activity size={14} className="text-pink-500" />, text: 'Daily Updates' },
        { icon: <Users size={14} className="text-purple-500" />, text: 'Tech Community' },
      ],
      liveStatus: true,
    },
  ];

  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[var(--text-primary)]">
          Social Media <span className="text-gradient">& Profiles</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
          Connect with me across the web. Live stats fetched dynamically where available.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles.map((profile) => (
          <GlassCard
            key={profile.id}
            className={`relative flex flex-col h-full border hover:-translate-y-2 transition-transform duration-300 ${profile.color} overflow-hidden group`}
          >
            {/* Status Indicators */}
            {profile.liveStatus ? (
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10 shadow-lg hidden sm:flex">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                </span>
                <span className="text-[10px] text-white font-bold tracking-widest uppercase">
                  Live
                </span>
              </div>
            ) : (
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10 shadow-lg hidden sm:flex">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-400 shadow-inner"></span>
                <span className="text-[10px] text-white font-bold tracking-widest uppercase">
                  Static
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-6 mt-8 sm:mt-12">
              <div className="relative">
                {/* Profile Avatars / Icons */}
                {profile.id === 'github' && profile.data?.avatar_url ? (
                  <img
                    src={profile.data.avatar_url}
                    alt="GitHub Avatar"
                    className="w-16 h-16 rounded-full border-2 border-[var(--text-primary)] shadow-[0_0_15px_rgba(0,0,0,0.2)] object-cover bg-[var(--glass-bg)]"
                  />
                ) : profile.id === 'leetcode' && profile.data?.avatar ? (
                  <img
                    src={profile.data.avatar}
                    alt="LeetCode Avatar"
                    className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] object-cover bg-[var(--glass-bg)]"
                  />
                ) : (
                  profile.icon
                )}
              </div>
              <a
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] text-[var(--text-secondary)] transition-all duration-300 z-10 shadow-sm"
                aria-label={`Visit ${profile.platform}`}
              >
                <ExternalLink size={20} />
              </a>
            </div>

            <h2 className="text-2xl font-bold mb-1 text-[var(--text-primary)]">
              {profile.id === 'github' && profile.data?.name
                ? profile.data.name
                : profile.id === 'leetcode' && profile.data?.name
                  ? profile.data.name
                  : profile.platform}
            </h2>
            <p className="text-sm font-semibold text-[var(--text-secondary)] opacity-80 mb-5 tracking-wide">
              @
              {profile.id === 'github' && profile.data?.login
                ? profile.data.login
                : profile.id === 'leetcode'
                  ? LEETCODE_USERNAME
                  : profile.platform.toLowerCase()}
            </p>

            <p className="text-[var(--text-primary)] opacity-90 mb-8 flex-grow leading-relaxed text-sm md:text-base">
              {profile.description}
            </p>

            {/* Stats section */}
            <div className="pt-5 border-t border-[var(--glass-border)] flex flex-col gap-3">
              {profile.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm font-semibold text-[var(--text-primary)] bg-[var(--glass-bg)]/50 p-3 rounded-xl border border-[var(--glass-border)] shadow-sm backdrop-blur-sm"
                >
                  {typeof stat === 'string' ? (
                    <span className="animate-pulse">{stat}</span>
                  ) : (
                    <>
                      <div className="p-1.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-sm">
                        {stat.icon}
                      </div>
                      {stat.text}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
          </GlassCard>
        ))}
      </div>

      {/* Background decoration elements (Using standard tailwind animate-pulse instead of custom blob) */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse delay-1000 -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Profiles;
