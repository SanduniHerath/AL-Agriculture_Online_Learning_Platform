# SRS summary (condensed)

Condensed from `SRS-ALAGRI-001-SUM v1.0` (15/11/2026, draft for review). The full SRS
(`SRS_AL_Agriculture_Learning_Platform_v1.0`) is authoritative and is **not** committed to this
public repository. Section references like (SRS §5.8) point to the full document.

## Project at a glance

| Item           | Value                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Client         | An A/L Agriculture teacher in Sri Lanka ("the Teacher")                                                 |
| Purpose        | Let G.C.E. A/L Agriculture students (Grade 12 & 13) study the full syllabus from home                   |
| Users          | Students (16-20, mostly mobile), visitors, the Teacher as administrator                                 |
| Platform       | Mobile-first responsive website (no native app)                                                         |
| Business model | Theory notes + unit-wise past-paper question PDFs free; videos sold per unit; full past papers per year |
| Size           | 149 functional requirements · 68 non-functional · 18 use cases · 21 business rules                      |

## Content and access

| Item                                         | Level                | Access               |
| -------------------------------------------- | -------------------- | -------------------- |
| Theory Note (1 PDF)                          | Unit                 | FREE - public        |
| Unit-wise Past Paper Questions (1 PDF, 30 y) | Unit                 | FREE - public        |
| Teaching videos                              | Sub-part (1.1, 1.2…) | PAID - unit purchase |
| Discussion videos - MCQ / Structured / Essay | Unit (3 sections)    | PAID - unit purchase |
| A/L past paper + marking scheme              | Exam year            | PAID - year purchase |

| Action                              | Visitor       | Student (not purchased) | Student (purchased) | Admin |
| ----------------------------------- | ------------- | ----------------------- | ------------------- | ----- |
| View intro, browse units & listings | Yes           | Yes                     | Yes                 | Yes   |
| View / download free PDFs           | Yes, no login | Yes                     | Yes                 | Yes   |
| Watch teaching / discussion videos  | No → login    | No → buy unit           | Yes, that unit only | Yes   |
| View past paper / marking scheme    | No → login    | No → buy year           | Yes, that year only | Yes   |
| Buy a unit or a year                | No → login    | Yes                     | Yes (not owned)     | -     |
| Admin functions                     | No            | No                      | No                  | Yes   |

## Functional modules (SRS §5)

| §    | Module                                  | FRs |
| ---- | --------------------------------------- | --- |
| 5.1  | Teacher introduction                    | 7   |
| 5.2  | Registration, login, account management | 16  |
| 5.3  | Syllabus and unit browsing              | 11  |
| 5.4  | Free public resources                   | 9   |
| 5.5  | Teaching videos                         | 11  |
| 5.6  | Unit-wise past paper discussion videos  | 9   |
| 5.7  | A/L past papers and marking schemes     | 10  |
| 5.8  | Cart, checkout and payment              | 19  |
| 5.9  | Access control and content protection   | 14  |
| 5.10 | Student dashboard                       | 9   |
| 5.11 | Admin panel                             | 24  |
| 5.12 | Notifications                           | 10  |

Key requirements in one line each:

- Free PDFs served to anyone, no login, cookie or payment (FR-FREE-03).
- Every unit page has the same four sections in the same order (FR-BRW-03).
- A unit purchase unlocks all videos of that unit and nothing else (FR-VID-03/04, FR-DSC-04).
- A year purchase unlocks that year's paper and marking scheme only (FR-PP-04).
- Payment counts only after the gateway's signed server notification is verified (FR-PAY-09).
- Access granted within 10 s of a verified payment (FR-PAY-10).
- Paid videos and documents use short-lived signed links and visible watermarks (FR-SEC-02/04, FR-PP-06).
- Access duration is an admin setting: fixed end date, fixed months or lifetime (FR-SEC-05).
- The Teacher sets every unit price and every year price in the admin panel (FR-ADM-10/11).
- Registration verified by a 6-digit SMS OTP (FR-ACC-02).

## Use cases

UC-01 View teacher introduction · UC-02 Register · UC-03 Log in / reset password · UC-04 Browse
syllabus and unit · UC-05 View/download free PDF · UC-06 Purchase a unit · UC-07 Purchase a past
paper year · UC-08 Watch sub-part teaching video · UC-09 Watch past paper discussion · UC-10 View
past paper and marking scheme · UC-11 View student dashboard · UC-12 Admin uploads/manages content ·
UC-13 Admin manages prices · UC-14 Admin views/manages payments · UC-15 Approve bank deposit slip ·
UC-16 Manage students and access · UC-17 Manage teacher introduction · UC-18 Configure site settings.

## Headline non-functional targets

| ID           | Target                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------- |
| NFR-PERF-01  | LCP ≤ 2.5 s at p75 on a mid-range Android over 4G (Lighthouse mobile)                             |
| NFR-PERF-03  | Video time-to-first-frame ≤ 3 s on 5 Mbps; rebuffering < 1 % (p90)                                |
| NFR-SCAL-01  | 5,000 concurrent users and 2,000 concurrent streams at exam-season peak                           |
| NFR-AVAIL-01 | ≥ 99.5 % monthly uptime                                                                           |
| NFR-SEC-01   | OWASP Top 10 (2021); pen-test before launch with zero open Critical/High; SAST + dependency scans |
| NFR-SEC-03   | Argon2id (or bcrypt cost ≥ 12) per-user salted passwords                                          |
| NFR-SEC-04   | TOTP 2FA mandatory for admins; admin idle timeout 30 min                                          |
| NFR-SEC-05   | No card data touches the platform (PCI-DSS SAQ A); gateway is PCI-DSS Level 1                     |
| NFR-PRIV-01  | Personal Data Protection Act No. 9 of 2022: privacy notice, consent with timestamp, DPO contact   |
| NFR-ACCS-01  | WCAG 2.1 AA: zero critical/serious axe-core violations; manual audit of key pages                 |
| NFR-LOC-01   | UTF-8; Sinhala and Tamil render correctly with web fonts (Noto Sans Sinhala / Tamil)              |
| NFR-LOC-04   | Dates DD/MM/YYYY; times hh:mm AM/PM; Asia/Colombo for display and expiry                          |
| NFR-BKP-02   | RPO ≤ 15 min for orders/payments/grants (≤ 24 h other); RTO ≤ 4 h                                 |
| NFR-AUD-01   | 100 % of admin create/update/delete logged (actor, time, IP, entity, before/after); append-only   |

## Core business rules

- **BR-01** Theory Note and Unit-wise Past Paper Question PDFs are free and fully public.
- **BR-03** A logged-in student account is required to purchase anything and to watch any video.
- **BR-04** Purchase of Unit N unlocks all teaching + discussion videos of Unit N and nothing else.
- **BR-05** Purchase of year Y unlocks the past paper(s) and marking scheme(s) of year Y only.
- **BR-07** Each unit and each year is priced and sold separately in LKR; price must be > 0 to be on sale.
- **BR-08** A price change applies only to orders created after the change.
- **BR-09** Paid content unlocks only after a server-verified payment, an admin-approved bank slip, or an audited manual grant.
- **BR-10** Access duration is an admin-configurable setting; expiry is calculated and stored when the grant is created.
- **BR-11** One account per student; non-transferable; credential sharing may lead to suspension without refund.
- **BR-13** A student cannot buy a product for which they already hold an ACTIVE grant.

## External services

Payment gateway (e.g. PayHere) · Video hosting and streaming with signed playback · SMS gateway ·
Email service · Cloud storage + CDN (public free PDFs; private paid documents).

## Open decisions (SRS §10) and current assumptions

| ID     | Decision                                    | Assumption until decided                                                    | Project decision      |
| ------ | ------------------------------------------- | --------------------------------------------------------------------------- | --------------------- |
| TBD-01 | Access duration after payment               | Configurable; 12 months default                                             | D5: default LIFETIME  |
| TBD-02 | Medium of instruction / UI languages        | Content Sinhala; UI EN + SI; data model supports Tamil                      | As assumed            |
| TBD-03 | Payment methods                             | Hosted gateway = Must; bank slip = Should                                   | D3: PayHere only v1   |
| TBD-04 | Device/session limit                        | Max 2 devices, 1 concurrent stream, configurable                            | As assumed            |
| TBD-05 | Purchased papers: view-only or downloadable | View-only in watermarked viewer; admin may enable watermarked download      | As assumed            |
| TBD-06 | Refund policy                               | No refunds once access granted, except duplicate/erroneous charges (manual) | As assumed            |
| TBD-07 | Assistant/staff accounts                    | Content Manager and Payment Officer roles (Should)                          | Role enum reserved    |
| TBD-08 | Bundles                                     | Data model supports BUNDLE; feature is Could for v1                         | Not in v1             |
| TBD-09 | Unit titles, grades, sub-parts              | "Unit 1"…"Unit 19"; grade set by admin                                      | D9: NIE syllabus      |
| TBD-10 | Tax treatment                               | Prices tax-inclusive; receipts are not tax invoices                         | As assumed            |
| TBD-11 | Guardian consent for under-18s              | Self-declared consent with guardian mobile                                  | D7: not in v1         |
| TBD-12 | Legal right to sell official past papers    | Client holds / will obtain rights                                           | Client responsibility |
| TBD-13 | Expected scale                              | 5,000 concurrent users, 2,000 streams                                       | As assumed            |
| TBD-14 | Domain, hosting budget, video provider      | Managed video hosting with signed URLs and HLS                              | Bunny Stream          |

## Top risks (SRS §11)

- R-02 Gateway merchant approval delays launch → start PayHere KYC early.
- R-03 Exam-season traffic spikes → CDN for media/PDFs, load test at 2× peak.
- R-05 IP rights over official past papers unclear → client to obtain legal confirmation.
- R-06 Volume of content to digitise (19 units, 30 years) → phased launch, bulk upload, "coming soon" placeholders.
- R-08 SMS OTP delivery failures → reputable local provider, resend, email OTP fallback.
