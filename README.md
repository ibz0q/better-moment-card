# Better Moment Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

**Current Version: 2023.12.29.3**
 
A customizable lovelace card to show custom date/time, digital clocks using any datetime combination of your choosing i.e. DD/MM/YY HH:mm. Uses the day.js library. Inspired by the Clockwork and Simple clock cards. 


#### *Sample 3 (Clockwork style):*

<img src="image-1.png" width="60%">

#### *Sample 1*

<img src="image-3.png" width="50%">

#### *Sample 2*

<img src="image-2.png" width="50%">

#### How to style 
Style each time section (moment), with any style you want. You can even position each moment using CSS. Check out the full list of options to find out more.

<img src="image.png" width="100%">


## Install with HACS

To install via [HACS](https://hacs.xyz/) select the "Custom repositories" button add in the link in this format ***user* + *repository name***  (You can find this information at the top of the repository.  For category select  **Lovelace** then click "ADD".

After this navigate to "Frontend" click the plus symbol and enter "Better Moment Card" into the search bar. Then click on the first result.  and select "Install this repository in HACS" and you are done!

## Manual Install

To install add it to your custom lovelace folder and then reference it accordingly

```yaml
resource:
  - url: /local/better-moment-card/better-moment-card.js
    type: js
```

## Configuration

### Minimal config: 
```Yaml
type: custom:better-moment-card
moment:
  - format: HH:mm:ss
```

### Available options:
```Yaml
type: custom:better-moment-card
parentStyle: background-color:blue; # CSS
moment:
  - format: YYYY # Date format (table below)
    timezone: Europe/Brussels # Uses IANA tz db format
    style: font-size:2em; text-align:center; # CSS
    template: | # Any HTML 
      Oh hi, it's <strong>{ { moment } }</strong> 
    # Oh hi, it's *2024*
```

### Styling

Customize styling using CSS: Use the inbuilt `style:` option to apply styling to the instance.

Each instance (moment) gets it's own CSS ID (moment-0, moment-1 etc) and can be alternatively selected using card-mod. `parentStyle` applies styling to the parent div container. 

```
+------------------+
|    HA-card       |
|                  |
|  +---------------+
|  | card-content  |
|  | (parentStyle) |
|  |  +------------+
|  |  | moment-0   |
|  |  | (style)    |
|  |  +------------+
|  |  | moment-1   |
|  |  | (style)    |
|  |  +------------+
|  +---------------+
+------------------+
```

### Some sample ideas to get you started 

#### Style 1
```Yaml
type: custom:better-moment-card
parentStyle: line-height:4em;
moment:
  - format: HH:mm:ss
    style: font-size:4em; text-align:center; font-weight:400;
  - format: dddd, DD MMMM
    style: font-size:1.6em; text-align:center;
```

#### Style 2
```Yaml
type: custom:better-moment-card
moment:
  - format: HH:mm:ss
    style: font-size:3em; text-align:center; padding:0 0 1em 0
  - format: dddd, DD MMMM YY
    style: font-size:2em; text-align:center;
```

#### Style 3
```Yaml
type: custom:better-moment-card
parentStyle: |
  line-height:normal;
  padding-bottom:0em;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr; 
  gap: 0px; 
  grid-template-areas: 
    'time time riyadh'
    'date date brussells'; 
moment:
  - format: HH:mm:ss
    style: >
      font-size:4.4em; text-align:center; font-weight:400; grid-area: time;
      font-weight:500
  - format: dddd, DD MMMM
    style: >
      font-size:1.6em; line-height:1em; text-align:center;padding-top:0.5em;
      grid-area: date; 
  - format: HH:mm:ss
    timezone: Asia/Riyadh
    style: |
      text-align:center; line-height:2em; padding-top:0.2em; grid-area: riyadh;
    template: |
      <strong>🇸🇦 Riyadh</strong>
      <div style="font-size:1.2em;">{{moment}}</div>
  - format: HH:mm:ss
    timezone: Europe/Brussels
    style: |
      text-align:center; line-height:2em; grid-area: brussells;
    template: |
      <strong>🇩🇪 Brussels</strong>
      <div style="font-size:1.2em;">{{moment}}</div>
```
### Timezones

This will use your clients timezone. It does not use a Home Assistant time entity and there will be no support in adding this.

Timezones need to be in the IANA format in tz database, you can find them here: https://nodatime.org/TimeZones

i.e. `timezone: Europe/London`

### Available date formats

These go inside `  - format: `

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `YY`   | 18               | Two-digit year                        |
| `YYYY` | 2018             | Four-digit year                       |
| `M`    | 1-12             | The month, beginning at 1             |
| `MM`   | 01-12            | The month, 2-digits                   |
| `MMM`  | Jan-Dec          | The abbreviated month name            |
| `MMMM` | January-December | The full month name                   |
| `D`    | 1-31             | The day of the month                  |
| `DD`   | 01-31            | The day of the month, 2-digits        |
| `d`    | 0-6              | The day of the week, with Sunday as 0 |
| `dd`   | Su-Sa            | The min name of the day of the week   |
| `ddd`  | Sun-Sat          | The short name of the day of the week |
| `dddd` | Sunday-Saturday  | The name of the day of the week       |
| `H`    | 0-23             | The hour                              |
| `HH`   | 00-23            | The hour, 2-digits                    |
| `h`    | 1-12             | The hour, 12-hour clock               |
| `hh`   | 01-12            | The hour, 12-hour clock, 2-digits     |
| `m`    | 0-59             | The minute                            |
| `mm`   | 00-59            | The minute, 2-digits                  |
| `s`    | 0-59             | The second                            |
| `ss`   | 00-59            | The second, 2-digits                  |
| `SSS`  | 000-999          | The millisecond, 3-digits             |
| `Z`    | +05:00           | The offset from UTC, ±HH:mm           |
| `ZZ`   | +0500            | The offset from UTC, ±HHmm            |
| `A`    | AM PM            |                                       |
| `a`    | am pm            |                                       |

## Todo 
    [ ] Add locales (if there's demand)
    
## DISCLAIMER

Wrote this for personal use but decided to release it, no warranty.
