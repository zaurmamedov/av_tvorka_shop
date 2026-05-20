# AV.TVORKA Design Guidelines

## Main Goal

The website is an elegant ecommerce store for handmade jewelry, bags, and accessories.

The UI must look:
- clean
- premium
- minimalistic
- feminine
- soft
- modern
- easy to use

Do not make the interface look like a technical demo.

## Brand Style

Brand name: AV.TVORKA

Primary color:
#A8C686

Supporting colors:
- white
- light beige
- soft gray
- muted black
- warm neutral tones

Use soft shadows, rounded corners, generous spacing, and calm typography.

## General UI Rules

- Every page must look visually balanced.
- Elements must never overlap.
- Cards must have consistent spacing.
- Images and text must be aligned consistently.
- Buttons must have clear hover and active states.
- Forms must be clean and easy to fill.
- Layouts must work during continuous browser resizing, not only fixed device presets.
- Avoid horizontal scrolling.
- Avoid cramped layouts.
- Avoid inconsistent spacing between similar elements.

## Responsive Rules

Design must work for:
- full desktop
- resized desktop window
- tablet
- mobile

Important:
Do not only create mobile and desktop breakpoints.
Intermediate widths must also work.

Use:
- flexible grids
- minmax()
- flex-wrap
- min-width: 0
- max-width: 100%
- responsive gaps
- responsive padding

Avoid:
- fixed widths that cause overflow
- long nowrap elements
- layout depending on exact screen width
- hiding overflow as a fake fix

## Product Cards

Product cards must:
- have consistent height/spacing
- never overlap
- keep image, title, price, and actions aligned
- wrap to a new row when there is not enough space
- show wishlist button clearly by default
- keep action buttons readable and not overlapping

Use CSS grid like:

repeat(auto-fit, minmax(240px, 1fr))

or similar.

## Cart Page

Cart rows must look like modern ecommerce cart rows.

Each item should be visually consistent:
- product image and name aligned neatly
- same spacing for every row
- quantity controls visible and easy to use
- remove button clear
- summary block should move below items before overlap happens

At medium widths:
cart items and summary should stack vertically if needed.

## Checkout Page

Checkout form must:
- be clear
- not cramped
- have readable fields
- stack properly on narrower screens
- show summary below form on smaller widths
- avoid horizontal scroll

## Header

Desktop:
- logo
- navigation
- language/currency
- wishlist/cart
- user/login state

Mobile:
- logo
- wishlist
- cart
- burger menu only

Mobile fullscreen menu:
- must cover viewport
- must have a visible clickable close button
- burger icon should change to X when menu is open
- clicking a link closes the menu
- body scroll disabled while menu is open

## Forms

Forms must have:
- labels
- placeholders where useful
- validation messages
- loading states
- visible focus states
- responsive width
- no cramped inputs

## What NOT to do

Do not:
- rewrite architecture for UI changes
- add random libraries
- add global overflow-x hidden as a fake fix
- use fixed pixel layouts everywhere
- create inconsistent layouts between similar pages
- overlap text/buttons/images
- make buttons visible only on hover if they are important
- hide important functionality on mobile