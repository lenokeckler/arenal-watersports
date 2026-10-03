# UNRELEASED

## Feature

- ACC-01.01.04: Login focus and E2E — after a failed submit the first field in error takes the focus, and a Playwright spec with mobile and desktop captures covers the login screen (US-ACC-01 · AWS-30)
- ACC-01.01.03: Login screen — the login screen at /access/login with username and password, a password visibility toggle and each error in red next to its field (US-ACC-01 · AWS-30)
- chore - Feature folder structure — the login moves to app/features/access with its route under app/access at /access/login, the access layout renders the shared access screen, and ESLint blocks imports of a feature from shared folders or from another feature
- chore - Route type helpers — pages and layouts are typed with the PageProps and LayoutProps types Next.js generates from the routes, and typecheck generates them first so they exist in CI
- ACC-01.01.02: Login form logic — the sign-in error copy, sign-in Server Action, error-to-field mapping and view model (US-ACC-01 · AWS-30)
- ACC-01.01.01: Sign-in service — username and password sign-in against Supabase with the username to auth email mapping and the password maximum length (US-ACC-01 · AWS-30)
- chore - Access screen shell — the shared frame of the access screens from Stitch: background glow, glass card, Arenal logo and title, and the main landmark under /acceso
- chore - Access screen base components — FormField shows its error below the field with a dark glass variant, the password toggle uses a Material icon with Spanish labels and a 44 px target, a MaterialIcon component, and Text no longer fixes size and color
- chore - Password rules criterion on password change — the password rules checklist moves from the login (US-ACC-01) to the screens where a new password is chosen (US-ACC-03, US-ACC-04, US-ACC-06)
- chore - UI copy and Storybook rules — user-facing copy addresses the worker as usted, the project does not use Storybook, and the Stitch screens are the reference for the app's palette and style, not a blueprint
- chore - Feature folder rules — screens live in app/features by story module, shared bases stay in app/components, routes sit under app/access and app/(system), and every folder and URL segment is English
- chore - Team onboarding and backlog owners — first-run guide in the README and each story's owner in the product backlog
- chore - Stitch local references — the Stitch screens live in docs/referencia/stitch/ on each machine, ignored by git, and .mcp.json never ships

## Bugfix

- chore - Supabase CLI and first-run fixes — the Supabase CLI installs with the project, the guide reads the local keys by name and installs the test browser, and the home end-to-end test matches the current page
