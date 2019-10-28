
export function zeroPadding(numStr, max) {
    numStr = numStr.toString();
    return numStr.length < max ? zeroPadding('0' + numStr, max) : numStr;
}

export function combineHMSToString(hour, min, sec) {
    return zeroPadding(hour, 2) + ':' + zeroPadding(min, 2) + ':' + zeroPadding(sec, 2);
}