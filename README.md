# Better Moment Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

**Current Version: 2024-03-30.1**
 
A lovelace card to show custom date/time, digital clocks using any datetime combination of your choosing i.e. DD/MM/YY HH:mm. Uses dayjs. Inspired by the Clockwork and Simple clock cards. 


#### *Sample 3 (Clockwork style):*


<div style="width: 60%; height: 50%">
  
  ![](image-1.png)
  
</div>

#### How to style 
Style each time section (moment), with any style you want. You can even position each moment using CSS. Check out the full list of options to find out more.

<div style="width: 60%; height: 70%">
  
  ![](image.png)
  
</div>

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

### Minimal required config: 
```Yaml
type: custom:better-moment-card
moment:
  - format: HH:mm:ss
```

### All options:

```Yaml
type: custom:better-moment-card
parentStyle: background-color:blue; # CSS
interval: 1000 # Milliseconds, how often DOM is written to (defaults to 1000 - every second)
moment:
  - format: YYYY # Date format (table below)
    timezone: Europe/Brussels # Uses IANA tz db format
    parentStyle: font-size:2em; text-align:center; # CSS for instance container div (see DOM tree for "*parentStyle")
    template: | 
      Oh hi, it's <strong>{{ moment }}</strong> 
    # Output: Oh hi, it's *2024*
  
  - templateRaw: | # When specified, options format: and timezone: are ignored and expected inside {{moment format=* timezone=*}} instead 
      It's currently <strong>{{ moment format=HH:mm }}</strong> 
      # Output: It's currently 09:40 (Uses local timezone)
      
      It's <strong>{{ moment format=HH:mm:ss timezone=Europe/Berlin }}in Berlin</strong> 
      # Overrides to Europe/Berlin timezone

      Berlin is offset <strong>{{ moment format=ZZ timezone=Europe/Berlin }} from UTC</strong> 
      # Ouput: Berlin is offset +0100 from UTC

```

## Examples

<div style="width: 60%; height: 50%">
  
  ![](image-3.png)
  
</div>

#### Style 1
```Yaml
type: custom:better-moment-card
parentStyle: line-height:4em;
moment:
  - format: HH:mm:ss
    parentStyle: font-size:4em; text-align:center; font-weight:400;
  - format: dddd, DD MMMM
    parentStyle: font-size:1.6em; text-align:center;
```

<div style="width: 60%; height: 50%">
  
  ![](image-2.png)
  
</div>

#### Style 2
```Yaml
type: custom:better-moment-card
moment:
  - format: HH:mm:ss
    parentStyle: font-size:3em; text-align:center; padding:0 0 1em 0
  - format: dddd, DD MMMM YY
    parentStyle: font-size:2em; text-align:center;
```

#### Style 3

<div style="width: 60%; height: 50%">
  
  ![](image-1.png)
  
</div>


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
    parentStyle: |
      font-size:4.4em; 
      text-align:center; 
      font-weight:400; 
      grid-area: time;
      font-weight:500
  - format: dddd, DD MMMM
    parentStyle: |
      font-size:1.6em;
      line-height:1em; text-align:center;
      padding-top:0.5em;
      grid-area: date; 
  - format: HH:mm:ss
    timezone: Asia/Riyadh
    parentStyle: |
      text-align:center; 
      line-height:2em; 
      padding-top:0.2em; 
      grid-area: riyadh;
    template: |
      <strong>🇸🇦 Riyadh</strong>
      <div style="font-size:1.2em;">{{moment}}</div>
  - format: HH:mm:ss
    timezone: Europe/Brussels
    parentStyle: |
      text-align:center; 
      line-height:2em; 
      grid-area: brussells;
    template: |
      <strong>🇩🇪 Brussels</strong>
      <div style="font-size:1.2em;">{{moment}}</div>
```

### DOM Tree

Each instance (moment) gets it's own CSS ID (moment-0, moment-1 etc) and can be alternatively selected using card-mod. `parentStyle` applies styling to the parent on instance div container. 

```
+------------------+
|    HA-card       |
|                  |
|  +---------------+
|  | card-content  |
|  | (parentStyle) |
|  |  +------------+
|  |  | moment-0   |
|  |  | (*parentStyle)    |
|  |  +------------+
|  |  | moment-1   |
|  |  | (*parentStyle)    |
|  |  +------------+
|  +---------------+
+------------------+
```


### Timezones

This will use your clients timezone. It does not use a Home Assistant time entity and there will be no support in adding this.

Timezones need to be in the IANA format in tz database, you can find them here: https://nodatime.org/TimeZones

i.e. `timezone: Europe/London`

### Date/Time Formats

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
    

## Feature requests

Requests for features can be submitted through an issue however would prefer you submit your own PR which I'll approve.


## DISCLAIMER

Wrote this for personal use but decided to release it, no warranty.
