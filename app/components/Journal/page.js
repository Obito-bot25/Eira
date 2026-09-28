"use client";
import React, { useState, useEffect } from "react";
import styles from "./Journal.module.css";
import { FiPlus, FiX, FiCalendar, FiSmile, FiTag, FiClock } from "react-icons/fi";

export default function MyJournal() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState(7);
  const [tags, setTags] = useState(["reflection", "mindset"]);
  const [tagInput, setTagInput] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const sampleEntries = [
    {
      id: "demo-1",
      title: "Finding Balance Amidst Mid-Term Prep",
      entry: "Today was intense with back-to-back lectures, but taking 10 minutes to step outside and do mindful breathing really helped reset my stress levels. Grateful for supportive study friends and taking things one assignment at a time.",
      mood: 8,
      tags: ["academics", "balance", "gratitude"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo-2",
      title: "Morning Walk & Clarity",
      entry: "Woke up feeling somewhat restless, but went for a 20-minute morning walk around campus. The fresh air cleared my head. Reminding myself that productivity doesn't define my worth as a person.",
      mood: 7,
      tags: ["morning", "mindfulness", "health"],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    }
  ];

  // Fetch entries from backend or fallback to local storage / demo entries
  useEffect(() => {
    let alive = true;
    fetch('/api/journal', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        if (alive && data.journals && data.journals.length > 0) {
          setEntries(data.journals);
        } else {
          // Check local storage
          const local = localStorage.getItem("eira_journal_entries");
          if (local) {
            try { setEntries(JSON.parse(local)); }
            catch { setEntries(sampleEntries); }
          } else {
            setEntries(sampleEntries);
          }
        }
      })
      .catch(() => {
        // Fallback for demo mode
        const local = localStorage.getItem("eira_journal_entries");
        if (local) {
          try { setEntries(JSON.parse(local)); }
          catch { setEntries(sampleEntries); }
        } else {
          setEntries(sampleEntries);
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, []);

  const handleAddTag = (e) => {
    e.preventDefault();
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const addPresetTag = (preset) => {
    if (!tags.includes(preset)) {
      setTags([...tags, preset]);
    }
  };

  const handleSave = async () => {
    if (!entry.trim()) {
      setAlertMsg("Please write your journal entry before saving.");
      return;
    }

    setSaving(true);
    setAlertMsg("");

    const newJournal = {
      id: "entry-" + Date.now(),
      title: title.trim() || "Untitled Reflection",
      entry: entry.trim(),
      mood: Number(mood),
      tags,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, entry, mood, tags })
      });
      const data = await res.json();
      if (res.ok && data.journal) {
        newJournal.id = data.journal.id;
        newJournal.createdAt = data.journal.createdAt;
      }
    } catch {
      // Offline / unauthenticated demo mode
    }

    // Always update client state and localStorage for instant feedback
    const updated = [newJournal, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem("eira_journal_entries", JSON.stringify(updated));
    } catch {}

    setSaving(false);
    setTitle("");
    setEntry("");
    setTags(["reflection"]);
    setMood(7);
    setShowForm(false);
    setAlertMsg("Journal entry saved successfully! ✨");
    setTimeout(() => setAlertMsg(""), 4000);
  };

  const getMoodEmoji = (score) => {
    if (score <= 3) return "😔 Low";
    if (score <= 5) return "😐 Neutral";
    if (score <= 7) return "🙂 Good";
    return "🤩 Great";
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "Today";
    }
  };

  return (
    <>
<main className={styles.container}>
        {/* Editorial Header */}
        <section className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.badgeLabel}>CONFIDENTIAL JOURNAL</span>
              <span className={styles.badgeSub}>PRIVATE JOURNALING</span>
            </div>
            <h1 className={styles.title}>
              STUDENT <span>REFLECTIONS</span>
            </h1>
            <p className={styles.subtitle}>
              Untangle your daily thoughts, track your emotional patterns, and give your mind the breathing room it deserves.
            </p>
          </div>

          <div className={styles.headerRight}>
            {!showForm ? (
              <button 
                type="button" 
                className={styles.newEntryBtn} 
                onClick={() => setShowForm(true)}
              >
                <FiPlus size={20} />
                <span>NEW ENTRY</span>
              </button>
            ) : (
              <button 
                type="button" 
                className={styles.cancelTopBtn} 
                onClick={() => setShowForm(false)}
              >
                <FiX size={18} />
                <span>CLOSE FORM</span>
              </button>
            )}
          </div>
        </section>

        {alertMsg && (
          <div className={styles.toastNotice}>
            {alertMsg}
          </div>
        )}

        {/* New Entry Form Drawer / Box */}
        {showForm && (
          <section className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>📝 WRITE NEW REFLECTION</h2>
              <span className={styles.formStep}>STEP // JOURNAL ENTRY</span>
            </div>

            {/* Title Input */}
            <div className={styles.inputGroup}>
              <label className={styles.fieldLabel}>ENTRY TITLE (OPTIONAL)</label>
              <input
                type="text"
                placeholder="Give your entry a title, e.g., 'Exam preparation thoughts'..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                maxLength={100}
              />
            </div>

            {/* Mood Rating Slider */}
            <div className={styles.moodSection}>
              <div className={styles.moodHeaderRow}>
                <label className={styles.fieldLabel}>HOW WERE YOU FEELING TODAY?</label>
                <div className={styles.moodBadge}>
                  {getMoodEmoji(mood)} — <strong>{mood}/10</strong>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className={styles.slider}
              />
              <div className={styles.sliderScale}>
                <span>1 (Rough)</span>
                <span>5 (Okay)</span>
                <span>10 (Thriving)</span>
              </div>
            </div>

            {/* Main Long-Form Textarea */}
            <div className={styles.inputGroup}>
              <label className={styles.fieldLabel}>YOUR THOUGHTS & EXPERIENCES*</label>
              <textarea
                placeholder="What happened today? How did you respond to events? What are you grateful for? Let it all out freely..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className={styles.textarea}
                rows={8}
                required
              />
            </div>

            {/* Tags Section */}
            <div className={styles.tagSection}>
              <label className={styles.fieldLabel}>ADD RELEVANT TAGS</label>
              <div className={styles.presetTags}>
                {["academics", "stress", "gratitude", "anxiety", "social", "sleep", "milestone"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={styles.presetBtn}
                    onClick={() => addPresetTag(preset)}
                  >
                    +{preset}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAddTag} className={styles.tagForm}>
                <input
                  type="text"
                  placeholder="Type a custom tag and press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className={styles.inputTag}
                />
                <button type="submit" className={styles.addTagBtn}>
                  ADD TAG
                </button>
              </form>

              <div className={styles.tagsList}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tagBadge}>
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label="Remove tag">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Save / Cancel Action Buttons */}
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.saveBtn} 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "SAVING ENTRY..." : "SAVE REFLECTION ✓"}
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className={styles.cancelBtn}
              >
                CANCEL
              </button>
            </div>
          </section>
        )}

        {/* Existing Journal Entries List */}
        <section className={styles.entriesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>PAST REFLECTIONS ({entries.length})</h2>
            <span className={styles.journalMeta}>CHRONOLOGICAL LOG</span>
          </div>

          {loading ? (
            <div className={styles.loadingBox}>
              <p>Loading your journal entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className={styles.emptyCard}>
              <div className={styles.emptyIcon}>📓</div>
              <h3>YOUR JOURNAL IS EMPTY</h3>
              <p>Writing even a few lines each day helps reduce anxiety and builds emotional resilience.</p>
              <button 
                type="button" 
                className={styles.emptyActionBtn}
                onClick={() => setShowForm(true)}
              >
                WRITE YOUR FIRST ENTRY
              </button>
            </div>
          ) : (
            <div className={styles.journalGrid}>
              {entries.map((item) => (
                <article key={item.id} className={styles.journalCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardMeta}>
                      <span className={styles.dateBadge}>
                        <FiCalendar size={13} />
                        {formatDate(item.createdAt)}
                      </span>
                      <span className={styles.moodScoreBadge}>
                        <FiSmile size={13} />
                        {getMoodEmoji(item.mood)} ({item.mood}/10)
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.entry}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {item.tags.map((t, idx) => (
                        <span key={idx} className={styles.entryTag}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

