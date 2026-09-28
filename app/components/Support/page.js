"use client";
import React, { useState } from "react";
import styles from "./Support.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiPhoneCall, 
  FiMessageSquare, 
  FiCalendar, 
  FiShield, 
  FiAlertOctagon, 
  FiUsers, 
  FiHeart, 
  FiHelpCircle,
  FiExternalLink
} from 'react-icons/fi';

export default function Support() {
  const router = useRouter();
  const [toast, setToast] = useState("");

  const triggerCall = (num) => {
    window.location.href = `tel:${num}`;
  };

  const openChat = () => {
    router.push('/components/AiChatbot');
  };

  const openSchedule = () => {
    router.push('/components/doctorProfile');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <>
<main className={styles.container}>
        {/* Header Banner */}
        <section className={styles.headerCard}>
          <div className={styles.headerContent}>
            <div className={styles.badgeRow}>
              <span className={styles.badgeEmergency}>🚨 CRISIS HELPLINES</span>
              <span className={styles.badgePrivate}>CONFIDENTIAL RESOURCES</span>
            </div>
            <h1 className={styles.title}>
              STUDENT SUPPORT & <span>CRISIS HUB</span>
            </h1>
            <p className={styles.subtitle}>
              Immediate assistance, licensed counseling connections, and emergency campus resources. You don’t have to struggle in silence.
            </p>
          </div>
        </section>

        {toast && (
          <div className={styles.toastNotice}>
            {toast}
          </div>
        )}

        {/* 1. EMERGENCY RESOURCES SECTION */}
        <section className={styles.emergencyBox}>
          <div className={styles.emergencyTop}>
            <div className={styles.emergencyIconWrap}>
              <FiAlertOctagon size={32} />
            </div>
            <div>
              <span className={styles.criticalPill}>IMMEDIATE CRISIS ASSISTANCE</span>
              <h2 className={styles.emergencyTitle}>EMERGENCY RESOURCES</h2>
              <p className={styles.emergencyText}>
                If you are feeling unsafe, having thoughts of self-harm, or facing an immediate medical emergency, please reach out to dedicated crisis lines right away.
              </p>
            </div>
          </div>

          <div className={styles.emergencyBtns}>
            <button 
              type="button" 
              className={styles.emergencyBtnRed} 
              onClick={() => triggerCall('112')}
            >
              <FiPhoneCall size={18} />
              <span>CALL 112 (NATIONAL EMERGENCY)</span>
            </button>
            <button 
              type="button" 
              className={styles.emergencyBtnTelem} 
              onClick={() => triggerCall('14416')}
            >
              <FiPhoneCall size={18} />
              <span>CALL 14416 (TELE-MANAS TOLL FREE)</span>
            </button>
            <button 
              type="button" 
              className={styles.emergencyBtnOrange} 
              onClick={openChat}
            >
              <FiMessageSquare size={18} />
              <span>LAUNCH EIRA CRISIS CHAT</span>
            </button>
          </div>
        </section>

        {/* 2. CAMPUS SUPPORT & COUNSELLING SECTION */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.miniLabel}>CARE SERVICES</span>
              <h2 className={styles.sectionHeading}>CAMPUS SUPPORT & COUNSELLING</h2>
            </div>
            <span className={styles.sectionMeta}>FREE FOR STUDENTS</span>
          </div>

          <div className={styles.cardsRow}>
            {/* External 24/7 Helpline Card */}
            <article className={styles.serviceCard}>
              <div className={styles.cardHeaderBadge}>
                <span className={styles.cardTag}>24/7 PUBLIC HELPLINE</span>
                <span className={styles.cardIcon}>🕒</span>
              </div>
              <h3 className={styles.cardTitle}>Tele-MANAS Crisis Helpline</h3>
              <p className={styles.cardText}>
                Speak confidentially with trained national mental health counselors via official toll-free helpline 14416.
              </p>
              <ul className={styles.cardList}>
                <li>✓ Completely confidential & non-judgmental</li>
                <li>✓ Multi-lingual support (Hindi, English & regional)</li>
                <li>✓ Immediate support for panic and acute distress</li>
              </ul>
              <button 
                type="button" 
                className={styles.cardActionBtn} 
                onClick={() => triggerCall('14416')}
              >
                <FiPhoneCall size={16} />
                <span>CALL 14416 NOW</span>
              </button>
            </article>

            {/* Live Chat Support Card */}
            <article className={`${styles.serviceCard} ${styles.cardAccent}`}>
              <div className={styles.cardHeaderBadge}>
                <span className={styles.cardTag}>AUTOMATED AI COMPANION</span>
                <span className={styles.cardIcon}>💬</span>
              </div>
              <h3 className={styles.cardTitle}>EIRA AI Decompression Chat</h3>
              <p className={styles.cardText}>
                Need to de-stress right now? Connect with EIRA AI for grounding and reflective breathing.
              </p>
              <ul className={styles.cardList}>
                <li>✓ Instant automated replies with zero wait time</li>
                <li>✓ Private session with zero ad tracking</li>
                <li>✓ Guided reflective exercises and grounding</li>
              </ul>
              <button 
                type="button" 
                className={styles.cardActionBtnDark} 
                onClick={openChat}
              >
                <FiMessageSquare size={16} />
                <span>START CHAT CONVERSATION</span>
              </button>
            </article>

            {/* Professional Help Card */}
            <article className={styles.serviceCard}>
              <div className={styles.cardHeaderBadge}>
                <span className={styles.cardTag}>SPECIALIST</span>
                <span className={styles.cardIcon}>🩺</span>
              </div>
              <h3 className={styles.cardTitle}>Professional Counselling</h3>
              <p className={styles.cardText}>
                Book a demo consultation session with student wellness specialists.
              </p>
              <ul className={styles.cardList}>
                <li>✓ 30-minute structured intake sessions</li>
                <li>✓ Video, Voice or In-Person campus sessions</li>
                <li>✓ Focus on academic burnout, anxiety, and depression</li>
              </ul>
              <button 
                type="button" 
                className={styles.cardActionBtnYellow} 
                onClick={openSchedule}
              >
                <FiCalendar size={16} />
                <span>SCHEDULE SPECIALIST DEMO</span>
              </button>
            </article>
          </div>
        </section>

        {/* 3. PEER SUPPORT & CAMPUS COMMUNITY */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.miniLabel}>COMMUNITY HEALING</span>
              <h2 className={styles.sectionHeading}>PEER SUPPORT GROUPS</h2>
            </div>
            <Link href="/components/PeerGroup" className={styles.sectionMetaLink}>
              <span>VIEW ALL PEER GROUPS →</span>
            </Link>
          </div>

          <div className={styles.peerGrid}>
            <div className={styles.peerCard}>
              <span className={styles.peerIcon}>👥</span>
              <h3>Anxiety Support Circle</h3>
              <p>Connect with peers managing exam anxiety and social stress.</p>
              <Link href="/components/PeerGroup" className={styles.peerBtn}>Join Circle</Link>
            </div>
            <div className={styles.peerCard}>
              <span className={styles.peerIcon}>🎓</span>
              <h3>College Life Balance</h3>
              <p>Discuss workload management, thesis stress, and personal balance.</p>
              <Link href="/components/PeerGroup" className={styles.peerBtn}>Join Circle</Link>
            </div>
            <div className={styles.peerCard}>
              <span className={styles.peerIcon}>🌱</span>
              <h3>Depression Recovery</h3>
              <p>Empathetic peer space for student healing and motivation.</p>
              <Link href="/components/PeerGroup" className={styles.peerBtn}>Join Circle</Link>
            </div>
          </div>
        </section>

        {/* 4. HELPLINE DIRECTORY NUMBERS */}
        <section className={styles.directorySection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.miniLabel}>OFFICIAL HELPLINE DIRECTORY</span>
              <h2 className={styles.sectionHeading}>OFFICIAL CRISIS & HELPLINE DIRECTORY</h2>
            </div>
            <span className={styles.sectionMeta}>PUBLIC HELPLINES</span>
          </div>

          <div className={styles.bottomRow}>
            {[
              { title: 'National Emergency Services', number: '112', desc: 'Police, Fire, Ambulance & Urgent Distress', isAction: true },
              { title: 'Tele-MANAS Mental Health', number: '14416', desc: 'Govt. 24/7 Toll-free Psychological Support', isAction: true },
              { title: 'EIRA AI Immediate Crisis Chat', number: 'Online', desc: 'Instant private AI de-escalation & grounding', isChat: true },
            ].map((item) => (
              <div key={item.title} className={styles.bottomCard}>
                <span className={styles.dirTag}>EMERGENCY HELPLINE</span>
                <h4>{item.title}</h4>
                <p className={styles.dirDesc}>{item.desc}</p>
                <p className={styles.helplineNumber}>
                  {item.isChat ? '💬 LIVE CHAT' : `📞 ${item.number}`}
                </p>
                <button 
                  type="button" 
                  className={styles.callNowSmall} 
                  onClick={() => item.isChat ? openChat() : triggerCall(item.number)}
                >
                  {item.isChat ? 'LAUNCH CHAT' : 'CALL HELPLINE'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

