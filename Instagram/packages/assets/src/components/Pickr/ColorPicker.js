import React, {useEffect} from 'react';
import Pickr from '@avada/assets/src/components/Pickr/js/pickr';
import '@avada/assets/src/components/Pickr/scss/themes/nano.scss';
import PropTypes from 'prop-types';

export default function ColorPicker({index, color, handleColorChange}) {
  const pickerClassName = `color-picker-${index}`;

  const colorChangeCallback = (color, instance) => {
    const hex = color.toHEXA().toString();

    handleColorChange(hex);
  };

  useEffect(() => {
    // Simple example, see optional options for more configuration.
    const pickr = Pickr.create({
      el: `.${pickerClassName}`,
      theme: 'nano',
      default: color,
      defaultRepresentation: 'HEX',
      swatches: [
        'rgba(1, 0, 127, 1)',
        'rgba(1, 0, 127, .9)',
        'rgba(1, 0, 127, .8)',
        'rgba(1, 0, 127, .7)',
        'rgba(0, 0, 0, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(37, 185, 246, 1)',
        'rgba(48, 224, 112, 1)',
        'rgba(48, 224, 112, .9)',
        'rgba(48, 224, 112, .8)',
        'rgba(48, 224, 112, .7)',
        'rgba(2, 73, 211, 1)',
        'rgba(220, 254, 84, 1)',
        'rgb(255,0,0)'
      ],
      components: {
        preview: true,
        hue: true,
        opacity: true,

        interaction: {
          hex: true,
          rgba: true,
          input: true,
          clear: false,
          save: true
        }
      }
    });

    pickr.on('save', colorChangeCallback);

    return () => {
      pickr.off('save', colorChangeCallback);
    };
  }, []);

  return (
    <>
      <div className={`${pickerClassName} color-picker`} />
    </>
  );
}
ColorPicker.propTypes = {
  index: PropTypes.string,
  color: PropTypes.string,
  handleColorChange: PropTypes.func
};
