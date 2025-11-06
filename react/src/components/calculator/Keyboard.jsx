import React, { useMemo } from 'react';
import Key from './Key';

const Keyboard = ({
  onDigit,
  onDot,
  onOperator,
  onEquals,
  onPercent,
  onToggleSign,
  onClear,
  clearLabel,
  activeOperator,
}) => {
  const keys = useMemo(() => ([
    // row 1
    { label: clearLabel, type: 'func', onPress: onClear },
    { label: '+/-', type: 'func', onPress: onToggleSign },
    { label: '%', type: 'func', onPress: onPercent },
    { label: '÷', type: 'op', onPress: () => onOperator('÷'), op: '÷' },
    // row 2
    { label: '7', type: 'digit', onPress: () => onDigit('7') },
    { label: '8', type: 'digit', onPress: () => onDigit('8') },
    { label: '9', type: 'digit', onPress: () => onDigit('9') },
    { label: '×', type: 'op', onPress: () => onOperator('×'), op: '×' },
    // row 3
    { label: '4', type: 'digit', onPress: () => onDigit('4') },
    { label: '5', type: 'digit', onPress: () => onDigit('5') },
    { label: '6', type: 'digit', onPress: () => onDigit('6') },
    { label: '−', type: 'op', onPress: () => onOperator('−'), op: '−' },
    // row 4
    { label: '1', type: 'digit', onPress: () => onDigit('1') },
    { label: '2', type: 'digit', onPress: () => onDigit('2') },
    { label: '3', type: 'digit', onPress: () => onDigit('3') },
    { label: '+', type: 'op', onPress: () => onOperator('+'), op: '+' },
    // row 5
    { label: '0', type: 'digit', onPress: () => onDigit('0'), wide: true },
    { label: ',', type: 'digit', onPress: onDot },
    { label: '=', type: 'op', onPress: onEquals },
  ]), [onDigit, onDot, onOperator, onEquals, onPercent, onToggleSign, onClear, clearLabel]);

  return (
    <div
      data-easytag="id1-react/src/components/calculator/Keyboard.jsx"
      className="grid grid-cols-4 gap-2 sm:gap-3"
    >
      {keys.map((k, idx) => (
        <Key
          key={idx}
          label={k.label}
          type={k.type}
          onPress={k.onPress}
          wide={k.wide}
          active={k.type === 'op' && k.op && activeOperator === k.op}
          index={idx}
        />
      ))}
    </div>
  );
};

export default Keyboard;
