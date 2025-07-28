export default function decorate(block) {
  block.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = 'Hi From the Div';
  block.append(div);
}
