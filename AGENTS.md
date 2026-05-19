# Project Rules

## Stack

* React
* TypeScript
* Vite
* Supabase
* SCSS

---

# CRITICAL RULES

* Do NOT rewrite the project architecture.
* Do NOT refactor unrelated files.
* Do NOT replace working logic.
* Make the smallest possible changes.
* Preserve existing component structure.
* Preserve existing hooks/providers/services unless explicitly requested.
* Never remove functionality unless explicitly requested.
* Never rename routes unless explicitly requested.
* Never replace SCSS architecture.
* Do not add new libraries unless absolutely necessary.
* Do not rewrite Context API to Redux/Zustand/etc.
* Do not convert components to another pattern unless explicitly requested.

---

# Styling Rules

* Preserve existing SCSS variables and mixins.
* Preserve responsive behavior.
* Avoid horizontal overflow.
* Do not use fixed widths unless necessary.
* Prefer responsive flex/grid layouts.
* Never add overflow-x: hidden as a fake fix.

---

# Supabase Rules

* Preserve existing table structure unless explicitly requested.
* Never expose private keys.
* Never move service role keys to frontend.
* Respect RLS policies.
* Keep existing auth flow intact.

---

# Checkout / Orders Rules

* Do not change order schema unless necessary.
* Keep existing checkout flow intact.
* Never break cart clearing after order success.
* Never remove redirect to success page.

---

# Debugging Rules

When fixing bugs:

* first identify exact root cause
* explain root cause
* modify only necessary files
* avoid broad refactors
* report all changed files

---

# Before Large Changes

Always:

* analyze existing implementation first
* preserve existing patterns
* avoid duplicate logic
* reuse existing utilities/components/hooks where possible
