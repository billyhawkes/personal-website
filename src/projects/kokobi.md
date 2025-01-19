---
title: Kokobi
category: Software
description: Modern learning management system
site: https://lcds.krakconsultants.com
github: https://github.com/Cords-Connect/211
cover: "./kokobi.png"
---

Kokobi is a course distribution platform and learning management system. 

## Features

Here are some of the primary features:

- Courses: Made up of modules
    - Versioning
    - Learners Dashboard
    - Learner Invites
    - Webhooks
- Modules: Actual course files
    - Uploads
    - Supports scorm 1.2 and 2004
    - Multilingual
- Learners
    - Persistent Data
    - Completion Certificates
- Fully Multilingual
- Organizations

Many features are still to come as well!

## How it is made

At it's core Kokobi is built around two parts, the admin dashboard and the learning management system (LMS). 

**Admin**

The admin is built using Nextjs, Tailwind, Shadcn, Postgres w/Drizzle and more. It also uses blob storage for course uploads keeping files in Cloudflare R2. 

**LMS**

The LMS is built using an Iframe to the course files and a custom scorm wrapper build with react. The scorm content speaks to the LMS wrapper which speaks to the backend allowing us to store user progress.
