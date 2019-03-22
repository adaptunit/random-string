# random-string
pseudo-random string generator with an indication of the alphabetical set and the percentage of the appearance of each element

### Using: 

```sh
$ node random-string.js stringLength inputfile.json
```

"stringLength" - integer value - how result string is long...

"inputfile.json" must contain JSON like this:
```json 
 [ { letter: 'a', chance: 0.2 },
  { letter: 'b', chance: 0.1 },
  { letter: 'c', chance: 0.5 },
  { letter: 'd', chance: 0.2 } ] 
```
```sh
$ node random-string.js 42 inputparams.json 
```
Output:
```sh
abcadcbcccabacddcdcaddacdaccccccdcccabdccc
```
