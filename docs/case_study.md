# Pain & Energy Diary — UX Plan for Portfolio (student edition)

## 1) What it is and what you’ll learn

You’ll design a **micro-product**: a super-fast diary to log **Pain (0–10)** and **Energy (0–10)**. The app automatically saves **date/time** and, if the user agrees, links the **weather**. After 7 days it shows **simple patterns** (e.g., “pain increases in the evening”).

For you, this project demonstrates skills in **UX research**, **prototyping**, **usability testing**, readable **data-viz**, **accessibility**, and **privacy by design**.

> Key goal: in under **5 seconds** the user must be able to record an entry clearly and accessibly.


## 2) Expected outcomes (success criteria)

**Qualitative**

* Logging is perceived as **fast** and **simple**.
* Visualizations create **awareness** without claiming causality.

**Quantitative** (on tested prototype)

* **Entry completion rate** > **90%** (i.e., out of 100 started logging attempts, at least 90 end with a valid save without errors or abandonment).
* **Median time per entry** < **5 s**.
* **Insight comprehension** ≥ **80%** correct answers to 3 scenario questions.
* **SUS** ≥ **75** at the second testing round.

> SUS = System Usability Scale, score 0–100; 68 is average, 75 is good.


## 3) MVP: what’s in / what’s out

**Included**

* **Log**: 2 sliders (0–10) + **optional notes** (max 120 characters). Automatic timestamp. Weather is **opt-in** and revocable.
* **Insights (7 days)**: 1–2 simple charts + **insight sentences** in clear Italian.
* **Export**: minimal PDF/CSV for the doctor (range, median, variation, 2–3 insights).

**Excluded**

* Accounts, full calendar, gamification, treatment plans. Avoid “everything at once”: you need a **clear flow** that showcases your UX skills.


## 4) Step-by-step roadmap (with example outputs)

### 4.1 Define problem and hypotheses (½ day)

* **Problem statement**: “People with variable pain don’t remember patterns useful to the doctor; we need **ultra-fast** logging and **readable insights**.”
* **Hypotheses**:

  * H1: if logging takes <5 s, adherence increases.
  * H2: after 7 days, simple insights increase awareness.
  * H3: weather is useful but sensitive → it must be **opt-in**.
* **Output (example)**

  * **Brief (1 page)**

    * Target: adults 20–60 with episodic/chronic mild-moderate pain.
    * Problem: slow diaries → abandonment → imprecise recall during visits.
    * Solution: **single screen** with 2 sliders + notes, timestamp, opt-in weather, 7-day insights.
    * Value: user (awareness), doctor (concise report).
    * Constraints: mobile-first, no account, local data in tests, privacy by design.
  * **OKRs/KPIs (thresholds)**: entry time <5 s; completion >90%; insight comprehension ≥80%; SUS ≥75; weather revocation ≤2 taps.

### 4.2 Research questions and audience (½ day)

* **Research Questions (examples)**

  1. At what times of day would people log pain/energy?
  2. Which barriers make them give up (e.g., too many taps, long text)?
  3. Which data are truly useful to the doctor in the report?
* **Target**: 5–7 users (mix by age/pain frequency/tech confidence) + 1–2 doctors.
* **Output**: 3–5 priority RQs + inclusion/exclusion criteria.

### 4.3 Discovery research plan (½–1 day)

* **Methods**: 5–7 semi-structured interviews (20–30’), 1 doctor interview, benchmarking of 3–5 apps.
* **Risks**: social desirability (ask neutral questions), privacy (anonymize), health topic (use dummy data).
* **Output**: plan, interview guide, **screener**, **consent**.

### 4.4 Recruitment & logistics (in parallel)

* **Sample**: 5–7 users. **Incentive** symbolic (e.g., gift card).
* **Tools**: Meet/Zoom (recording), FigJam/Notion for notes.
* **Output**: interview schedule + recording checklist.

### 4.5 Interviews and synthesis (1–2 days)

* **Conduct**: real cases (“Tell me about the last time you…”), show examples of diaries used.
* **Analysis**: light transcription, **qualitative coding** and **affinity mapping**.
* **Output**: 6–10 key insights, **Jobs-To-Be-Done**, barriers/drivers, requirements.

### 4.6 Requirements & guiding principles (½ day)

* **Principles**: speed, control, clarity, data respect.
* **Requirements (example)**: entry <5 s; one-handed; offline-friendly; edit within 10 min; weather opt-in and revocable; insights described as **associations**, not causes.
* **Output**: **MoSCoW** requirements + acceptance criteria.

### 4.7 IA and user flows (½–1 day)

* **Flows**: first-run (weather consent + 3-step tutorial), log, insights (educational empty state if <7 entries), export.
* **Edge cases**: no network, permissions denied, time zone/DST.
* **Output**: **wire-flow** with states and fallbacks.

### 4.8 Low-fi wireframes (½ day)

* **Variants**: horizontal vs vertical sliders (prepare both for testing). Primary CTA “Save.” Optional notes with remaining character count.
* **Output**: low-fi screens ready for validation.

### 4.9 Content and scales (¼–½ day)

* **Pain (NRS 0–10)**: 0 = no pain; 10 = worst imaginable.
* **Energy (0–10)**: 0 = exhausted; 10 = at your peak.
* **Microcopy**: neutral, non-judgmental tone. Insight example: “In the evening, pain is on average **+1.8** vs morning (association, not cause).”
* **Output**: labels, tooltips, and error messages.

### 4.10 Mid/hi-fi prototype in Figma (1–2 days)

* **Techniques**: Auto Layout, Variants, Variables (theme/metrics), interactive prototype (tap/drag/keyboard).
* **Output**: navigable prototype + mini design system (sliders, buttons, insight card).

### 4.11 Evaluation R1 (formative test) (1 day)

* **Tasks**: A) Log now; B) Edit entry; C) Enable/disable weather; D) Interpret an insight.
* **Metrics**: success, errors, **task time**, **SEQ** post-task (1–7 scale), qualitative notes.
* **Output**: short report + prioritized fix backlog.

### 4.12 Iteration (½–1 day)

* **Priorities**: reduce entry time; clarify insights; simplify permissions.
* **Output**: prototype v2 + changelog.

### 4.13 Visual design and accessibility (½ day)

* **WCAG 2.2 AA**: contrast, visible focus, tab order, keyboard. For sliders: **alternative numeric input**, step = 1, value label.
* **Charts**: not color-only (markers/textures), direct labels.
* **Output**: accessibility audit + fixes.

### 4.14 Insight view (data-viz) (½–1 day)

* **Recommended charts**: time series (pain/energy); simple scatter (weather/time vs pain); bands for time-of-day segments.
* **Insight sentences**: in simple Italian, with **magnitude of difference** (“+1.5”) and a **disclaimer**.
* **Output**: layout + rules for sentence generation.

### 4.15 Export for the doctor (¼ day)

* **1-page PDF**: range, median, variation, top 2 insights; **CSV** with entries.
* **Note**: “subjective data, not diagnostic.”
* **Output**: export mock + filled example.

### 4.16 Evaluation R2 (summative test) (1 day)

* **Sample**: 5 new users + 1 doctor.
* **Focus**: insight comprehension, export usefulness. **SUS** and **UMUX-Lite**.
* **Output**: results + comparison with R1.

### 4.17 Case study for portfolio (1–2 days)

* **Structure**: problem → process → evidence → results → iterations → what’s next.
* **Output**: portfolio page with images, Figma link, and essential artifacts.

> **Suggested timeline**: 2–3 weeks part-time (adapt to availability).


## 5) Key skills to use/learn

**UX Research**

* Semi-structured interviews (non-leading questions), qualitative analysis (**affinity mapping**), synthesis into insights/JTBD.
* Evaluation: usability testing, **task success**, **SUS**, **UMUX-Lite**, **SEQ**.

**Design**

* User flows, wireframes, **controls** design (sliders + alternative), **empty states**.
* Content design: clear microcopy; texts for errors and permissions.

**Accessibility**

* **WCAG 2.2 AA**: focus, contrast, keyboard, gesture alternatives. Charts interpretable without color.

**Privacy (GDPR)**

* Health data = **special category**: explicit consent, minimization, clear opt-in/opt-out, simple revocation. Use **dummy data** in tests.

**Data-viz**

* Choose essential charts; readable labels; natural-language explanations; **no causality**.

**Tools**

* **Figma** (Auto Layout, Variants, Variables, interactive prototype), FigJam, Notion/Sheets, (opt.) Maze/Useberry.

**Professionalism**

* **MoSCoW** prioritization; clear metrics; **storytelling** for the case study.


## 6) Common pitfalls and how to avoid them

1. **Skipping discovery** → solutions based on assumptions.
   **Avoid**: 5–7 quick interviews before designing.

2. **Confirmation bias** → you seek support for your ideas.
   **Avoid**: neutral questions; include people who wouldn’t use a diary.

3. **Inaccessible sliders**.
   **Avoid**: step 1, alternate numeric input, keyboard support, clear focus.

4. **Misleading insights (“cold causes pain”)**.
   **Avoid**: speak of **associations**; show average differences with units (“+1.5”).

5. **Intrusive permissions**.
   **Avoid**: weather **opt-in** with clear rationale and revocation in ≤2 taps.

6. **Confusing charts**.
   **Avoid**: max 1–2 charts; direct labels; example of how to read them.

7. **Ignored empty states**.
   **Avoid**: explain how to get value (≥7 entries) and suggest reminders.

8. **Uncovered edge cases**.
   **Avoid**: plan for no network, denied permissions, time zones.

9. **Scope creep**.
   **Avoid**: MoSCoW + acceptance criteria; “post-MVP” backlog.

10. **Forgetting the doctor**.
    **Avoid**: 1 clinician interview; export shaped to their needs.


## 7) Practical tips per step

* **Brief**: structure in 4 lines (User → Problem → Impact → Success).
* **Screener**: ask pain frequency, diary habits, OS; don’t ask for diagnoses.
* **Interviews**: have them recount the last concrete experience; avoid “would you/would you like…”.
* **Affinity**: group by logging moments, barriers, usefulness to the doctor.
* **Principles**: write them in first person (“I log in seconds”, “I understand what’s happening”).
* **Wire-flow**: CTA within thumb reach for right- and left-handed users.
* **Scales**: show textual labels (0/10) and a tooltip of the current value.
* **Tutorial**: max 3 cards, dismissible, reviewable from settings.
* **Insight copy**: “In the **evenings (18–22)**, pain is on average **+1.8** vs morning. (Association, not cause.)”
* **Export**: anonymous header (initials and date range); no sensitive health data.
* **Testing**: realistic scenarios (“It’s 21:00, record how you feel”); time the tasks.
* **Iterations**: first remove logging blockers and chart-reading doubts, then polish details.


## 8) Deliverables (portfolio checklist)

* ✅ Brief + goals + KPIs.
* ✅ Research plan, screener, consent, interview guide.
* ✅ Discovery synthesis (insights, JTBD, quotes, affinity map photos).
* ✅ Requirements & principles + MoSCoW + acceptance criteria.
* ✅ IA, user flows, low-fi wireframes.
* ✅ Figma prototype (link) + short video walkthrough.
* ✅ R1 test: plan, script, results, fix backlog.
* ✅ Accessibility audit + fixes.
* ✅ Insight view (charts + copy) with examples.
* ✅ Export mock (PDF/CSV) with example.
* ✅ R2 test and KPI comparison.
* ✅ Written case study with storytelling and evidence.


## 9) Quick templates

**A) Screener (excerpt)**

* Age: 20–60
* Pain frequency: daily / weekly / sporadic
* Do you use a diary/health app? How?
* Smartphone: iOS/Android + version
* Willing to join a 30’ remote call

**B) Consent (excerpt)**

> Voluntary participation; no real clinical data required; recording only for UX analysis; anonymization; you can stop at any time.

**C) Interview guide (excerpt)**

1. Tell me about the last time you were in pain: how did you track it?
2. Have you ever used a diary? What worked / what didn’t?
3. During a visit, what does your doctor really need?
4. How would you feel about linking weather? (benefits/concerns)

**D) R1 test script (tasks)**

* A: “Log pain and energy and save.”
* B: “Edit the entry you just recorded.”
* C: “Enable weather, then disable it.”
* D: “View insights and explain what happens in the evening.”

**E) Metrics grid (sheet)**

* Per task: success (Y/N), errors, time (s), **SEQ** (1–7), notes.

**F) Events (conceptual instrumentation)**

* `entry_created`, `entry_edited`, `note_added`, `weather_opt_in/out`, `insights_viewed`, `export_generated`, `reminder_shown/dismissed`.
* **UX KPIs**: completion time, % 7 complete days, % insight comprehension, SUS.

**G) Accessibility checklist (excerpt)**

* Visible focus and coherent order.
* Sliders: tap-to-set, keyboard support, readable value, alternate numeric input.
* Charts: not color-only; direct labels; textual description.


## 10) Simple rules to generate insight sentences

* **Time-of-day bands**: if average pain **18–22** ≥ average **6–10** + **1.5** → “evenings tend to be worse (**+X**).”
* **Weather**: if `cold` ≥ `warm` + **1.5** → “in cold conditions it tends to be worse (**+X**).”
* **Energy vs pain**: if the correlation (trend) is **moderately negative** → “when energy is high, pain **tends** to be lower.”
* **Always**: add a **disclaimer**: “Observed association, not cause.”


## 11) Case study outline (for the portfolio)

1. **Context & role**
2. **Problem & goals** (KPIs)
3. **Research** (methods, sample, key insights)
4. **Requirements & principles**
5. **IA, wireframes, prototype** (clips/gifs)
6. **R1 test → Iterations → R2 test** (KPIs before/after)
7. **Accessibility & privacy**
8. **Results & next steps**
9. **Lessons learned**


## 12) Stretch goals (post-MVP)

* Smart reminders (personalized times).
* Custom tags (e.g., “medication taken”, “workout”).
* 4-week patterns.
* Weather by ZIP code (without precise geolocation).
* **Desktop** view for review.


## 13) Privacy (GDPR) — how to present it in the portfolio

* Treat the project as a **concept**: use **dummy data** in tests.
* No real coordinates: if you simulate weather, explain **why** and how it can be **revoked**.
* Show a **Settings** screen with “Delete all data from device.”
* Highlight **data minimization** and **user control**.


## Quick glossary

* **NRS (Numeric Rating Scale)**: 0–10 scale for pain.
* **SUS**: System Usability Scale (0–100), measures perceived usability.
* **UMUX-Lite**: short usability questionnaire (2 items).
* **SEQ**: Single Ease Question (1–7) post-task.
* **MoSCoW**: Must/Should/Could/Won’t (prioritization).
* **JTBD**: Jobs-To-Be-Done, what the user is trying to accomplish.
* **Opt-in/Opt-out**: enter/leave a feature that uses personal data.
* **MVP**: minimum version that delivers value and enables learning.
* **Edge case**: boundary/particular situation to anticipate.
