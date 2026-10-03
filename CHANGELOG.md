# UNRELEASED

## Feature

- ADM-02.12.01: Category catalog foundations and read path — the admin authorization check for Server Actions, the category-catalog constants/models vocabulary, and the server-side read path that lists categories with whether each ever had units or stock (US-ADM-12 · AWS-64)
- chore - Access screen base components — FormField shows its error below the field with a dark glass variant, the password toggle uses a Material icon with Spanish labels and a 44 px target, a MaterialIcon component, and Text no longer fixes size and color
- chore - Password rules criterion on password change — the password rules checklist moves from the login (US-ACC-01) to the screens where a new password is chosen (US-ACC-03, US-ACC-04, US-ACC-06)
- chore - UI copy and Storybook rules — user-facing copy addresses the worker as usted, the project does not use Storybook, and the Stitch screens are the reference for the app's palette and style, not a blueprint
- chore - Feature folder rules — screens live in app/features by story module, shared bases stay in app/components, routes sit under app/access and app/(system), and every folder and URL segment is English
- chore - Team onboarding and backlog owners — first-run guide in the README and each story's owner in the product backlog
- chore - Stitch local references — the Stitch screens live in docs/referencia/stitch/ on each machine, ignored by git, and .mcp.json never ships

## Bugfix

- chore - Supabase CLI and first-run fixes — the Supabase CLI installs with the project, the guide reads the local keys by name and installs the test browser, and the home end-to-end test matches the current page
