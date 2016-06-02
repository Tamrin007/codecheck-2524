- Convert each alphabet of `command` and `data` of bot to repective ASCII value.
- Concatenate each alphabet ASCII value of `command`. Let us call it commandASCII.
- Concatenate each alphabet ASCII value of `data`. Let us call it dataASCII.
- Convert commandASCII and dataASCII into integer.

#### You will get a integer value.
See the following details. For example:

If `command` is `color` and `data` is `red`,
- ASCII value of `command` and `data`

| **Input** | c | o | l | o | r |
|:---------|:-:|:-:|:-:|:-:|:-:|
| **ASCII** | 99 | 111 | 108 | 111 | 114 |

| **Input** | r | e | d |
|:---------|:-:|:-:|:-:|
| **ASCII** | 104 | 101 | 100 |

- You will get a integer value if number is not big enough.
- Integer value of `commandASCII` will be `99111108111114`
- Integer value `dataASCII` will be `114101100`
- Add `commandASCII` and `dataASCII`, here addition = `99111222212214`
- Convert the added value to Hex code and then into string.
- Hence `hash` property is `5a2421317676`

#### If commandASCII and dataASCII are long you will get value in [scientific notation](https://en.wikipedia.org/wiki/Scientific_notation).
For example:
If `commandName` is `xxxxxxxx` and `dataName` is `yyyyyyyyy`,
- ASCII value of `command` and `data`

| **Input** | x |
|:---------|:-:|
| **ASCII** | 120 |

| **Input** | y |
|:---------|:-:|
| **ASCII** | 121 |

- If commandASCII and dataASCII are long you will get value in [scientific notation](https://en.wikipedia.org/wiki/Scientific_notation).
- Integer value `commandASCII` will be `1.2012012012012012e+23`
- Integer value `dataASCII` will be `1.2112112112112113e+26`
- Extract the value between `.` and `e` from integer value of `commandASCII` and `dataASCII`. Let us call it `extractedCommand` =`201201201201201223` and `extractedData` = `211211211211211326` repectively.
- Add the extracted values `extractedCommand` and `extractedData`, here addition = `412412412412412549`.
- Convert the added value into Hex code and then into string.
- Hence `hash` property is `5b92ee76ecdc285`
