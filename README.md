# Document Tracker

A Laravel-based document management and tracking system that helps users submit documents, manage reviews, track feedback, and follow a document through its approval workflow.

## Overview

The Document Tracker is a web application designed to organize document submissions and make the review and approval process easier to monitor. It provides role-based access, document routing, feedback, revision and resubmission, activity history, and document archiving.

This project was developed as a portfolio project to demonstrate my skills in Laravel, PHP, database design, and web application development.

## Features

- **Authentication** — User registration, login, and logout.
- **Admin approval** — Administrators can review and approve user registrations.
- **Role management** — Administrators can assign authorized user roles.
- **Document submission** — Users can upload documents and view their document information.
- **Inbox** — Users can see documents requiring their attention.
- **Document review** — Reviewers can approve documents, request revisions, or reject submissions.
- **Feedback** — Authors can read feedback from reviewers.
- **Resubmission** — Authors can correct documents and resubmit them for review.
- **Automatic document routing** — Documents are routed to the appropriate person according to the workflow.
- **Dashboard** — Displays document metadata and status information.
- **Activity/history log** — Tracks important actions performed on a document.
- **Authorization** — Restricts document actions and file access according to user permissions.
- **Search and filtering** — Helps users find documents by keywords and status.
- **Completion and archiving** — Supports the completion and archiving of documents.

## Document Workflow

The general workflow is:

1. An author uploads and submits a document.
2. The document is routed to the reviewer.
3. The reviewer approves the document, requests revisions, or rejects it.
4. If revisions are requested, the author updates and resubmits the document.
5. Approved documents proceed to the department head for final approval.
6. The author completes approved documents according to the application's workflow.
7. Completed or rejected documents can be archived.
8. The activity history records important workflow events.

## User Roles

- **Administrator** — Manages user approval and role assignments.
- **Author/Uploader** — Submits documents, reads feedback, revises documents, and resubmits them.
- **Reviewer** — Reviews submitted documents and takes the appropriate review action.
- **Department Head** — Handles the next approval stage and final approval.

Access to document content and actions depends on the user's permissions.

## Technology Stack

- **Backend:** PHP, Laravel
- **Database:** MySQL / MariaDB
- **Frontend:** HTML, CSS, JavaScript
- **Development environment:** Docker, Laravel Sail
- **Version control:** Git, GitHub

## Screenshots

| Page                    | Screenshot                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Dashboard               | `https://drive.google.com/file/d/1OGVh2atYeWf9ciUppqRVMgAGgYClGLpq/view?usp=drive_link` |
| Document Inbox Reviewer | `https://drive.google.com/file/d/14IhyYaCuVESErsxggGppU9RX81swJafO/view?usp=drive_link` |
| Document Inbox Author   | `https://drive.google.com/file/d/1nQPRkqi0AxLyuXVIl0mDUERDxBNSoV1R/view?usp=drive_link` |
| Document Details        | `https://drive.google.com/file/d/19l0-LMqSmvdCdWYRQOlY4amiVgs2EZdR/view?usp=drive_link` |
| Activity History        | `https://drive.google.com/file/d/1oPBudXm2Kr0RQiO9GfVHaBNy2GnMWb-2/view?usp=drive_link` |
| Archive                 | `https://drive.google.com/file/d/10xm-QSAGPZZCLdYkDNB7bmEstbVLqgud/view?usp=drive_link` |

## Live Demo

**Demo URL:** <http://54.169.170.98/>

**Video Instruction:** <https://drive.google.com/file/d/1PmScpeFubVewTgIBTYD6CNaqJ8E0hoOu/view?usp=sharing>

## Default User Password and Email

- **Admin Email** — admin@gmail.com
- **Admin Password** — 123

- **Test Email** — test@example.com
- **Test Password** — password

## Project Goals

This project demonstrates practical experience with Laravel application development, relational database design, authentication, role-based authorization, file handling, workflow automation, and activity logging.

## Author

**Reygin G. Susas**

- GitHub: <https://github.com/dockyoh>
- Portfolio: <https://dockyoh.github.io/portfolio/>
- LinkedIn: <https://www.linkedin.com/in/reygin-susas-a95866180/?isSelfProfile=true>
