# Changelog

Notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.5](https://github.com/dathbe/MMM-MyStandings/compare/v2.8.4...v2.8.5) - 2025-05-XX

- Update devDependencies

## [2.8.4](https://github.com/dathbe/MMM-MyStandings/compare/v2.8.3...v2.8.4) - 2025-05-14

- Update dependencies
- Lint style changes

## [2.8.3](https://github.com/dathbe/MMM-MyStandings/compare/v2.8.2...v2.8.3) - 2025-05-06

- Update devDependencies
- Minor cosmetic changes

## [2.8.2](https://github.com/dathbe/MMM-MyStandings/compare/v2.8.1...v2.8.2) - 2025-05-01

- BUG FIX: `isSoccer` check removed because it no longer works for most leagues

## [2.8.1](https://github.com/dathbe/MMM-MyStandings/compare/v2.8.0...v2.8.1) - 2025-04-24

- Change default `updateInterval` to 2 hours
- Update README to include instructions on dynamically creating config options
- Upgrade devDependencies

## [2.8.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.7.0...v2.8.0) - 2025-04-17

- **NEW FEATURE**: Added `logos_custom` folder where users can place their own custom team logos that will not be overwritten when updating the module.
- **NEW FEATURE**: Australian A-League Women's soccer added
- Replace custom uniqueID with built-in `this.identifier`
- Change startup logic so updates only begin after module is fully loaded for more reliability

## [2.7.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.6.2...v2.7.0) - 2025-04-08

- **NEW FEATURE**: Olympics medal count standings now available
- **NEW FEATURE**: English Women's Super League now available
- **NEW FEATURE**: CFL now available
- Replace `console.log` with `Log.log`
- Changed some logos

## [2.6.2](https://github.com/dathbe/MMM-MyStandings/compare/v2.6.1...v2.6.2) - 2025-04-03

- Some logic fixes
- Clarify README
- New CIN (NCAA) logo

## [2.6.1](https://github.com/dathbe/MMM-MyStandings/compare/v2.6.0...v2.6.1) - 2025-04-02

- Updated api url
- Updated url logic
- Revised README
- Some new logos
- `MMM-MYSTANDINGS-GET-LOCAL-LOGOS` will now only send when `useLocalLogos` is `true`

## [2.6.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.5.2...v2.6.0) - 2025-03-31

- **NEW FEATURE**: WNBA standings now available
- **NEW FEATURE**: NBA G League (NBA Development League) standings now available
- **NEW FEATURE**: AFL (Australian Football League) standings now available
- **NEW FEATURE**: PLL (Premier Lacrosse League) standings now available
- **NEW FEATURE**: NLL (National Lacrosse League) standings now available

## [2.5.2](https://github.com/dathbe/MMM-MyStandings/compare/v2.5.1...v2.5.2) - 2025-03-31

- Replacing last dependency - **with this, `npm install` is no longer needed!**
  - Replace `directory-tree` by internal method
- BUG FIX: Check incoming logos notifications for matching uniqueID
- Fix name, version, contributors and description in `package.json`
- Switch LICENSE file to markdown for better readability
- Format README and add Contributing section
- Add `.gitignore` to ignore `node_modules` directory
- Add ESLint and handle linting issues
- Small logging tweaks

Special thankyou to @KristjanESPERANTO for most of the work on this release

## [2.5.1](https://github.com/dathbe/MMM-MyStandings/compare/v2.5.0...v2.5.1) - 2025-03-30

- Replace axios dependency with built-in fetch

## [2.5.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.4.0...v2.5.0) - 2025-03-28

- **NEW FEATURE**: New option `addLeagueToTitle` to give users the option to switch off the previously added feature of adding the league name to the table title (it takes up space, and doesn't play nice with some soccer leagues, so I've given the option to remove it)
- **NEW FEATURE**:  Added ranking badges to NWSL standings for playoff spots
- **CHANGED BEHAVIOR**: I've changed all of the names of the soccer leagues to be used in the config file from "XXX_XXX" to "Xxx Xxx".  The old names will continue to work, but will no longer be listed in the README and may be removed at a future date.  *Please update your config files*.  The new styling plays nicer with adding the league name to table titles.
- Added CHANGELOG.md
- Added CODE_OF_CONDUCT.md
- Added LICENSE
- Update package.json
- New screenshot (PNG instead of JPG to hopefully get picked up by <https://kristjanesperanto.github.io/MagicMirror-3rd-Party-Modules/>)
- Some new logos

## [2.4.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.3.0...v2.4.0) - 2025-03-28

- **NEW FEATURE**: Added Rugby league standings
- **NEW FEATURE**: Added alternative standings for NBA (league, conferences), MBL (all MLB, leagues, wild card, playoffs), NFL (league, conferences, playoffs), NHL (league, conferences, wild card, playoffs)
- **NEW FEATURE**: Added rankings badges for certain standings
- **NEW FEATURE**: Added league name before the displayed standings (e.g., "FIFA World Cup Group A" instead of previous "Group A")
- Improved handling of standings rotation; going forward, will rotate through divisions that have received information, ignoring any improperly formatting `groups`.
- Fixed bug involving uniqueID
- Some css formatting tweaks
- Some README clarifications
- Update axios dependency to v1.8.4 for security

## [2.3.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.2.0...v2.3.0) - 2025-03-26

- **NEW FEATURE**: Added `colored` option to allow display of module in grayscale
- **NEW FEATURE**: Added NCAAW rankings
- Simplified default config to display a more limited subset of available standings
- Updated some available soccer leagues
- Some css formatting changes
- Corrected NCAAF ASUN Conference name
- Some README changes for clarity
- Some new logos

## [2.2.0](https://github.com/dathbe/MMM-MyStandings/compare/v2.1.0...v2.2.0) - 2025-03-25

- **NEW FEATURE**: Added NCAAF and NCAAM rankings with ranking badges
- Improved handling of leagues where groups left undefined; this fixes a bug that would display all soccer Groups together even if `showByDivision` was set to `true`.  Going forward, if a league has any divisions, all will be rotated through if `groups` is left `undefined`.
- Added `rankingLength` option for displaying partial (<25) NCAA ranking standings
- Cleaned up README
- Lots of new logos

## [2.1.0](https://github.com/dathbe/MMM-MyStandings/compare/2.0.0...v2.1.0) - 2025-03-24

- **NEW FEATURE**: Improved logo handling so that module will fall back to ESPN urls if local file not available - no more missing logos!
- **NEW FEATURE**: Adds sport name before standings of NCAA conferences ("NCAAM Big Ten" instead of ambiguous "Big Ten")
- Placeholder improvement allowing multiple api urls for each sport for planned implementation of alternative (not just division) standings
- Some initial work toward adding NCAA rankings lists (non-functional)
- Moved all NCAA logos to `NCAA` subfolder to avoid duplication
- Lots of new logos

## [2.0.0](https://github.com/vincep5/MMM-MyStandings/compare/master...dathbe:2.0.0) - 2025-03-23 - First fork version

Forked from [vincep5](https://github.com/vincep5/MMM-MyStandings).

- **NEW FEATURE**: Allows multiple instances of module in same config file
- Updated css formatting
- Corrected some stat names
- Conformed install instructions to best practices
- Added updating instructions
- Lots of logo additions
- Migrated from `request` dependency to `axios`
- Cleaned up `package.json` and added information
