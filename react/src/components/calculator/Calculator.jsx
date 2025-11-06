import React, { useMemo, useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';
import { formatDisplay, numberToString, toInternal } from '../../utils/format';

const MAX_DIGITS = 12;

function isDigitChar(ch) {
  return ch >= '0' && ch <= '9';
}

function countDigits(str) {
  let count = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (isDigitChar(str[i])) count += 1;
  }
  return count;
}

function calculate(a, op, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') {
    if (b === 0) return Infinity; // will be handled as error
    return a / b;
  }
  return b;
}

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0'); // internal string with '.'
  const [firstOperand, setFirstOperand] = useState(null); // number | null
  const [operator, setOperator] = useState(null); // '+', '−', '×', '÷' | null
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [lastOperation, setLastOperation] = useState(null); // { operator, operand } | null
  const [isError, setIsError] = useState(false);

  const hasAnyHistory = useMemo(() => {
    return firstOperand !== null || operator !== null || lastOperation !== null;
  }, [firstOperand, operator, lastOperation]);

  const clearLabel = useMemo(() => {
    if (isError) return 'Сброс';
    const hasInput = displayValue !== '0';
    return hasInput || hasAnyHistory ? 'С' : 'Сброс';
  }, [displayValue, hasAnyHistory, isError]);

  function setError() {
    setIsError(true);
    setDisplayValue('Ошибка');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setLastOperation(null);
  }

  function onDigit(d) {
    if (isError) return;
    if (waitingForSecondOperand) {
      setDisplayValue(d);
      setWaitingForSecondOperand(false);
      return;
    }
    if (countDigits(displayValue) >= MAX_DIGITS) return;
    if (displayValue === '0') {
      setDisplayValue(d);
    } else {
      setDisplayValue(displayValue + d);
    }
  }

  function onDot() {
    if (isError) return;
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  }

  function onToggleSign() {
    if (isError) return;
    if (displayValue === '0') return;
    if (displayValue[0] === '-') {
      setDisplayValue(displayValue.slice(1));
    } else {
      setDisplayValue('-' + displayValue);
    }
  }

  function onPercent() {
    if (isError) return;
    const current = parseFloat(displayValue);
    if (Number.isNaN(current)) return;

    if (firstOperand !== null && operator !== null && !waitingForSecondOperand) {
      const val = (firstOperand * current) / 100;
      const rounded = Number(val.toPrecision(12));
      setDisplayValue(numberToString(rounded));
    } else {
      const val = current / 100;
      const rounded = Number(val.toPrecision(12));
      setDisplayValue(numberToString(rounded));
    }
  }

  function commitCalculation(nextOperator) {
    const inputValue = parseFloat(displayValue);
    if (Number.isNaN(inputValue)) return;

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, operator, inputValue);
      if (!Number.isFinite(result)) {
        setError();
        return;
      }
      const rounded = Number(result.toPrecision(12));
      setFirstOperand(rounded);
      setDisplayValue(numberToString(rounded));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setLastOperation(null);
  }

  function onOperator(op) {
    if (isError) return;
    commitCalculation(op);
  }

  function onEquals() {
    if (isError) return;

    const inputValue = parseFloat(displayValue);

    if (operator !== null) {
      const a = firstOperand !== null ? firstOperand : inputValue;
      const b = inputValue;
      const result = calculate(a, operator, b);
      if (!Number.isFinite(result)) {
        setError();
        return;
      }
      const rounded = Number(result.toPrecision(12));
      setDisplayValue(numberToString(rounded));
      setFirstOperand(rounded);
      setWaitingForSecondOperand(true);
      setLastOperation({ operator, operand: b });
      setOperator(null);
      return;
    }

    if (operator === null && lastOperation) {
      const a = inputValue;
      const { operator: op, operand: b } = lastOperation;
      const result = calculate(a, op, b);
      if (!Number.isFinite(result)) {
        setError();
        return;
      }
      const rounded = Number(result.toPrecision(12));
      setDisplayValue(numberToString(rounded));
      setFirstOperand(rounded);
      setWaitingForSecondOperand(true);
    }
  }

  function onClearPartial() {
    if (isError) return; // blocked until full reset
    setDisplayValue('0');
  }

  function onClearAll() {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setLastOperation(null);
    setIsError(false);
  }

  function handleClear() {
    if (clearLabel === 'С') onClearPartial();
    else onClearAll();
  }

  const formattedDisplay = useMemo(() => formatDisplay(displayValue), [displayValue]);

  return (
    <div
      data-easytag="id1-react/src/components/calculator/Calculator.jsx"
      className="w-full select-none"
    >
      <div
        data-easytag="id2-react/src/components/calculator/Calculator.jsx"
        className="rounded-3xl bg-black shadow-2xl ring-1 ring-white/5 overflow-hidden"
      >
        <div
          data-easytag="id3-react/src/components/calculator/Calculator.jsx"
          className="px-4 pt-8 pb-4 sm:px-6 sm:pt-10"
        >
          <Display value={formattedDisplay} />
        </div>
        <div data-easytag="id4-react/src/components/calculator/Calculator.jsx" className="px-2 pb-4 sm:px-4 sm:pb-6">
          <Keyboard
            onDigit={onDigit}
            onDot={onDot}
            onOperator={onOperator}
            onEquals={onEquals}
            onPercent={onPercent}
            onToggleSign={onToggleSign}
            onClear={handleClear}
            clearLabel={clearLabel}
            activeOperator={waitingForSecondOperand ? operator : null}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
