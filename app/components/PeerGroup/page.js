'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Peer.module.css';
import { FaCommentDots, FaEye } from 'react-icons/fa';

export default function PeerGroups() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All Groups');
  const [joined, setJoined] = useState(['Anxiety Support Circle']);
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [customGroups, setCustomGroups] = useState([]);

  const toggleJoin = (name) => {
    setJoined((v) =>
      v.includes(name) ? v.filter((x) => x !== name) : [...v, name]
    );
  };

  const initialGroups = [
    {
      name: 'Anxiety Support Circle',
      category: 'Anxiety',
      desc: 'A safe, moderated space for students dealing with social and exam anxiety to share coping strategies.',
      members: 234,
      posts: 1456,
      activity: 'Active 2 hours ago',
      badgeColor: 'var(--color-yellow)',
    },
    {
      name: 'College Life Balance',
      category: 'Academics',
      desc: 'Discussing coursework management, deadline overwhelm, and practical boundaries with fellow students.',
      members: 189,
      posts: 892,
      activity: 'Active 1 hour ago',
      badgeColor: 'var(--color-blue)',
    },
    {
      name: 'Depression Recovery & Hope',
      category: 'Depression',
      desc: 'Walking through low-motivation days and depression recovery with peer understanding and compassion.',
      members: 200,
      posts: 1000,
      activity: 'Active 3 hours ago',
      badgeColor: 'var(--color-pink)',
    },
    {
      name: 'Mindfulness & Meditation',
      category: 'Wellness',
      desc: 'Share daily meditation routines, somatic breathwork, and sensory grounding habits.',
      members: 158,
      posts: 200,
      activity: 'Active 4 hours ago',
      badgeColor: 'var(--color-green)',
    },
  ];

  const allGroups = [...customGroups, ...initialGroups];
  const filteredGroups =
    activeTab === 'All Groups'
      ? allGroups
      : allGroups.filter((g) => g.category.toLowerCase() === activeTab.toLowerCase());

  const handleCreateGroup = () => {
    const trimmed = groupName.trim();
    if (trimmed) {
      const newG = {
        name: trimmed,
        category: activeTab === 'All Groups' ? 'Wellness' : activeTab,
        desc: 'Student-led community circle for shared wellness and support.',
        members: 1,
        posts: 1,
        activity: 'Just created',
        badgeColor: 'var(--color-yellow)',
      };
      setCustomGroups([newG, ...customGroups]);
      setJoined((prev) => [...prev, trimmed]);
      setGroupName('');
      setShowCreate(false);
    }
  };

  return (
    <>
<div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.topBadge}>
            <span className={styles.livePulse}></span>
            <span>STUDENT-MODERATED PEER CIRCLES</span>
          </div>
          <h1 className={styles.title}>
            PEER <span className={styles.highlightPill}>GROUPS</span>
          </h1>
          <p className={styles.subtitle}>
            You do not have to carry academic and personal weight alone. Connect with peers who
            genuinely understand what you are going through.
          </p>
        </header>

        {/* Peer Support Pillars */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>👥</span>
            <h3>PEER</h3>
            <p>STUDENT-LED CIRCLES</p>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🛡️</span>
            <h3>SAFE</h3>
            <p>COMMUNITY CHARTER</p>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🤝</span>
            <h3>SHARED</h3>
            <p>ACADEMIC COPING</p>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>💬</span>
            <h3>CAMPUS</h3>
            <p>SUPPORT FORUMS</p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className={styles.main}>
          {/* Left Column: Groups */}
          <div className={styles.groupsSection}>
            <div className={styles.groupsHeader}>
              <div>
                <span className={styles.secBadge}>COMMUNITY CHANNELS</span>
                <h2 className={styles.sectionHeading}>ACTIVE CIRCLES</h2>
              </div>
              <button
                className={styles.createBtn}
                onClick={() => setShowCreate(true)}
              >
                + CREATE GROUP
              </button>
            </div>

            {/* Category Tabs */}
            <div className={styles.tabs}>
              {['All Groups', 'Anxiety', 'Academics', 'Wellness', 'Depression'].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${styles.tabBtn} ${
                      activeTab === tab ? styles.activeTab : ''
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                )
              )}
            </div>

            {/* Group Cards */}
            <div className={styles.groupsList}>
              {filteredGroups.map((group) => {
                const isJoined = joined.includes(group.name);
                return (
                  <div key={group.name} className={styles.groupCard}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardHeaderRow}>
                        <h3 className={styles.groupCardTitle}>{group.name}</h3>
                        <span
                          className={styles.tag}
                          style={{ backgroundColor: group.badgeColor }}
                        >
                          {group.category.toUpperCase()}
                        </span>
                      </div>
                      <p className={styles.groupCardDesc}>{group.desc}</p>
                    </div>

                    <div className={styles.cardBottom}>
                      <div className={styles.metaRow}>
                        <span>👥 {group.members} members</span>
                        <span>💬 {group.posts} posts</span>
                        <span>🕒 {group.activity}</span>
                      </div>
                      <button
                        className={`${styles.joinBtn} ${
                          isJoined ? styles.joinedBtn : ''
                        }`}
                        onClick={() => toggleJoin(group.name)}
                      >
                        {isJoined ? 'JOINED ✓' : 'JOIN GROUP →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Feed & Guidelines */}
          <div className={styles.rightSection}>
            {/* Recent Posts */}
            <div className={styles.recentPosts}>
              <div className={styles.sideCardHeader}>
                <span className={styles.miniTag}>LIVE FEED</span>
                <h3>RECENT POSTS</h3>
              </div>
              <div className={styles.postItem}>
                <h4>How I manage exam anxiety during finals week</h4>
                <p>Peer Member • Anxiety Support Circle</p>
                <div className={styles.postStats}>
                  <span><FaCommentDots /> 23 replies</span>
                  <span><FaEye /> 45 views</span>
                </div>
              </div>
              <div className={styles.postItem}>
                <h4>Finding work-life balance in senior year</h4>
                <p>Senior Student • College Life Balance</p>
                <div className={styles.postStats}>
                  <span><FaCommentDots /> 18 replies</span>
                  <span><FaEye /> 32 views</span>
                </div>
              </div>
              <div className={styles.postItem}>
                <h4>5-minute morning grounding ritual</h4>
                <p>Wellness Advocate • Mindfulness & Meditation</p>
                <div className={styles.postStats}>
                  <span><FaCommentDots /> 10 replies</span>
                  <span><FaEye /> 20 views</span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className={styles.guidelines}>
              <div className={styles.sideCardHeader}>
                <span className={styles.miniTag}>SAFETY RULES</span>
                <h3>COMMUNITY CHARTER</h3>
              </div>
              <ul className={styles.guidelinesList}>
                <li>● Be respectful and compassionate to all members</li>
                <li>● Zero tolerance for harassment or hate speech</li>
                <li>● Strict anonymity: do not share private credentials</li>
                <li>● Peer support is not a replacement for clinical emergency care</li>
              </ul>
            </div>

            {/* Crisis Alert Card */}
            <div className={styles.crisis}>
              <span className={styles.crisisTag}>CRISIS INTERVENTION</span>
              <h3>NEED IMMEDIATE HELP?</h3>
              <p>
                If you or a friend are experiencing severe emotional distress or thoughts of self-harm,
                please reach out immediately.
              </p>
              <button
                className={styles.crisisBtn}
                onClick={() => router.push('/components/Support')}
              >
                ACCESS CRISIS HELPLINES →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Support Group Modal */}
      {showCreate && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <span className={styles.miniTag}>NEW CIRCLE</span>
              <h3>CREATE A SUPPORT GROUP</h3>
            </div>
            <p className={styles.modalDesc}>
              Start a new peer group for your campus. Groups are moderated and student-run.
            </p>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Pre-Med Stress Management Circle"
              className={styles.modalInput}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button
                className={styles.modalCreateBtn}
                onClick={handleCreateGroup}
              >
                CREATE GROUP ✓
              </button>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setShowCreate(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
