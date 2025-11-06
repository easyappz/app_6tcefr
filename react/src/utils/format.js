function removeSpaces(str) {
  // remove normal space and non-breaking space without regex
  let out = '';
  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    const code = c.charCodeAt(0);
    if (code !== 32 && code !== 160) out += c;
  }
  return out;
}

export function toInternal(viewString) {
  if (!viewString) return '';
  const noSpaces = removeSpaces(viewString);
  // replace comma to dot without regex
  const parts = noSpaces.split(',');
  return parts.join('.');
}

export function numberToString(n) {
  if (!Number.isFinite(n)) return 'Ошибка';
  // keep exponent if toString provides it
  let s = n.toString();
  if (s.indexOf('e') !== -1 || s.indexOf('E') !== -1) return s;
  // normalize to avoid -0
  if (Object.is(n, -0)) s = '0';
  if (s.indexOf('.') !== -1) {
    // trim trailing zeros without regex
    while (s.length > 0 && s[s.length - 1] === '0') {
      s = s.slice(0, -1);
    }
    if (s.length > 0 && s[s.length - 1] === '.') {
      s = s.slice(0, -1);
    }
  }
  return s;
}

export function formatDisplay(internalString) {
  if (!internalString && internalString !== '0') return '';
  if (internalString === 'Ошибка') return 'Ошибка';

  // handle exponent formatting: just replace dot to comma
  if (internalString.indexOf('e') !== -1 || internalString.indexOf('E') !== -1) {
    const parts = internalString.split('.');
    return parts.join(',');
  }

  let s = internalString;
  let negative = false;
  if (s[0] === '-') {
    negative = true;
    s = s.slice(1);
  }
  let intPart = s;
  let fracPart = '';
  const dotIndex = s.indexOf('.');
  if (dotIndex !== -1) {
    intPart = s.slice(0, dotIndex);
    fracPart = s.slice(dotIndex + 1);
  }

  let intNumber = 0;
  if (intPart && intPart.length > 0) {
    intNumber = Number(intPart);
  }
  let formattedInt = intNumber.toLocaleString('ru-RU');

  // If original intPart was empty, show 0
  if (intPart === '') formattedInt = '0';

  let result = negative ? '-' + formattedInt : formattedInt;
  if (dotIndex !== -1) {
    result += ',' + fracPart;
  }

  // Limit too long numbers by switching to exponential
  const digitsOnly = [];
  for (let i = 0; i < internalString.length; i += 1) {
    const ch = internalString[i];
    if (ch >= '0' && ch <= '9') digitsOnly.push(ch);
  }
  if (digitsOnly.length > 12) {
    const n = Number(internalString);
    if (Number.isFinite(n)) {
      const exp = n.toExponential(8);
      const parts = exp.split('.');
      return parts.join(',');
    }
  }

  return result;
}
