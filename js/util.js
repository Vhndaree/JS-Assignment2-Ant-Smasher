/**
 * @return color
 */
function getRandomColor() {
  var redHex = getRandomNumber(0, 255);
  var greenHex = getRandomNumber(0, 255);
  var blueHex = getRandomNumber(0, 255);
  return redHex + ', ' + greenHex + ', ' + blueHex;
}

/**
 * return random number from min to max
 * 
 * @param {*} min 
 * @param {*} max 
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * apply styles in give elements
 * 
 * @param {*} element 
 * @param {*} styles 
 */
function applyStyles(element, styles) {
  var styleKeys = Object.keys(styles);

  if (styleKeys && styleKeys.length) {
    styleKeys.forEach(styleKey => {
      element.style[styleKey] = styles[styleKey];
    });
  }

}