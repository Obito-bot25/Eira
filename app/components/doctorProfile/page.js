"use client";
import Image from "next/image";
import styles from "./doctor.module.css";
import { useState } from "react";

export default function BookSession() {
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Manisha Jain");
  const [booked, setBooked] = useState(false);

  const doctors = [
    {
      name: "Dr. Manisha Jain",
      rating: "4.6",
      experience: "8+ years",
      specialization: "Clinical Psychologist",
      location: "Campus Wellness Wing & Online",
      image: "/Ellipse30.png",
      specialisations: ["Anxiety", "Trauma", "CBT"],
      session: ["Video Call", "Voice Call", "In-Person"],
      availability: "Mon–Fri • 9:00 AM – 5:00 PM",
      accent: "var(--color-yellow, #FEF08A)",
    },
    {
      name: "Dr. Hema Chaudhary",
      rating: "4.4",
      experience: "7 years",
      specialization: "Counselling Psychologist",
      location: "Student Health Center & Online",
      image: "/Ellipse31.png",
      specialisations: ["Stress", "Anxiety", "Mindfulness"],
      session: ["Video Call", "In-Person"],
      availability: "Tue–Sat • 10:00 AM – 6:00 PM",
      accent: "var(--color-green, #BBF7D0)",
    },
    {
      name: "Dr. Aditya Singh",
      rating: "4.2",
      experience: "5 years",
      specialization: "Consultant Psychiatrist",
      location: "Campus Medical Complex",
      image: "/Ellipse32.png",
      specialisations: ["Depression", "Sleep Issues", "CBT"],
      session: ["Voice Call", "In-Person"],
      availability: "Mon–Fri • 11:00 AM – 4:00 PM",
      accent: "var(--color-blue, #BAE6FD)",
    },
    {
      name: "Dr. Shreya Sinha",
      rating: "4.2",
      experience: "6 years",
      specialization: "Addiction & Behavioral Counselor",
      location: "North Campus Clinic & Online",
      image: "/Ellipse33.png",
      specialisations: ["Habits", "Trauma", "Motivation"],
      session: ["Video Call", "Voice Call"],
      availability: "Mon–Fri • 9:30 AM – 5:30 PM",
      accent: "var(--color-pink, #FECDD3)",
    },
  ];

  function submit(e) {
    e.preventDefault();
    if (!selectedDoctor) {
      alert("Please select a specialist first.");
      return;
    }
    setBooked(true);
  }

  return (
    <>
<div className={styles.page}>
        <header className={styles.heroSection}>
          <div className={styles.topBadge}>
            <span className={styles.livePulse}></span>
            <span>LICENSED STUDENT MENTAL HEALTH CLINICIANS</span>
          </div>
          <h1 className={styles.heading}>
            BOOK A <span className={styles.highlightPill}>SPECIALIST</span> SESSION
          </h1>
          <p className={styles.subheading}>
            Confidential 1-on-1 consultations with accredited psychologists and therapists.
            Campus-subsidized for all enrolled students.
          </p>
        </header>

        <div className={styles.container}>
          {/* Left Column: Doctor Selection */}
          <div className={styles.doctorList}>
            <div className={styles.listHeader}>
              <span className={styles.secBadge}>DIRECTORY</span>
              <h3 className={styles.sectionTitle}>SELECT YOUR CLINICIAN</h3>
            </div>

            <div className={styles.cardsGrid}>
              {doctors.map((doc) => {
                const isSelected = selectedDoctor === doc.name;
                return (
                  <button
                    type="button"
                    key={doc.name}
                    className={`${styles.doctorCard} ${
                      isSelected ? styles.activeCard : ""
                    }`}
                    onClick={() => {
                      setSelectedDoctor(doc.name);
                      setBooked(false);
                    }}
                  >
                    <div className={styles.cardHeaderRow}>
                      <div className={styles.avatarWrap}>
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          width={60}
                          height={60}
                          className={styles.docImage}
                        />
                      </div>
                      <div className={styles.titleInfo}>
                        <h4>{doc.name}</h4>
                        <p className={styles.role}>{doc.specialization}</p>
                        <div className={styles.meta}>
                          <span>🕓 {doc.experience}</span>
                          <span>📍 {doc.location}</span>
                        </div>
                      </div>
                      <div className={styles.ratingBadge}>
                        <span>⭐</span>
                        <span>{doc.rating}</span>
                      </div>
                    </div>

                    <div className={styles.specSection}>
                      <span className={styles.subLabel}>SPECIALISATIONS:</span>
                      <div className={styles.specialisation}>
                        {doc.specialisations.map((s) => (
                          <span key={s} className={styles.specPill}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.sessionSection}>
                      <span className={styles.subLabel}>SESSION MODES:</span>
                      <div className={styles.sessionType}>
                        {doc.session.map((s) => (
                          <span key={s} className={styles.modePill}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.cardBottomBar}>
                      <span className={styles.availText}>🕒 {doc.availability}</span>
                      <span className={styles.selectHint}>
                        {isSelected ? "SELECTED ✓" : "CLICK TO SELECT →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className={styles.bookingFormWrap}>
            <div className={styles.bookingForm}>
              <div className={styles.formHeader}>
                <span className={styles.secBadge}>CONFIDENTIAL APPOINTMENT</span>
                <h3>BOOK IN-PERSON OR TELE-HEALTH</h3>
                <p className={styles.selectedClinicianNote}>
                  Selected Specialist: <strong>{selectedDoctor}</strong>
                </p>
              </div>

              {booked ? (
                <div className={styles.bookedView}>
                  <div className={styles.bookedIcon}>✓</div>
                  <h3>SESSION REQUEST SUBMITTED!</h3>
                  <p>
                    Your appointment request with <strong>{selectedDoctor}</strong> has been
                    logged. A calendar confirmation has been sent to your student inbox.
                  </p>
                  <button
                    className={styles.bookAnotherBtn}
                    onClick={() => setBooked(false)}
                  >
                    BOOK ANOTHER SESSION →
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>STUDENT FULL NAME *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jordan Lee"
                      className={styles.neoInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>CAMPUS EMAIL *</label>
                    <input
                      required
                      type="email"
                      placeholder="jordan@university.edu"
                      className={styles.neoInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>PHONE (OPTIONAL SMS REMINDERS)</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 019-2834"
                      className={styles.neoInput}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>PREFERRED DATE *</label>
                      <input
                        required
                        type="date"
                        className={styles.neoInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>PREFERRED TIME *</label>
                      <input
                        required
                        type="time"
                        className={styles.neoInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>SESSION TYPE *</label>
                    <select
                      required
                      defaultValue=""
                      className={styles.neoInput}
                    >
                      <option value="" disabled>
                        Select Session Format
                      </option>
                      <option>1-on-1 Confidential Therapy</option>
                      <option>Academic Stress Consultation</option>
                      <option>Follow-up Progress Review</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>MESSAGE / INTAKE NOTE (OPTIONAL)</label>
                    <textarea
                      placeholder="What would you like to focus on in this session? (Strictly confidential)..."
                      className={styles.neoTextarea}
                      rows={3}
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.bookBtn}>
                    SUBMIT CONFIDENTIAL BOOKING →
                  </button>
                </form>
              )}

              <div className={styles.expectBox}>
                <h4>WHAT TO EXPECT:</h4>
                <ul>
                  <li>● 45-minute zero-judgement introductory session</li>
                  <li>● Collaborative coping plan and personalized grounding tools</li>
                  <li>● Subsidized and strictly private student records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
