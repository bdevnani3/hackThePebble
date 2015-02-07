console.log('Simply.js demo!');

simply.on('singleClick','select', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Ow');
});

simply.on('singleClick','up', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Howd you feel if someone poked YOU in the head');
});

simply.on('singleClick','down', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Getting down right dirty');
});

simply.on('longClick','select', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.subtitle('OUCH');
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('longClick','up', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.subtitle('Watchu getting out of this');
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('longClick','down', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.subtitle('Dropping to a new low...');
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  simply.subtitle('Honestly, now youre just being rude');
});

simply.text({
  title: 'Dont push my buttons...',
  subtitle: '(hold em for different spans of time)',
}, true);

