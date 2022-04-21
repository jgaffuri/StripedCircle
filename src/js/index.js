//@ts-check

/**
 * A fair approximation of the inverse function of x -> x-sin(x)
 * See: https://math.stackexchange.com/a/3653155/1009
 * 
 * @param {number} v 
 * @returns {number}
 */
const frec = (v) => {
  const t = Math.pow(6 * v, 1 / 3);
  const t2 = t * t;
  const t4 = t2 * t2;
  const t6 = t4 * t2;
  return (
    (t * (1 - (1267 / 9428) * t2 + (31 / 6507) * t4 - (1 / 32473) * t6)) /
    (1 - (2251 / 14902) * t2 + (63 / 9593) * t4 - (1 / 13890) * t6)
  );
}

/**
 * A first approximation.
 * @param {number} perc Percentage value, within [0,1] interval.
 * @returns {number}
 */
const d_ = function(perc) {
  const theta = frec(perc * 2 * Math.PI);
  return 0.5 * (1 - Math.cos(theta / 2));
}


/**
 * A fair approximation of the coefficient to use to compute the circle stripe width from a percentage value.
 * @param {number} perc Percentage value, within [0,1] interval.
 * @returns {number}
 */
 export const correction = function(perc) {
  if (perc > 0.5) return 1 - d_(1 - perc);
  return d_(perc);
}


/**
 * Make a striped pattern.
 * 
 * @param {object} svg The d3 SVG object
 * @param {string} id The id of the striped pattern. The pattern should then be used with "url(#id)"
 * @param {number} width The width of the pattern, typically the diameter.
 * @param {Array.<number>} percentages The percentages, within [0,100], ordered.
 * @param {Array.<string>} colors The colors, in the same order as the percentages.
 * @param {number} orientation The orientation of the stripes, in degree. 0 is vertical.
 * @param {Array.<number>} rotationPos The [x,y] position of the rotation, typically the circle center position. 
 * @param {boolean} withCorrection 
 */
export const makePattern = function (
  svg,
  id,
  width,
  percentages,
  colors,
  orientation = 0,
  rotationPos = null,
  withCorrection = true
) {
  let defs = svg.select("defs");
  if (defs.size() === 0) defs = svg.append("defs");

  const pattern = defs
    .append("pattern")
    .attr("id", id)
    .attr("patternUnits", "objectBoundingBox")
    .attr("width", 1)
    .attr("height", 1)
    if(rotationPos)
    pattern.attr(
      "patternTransform",
      "rotate(" + orientation + "," + rotationPos[0] + "," + rotationPos[1] + ")"
    );
  let cumPer = 0;
  for (let i = 0; i < percentages.length; i++) {
    const per = percentages[i] * 0.01;
    pattern
      .append("rect")
      .attr("x", width * (withCorrection ? correction(cumPer) : cumPer))
      .attr("y", 0)
      .attr("width", width * (withCorrection ? correction(per) : per))
      .attr("height", width)
      .attr("fill", colors[i]);
    cumPer += per;
  }
}
