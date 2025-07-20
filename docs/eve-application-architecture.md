# **Eve AI.Rio Application Architecture - Legal/LGPD Vertical within AI.Rio Platform**

> **Note**: This document describes the Eve AI.Rio application architecture within the broader AI.Rio Platform. For platform-level architecture and multi-application infrastructure, see `ai-rio-platform-architecture.md`.

## **Introduction**

This document outlines the application-specific architecture for **Eve AI.Rio** - the legal compliance and LGPD specialist application within the AI.Rio Platform. It serves as the implementation guide for the Eve application, detailing how it integrates with platform services while delivering specialized LGPD compliance analysis.

The architecture is designed to support the Eve application requirements detailed in `eve-application-prd.md`, leveraging the AI.Rio Platform's shared infrastructure (defined in `ai-rio-platform-architecture.md`) while providing specialized legal document processing capabilities.


### **Change Log**

|            |             |                                                                                             |                    |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------ |
| **Date**   | **Version** | **Description**                                                                             | **Author**         |
| 2025-07-18 | 1.0         | Initial Draft - High Level Architecture                                                     | Winston, Architect |
| 2025-07-18 | 1.1         | Added Tech Stack                                                                            | Winston, Architect |
| 2025-07-18 | 1.2         | Added Data Models                                                                           | Winston, Architect |
| 2025-07-18 | 1.3         | Added Components                                                                            | Winston, Architect |
| 2025-07-18 | 1.4         | Added Core Workflows                                                                        | Winston, Architect |
| 2025-07-18 | 1.5         | Added Database Schema                                                                       | Winston, Architect |
| 2025-07-18 | 1.6         | Added Source Tree                                                                           | Winston, Architect |
| 2025-07-18 | 1.7         | Expanded Source Tree with Public & App Routes                                               | Winston, Architect |
| 2025-07-18 | 1.8         | Added Posts collection for Blog                                                             | Winston, Architect |
| 2025-07-18 | 1.9         | Added Stripe for payments and Subscriptions model                                           | Winston, Architect |
| 2025-07-18 | 2.0         | Added Resend for transactional emails                                                       | Winston, Architect |
| 2025-07-18 | 2.1         | Added AI Email Engine and Dashboard feature                                                 | Winston, Architect |
| 2025-07-18 | 2.2         | Added PostHog for Product Analytics                                                         | Winston, Architect |
| 2025-07-18 | 2.3         | Made AI Email Dashboard an admin-only feature                                               | Winston, Architect |
| 2025-07-18 | 3.0         | Added comprehensive operational strategies (Security, Observability, CI/CD, Error Handling) | Winston, Architect |
| 2025-07-18 | 3.1         | Corrected High Level Architecture Diagram: moved database to external services, added OpenAI API, fixed chunking-system scope, removed incorrect email generation references. | Sarah, Product Owner |
| 2025-01-20 | 4.0         | Repositioned as Eve Application Architecture within AI.Rio Platform. Renamed from eve-ai-rio-architecture.md. Platform-level architecture moved to ai-rio-platform-architecture.md. | John, Product Manager |


## **Eve Application Architecture**

### **Application Technical Summary**

The Eve AI.Rio application is architected as a specialized legal compliance application within the AI.Rio Platform. The application leverages platform services (user management, shared AI processing, analytics) while providing LGPD-specific user interfaces, workflows, and analysis capabilities. The application features dedicated routes within the platform's Next.js frontend, specialized API endpoints for legal document processing, and integration with the platform's shared "Motor de Chunking Híbrido" for LGPD compliance analysis.

The application is designed to operate within the platform's multi-tenant architecture while maintaining clear separation of legal-specific functionality and data.


### **Platform and Infrastructure Choice**

- **Platform:** **Vercel** is the recommended platform for deployment.

- **Rationale:** Vercel provides a seamless, Git-based deployment workflow for Next.js applications. Its serverless functions are a perfect fit for hosting both the Next.js frontend and the Payload CMS backend, aligning with our serverless architecture goal. It offers built-in CI/CD, automatic scaling, a global edge network for performance, and first-class integration with the Next.js framework, significantly simplifying infrastructure management.


### **Repository Structure**

The project correctly utilizes a **monorepo** structure, as confirmed by the initial file state. Both the Next.js frontend and Payload CMS backend coexist within the same repository. This simplifies dependency management and facilitates type-safe code sharing between the frontend and backend, which is critical for efficiency and reducing errors.


### **High Level Architecture Diagram (Corrected)**

graph TD

    subgraph "User's Browser"

        A\[Next.js Frontend]

    end

    subgraph "Vercel Platform"

        B\[Payload CMS Backend API]

        C\[Database - e.g., Postgres]

    end

    subgraph "External Services"

        F\[Stripe API]

        G\[Resend API]

        H\[PostHog API]

    end

    subgraph "Internal Services (e.g., AWS/GCP)"

        D\[Chuncking System Microservice]

        
    end

    A -- "API Calls (GraphQL/REST)" --> B;

    A -- "Sends Analytics Events" --> H;

    B -- "CRUD Operations" --> C;

    B -- "Triggers Analysis Job" --> D;

    B -- "Manages Subscriptions" --> F;

    B -- "Sends Emails" --> G;

    
    D -- "Returns Analysis Results" --> B;

    B -- "Email Template Generation" --> I[OpenAI API];
    B -- "Server Analytics Events" --> H;


### **Architectural and Design Patterns**

- **Headless Application:** The Next.js frontend is decoupled from the Payload CMS backend. They communicate via APIs, allowing for independent development and deployment.

- **Serverless Functions:** Both the Payload backend and any custom API routes will be deployed as serverless functions, ensuring scalability and cost-efficiency.

- **Microservice for Core IP:** The chuncking-system is treated as a specialized microservice. This isolates the complex AI logic, allowing it to be scaled and updated independently of the main application.

- **Repository Pattern:** Payload CMS inherently uses a repository-like pattern for data access, abstracting the database logic and providing a clean interface for data operations.

- **Component-Based UI:** The Next.js frontend will be built using a component-based architecture, promoting reusability and maintainability.


## **Tech Stack**

This section defines the official technology stack for the Eve AI.Rio platform. All development must adhere to these choices to ensure consistency and compatibility.

|                          |                         |             |                                                                                                                      |
| ------------------------ | ----------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| **Category**             | **Technology**          | **Version** | **Rationale**                                                                                                        |
| **Frontend Language**    | TypeScript              | \~5.x       | Provides strong typing for a more robust and maintainable frontend codebase.                                         |
| **Frontend Framework**   | Next.js                 | \~14.x      | A production-grade React framework that enables serverless functions, and optimal performance.                       |
| **UI Component Library** | shadcn/ui               | Latest      | A highly composable and accessible component library built on Tailwind CSS, allowing for rapid UI development.       |
| **Styling**              | Tailwind CSS            | \~3.x       | A utility-first CSS framework for building custom designs quickly and consistently.                                  |
| **State Management**     | Zustand                 | \~4.x       | A small, fast, and scalable state-management solution that simplifies state logic without boilerplate.               |
| **Backend Language**     | TypeScript              | \~5.x       | Ensures end-to-end type safety when integrated with the Next.js frontend.                                            |
| **Backend Framework**    | Payload CMS             | \~3.x       | A headless CMS and application framework that accelerates backend development with built-in auth and data models.    |
| **API Style**            | REST & GraphQL          | N/A         | Payload CMS provides both REST and GraphQL APIs, offering flexibility for frontend data fetching.                    |
| **Database**             | PostgreSQL              | \~16.x      | A powerful, open-source object-relational database system known for its reliability and robustness.                  |
| **Authentication**       | Payload CMS Auth        | \~3.x       | Utilizes the built-in, secure, and extensible authentication features of Payload CMS.                                |
| **Payment Gateway**      | Stripe                  | Latest API  | A robust, developer-friendly platform for handling subscriptions and payments, with excellent documentation.         |
| **Transactional Email**  | Resend                  | Latest API  | A modern, developer-first email API that integrates seamlessly with React/Next.js for transactional emails.          |
| **Email Templating**     | React Email             | Latest      | Allows for creating beautiful, responsive email templates using React components, integrating perfectly with Resend. |
| **Product Analytics**    | PostHog                 | Latest      | An all-in-one, open-source product analytics suite for event tracking, session replay, and feature flags.            |
| **Testing**              | Jest & Playwright       | Latest      | Jest for unit/integration tests and Playwright for robust end-to-end testing across all modern browsers.             |
| **CI/CD**                | Vercel & GitHub Actions | N/A         | Vercel for seamless frontend/Payload deployment, and GitHub Actions for automating workflows like testing.           |


## **Data Models**

The following data models will be configured as **Collections** within Payload CMS.


### **1.** Users **Collection**

- **Relationships:**

  - A User has a one-to-many relationship with Documents, AnalysisReports, Posts, EmailCampaigns.

  - A User has a one-to-one relationship with Subscriptions.


### **2.** Documents **Collection**

- **Purpose:** Stores the metadata of the legal documents uploaded by users.


### **3.** AnalysisReports **Collection**

- **Purpose:** Stores the structured results generated by the chuncking-system microservice.


### **4.** Posts **Collection**

- **Purpose:** Manages content for the public-facing blog.


### **5.** Subscriptions **Collection**

- **Purpose:** Manages user subscriptions and billing status.


### **6.** EmailTemplates **Collection**

- **Purpose:** Stores reusable, AI-generated or user-created email templates.


### **7.** EmailCampaigns **Collection**

- **Purpose:** Manages the sending and tracking of email campaigns.


## **Components**

### **1. Next.js Frontend**

- **Responsibility:** Handles all user interaction, including a new **AI Email Dashboard** and an **Admin Analytics Dashboard** powered by PostHog. It is also responsible for initializing the PostHog client and sending all user interaction events.


### **2. Payload CMS Backend**

- **Responsibility:** The central application server. It manages business logic for all features, including the AI Email Engine, and can also send server-side events to PostHog for tracking backend processes.


### **3.** chuncking-system **Microservice**

- **Responsibility:** The core AI engine for LGPD document analysis only. Processes legal documents and generates compliance risk reports.


### **4. AI Email Engine (Logical Component)**

- **Responsibility:** A logical component within the Payload backend for managing email campaigns. Uses OpenAI API for email template generation and content creation.


## **Core Workflows**

### **AI-Powered Email Campaign Workflow**

(As previously defined)


## **Database Schema**

(As previously defined)


## **Eve Application Source Tree**

The Eve application operates within the AI.Rio Platform monorepo structure. This section details the Eve-specific portions of the codebase within the broader platform architecture.

> **Important**: This document now focuses on Eve application-specific implementation. For platform-level architecture, routing, and multi-application infrastructure, see `ai-rio-platform-architecture.md`.

.

├── src

│   ├── app

│   │   ├── (marketing)         # Next.js group for public-facing pages

│   │   │   ├── layout.tsx      # Marketing site layout

│   │   │   ├── page.tsx        # Homepage (/)

│   │   │   ├── solucoes/       # Solutions page

│   │   │   │   └── page.tsx

│   │   │   ├── precos/         # Pricing page

│   │   │   │   └── page.tsx

│   │   │   ├── blog/           # Blog landing page

│   │   │   │   ├── page.tsx

│   │   │   │   └── \[slug]/     # Individual blog posts

│   │   │   │       └── page.tsx

│   │   │   ├── sobre/          # About Us page

│   │   │   │   └── page.tsx

│   │   │   └── contato/        # Contact page

│   │   │       └── page.tsx

│   │   ├── (app)               # Next.js group for the secure, authenticated application

│   │   │   ├── layout.tsx      # Layout for the authenticated app

│   │   │   ├── dashboard/      # Main user dashboard

│   │   │   │   └── page.tsx

│   │   │   ├── upload/         # Document upload page

│   │   │   │   └── page.tsx

│   │   │   └── reports/

│   │   │       └── \[id]/       # Dynamic route for viewing a specific report

│   │   │           └── page.tsx

│   │   ├── (admin)             # Next.js group for ADMIN-ONLY features

│   │   │   ├── layout.tsx      # Layout for the admin section

│   │   │   ├── email/          # AI Email Dashboard (Admin only)

│   │   │   │   ├── campaigns/

│   │   │   │   │   └── page.tsx

│   │   │   │   └── templates/

│   │   │   │       └── page.tsx

│   │   │   └── analytics/      # Admin-only dashboard for PostHog

│   │   │       └── page.tsx

│   │   └── (payload)           # Next.js group for the Payload backend

│   │       ├── admin           # Payload Admin UI routes

│   │       └── api             # Payload API routes (REST & GraphQL)

│   ├── collections             # Payload CMS collection definitions

│   │   ├── Users.ts

│   │   ├── Documents.ts

│   │   ├── AnalysisReports.ts

│   │   ├── Posts.ts

│   │   ├── Subscriptions.ts

│   │   ├── EmailTemplates.ts

│   │   └── EmailCampaigns.ts

│   ├── components              # Shared React components for the frontend

│   │   ├── marketing           # Components specific to the public site

│   │   ├── app                 # Components specific to the secure app

│   │   └── ui                  # Base components from shadcn/ui

│   ├── lib                     # Shared utility functions and hooks

│   ├── providers               # Client-side providers

│   │   └── PostHogProvider.tsx # Component to initialize PostHog

│   └── payload.config.ts       # Main Payload CMS configuration file

├── docs                        # Project documentation (PRD, Architecture, etc.)

├── scripts                     # Utility and automation scripts

├── .env.example                # Environment variable templates

├── next.config.mjs             # Next.js configuration

├── tsconfig.json               # TypeScript configuration

└── ...                         # Other root config files (tailwind, postcss, etc.)


## **Security Strategy**

This section outlines the holistic security posture for the Eve AI.Rio platform, ensuring the protection of user data and system integrity.


### **Authentication & Authorization**

- **Provider:** Authentication will be managed exclusively by **Payload CMS**. Its built-in authentication provides a secure foundation for user registration, login, and session management.

- **Access Control:** Role-based access control (RBAC) will be enforced within Payload CMS. The Users collection will define roles (admin, user), and Payload's access control functions will be used to protect all collections and API endpoints, ensuring users can only access their own data.


### **API Security**

- **Input Validation:** All incoming API requests to Payload CMS will be validated using **Zod**. This will be enforced at the API boundary to prevent malformed data from entering the system.

- **Rate Limiting:** A rate-limiting strategy will be implemented on critical endpoints (e.g., login, document upload) to prevent abuse and denial-of-service attacks. This can be configured at the Vercel Edge level.

- **OWASP Top 10:** We will mitigate common vulnerabilities by relying on the built-in protections of Payload CMS and Next.js, and by following best practices, including:

  - **Injection:** Payload's database adapter helps prevent SQL injection.

  - **Cross-Site Scripting (XSS):** Next.js/React's default JSX rendering provides protection. All rich text content stored in Payload will be sanitized on output.

  - **Security Headers:** Standard security headers (CSP, HSTS, X-Frame-Options) will be configured in next.config.mjs.


### **Secrets Management**

- **Provider:** All secrets (database URLs, API keys for Stripe, Resend, etc.) will be managed as **Vercel Environment Variables**.

- **Policy:** No secrets will ever be hardcoded in the source code. The application will be configured to read these variables from the environment, ensuring a secure separation of code and configuration.


## **Observability & Monitoring**

This section defines our strategy for monitoring the health and performance of the application.


### **Structured Logging**

- **Library:** We will use a structured logger like **Pino** for both the Payload CMS backend and any server-side Next.js components.

- **Format:** All logs will be in JSON format, containing a consistent set of fields (e.g., timestamp, level, correlationId, service, message).

- **Centralization:** Vercel's **Log Drains** will be configured to forward all application logs to a centralized logging provider (e.g., Logtail, Datadog) for unified analysis and alerting.


### **System Health**

- **Health Checks:** A dedicated health check endpoint (e.g., /api/health) will be created in Payload CMS. This endpoint will verify connectivity to the database and other critical internal services.

- **Alerting:** Alerts will be configured in our centralized logging provider to notify the team of critical issues, such as:

  - A spike in 5xx server errors.

  - Failure of the chuncking-system microservice to respond.

  - High latency on critical API endpoints.


### **Product Analytics**

- **Provider:** **PostHog** will be used for all product analytics, as previously defined. This provides insight into user behavior, while the logging system provides insight into system health.


## **CI/CD Pipeline**

This section outlines the automated pipeline for testing, building, and deploying the application.


### **Workflow**

The CI/CD pipeline will be orchestrated using **GitHub Actions** and **Vercel**.

graph TD

    A\[Developer pushes to GitHub] --> B{PR to \`main\` branch?};

    B -- Yes --> C\[GitHub Action: Lint & Test];

    C -- Success --> D\[Vercel: Create Preview Deployment];

    D --> E\[Manual: Code Review & QA];

    E -- Approved --> F\[Merge PR to \`main\`];

    F --> G\[Vercel: Deploy to Production];

    B -- No (Push to feature branch) --> C;


### **Pipeline Stages**

1. **Push:** A developer pushes code to a feature branch or creates a pull request.

2. **Lint & Test (GitHub Actions):** An automated GitHub Action workflow is triggered. It runs ESLint to check for code style issues and runs the full test suite (Jest and Playwright). This must pass before the PR can be merged.

3. **Preview Deployment (Vercel):** Upon successful tests, Vercel automatically builds and deploys a unique, shareable preview environment for the pull request. This allows for manual QA and stakeholder review.

4. **Merge to** main**:** Once the PR is approved, it is merged into the main branch.

5. **Production Deployment (Vercel):** The merge to main automatically triggers Vercel to build and deploy the changes to our production environment.


## **Error Handling Strategy**

This section defines a consistent approach to handling and reporting errors across the application stack.


### **Standardized API Error Response**

All API errors originating from our Payload CMS backend will follow a standardized JSON format to ensure predictable error handling on the frontend.

{

  "error": {

    "code": "UNAUTHORIZED",

    "message": "You must be logged in to perform this action.",

    "statusCode": 401,

    "correlationId": "uuid-v4-string"

  }

}


### **Backend Error Handling (Payload CMS)**

- **Error Catching:** A global error handling middleware will be implemented in Payload to catch all unhandled exceptions.

- **Error Logging:** All errors will be logged as structured JSON using our logger, including the correlationId to trace the request.

- **Error Response:** The middleware will format the error into our standardized API error response and send it to the client. Sensitive stack traces will never be exposed in production responses.


### **Frontend Error Handling (Next.js)**

- **API Client:** The frontend API client will be configured to handle the standardized error responses from the backend.

- **UI Feedback:** When an API call fails, the UI will provide clear, user-friendly feedback (e.g., using a toast notification from shadcn/ui).

- **Error Boundaries:** React Error Boundaries will be used to catch rendering errors in components, preventing the entire application from crashing and displaying a graceful fallback UI.
