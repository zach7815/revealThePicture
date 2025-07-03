import '../styles/style.css';
import {
  clickFadeOut,
  ToggleFullScreen,
  createGridItems,
  resizeImage,
  handleEscapePress,
} from './clickFadeOut.ts';

createGridItems(25);
handleEscapePress();
['', 'webkit', 'moz', 'ms'].forEach((prefix) =>
  document.addEventListener(
    prefix + 'fullscreenchange',
    handleEscapePress,
    false
  )
);

resizeImage(
  'https://joyfoodsunshine.com/wp-content/uploads/2022/10/best-hamburger-recipe-11.jpg'
);
clickFadeOut('.gridItem');
clickFadeOut('.answerCover');
const fullscreenButton = document.getElementById('fullscreenBtn');
if (fullscreenButton) {
  fullscreenButton.addEventListener('click', ToggleFullScreen);
}
