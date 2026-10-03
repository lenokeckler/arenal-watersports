# UNRELEASED

## Feature

- ACC-01.01.02: Login form logic — the login form's Spanish copy, sign-in Server Action, error-to-field mapping and view model (US-ACC-01 · AWS-30)
- ACC-01.01.01: Sign-in service — username and password sign-in against Supabase with the username to auth email mapping and the password maximum length (US-ACC-01 · AWS-30)
- chore - UI copy and Storybook rules — user-facing copy addresses the worker as usted, the project does not use Storybook, and the Stitch screens are the reference for the app's palette and style, not a blueprint
- chore - Feature folder rules — screens live in app/features by story module, shared bases stay in app/components, routes sit under app/access and app/(system), and every folder and URL segment is English
- chore - Team onboarding and backlog owners — first-run guide in the README and each story's owner in the product backlog
- chore - Stitch local references — the Stitch screens live in docs/referencia/stitch/ on each machine, ignored by git, and .mcp.json never ships

## Bugfix

- chore - Supabase CLI and first-run fixes — the Supabase CLI installs with the project, the guide reads the local keys by name and installs the test browser, and the home end-to-end test matches the current page
